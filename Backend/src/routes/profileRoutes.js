const express = require('express');
const ProfileController = require('../controllers/ProfileController');
const auth = require('../middleware/auth');
const upload = require('../middleware/multerConfig');
const router = express.Router();

router.get('/', auth, ProfileController.getUserProfile);
router.post('/update', auth, upload.single('profilePhoto'), ProfileController.updateUserProfile);

module.exports = router;
