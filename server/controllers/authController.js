
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const ROLES = ['user', 'manager', 'admin'];

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

const userPayload = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

const listPayload = (user) => ({
  ...userPayload(user),
  createdAt: user.createdAt,
});

const sendAuth = (res, status, user) =>
  res.status(status).json({
    success: true,
    token: signToken(user._id),
    user: userPayload(user),
  });

// POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const requestedRole = ROLES.includes(role) ? role : 'user';

    if (
      requestedRole === 'admin' &&
      process.env.ALLOW_ADMIN_SIGNUP === 'false'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Admin registration is disabled',
      });
    }

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered',
      });
    }

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: requestedRole,
    });

    return sendAuth(res, 201, user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const message = Object.values(error.errors)
        .map((item) => item.message)
        .join(', ');

      return res.status(400).json({
        success: false,
        message,
      });
    }

    console.error('Register error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    return sendAuth(res, 200, user);
  } catch (error) {
    console.error('Login error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// GET /api/auth/me

exports.getMe = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: {
      ...userPayload(req.user),
      createdAt: req.user.createdAt,
    },
  });
};

// GET /api/auth/manager

exports.getManagerData = async (req, res) => {
  try {
    const managers = await User.find({
      role: 'manager',
    })
      .select('name email role createdAt')
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: managers.length,
      managers,
    });
  } catch (error) {
    console.error('Manager data error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to load manager data',
    });
  }
};

// GET /api/auth/admin

exports.getAdminData = async (req, res) => {
  try {
    const users = await User.find()
      .sort({ createdAt: -1 })
      .lean();

    const stats = {
      total: users.length,
      user: 0,
      manager: 0,
      admin: 0,
    };

    users.forEach((user) => {
      if (Object.prototype.hasOwnProperty.call(stats, user.role)) {
        stats[user.role] += 1;
      }
    });

    return res.status(200).json({
      success: true,
      stats,
      users: users.map(listPayload),
    });
  } catch (error) {
    console.error('Admin data error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to load admin data',
    });
  }
};
