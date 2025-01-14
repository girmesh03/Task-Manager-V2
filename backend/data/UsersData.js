import mongoose from "mongoose";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

const users = [
  {
    firstName: "Girmachew",
    lastName: "Zewdie",
    position: "Chief Engineer",
    email: "girmazewdei38@gmail.com",
    password: "12345",
    role: "admin",
  },
  {
    firstName: "Terefe",
    lastName: "Wubetu",
    position: "Electrician",
    email: "terefe@example.com",
    password: "12345",
  },
  {
    firstName: "Bisrat",
    lastName: "Wendafirash",
    position: "Electrician",
    email: "bisrat@example.com",
    password: "12345",
  },
  {
    firstName: "Jafar",
    lastName: "Mensur",
    position: "Electrician",
    email: "jafar@example.com",
    password: "12345",
  },
  {
    firstName: "Firesenbet",
    lastName: "Debebe",
    position: "Electrician",
    email: "firesenbet@example.com",
    password: "12345",
  },
  {
    firstName: "Eyob",
    lastName: "Chubud",
    position: "HVAC Technician",
    email: "eyob@example.com",
    password: "12345",
  },
  {
    firstName: "Yohanes",
    lastName: "Yeshitila",
    position: "Plumber",
    email: "yohanes@example.com",
    password: "12345",
  },
  {
    firstName: "Misael",
    lastName: "Teshome",
    position: "Plumber",
    email: "misael@example.com",
    password: "12345",
  },
  {
    firstName: "Zerihun",
    lastName: "Sorsa",
    position: "Plumber",
    email: "zerihun@example.com",
    password: "12345",
  },
  {
    firstName: "Yasin",
    lastName: "Admasu",
    position: "Painter",
    email: "yasin@example.com",
    password: "12345",
  },
  {
    firstName: "Giduma",
    lastName: "Turi Beyene",
    position: "Painter",
    email: "giduma@example.com",
    password: "12345",
  },
  {
    firstName: "Sisay",
    lastName: "Lema Ligaba",
    position: "Painter",
    email: "sisay@example.com",
    password: "12345",
  },
  {
    firstName: "Wakuma",
    lastName: "chimidi Negera",
    position: "Painter",
    email: "wakuma@example.com",
    password: "12345",
  },
  {
    firstName: "Henock",
    lastName: "Tsegaye",
    position: "General Mechanic",
    email: "henock@example.com",
    password: "12345",
  },
  {
    firstName: "Bekele",
    lastName: "Chala",
    position: "Wood Work Technician",
    email: "bekele@example.com",
    password: "12345",
  },
  {
    firstName: "Demisse",
    lastName: "Kebede",
    position: "Civil Work Technician",
    email: "demisse@example.com",
    password: "12345",
  },
  {
    firstName: "Feyesa",
    lastName: "Daba Hunduma",
    position: "Lift Attendant",
    email: "feyesa@example.com",
    password: "12345",
  },
];

const insertManyUsers = async () => {
  try {
    // Hash passwords for all users
    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    await User.insertMany(hashedUsers);
    console.log("Users inserted successfully.");
  } catch (error) {
    console.error("Error inserting users:", error);
  }
};

// Function to delete all users
const deleteManyUsers = async () => {
  try {
    const result = await User.deleteMany({});
    console.log(`${result.deletedCount} users deleted successfully.`);
  } catch (error) {
    console.error("Error deleting users:", error);
  }
};

export { insertManyUsers, deleteManyUsers };
