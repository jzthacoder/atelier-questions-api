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
      values: product_id
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