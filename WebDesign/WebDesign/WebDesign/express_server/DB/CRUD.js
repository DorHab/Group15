//Validate requestconst sql = require('./db');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, '../Static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const cookieParser = require('cookie-parser')
const sql = require('./db');

  const CreateNewUser = (req, res) => {
  const sql = require("./db");
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const Email = req.body.SP_Email;
  const Q = "SELECT * FROM Users WHERE mail = ?";
  sql.query(Q, Email, (err, mysqlres) => {
    if (err) {
      // Handle the error
      console.error(err);
      return;
    }
    if (mysqlres.length == 0) {
      // The result is empty, email doesn't exist
      console.log("This email doesn't exist. You can proceed.");

      const NewUser = {
        mail: req.body.SP_Email,
        firstname: req.body.FirstName,
        lastname: req.body.LastName,
        location: req.body.Location,
        age: req.body.Age,
        gender: req.body.ChoseGender,
        stat: req.body.ChoseStatus
      };
      const NewPass = {
        mail: req.body.SP_Email,
        pass: req.body.SP_Password,
        type: 0
      };

      const Q1 = "INSERT INTO Users SET ?";
      const Q2 = "INSERT INTO PassWords SET ?";

      sql.query(Q1, NewUser, (err, mysqlres) => {
        if (err) {
          console.log("Error: ", err);
          res.status(400).send({ message: "Error in creating upload: " + err });
          return;
        }
      });

      sql.query(Q2, NewPass, (err, mysqlres) => {
        if (err) {
          console.log("Error: ", err);
          res.status(400).send({ message: "Error in creating upload: " + err });
          return;
        }
        res.cookie('User', req.body.FirstName + " " + req.body.LastName);
        res.cookie('type', 0);
        res.cookie('Email', req.body.SP_Email);
        res.render('HomePage');
      });

    } else {
      console.log("This email already exists. Please try again with a different email.");
      res.send("This email already exists. Please try again with a different email.");
    }
  });
};

  const CreateNewTeacher = (req, res) => {
  const sql = require("./db");
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const Email = req.body.SP_Email;
  const Query = "SELECT * FROM Users WHERE mail = ?";
  sql.query(Query, Email, (err, mysqlres) => {
    if (err) {
      // Handle the error
      console.error(err);
      return;
    }
    if (mysqlres.length == 0) {
      // The result is empty, email doesn't exist
      console.log("This email doesn't exist. You can proceed.");

      const NewUser = {
        mail: req.body.SP_Email,
        firstname: req.body.FirstName,
        lastname: req.body.LastName,
        location: req.body.Location,
        age: req.body.Age,
        gender: req.body.ChoseGender,
        stat: req.body.ChoseStatus
      };
      const NewPass = {
        mail: req.body.SP_Email,
        pass: req.body.SP_Password,
        type: 1
      };
      const NewTeacher = {
        mail: req.body.SP_Email,
        price: req.body.Price,
        method: req.body.ChooseHowToTeach,
        rate: 1
      };
      const Q1 = "INSERT INTO Users SET ?";
      const Q2 = "INSERT INTO Teachers SET ?";
      const Q3 = "INSERT INTO TeachersSpecial SET ?";
      const Q4 = "INSERT INTO PassWords SET ?";

      sql.query(Q1, NewUser, (err, mysqlres) => {
        if (err) {
          console.log("Error: ", err);
          res.status(400).send({ message: "Error in creating upload: " + err });
          return;
        }
      });

      sql.query(Q2, NewTeacher, (err, mysqlres) => {
        if (err) {
          console.log("Error: ", err);
          res.status(400).send({ message: "Error in creating upload: " + err });
          return;
        }
      });

      const specialSubjects = [
        { key: "Math3units", name: "Math3units" },
        { key: "Math4units", name: "Math4units" },
        { key: "Math5units", name: "Math5units" },
        { key: "Physics", name: "Physics" },
        { key: "English3units", name: "English3units" },
        { key: "English4units", name: "English4units" },
        { key: "English5units", name: "English5units" }
      ];

      specialSubjects.forEach(subject => {
        if (Boolean(req.body[subject.key]) === true) {
          const NewSpecial = {
            mail: req.body.SP_Email,
            special: subject.name
          };

          sql.query(Q3, NewSpecial, (err, mysqlres) => {
            if (err) {
              console.log(err);
              res.status(400).send("Failed");
              return;
            }
          });
        }
      });

      sql.query(Q4, NewPass, (err, mysqlres) => {
        if (err) {
          console.log("Error: ", err);
          res.status(400).send({ message: "Error in creating upload: " + err });
          return;
        }
      });

      const mail = req.body.SP_Email;
      const Q = `SELECT * FROM ForNewTeacher WHERE mail = ?`;
      sql.query(Q, mail, (err, mysqlres) => {
        if (err) {
          console.log("Error fetching search results:", err);
          res.status(500).json({ error: "Failed to fetch search results" });
          return;
        }
        console.log(mysqlres);
        res.cookie('User', mysqlres[0].name);
        res.cookie('type', 1);
        res.cookie('Email', mail);
        res.render("TeacherEdit", { V1: mysqlres });
      });
    } else {
      // The result is not empty, email already exists
      console.log("This email already exists. Please try again with a different email.");
      res.send("This email already exists. Please try again with a different email.");
    }
  });
};



module.exports = {
  CreateNewUser,
  CreateNewTeacher
};