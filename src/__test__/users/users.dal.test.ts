// import { getUserByEmail } from "../../api/users/users.dal";
// import {test, expect, describe, beforeAll, afterAll} from 'vitest'
// import { connectToMongoDB } from "../../dataAccess/mongooseConnection";

// // Connect to MongoDB before running tests
// beforeAll(async () => {
//   await connectToMongoDB();
// });




// describe('getUserByEmail', () => {
//     // Assuming a user with the given email exists in the test database
//     test('should return a user when email exists', async () => {
//       const userEmail = 'wpppkkEmail33@gmail.com'; // Replace with an existing user email
//       const user = await getUserByEmail(userEmail);
//       expect(user).not.toBe(undefined);
//       expect(user?.email).toBe(userEmail);
//     });
  
//     // Assuming a user with the given email does not exist in the test database
//     test('should return undefined when email does not exist', async () => {
//       const userEmail = 'nonexistent@example.com'; // Replace with a non-existing user email
//       const user = await getUserByEmail(userEmail);
//       expect(user).toBe(undefined);
//     });
//   });