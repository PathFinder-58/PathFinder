const db = require('../models/models')

const apiController = {};

apiController.getPlaceInfo = async (req, res, next) => {
  try {
    const { address } = req.body;
    const string = `SELECT * FROM places WHERE address = '${address}'`
  } catch (error) {
    return next({
      log: 'Express error handler caught error in getAllUsers middleware',
      status: 400,
      message: { err: 'An error occurred in getAllUsers middleware' },
    })
  }
}

export default apiController