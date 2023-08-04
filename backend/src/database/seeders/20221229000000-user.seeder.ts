import { QueryInterface } from "sequelize";
import bcrypt, { compareSync } from "bcrypt";
import { DataBaseTableNames } from "../constants";

export default {
  up: async(queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.bulkInsert(DataBaseTableNames.USER,
      [
        {
          username: 'jamessmith',
          email: 'jamessmith@gmail.com',
          password: await bcrypt.hash("12345678", 12),
          role: 1,
          dob: '1993-01-12',
          interest: JSON.stringify([1, 2]),
          profile: "upload/user/profile/1.jpg",
          highlight: "Professional Sound Engeering",
          address: "Arena di Verona",
          description: "One Man Show",
          status: "available",
          genre: JSON.stringify([1, 2]),
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          username: 'rosemary',
          email: 'rosemary@gmail.com',
          password: await bcrypt.hash("12345678", 12),
          role: 1,
          dob: '1993-12-12',
          interest: JSON.stringify([1, 2]),
          profile: "upload/user/profile/1.jpg",
          highlight: "Guitar@Band",
          address: "Rock Rooms Inc",
          description: "Guitar Skill",
          status: "available",
          genre: JSON.stringify([1, 2]),
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          username: 'john',
          email: 'john@gmail.com',
          password: await bcrypt.hash("12345678", 12),
          role: 2,
          dob: '1993-05-12',
          interest: JSON.stringify([1, 2]),
          profile: "upload/user/profile/1.jpg",
          highlight: "Music Band",
          address: "Wembley Stadium",
          description: "Rehearsal with Alessio",
          status: "available",
          genre: JSON.stringify([1, 2]),
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          username: 'jasmine',
          email: 'jasmine@gmail.com',
          password: await bcrypt.hash("12345678", 12),
          role: 2,
          dob: '1993-12-09',
          // interest: JSON.stringify([1, 2]),
          profile: "upload/user/profile/1.jpg",
          highlight: "Music Band",
          address: "Wembley Stadium",
          description: "Rehearsal with Alessio",
          status: "available",
          genre: JSON.stringify([1, 2]),
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          username: 'simon',
          email: 'simon@gmail.com',
          password: await bcrypt.hash("12345678", 12),
          // interest: [1, 2, 3],
          dob: '1995-01-12',
          role: 2,
          profile: "upload/user/profile/1.jpg",
          highlight: "Music Band",
          address: "Wembley Stadium",
          description: "Rehearsal with Alessio",
          status: "available",
          genre: JSON.stringify([1, 2]),
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          username: 'barry',
          email: 'barry@gmail.com',
          password: await bcrypt.hash("12345678", 12),
          role: 2,
          dob: '1997-12-12',
          // interest: [1, 2, 3],
          profile: "upload/user/profile/1.jpg",
          highlight: "Music Band",
          address: "Wembley Stadium",
          description: "Rehearsal with Alessio",
          status: "available",
          genre: JSON.stringify([1, 2]),
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
        {
          username: 'lili',
          email: 'lili@gmail.com',
          password: await bcrypt.hash("12345678", 12),
          role: 1,
          dob: '1997-12-12',
          // interest: [1, 2, 3],
          profile: "upload/user/profile/1.jpg",
          highlight: "Music Band",
          address: "Wembley Stadium",
          description: "Rehearsal with Alessio",
          status: "available",
          genre: JSON.stringify([1, 2]),
          createdAt: '2023-07-11',
          updatedAt: '2023-07-11'
        },
      ], {});
  },
  down: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.bulkDelete(DataBaseTableNames.USER, {}, {});
  }
}