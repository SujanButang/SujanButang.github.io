import bcrypt from "bcrypt";
import Users from "../models/User";
export const registerUser = async (username, password) => {
    const SALT = 10;
    const hashedPassword = bcrypt.hashSync(password, SALT);
    try {
        const newUser = await Users.create({
            username,
            password: hashedPassword,
        });
        return "New User Successfully created. 😁";
    }
    catch (error) {
        console.error("Error registering user:", error);
        throw error; // Re-throw the error so that it can be handled by the caller
    }
};
//# sourceMappingURL=AuthService.js.map