import express from 'express';
import loginController from '../controllers/loginController'

const apiRouter = express.Router();

router.post('/signup', loginController.signUp, (req, res) => {
  res.status(201).json({ msg: 'Hey you signed up' });
});

apiRouter.post('/login', loginController.login, (req, res) => {
  res.status(200).json(res.locals.user);
});

apiRouter.get('/home')

apiRouter.post('/search', apiController.getPlaceInfo, (req, res) => {
  res.status(200).json({ msg: 'Search Successful'})
})

apiRouter.post('/submitReview')

apiRouter.post('/checkReview')

export default apiRouter;