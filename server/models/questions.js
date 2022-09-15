const db = require('../database');

module.exports = {
  getQuestionsModel: (err) => {
    return pool.query(`
      SELECT *
      FROM questions
      WHERE reported != 1;
      `)
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