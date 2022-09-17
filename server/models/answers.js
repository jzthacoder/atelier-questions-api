const {pool} = require('../database');

module.exports = {
  getAnswersModel: (params) => {
    const query = {
      text: `
        SELECT id, body, date, answerer_name, helpfulness,
        (
          SELECT array_agg(json_build_object('answer_id', id, 'url', url))
          FROM answers_photos
          WHERE answers_photos.answer_id = a.id
        ) as photos
        FROM answers a
        WHERE question_id=${params.question_id}
      `,
    }
    return pool.query(query);
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