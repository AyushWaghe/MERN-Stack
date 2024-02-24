
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

import Student from './mongoose.js';

async function migratePasswords() {
    try {
        // Connect to MongoDB
        const DB = 'mongodb+srv://siddharajvk:J57243kSiPZBxY2q@mern.j4bhowe.mongodb.net/users?retryWrites=true&w=majority'
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex:true,
            // useFindAndModify: false,
        }).then(() => {
            console.log("Connected to db")
        }).catch((err) => console.log(err));

        // Retrieve all users
        const users = await Student.find();

        
        for (const user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the password
            user.password = hashedPassword; 
            await user.save(); // Save the updated user record
        }

        console.log('Migration completed successfully');
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        console.log('Migration completed successfully');
    }
}

migratePasswords();
