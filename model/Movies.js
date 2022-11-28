const db = require("../helper/db_connection");
const fs = require("fs");
const moment = require("moment");

module.exports = {
  get: (req, res) => {
    return new Promise((resolve, reject) => {
      const { title = "", directed_by = "" } = req.query;
      const offset = (req.query.page - 1) * req.query.limit;
      let limit = req.query.limit;
      const sql = `SELECT * FROM movies ${
        title
          ? `WHERE title LIKE '%${title}%'`
          : title && directed_by
          ? `WHERE title LIKE '%${title}%' AND directed_by LIKE '${directed_by}%'`
          : ""
      } ORDER BY release_date DESC LIMIT ${req.query.limit} OFFSET ${offset}`;
      db.query(sql, (err, results) => {
        db.query("SELECT * FROM movies ", (err2, results2) => {
          let totalpage = Math.ceil(results2.length / limit);
          if (err) {
            reject({ message: "ada error" });
          }
          resolve({
            message: "get all from movies success",
            status: 200,
            totalrow: results.length,
            totalpage: totalpage,
            data: { results },
          });
        });
      });
    });
  },

  add: (req, res) => {
    return new Promise((resolve, reject) => {
      const {
        title,
        genre,
        release_date,
        directed_by,
        duration,
        cast,
        synopsis,
        image,
      } = req.body;
      // console.log(req.body, 'reaqqqq')
      db.query(
        `INSERT INTO movies(title, genre, release_date, directed_by, duration, cast, synopsis, image) VALUES('${title}', '${genre}','${release_date}','${directed_by}','${duration}','${cast}','${synopsis}','${image}')`,
        (err, results) => {
          if (err) {
            console.log(err);
            reject({ message: "ada error" });
          }
          resolve({
            message: "add new movies success",
            status: 200,
            data: {
              ...req.body,
            },
          });
        }
      );
    });
  },

  update: (req, res) => {
    return new Promise((resolve, reject) => {
      const { id } = req.params;
      db.query(`SELECT * FROM movies where id=${id}`, (err, results) => {
        // console.log(results)
        // console.log(req.file)
        if (err) {
          res.send({ message: "ada error" });
        }
        if (req.file) {
          fs.unlink(`./uploads/${results[0].image}`, function (err) {
            if (err)
              resolve({
                message: "update movies success",
                status: 200,
                data: results,
              });
            resolve({
              message: "update movies success",
              status: 200,
              data: results,
            });
          });
        }

        const previousData = {
          ...results[0],
          ...req.body,
        };
        // console.log(previousData)
        const {
          title,
          genre,
          release_date,
          directed_by,
          duration,
          cast,
          synopsis,
          image,
        } = previousData;
        const date = moment(release_date).format("YYYY-MM-DD");
        db.query(
          `UPDATE movies SET title='${title}', genre='${genre}', release_date='${date}', directed_by='${directed_by}', duration='${duration}', synopsis='${synopsis}', cast='${cast}',  image='${image}' where id='${id}'`,
          (err, results) => {
            if (err) {
              console.log(err);
              reject({ message: "ada error" });
            }
            resolve({
              message: "update movies success",
              status: 200,
              data: results,
            });
          }
        );
      });
    });
  },

  remove: (req, res) => {
    return new Promise((resolve, reject) => {
      const { id } = req.params;
      db.query(`SELECT image FROM movies WHERE id=${id}`, (err, resultData) => {
        if (err) {
          console.log(err);
        }
        if (!resultData.length) {
          reject({ message: "id tidak ditemukan" });
        } else {
          let image = resultData[0].image;
          db.query(`DELETE FROM movies where id=${id}`, (err, results) => {
            if (err) {
              reject({ message: "ada error" });
            }
            fs.unlink(`./uploads/${image}`, function (err) {
              if (err)
                resolve({
                  message: "delete movies success",
                  status: 200,
                  data: results,
                });
              resolve({
                message: "delete movies success",
                status: 200,
                data: results,
              });
            });
          });
        }
      });
    });
  },
};
