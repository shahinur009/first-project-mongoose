/* eslint-disable @typescript-eslint/no-this-alias */
// import { StudentModel } from "./student.model";
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
  StudentModel,
} from "./student/student.interface";
import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import config from "../config";
// import validator from "validator";

const UserNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First Name is Required"],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, "Last Name is Required"],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: "{VALUE} is not valid",
    },
  },
});

const GuardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father Name Is Required"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father Occupation Is Required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father Contact Number Is Required"],
  },
  motherName: {
    type: String,
    required: [true, "Mother Name Is Required"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother Occupation Is Required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother Contact Number Is Required"],
  },
});

const LocalGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Local Guardian Is Required"],
  },
  occupation: {
    type: String,
    required: [true, "Local Guardian Occupation Is Required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local Guardian Contact Number Is Required"],
    maxlength: [15, "Local Guardian Contact Number can not more than 15"],
  },
  address: {
    type: String,
    required: [true, "Local Guardian Address Is Required"],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      maxlength: [20, "password cannot be more than 20 characters"],
    },

    name: {
      type: UserNameSchema,
      required: [true, "User Name Is Required"],
      validate: {
        validator: function (value) {
          const firstNameStr =
            value.firstName.charAt(0).toUpperCase() + value.firstName.slice(1);
          return firstNameStr === value.firstName;
        },
        message: "{VALUE} is not in capitalize format",
      },
    },

    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: `Gender Is Required : "male", "female", "other"`,
      },
      required: true,
    },
    dateOfBirth: { type: String },
    email: {
      type: String,
      required: [true, "User Email Is Required"],
      unique: true,
    },
    contactNos: {
      type: String,
      required: [true, "User Contact Number Is Required"],
      trim: true,
      maxlength: [15, "User Contact Number can not more than 15"],
    },
    emergencyContactNo: {
      type: String,
      required: [true, "User Emergency Contact Number Is Required"],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"],
        message: `Blood Group is Required : "A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"`,
      },
      required: true,
    },
    presentAddress: {
      type: String,
      required: [true, "User Present Address Is Required"],
    },
    permanentAddress: {
      type: String,
      required: [true, "User Permanent Address Is Required"],
    },
    guardian: {
      type: GuardianSchema,
      required: [true, "User Guardian Info Is Required"],
    },
    localGuardian: {
      type: LocalGuardianSchema,
      required: [true, "User Local Guardian Is Required"],
    },
    profileImage: { type: String },
    isActive: {
      type: String,
      enum: {
        values: ["active", "blocked"],
        message: "User Status Is Required: 'active', 'blocked'",
      },
      default: "active",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// virtual
studentSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
  
  // this.name.firstName + this.name.middleName + this.name.lastName;
});

//pre save Middleware/hook : will work on create() or save()
studentSchema.pre("save", async function (next) {
  // console.log(this, "pre hook: we will save the data");

  // password hashing here to save data DB
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

// post save middleware/hook
studentSchema.post("save", function (doc, next) {
  console.log(this, "Post hook: We saved our data");
  doc.password = "";
  next();
});

//Query Middleware/hook
studentSchema.pre("find", function (next) {
  console.log("hi");
  this.find({ isDeleted: { $ne: true } });

  next();
});

studentSchema.pre("findOne", function (next) {
  console.log("find one");
  this.findOne({ isDeleted: { $ne: true } });

  next();
});

studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });

  next();
});

// Creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });

  return existingUser;
};

// creating a custom instance method
// studentSchema.methods.isUserExits = async function (id: string) {
//   const existingUser = await Student.findOne({ id });

//   return existingUser;
// };

export const Student = model<TStudent, StudentModel>("Student", studentSchema);
