const db = require('../models/binarybond');

const loginController = {};

/////////////
// SIGN UP //
loginController.signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const string = `INSERT INTO users (username, password, email) VALUES ('${username}', '${password}', '${email}')`;
    const response = await db.query(string);
    console.log(response)
    return next();
  } catch (error) {
    next({
      log: 'Express error handler caught error in signup middleware',
      status: 400,
      message: { err: 'An error occurred in signup middleware' },
    });
  }
};

///////////
// LOGIN //
// SELECT * FROM users WHERE email = 'emailString' AND password = 'passwordString'
loginController.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const string = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
    const response = await db.query(string);
    // console.log('i am req.body',req.body)
    // console.log('i am response.rows[0]',response.rows[0])
    if (email !== response.rows[0].email && password !== response.rows[0].password) {
      return next({
        log: `Username or password does not match, ${error}`,
        status: 400,
        message: { err: `Username or password does not match: ${error}` },
      })
    }
    res.locals.user = response.rows[0];
    return next();
  } catch (error) {
    next({
      log: `Error in loginController.login middleware, ${error}`,
      status: 400,
      message: { err: `Error in loginController.login middleware ${error}` },
    });
  }
};
