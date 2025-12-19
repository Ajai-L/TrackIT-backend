const express = require('express');
const { getProfile, updateProfile, getAllUsers } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getProfile);
router.put('/', protect, updateProfile);
router.get('/all-users', protect, getAllUsers);

module.exports = router;
