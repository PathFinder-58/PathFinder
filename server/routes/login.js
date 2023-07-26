const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');


// route to signUp middleware upon receiving post request to /api
router.post('/', loginController.signUp, (req, res) => {
  res.status(201).json({ msg: 'Hey you signed up' });
});

// route to login middleware upon receiving get request to /api
router.post('/login', loginController.login, (req, res) => {
  res.status(200).json(res.locals.user);
});

module.exports = router;