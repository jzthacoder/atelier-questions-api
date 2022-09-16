const {pool} = require('../database');

module.exports = {
  getQuestionsModel: (product_id) => {
    console.log('here is product id: ', product_id)
    const query= {
      text: `
        SELECT *
        FROM questions
        WHERE product_id=$1 AND reported != 1;
      `,
      values: ["1"]
    }
    return pool.query(query);
    },

  postQuestionsModel: (params) => {
    return  pool.query(`
      INSERT INTO questions (product_id, body, date_written, asker_name, asker_email)
      VALUES (?, ?, ?, ?, ?);`,
      params
      )
    },

  helpfulQuestionsModel: (question_id) => {
    return pool.query(`
    UPDATE questions
    SET helpful = helpful + 1
    WHERE id = ?`,
    question_id
    )
  },

  reportQuestionsModel: (question_id) => {
    return pool.query(`
    UPDATE questions
    SET report = 1
    WHERE id = ?;`,
    question_id
    )
  }
}