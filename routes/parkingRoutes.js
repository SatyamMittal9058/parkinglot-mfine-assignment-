const express=require('express');
const router=express.Router();
const ParkingDataBase=require('../models/parkingmodel');

// 1. Create new parking Lot with capacity
router.post('/parking/create', async (req, res) => {
    try {
      const { capacity } = req.body;
  
    //   Create parking slots that is given in api contract that is 2000 but I make it dynamic
      const parkingSlots = Array.from({ length: capacity }, (_, index) => ({
        slot: index + 1,
        regNumber: '',
        color: '',
      }));
  
      const result = await ParkingDataBase.create(parkingSlots);
      res.status(200).json({ message: 'Parking DataBase created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error' });
    }
  });
//   2. Park car in the parking
  router.post('/parking/park', async (req, res) => {
    try {
      const { regNumber, color } = req.body;
      const result = await ParkingDataBase.findOneAndUpdate(
        { regNumber: '' },
        { regNumber, color },
        { new: true }
      );
      console.log(result);
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error' });
    }
  });
//   3. Leave / Unpark car
  
  router.post('/parking/unpark', async (req, res) => {
    try {
      const { regNumber } = req.body;
      await ParkingDataBase.findOneAndUpdate(
        { regNumber },
        { regNumber: '', color: '' },
        { new: true }
      );
      res.status(200).json({ message: 'Parking space is empty' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error' });
    }
  });
//   4. Registration number of cars with <colour>

  router.get('/parking/regnumberwithcolor/:color', async (req, res) => {
    try {
      const { color } = req.params;
      const result = await ParkingDataBase.find({ color }, 'regNumber');
      console.log(result);
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error' });
    }
  });
//   5. Slot numbers for car with <colour></colour>
  router.get('/parking/slotforcarwithcolor/:color', async (req, res) => {
    try {
      const { color } = req.params;
      const result = await ParkingDataBase.find({ color }, 'slot');
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error' });
    }
  });
  module.exports =router;