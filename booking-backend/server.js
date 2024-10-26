const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

// Initialize app
const app = express();
app.use(cors());


app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Create Appointment Schema
const appointmentSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    date: String,
    time: String
   
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

// API endpoint to book appointment
app.post('/appointments', async (req, res) => {
    const { name, email, phone, date, time } = req.body;
    const newAppointment = new Appointment({ name, email, phone, date, time });

    try {
        await newAppointment.save();
        res.status(201).json({ message: 'Appointment booked successfully' });
    } catch (error) {
        console.error('Error saving appointment:', error); 
        res.status(400).json({ error: error.message });
    }
});

// for local machine

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


