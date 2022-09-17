const {pool} = require('../database');

module.exports = {
  // getQuestionsModel: (product_id) => {
  //   console.log('here is product id: ', product_id)
  //   const query= {
  //     text: `
  //       SELECT *
  //       FROM questions
  //       WHERE product_id=$1 AND reported != 1;
  //     `,
  //     values: product_id
  //   }
  //   return pool.query(query);
  //   },
  // getQuestionsModel: (product_id) => {
  //   const query = {
  //     text: `
  //       select row_to_json(t)
  //       from (
  //         select product_id,
  //         (
  //           select array_to_json(array_agg(row_to_json(d)))
  //           from (
  //             SELECT questions.*
  //             FROM questions
  //             WHERE product_id=$product_id
  //           ) d
  //         ) as results
  //         FROM questions
  //         WHERE questions.product_id=$product_id
  //       ) t
  //     `,
  //     values: product_id
  //   },

  getQuestionsModel: (params) => {
    const query = {
      text: `
        SELECT question_id, question_body, question_date, asker_name, question_helpfulness, reported,
        (
          SELECT
              json_object_agg(id, json_build_object('id', id, 'body', body, 'date', date, 'answerer_name', answerer_name, 'helpfulness', helpfulness)) AS answers
          FROM (
            SELECT answers.id as id, answers.body as body, answers.date as date, answers.answerer_name as answerer_name, answers.helpfulness as helpfulness
            FROM answers
            WHERE q.question_id = answers.question_id
          ) as nested_answers
        )
        FROM questions q
        WHERE product_id=${params.product_id}
      `
    }

    return pool.query(query);
  },

  // TODO: make post request query
  postQuestionsModel: (params) => {
    const query = {
      text: `
        INSERT INTO questions (question_body, asker_name, asker_email, product_id, question_date, reported)
        VALUES ($1, $2, $3, $4, NOW(), false)
        ;
      `,
      values: [params.body, params.name, params.email, params.product_id]
    }
    return pool.query(query);

  },

  helpfulQuestionsModel: (params) => {
    console.log('here is params: ', params)
    console.log('here is question_id: ', params.question_id)
    const query = {
      text: `
        UPDATE questions
        SET question_helpfulness = question_helpfulness + 1
        WHERE question_id=${params.question_id};
      `
    }
    return pool.query(query);
  },

  reportQuestionsModel: (params) => {
    const query = {
      text: `
        UPDATE questions
        SET reported=TRUE
        WHERE question_id=${params.question_id} AND reported=FALSE;
      `
    }
    return pool.query(query);
  }
}