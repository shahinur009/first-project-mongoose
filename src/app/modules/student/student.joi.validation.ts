import Joi from "joi";

const UserNameValidationSchema = Joi.object({
    firstName: Joi.string().required().messages({
      "any.required": "First Name is required",
    }),
    middleName: Joi.string().allow(""), // Optional field
    lastName: Joi.string()
      .required()
      .regex(/^[A-Za-z]+$/)
      .messages({
        "any.required": "Last Name is required",
        "string.pattern.base": "{#value} is not valid",
      }),
  });

  const GuardianValidationSchema = Joi.object({
    fatherName: Joi.string().required().messages({
      "any.required": "Father Name is required",
    }),
    fatherOccupation: Joi.string().required().messages({
      "any.required": "Father Occupation is required",
    }),
    fatherContactNo: Joi.string().required().messages({
      "any.required": "Father Contact Number is required",
    }),
    motherName: Joi.string().required().messages({
      "any.required": "Mother Name is required",
    }),
    motherOccupation: Joi.string().required().messages({
      "any.required": "Mother Occupation is required",
    }),
    motherContactNo: Joi.string().required().messages({
      "any.required": "Mother Contact Number is required",
    }),
  });

  const LocalGuardianValidationSchema = Joi.object({
    name: Joi.string().required().messages({
      "any.required": "Local Guardian is required",
    }),
    occupation: Joi.string().required().messages({
      "any.required": "Local Guardian Occupation is required",
    }),
    contactNo: Joi.string().required().max(15).messages({
      "any.required": "Local Guardian Contact Number is required",
      "string.max":
        "Local Guardian Contact Number cannot be more than 15 characters",
    }),
    address: Joi.string().required().messages({
      "any.required": "Local Guardian Address is required",
    }),
  });

  const StudentValidationSchema = Joi.object({
    id: Joi.string().required().messages({
      "any.required": "ID is required",
    }),
    name: UserNameValidationSchema.required().messages({
      "any.required": "User Name is required",
    }),
    gender: Joi.string()
      .valid("male", "female", "other")
      .required()
      .messages({
        "any.required": "Gender is required",
        "any.only": `Gender must be one of: "male", "female", "other"`,
      }),
    dateOfBirth: Joi.string().optional(),
    email: Joi.string().email().required().messages({
      "any.required": "Email is required",
      "string.email": "Invalid email format",
    }),
    contactNos: Joi.string().required().max(15).messages({
      "any.required": "Contact Number is required",
      "string.max": "Contact Number cannot be more than 15 characters",
    }),
    emergencyContactNo: Joi.string().required().messages({
      "any.required": "Emergency Contact Number is required",
    }),
    bloodGroup: Joi.string()
      .valid("A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-")
      .required()
      .messages({
        "any.required": "Blood Group is required",
        "any.only": `Blood Group must be one of: "A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"`,
      }),
    presentAddress: Joi.string().required().messages({
      "any.required": "Present Address is required",
    }),
    permanentAddress: Joi.string().required().messages({
      "any.required": "Permanent Address is required",
    }),
    guardian: GuardianValidationSchema.required().messages({
      "any.required": "Guardian information is required",
    }),
    localGuardian: LocalGuardianValidationSchema.required().messages({
      "any.required": "Local Guardian information is required",
    }),
    profileImage: Joi.string().uri().optional(),
    isActive: Joi.string()
      .valid("active", "blocked")
      .default("active")
      .required()
      .messages({
        "any.required": "Status is required",
        "any.only": "Status must be one of: 'active', 'blocked'",
      }),
  });

  export {  StudentValidationSchema };