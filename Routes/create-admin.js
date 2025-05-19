const express = require("express");
const bcrypt = require("bcryptjs");
const { Admins } = require("../Models/admin");
const router = express.Router();

router.post("/create-admin", async (req, res) => {
    try {
        const { firstName, lastName, address, phoneNo, email, password } = req.body;

        const existing = await Admins.findOne({ email });
        if (existing) return res.status(400).send("Admin with this email already exists");

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new Admins({
            firstName,
            lastName,
            address,
            phoneNo,
            email,
            password: hashedPassword
        });

        await admin.save();
        res.status(201).send("Admin created successfully");
    } catch (err) {
        console.error("Error creating admin:", err);
        res.status(500).send("Server error");
    }
});

module.exports = router;
