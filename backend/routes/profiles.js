const express = require('express');
const { check, validationResult } = require('express-validator');
const Profile = require('../models/Profile');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    console.error('Get profile error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/profile
// @desc    Create or update user profile
// @access  Private
router.post('/', [
  protect,
  [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills are required').not().isEmpty()
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { status, skills, bio, website, twitter, linkedin, github } = req.body;

  // Build profile object
  const profileFields = {
    user: req.user.id,
    status,
    skills: Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim()),
    bio,
    website,
    social: { twitter, linkedin, github }
  };

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // Update existing profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, runValidators: true }
      );
      return res.json(profile);
    }

    // Create new profile
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error('Profile save error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;