import { z } from "zod";

const UserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, "First Name is required")
    .refine(
      (value) => value.charAt(0) === value.charAt(0).toUpperCase(),
      "First Name must start with a capital letter"
    ),
  middleName: z.string().optional(), // Optional field
  lastName: z
    .string()
    .min(1, "Last Name is required")
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: "{VALUE} is not valid",
    }),
});

// Guardian schema
const GuardianValidationSchema = z.object({
  fatherName: z.string().min(1, "Father Name is required"),
  fatherOccupation: z.string().min(1, "Father Occupation is required"),
  fatherContactNo: z.string().min(1, "Father Contact Number is required"),
  motherName: z.string().min(1, "Mother Name is required"),
  motherOccupation: z.string().min(1, "Mother Occupation is required"),
  motherContactNo: z.string().min(1, "Mother Contact Number is required"),
});

// LocalGuardian schema
const LocalGuardianValidationSchema = z.object({
  name: z.string().min(1, "Local Guardian Name is required"),
  occupation: z.string().min(1, "Local Guardian Occupation is required"),
  contactNo: z
    .string()
    .min(1, "Local Guardian Contact Number is required")
    .max(15, "Local Guardian Contact Number cannot exceed 15 characters"),
  address: z.string().min(1, "Local Guardian Address is required"),
});

// Main Student schema
const StudentValidationSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: UserNameValidationSchema,
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z.string().optional(),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  contactNos: z
    .string().min(11, "Contact number is required"),
  emergencyContactNo: z.string().min(1, "Emergency Contact Number is required"),
  bloodGroup: z.enum(["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"], {
    invalid_type_error: `Blood Group must be one of: "A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"`,
  }),
  presentAddress: z.string().min(1, "Present Address is required"),
  permanentAddress: z.string().min(1, "Permanent Address is required"),
  guardian: GuardianValidationSchema,
  localGuardian: LocalGuardianValidationSchema,
  profileImage: z.string().optional(),
  isActive: z
    .enum(["active", "blocked"], {
      invalid_type_error: "Status must be 'active' or 'blocked'",
    })
    .default("active"),
});

export default StudentValidationSchema;
