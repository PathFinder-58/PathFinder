import { query } from '../models/models.js'

const apiController = {};


/*INSERT INTO places (name, address)
VALUES ('Place Name', 'Place Address')
ON CONFLICT (address)
DO NOTHING;

INSERT INTO reviews (text, rating, place_id)
VALUES ('${text}', ${rating}, (SELECT place_id FROM places WHERE address = '${address}'));
*/

apiController.submitReview = async (req, res, next) => {
  console.log(req.body)
  console.log(query)
  try {
    const { reviewText, address, rating, name } = req.body;
    const queryString = `INSERT INTO places (name, address)
    VALUES ('Place Name', 'Place Address')
    ON CONFLICT (address)
    DO NOTHING;
    
    INSERT INTO reviews (text, rating, place_id)
    VALUES ('${text}', ${rating}, (SELECT place_id FROM places WHERE address = '${address}'));`

    const values = [reviewText];
    await query(queryString, values); 
    return next()
  } catch (error) {
    console.log('Error inserting review text', error);
    return next({
      log: 'Express error handler caught error in submitReview middleware',
      status: 400,
      message: { err: 'An error occurred in submitReview middleware' },
    });
  }
}

apiController.getReviews = async (req, res, next) => {
  console.log(req.body)
  try {
    const { address } = req.body;
    const queryString = `
    SELECT 
        places.name AS place_name,
        places.address AS place_address,
        reviews.text AS review_text,
        reviews.rating AS review_rating
    FROM 
        places
    JOIN 
        reviews ON places.place_id = reviews.place_id
    WHERE 
        places.address = '${address}';`
        await query(queryString); 
        return next()
  } catch (error) {
    console.log('Error getting review text', error);
    return next({
      log: 'Express error handler caught error in getReviews middleware',
      status: 400,
      message: { err: 'An error occurred in getReviews middleware' },
    });
  }
}



export default apiController