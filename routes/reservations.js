const express = require("express");
const router = express.Router();
const Reservation = require("../models/reservation");

// POST /api/reservations
router.post("/", async (req, res) => {
  const { userId, eventDate, numberOfGuests } = req.body;

  try {
    // Ensure the date is in the future and the number of guests is a positive number
    const currentDate = new Date();
    if (new Date(eventDate) <= currentDate || numberOfGuests <= 0) {
      return res.status(400).json({ error: "Invalid reservation criteria." });
    }

    // Create new reservation
    const newReservation = new Reservation({
      userId,
      eventDate,
      numberOfGuests,
    });
    await newReservation.save();
    res.status(201).json({
      reservation: newReservation,
      message: "Reservation created successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
