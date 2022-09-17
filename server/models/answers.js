const {pool} = require('../database');

module.exports = {
  //TODO
  getAnswersModel: (err) => {
    return pool.query(`
      SELECT *
      FROM answers
      WHERE reported != 1;
      `)
    },


  //TODO
  postAnswersModel: (params) => {
    return  pool.query(`
      INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email)
      VALUES (?, ?, ?, ?, ?);`,
      params
      )
    },

  helpfulAnswersModel: (params) => {
    const query = {
      text: `
        UPDATE answers
        SET helpfulness = helpfulness + 1
        WHERE id=${params.id};
      `
    }
    return pool.query(query);
  },

  reportAnswersModel: (params) => {
    const query = {
      text: `
        UPDATE answers
        SET reported=TRUE
        WHERE id=${params.id} AND reported=FALSE;
      `
    }
    return pool.query(query);
  }
}