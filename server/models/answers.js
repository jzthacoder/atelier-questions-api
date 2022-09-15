const db = require('../database');

module.exports = {
  getAnswersModel: (err) => {
    return pool.query(`
      SELECT *
      FROM answers
      WHERE reported != 1;
      `)
    },

  postAnswersModel: (params) => {
    return  pool.query(`
      INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email)
      VALUES (?, ?, ?, ?, ?);`,
      params
      )
    },

  helpfulAnswersModel: (answer_id) => {
    return pool.query(`
    UPDATE answers
    SET helpful = helpful + 1
    WHERE id = ?;`,
    answer_id
    )
  },

  reportAnswersModel: (answer_id) => {
    return pool.query(`
    UPDATE answers
    SET report = 1
    WHERE id = ?;`,
    answer_id
    )
  }
}