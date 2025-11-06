// import Company from "../models/Company.js";
// import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/pg-db.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName, companyEmail, name, email, password } = req.body;
        const logo = req.file ? `/public/uploads/company_logos/${req.file.filename}` : null;

        const existingCompany = await Company.findOne({ email: companyEmail });
        if (existingCompany)
        return res.status(400).json({ message: "Company already registered" });

        const existingUser = await User.findOne({ email });
        if (existingUser)
        return res.status(400).json({ message: "User already exists" });

        const company = await Company.create({
            name: companyName,
            email: companyEmail,
            logo,
        });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            hashedPassword,
            companyId: company._id,
            role: 2,
        });

        return res.status(201).json({
            success: true,
            message: "Company registered successfully",
            data: {
                company,
                admin: user,
            },
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = (await pool.query("SELECT * FROM users WHERE email = $1", [email])).rows[0];
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1d",
            }
        );

        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role,
            },
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
