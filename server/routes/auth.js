
const express = require('express');

const {
  register,
  login,
  getMe,
  getManagerData,
  getAdminData,
} = require('../controllers/authController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/me', protect, getMe);

router.get(
  '/manager',
  protect,
  authorize('manager', 'admin'),
  getManagerData
);

router.get(
  '/admin',
  protect,
  authorize('admin'),
  getAdminData
);

module.exports = router;
