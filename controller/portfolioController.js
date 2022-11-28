const Portfolio = require("../model/Portfolio");

module.exports = {
  getAllPortfolio: async (req, res) => {
    try {
      const results = await Portfolio.get(req, res);
      return res.status(200).send(results);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  addNewPortfolio: async (req, res) => {
    console.log(req.file, "filename dari upload");
    try {
      console.log({ ...req.body, image: "oke" });
      const reqModifer = {
        ...req,
        body: { ...req.body, image: req.file.filename },
      };
      const results = await Portfolio.add(reqModifer, res);
      return res.status(201).send(results);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  updatePortfolio: async (req, res) => {
    try {
      if (req.file) {
        reqModifer = {
          ...req,
          body: { ...req.body, image: req.file.filename },
        };
      } else {
        reqModifer = {
          ...req,
          body: { ...req.body },
        };
      }
      const results = await Portfolio.update(reqModifer, res);
      return res.status(201).send(results);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  deletePortfolio: async (req, res) => {
    try {
      const results = await Portfolio.remove(req, res);
      return res.status(201).send(results);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
