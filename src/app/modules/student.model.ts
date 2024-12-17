import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from "./student/student.interface";
import { Schema, model } from "mongoose";

const UserNameSchema = new Schema<UserName>({
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
  },
});

const GuardianSchema = new Schema<Guardian>({
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

const LocalGuardianSchema = new Schema<LocalGuardian>({
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
  },
  address: {
    type: String,
    required: [true, "Local Guardian Address Is Required"],
  },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  name: {
    type: UserNameSchema,
    required: [true, "User Name Is Required"],
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
    required: true,
  },
});

export const StudentModel = model<Student>("Student", studentSchema);
