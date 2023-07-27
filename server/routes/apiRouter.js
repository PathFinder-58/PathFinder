import express from 'express';
import apiController from '../controllers/apiController.js';

const apiRouter = express.Router();

// router.post('/signup', loginController.signUp, (req, res) => {
//   res.status(201).json({ msg: 'Hey you signed up' });
// });

// apiRouter.post('/login', loginController.login, (req, res) => {
//   res.status(200).json(res.locals.user);
// });

// apiRouter.get('/home')

apiRouter.post('/submitReview', apiController.submitReview, (req, res) => {
  res.status(201).json({msg: 'Review successfully submitted' });
})

apiRouter.post('/getReviews', apiController.getReviews, (req, res) => {
  res.status(200).json({ msg: 'Reviews got got.'})
})

export default apiRouter;