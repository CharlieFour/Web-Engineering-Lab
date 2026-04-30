const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// @route   POST /feedback
// @desc    Submit new feedback
router.post('/feedback', async (req, res) => {
  try {
    const { studentName, subject, rating, comments } = req.body;
    
    const newFeedback = new Feedback({
      studentName,
      subject,
      rating,
      comments
    });

    const savedFeedback = await newFeedback.save();
    res.status(201).json({ success: true, data: savedFeedback });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    }
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   GET /feedbacks
// @desc    Get all feedbacks (with optional pagination)
router.get('/feedbacks', async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const feedbacks = await Feedback.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await Feedback.countDocuments();

    res.status(200).json({
      success: true,
      count: feedbacks.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: feedbacks
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   GET /feedbacks/:subject
// @desc    Get feedbacks by subject
router.get('/feedbacks/:subject', async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    
    // Use regex for case-insensitive matching if desired, but we'll use exact match or regex
    const subjectQuery = { subject: { $regex: new RegExp(`^${req.params.subject}$`, 'i') } };

    const feedbacks = await Feedback.find(subjectQuery).sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await Feedback.countDocuments(subjectQuery);

    res.status(200).json({
      success: true,
      count: feedbacks.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: feedbacks
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

module.exports = router;
