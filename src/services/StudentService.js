import prisma from "../config/prisma.js"

  
class StudentService{

    static async checkEmail(email, id = null) {
        try {
          if (id) {
            const student = await prisma.student.findMany({
              where: {
                email: email,
                id: {
                  not: id,
                },
              },
              select: {
                id: true,
                email: true,
              },
            });
            return student
          } else {
            const result = await prisma.student.findFirst({ where: { email } });
            return result ? true : false;
          }
        } catch (error) {
          throw error;
        }
      }

    static async getStudent() {
        try {
          const students = await prisma.student.findMany();
          return students;
        } catch (error) {
          throw error;
        }
    }

    static async createStudent(
        fullName,
        phoneNumber,
        email,
        address,
        tutor
      ) {
        try {
    
          const newStudent = await prisma.student.create({
            data: {
              fullName: fullName,
              phoneNumber: phoneNumber,
              email: email,
              address:address,
              tutor: tutor
            },
          });
          return newStudent;
        } catch (error) {
          throw error;
        }
    }


    static async updateStudent(
        id,
        fullName,
        phoneNumber,
        email,
        address,
        tutor
      ) {
        try {
          const updatedStudent = await prisma.student.update({
            where: {
              id: id,
            },
            data: {
                fullName : fullName,
                phoneNumber :phoneNumber,
                email : email,
                address : address,
                tutor : tutor
            },
          });
    
          return updatedStudent;
        } catch (error) {
          throw error;
        }
    }
    static async deletStudent(id) {
        try {
          const student = await prisma.student.delete({
            where: { id: id },
          });
          return student;
        } catch (error) {
          throw error;
        }
      }
}
export default StudentService