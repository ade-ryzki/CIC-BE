const db = require("../helper/db_connection");
const fs = require("fs");
const moment = require("moment");


module.exports = {
  get: (req, res) => {
    return new Promise((resolve, reject) => {
      //   const { title = "", director = "" } = req.query;
      const sql = `SELECT * FROM portfolio`;
      db.query(sql, (err, results) => {
        if (err) {
          reject({
            message: "Something wrong",
          });
        }
        resolve({
          message: "Get all from portfolio success",
          status: 200,
          data: results,
        });
      });
    });
  },

  add: (req, res) => {
    return new Promise((resolve, reject) => {
      const {
        title,
        description,
        image,
      } = req.body;
      // console.log(req.body, 'where error ?????')
      db.query(
        `INSERT INTO portfolio(title, description, image) VALUES('${title}','${description}','${image}')`,
        (err, results) => {
          if (err) {
            console.log(err);
            reject({ message: "ada error" });
          }
          resolve({
            message: "add new portfolio success",
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
      db.query(`SELECT * FROM portfolio where id=${id}`, (err, results) => {
        // console.log(results)
        // console.log(req.file)
        if (err) {
          res.send({ message: "ada error" });
        }
        if (req.file) {
          fs.unlink(`./uploads/${results[0].image}`, function (err) {
            if (err)
              resolve({
                message: "update portfolio success",
                status: 200,
                data: results,
              });
            resolve({
              message: "update portfolio success",
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
          description,
          image,
        } = previousData;
        // const date = moment(release_date).format("YYYY-MM-DD");
        db.query(
          `UPDATE portfolio SET title='${title}', description='${description}', image='${image}' where id='${id}'`,
          (err, results) => {
            if (err) {
              console.log(err);
              reject({ message: "ada error" });
            }
            resolve({
              message: "update portfolio success",
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
      db.query(`SELECT image FROM portfolio WHERE id=${id}`, (err, resultData) => {
        if (err) {
          console.log(err);
        }
        if (!resultData.length) {
          reject({ message: "id tidak ditemukan" });
        } else {
          let image = resultData[0].image;
          db.query(`DELETE FROM portfolio where id=${id}`, (err, results) => {
            if (err) {
              reject({ message: "ada error" });
            }
            fs.unlink(`./uploads/${image}`, function (err) {
              if (err)
                resolve({
                  message: "delete portfolio success",
                  status: 200,
                  data: results,
                });
              resolve({
                message: "delete portfolio success",
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
