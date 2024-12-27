import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import { z } from "zod";
import StudentValidationSchema from "./student.validation";
// import Joi from "joi";
// import { StudentValidationSchema } from "./student.validation";

const createStudent = async (req: Request, res: Response) => {
  try {
    // creating a schema validation using joi

    const { student: studentData } = req.body;
    // creating a schema validation using Zod...
    const zodParseData = StudentValidationSchema.parse(studentData);

    // data validation using Joi
    // const { error, value } = StudentValidationSchema.validate(studentData);

    const result = await StudentServices.createStudentIntoDB(zodParseData);

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: "Something went wrong",
    //     error: error.details,
    //   });
    // }

    res.status(200).json({
      success: true,
      message: "Student is create successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "Students are retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: "Single Student data retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: "Student data Deleted successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
