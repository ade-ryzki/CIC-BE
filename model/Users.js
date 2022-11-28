const db = require("../helper/db_connection");

module.exports = {
  get: (req, res) => {
    return new Promise((resolve, reject) => {
      // const {title='', directed_by=''} = req.query
      const sql = `SELECT * FROM users`;
      db.query(sql, (err, results) => {
        if (err) {
          reject({ message: "ada error" });
        }
        resolve({
          message: "get all from users success",
          status: 200,
          data: results,
        });
      });
    });
  },
  add: (req, res) => {
    return new Promise((resolve, reject) => {
      const { name, email, password, image, role } = req.body;

      db.query(
        `INSERT INTO movies(name, email, password, image, role) VALUES('${name}', '${email}','${password}','${image}','${role}')`,
        (err, results) => {
          if (err) {
            console.log(err);
            reject({ message: "error" });
          }
          resolve({
            message: "add new users success",
            status: 200,
            data: {
              id: results.insertId,
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
      db.query(`SELECT * FROM users where id=${id}`, (err, results) => {
        if (err) {
          res.send({ message: "ada error" });
        }

        const previousData = {
          ...results[0],
          ...req.body,
        };
        const { name, email, password, image, role } = previousData;

        db.query(
          `UPDATE users SET name='${name}', '${email}','${password}','${image}','${role}'`,
          (err, results) => {
            if (err) {
              console.log(err);
              reject({ message: "error" });
            }
            resolve({
              message: "update users success",
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
      db.query(`DELETE FROM users where id=${id}`, (err, results) => {
        if (err) {
          reject({ message: "ada error" });
        }
        resolve.send({
          message: "delete users success",
          status: 200,
          data: results,
        });
      });
    });
  },
};
