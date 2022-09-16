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
        SELECT question_id, question_body, question_date, asker_name, question_helpfulness, reported
        FROM questions
        WHERE product_id=${params.product_id}
      `,
    }
    return pool.query(query);
  },









  // TODO: fix all these queries to work with postgres lol
  postQuestionsModel: (params) => {
    return  pool.query(`
      INSERT INTO questions (product_id, body, date_written, asker_name, asker_email)
      VALUES (?, ?, ?, ?, ?);`,
      params
      )
    },

  helpfulQuestionsModel: (question_id) => {
    console.log('here is question_id: ', question_id)
    const query = {
      text: `
        UPDATE questions
        SET helpful = helpful + 1
        WHERE ID=$1 AND reported
      `
    }
    // return pool.query(`
    // UPDATE questions
    // SET helpful = helpful + 1
    // WHERE id = ?`,
    // question_id
    // )
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