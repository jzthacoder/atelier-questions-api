const {pool} = require('../database');

module.exports = {
  getAnswersPhotosModel: (err) => {
    return pool.query(`
      SELECT *
      FROM answersPhotos;
      `)
    },

  postAnswersModel: (params) => {
    return  pool.query(`
      INSERT INTO answersPhotos (answer_id, url)
      VALUES (?);`,
      params
      )
    },
}