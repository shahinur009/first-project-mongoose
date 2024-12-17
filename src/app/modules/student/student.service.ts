import { StudentModel } from "../student.model";
import { Student } from "./student.interface";

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentsFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

const getSingleStudentFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
