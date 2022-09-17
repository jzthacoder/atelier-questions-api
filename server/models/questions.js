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
          SELECT array_agg(json_build_object('id', id, 'body', body))
          FROM answers
          WHERE answers.question_id = q.question_id
        ) as answers
        FROM questions q
        WHERE product_id=${params.product_id}
      `,
      // text: `
      //   SELECT json_build_object(
      //     'question_id', questions.question_id,
      //     'question_body', questions.question_body,
      //     'question_date', questions.question_date,
      //     'asker_name', questions.asker_name,
      //     'question_helpfulness', questions.question_helpfulness,
      //     'reported', questions.reported
      //   )
      //   FROM questions
      //   WHERE product_id = ${params.product_id}
      // `
    }
    return pool.query(query);
  },


  // 'answers', (
  //   SELECT id, body
  //   FROM answers
  //   WHERE question_id = q.id
  // )






  // TODO: fix all these queries to work with postgres lol
  postQuestionsModel: (params) => {
    return  pool.query(`
      INSERT INTO questions (product_id, body, date_written, asker_name, asker_email)
      VALUES (?, ?, ?, ?, ?);`,
      params
      )
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