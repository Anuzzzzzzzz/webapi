const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

// POST /api/users
router.post("/", async (req, res) => {
  const { name, phone, email } = req.body;

  try {
    // Check if all fields are provided
    if (!name || !phone || !email) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if phone number already exists
    const existingContact = await Contact.findOne({ phone });
    if (existingContact) {
      return res.status(400).json({ error: "Phone number already exists." });
    }

    // Create new contact
    const newContact = new Contact({ name, phone, email });
    await newContact.save();
    res
      .status(201)
      .json({ contact: newContact, message: "Contact created successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
