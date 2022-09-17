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


  postAnswersModel: (params) => {
    console.log('in models here are params: ', params)
    const query = {
      text: `
        INSERT INTO answers (body, answerer_name, answerer_email, question_id, date, reported)
        VALUES ($1, $2, $3, $4, NOW(), false)
        ;
      `,
      values: [params.body, params.name, params.email, params.question_id]
    }
    return pool.query(query);
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