const db = require("../models");
const Club = db.club;

//const axios = require('axios');

const Op = db.Sequelize.Op;
//const req = require("express/lib/request");



exports.findAll = (req, res) => {
    Club.findAll({
      where : {}
    })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({ message: err.message || " error retrieving all deliveries." });
        });
  };