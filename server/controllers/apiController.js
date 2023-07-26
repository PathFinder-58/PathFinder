import { query } from '../models/models.js'

const apiController = {};

apiController.getPlaceInfo = async (req, res, next) => {
  try {
    const { address } = req.body;
    const string = `SELECT * FROM places WHERE address = '${address}'`
  } catch (error) {
    return next({
      log: 'Express error handler caught error in getPlaceInfo middleware',
      status: 400,
      message: { err: 'An error occurred in getPlaceInfo middleware' },
    })
  }
}

apiController.submitReview = async (req, res, next) => {
  console.log(req.body)
  console.log(query)
  try {
    const { reviewText } = req.body;
    const queryString = `INSERT INTO reviews (reviews) VALUES($1)`
    const values = [reviewText];
    await query(queryString, values);
  } catch (error) {
    console.log('Error inserting review text', error);
  }
}

export default apiController