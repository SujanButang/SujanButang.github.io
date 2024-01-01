import { registerUser } from "../services/AuthService";
export const handleRegisterUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = await registerUser(username, password);
        res.status(200).json(newUser);
    }
    catch (error) {
        console.error("Error in controller:", error);
        res.status(500).send("Internal Server Error");
    }
};
//# sourceMappingURL=AuthController.js.map