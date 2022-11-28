const Movies = require("../model/Movies");

module.exports = {
  getAllMovies: async (req, res) => {
    try {
      const results = await Movies.get(req, res);
      return res.status(200).send(results);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  addNewMovies: async (req, res) => {
    console.log(req.file, "filename dari upload");
    try {
      console.log({ ...req.body, image: "oke" });
      const reqModifer = {
        ...req,
        body: { ...req.body, image: req.file.filename },
      };
      const results = await Movies.add(reqModifer, res);
      return res.status(201).send(results);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  updateMovies: async (req, res) => {
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
      const results = await Movies.update(reqModifer, res);
      return res.status(201).send(results);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  deleteMovies: async (req, res) => {
    try {
      const results = await Movies.remove(req, res);
      return res.status(201).send(results);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
