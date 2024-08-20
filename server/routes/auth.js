const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');

// Existing register and login routes...

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
  }
);

// Facebook OAuth routes
router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
  }
);

module.exports = router;
