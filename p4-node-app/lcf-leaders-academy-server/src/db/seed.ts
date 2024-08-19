import { env } from "../env";
import mongoose from "mongoose";
import { User, UserModel } from "../models/schemas/user.schema";
import {
  CourseCode,
  CourseCodeModel,
} from "../models/schemas/courseCode.schema";
import { Course, CourseModel } from "../models/schemas/course.schema";
import { PrerequisiteModel } from "../models/schemas/prerequisite.schema";
import { SectionModel } from "../models/schemas/section.schema";
import { SemesterModel } from "../models/schemas/semester.schema";
import { CourseOfferingModel } from "../models/schemas/courseOffering.schema";
import bcrypt from "bcrypt";
import { UserStatusEnum } from "../models/enums/UserStatusEnum";
import { RoleEnum } from "../models/enums/RoleEnum";
import { EnrollmentModel } from "../models/schemas/enrollment.schema";
import { TransactionModel } from "../models/schemas/transaction.schema";

// Connect to MongoDB
mongoose.connect(env.DEV_DATABASE_URL);

const seedDatabase = async () => {
  try {
    // Clear existing data
    await UserModel.deleteMany({});
    await CourseCodeModel.deleteMany({});
    await CourseModel.deleteMany({});
    await PrerequisiteModel.deleteMany({});
    await SectionModel.deleteMany({});
    await SemesterModel.deleteMany({});
    await CourseOfferingModel.deleteMany({});
    await EnrollmentModel.deleteMany({});
    await TransactionModel.deleteMany({});

    // Create Users
    const testPassword = await bcrypt.hash("password", 10);
    const user1: User = await UserModel.create({
      firstName: "Lathur",
      lastName: "Badoy",
      email: "tlabrador@mensaphilippines.org",
      password: testPassword,
      isPrimary: true,
      isLeader: true,
      status: UserStatusEnum.ACTIVE,
      isEarlyAdopter: true,
      role: RoleEnum.ADMIN,
    });

    const section = await SectionModel.create({
      name: "Davao City",
      headID: user1._id,
      address: {
        addressLineOne: "Cinema 6, NCCC Victoria Plaza",
        addressLineTwo: "J.P. Laurel Ave., Bajada",
        city: "Davao City",
        state: "Davao del Sur",
        zipCode: "8000",
        country: "Philippines",
      },
    });

    // Update User with sectionID
    user1.sectionID = section._id;
    await user1.save();

    const user2: User = await UserModel.create({
      firstName: "Thony Danielle",
      lastName: "Labrador",
      email: "thonydaniellelabrador@gmail.com",
      password: testPassword,
      sectionID: section._id,
      isPrimary: true,
      isLeader: true,
      leaderID: user1._id,
      status: UserStatusEnum.ACTIVE,
      isEarlyAdopter: true,
      role: RoleEnum.SUPER_ADMIN,
      createdBy: user1._id,
    });
    await user2.save();

    const user3: User = await UserModel.create({
      firstName: "Milo",
      lastName: "Somera",
      email: "milo.somera@gmail.com",
      password: testPassword,
      sectionID: section._id,
      isPrimary: false,
      isLeader: false,
      leaderID: user2._id,
      status: UserStatusEnum.ACTIVE,
      isEarlyAdopter: false,
      role: RoleEnum.USER,
      createdBy: user2._id,
    });
    await user3.save();

    // Create Course Codes
    const courseCodes: CourseCode[] = await CourseCodeModel.insertMany([
      {
        code: "LA210",
        name: "Leaders Academy - Level 1",
        createdBy: user2._id,
      },
      {
        code: "LA220",
        name: "Leaders Academy - Level 2",
        createdBy: user2._id,
      },
      {
        code: "LA230",
        name: "Leaders Academy - Level 3",
        createdBy: user2._id,
      },
    ]);

    // Create Prerequisites
    await PrerequisiteModel.insertMany([
      {
        courseCodeID: courseCodes[0]._id,
        prerequisiteCourseCodeID: courseCodes[1]._id,
        createdBy: user2._id,
      },
      {
        courseCodeID: courseCodes[1]._id,
        prerequisiteCourseCodeID: courseCodes[2]._id,
        createdBy: user2._id,
      },
    ]);

    // Create Courses
    const course1: Course = await CourseModel.create({
      courseCodeID: courseCodes[0]._id,
      name: "Leaders Academy Level 1",
      description:
        "This is the first course in the Leaders Academy series. This introduces students to the understanding of their redemption in Christ and the principles of a Christian families.",
      credits: 1,
      codeVersion: 1,
      effectiveFrom: new Date("2024-01-01"),
    });
    const course2: Course = await CourseModel.create({
      name: "Leaders Academy Level 2",
      courseCodeID: courseCodes[1]._id,
      description:
        "This is the second course in the Leaders Academy series. This course teaches students the principles of Christian leadership and building a prayer life.",
      credits: 1,
      codeVersion: 2,
      effectiveFrom: new Date("2024-01-01"),
    });
    const course3: Course = await CourseModel.create({
      name: "Leaders Academy Level 3",
      courseCodeID: courseCodes[2]._id,
      description:
        "This is the third course in the Leaders Academy series. This course provides students with the tools to raise up leaders and build a strong church.",
      credits: 1,
      codeVersion: 3,
      effectiveFrom: new Date("2024-01-01"),
    });

    // Create Semester
    const semester = await SemesterModel.create({
      name: "Fall 2024",
      startDate: new Date("2024-08-15"),
      endDate: new Date("2024-12-15"),
      registrationStartDate: new Date("2024-07-01"),
      registrationEndDate: new Date("2024-08-15"),
    });

    // Create Course Offering
    await CourseOfferingModel.create({
      courseID: course1._id,
      semesterID: semester._id,
      classSchedules: ["0 15 * * SAT 150"], // 3:00 PM every Saturday for 2.5 hours
      location: {
        addressLineOne: "Cinema 2, NCCC Victoria Plaza",
        city: "Davao City",
        state: "Davao del Sur",
        zipCode: "8000",
        country: "Philippines",
      },
      price: 300,
      maxStudents: 250,
      coordinatorID: user1._id,
      createdBy: user2._id,
    });

    await CourseOfferingModel.create({
      courseID: course2._id,
      semesterID: semester._id,
      classSchedules: ["0 15 * * SUN 150"], // 3:00 PM every Sunday for 2.5 hours
      location: {
        addressLineOne: "Cinema 2, NCCC Victoria Plaza",
        city: "Davao City",
        state: "Davao del Sur",
        zipCode: "8000",
        country: "Philippines",
      },
      price: 350,
      maxStudents: 250,
      coordinatorID: user1._id,
      createdBy: user2._id,
    });

    await CourseOfferingModel.create({
      courseID: course3._id,
      semesterID: semester._id,
      classSchedules: ["0 15 * * WED 150"], // 3:00 PM every Wednesday for 2.5 hours
      location: {
        addressLineOne: "Cinema 2, NCCC Victoria Plaza",
        city: "Davao City",
        state: "Davao del Sur",
        zipCode: "8000",
        country: "Philippines",
      },
      price: 400,
      maxStudents: 150,
      coordinatorID: user1._id,
      createdBy: user2._id,
    });

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
