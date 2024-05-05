// appointments.js

const express = require("express");
const router = express.Router();

// POST /api/book-appointment
router.post("/", (req, res) => {
  const { date, time } = req.body;

  try {
    // Verify that the date and time fields are present and formatted correctly
    if (
      !date ||
      !time ||
      !isValidDateFormat(date) ||
      !isValidTimeFormat(time)
    ) {
      return res.status(400).json({ error: "Invalid date or time format." });
    }

    // Check Availability
    if (time === "15:00") {
      return res.status(400).json({ error: "The time slot is unavailable." });
    }

    // Confirm Booking
    res.status(200).json({ message: "Appointment booked successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Function to validate date format
function isValidDateFormat(date) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(date);
}

// Function to validate time format
function isValidTimeFormat(time) {
  const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
  return regex.test(time);
}

module.exports = router;
