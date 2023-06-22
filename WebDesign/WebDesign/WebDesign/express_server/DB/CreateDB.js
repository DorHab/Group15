const SQL = require('./db');
const csv = require('csvtojson');
const path = require('path');
const express = require('express')
const app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');


const CreateTableUsers = (req, res, next) => {
    const Q1 = "CREATE TABLE IF NOT EXISTS `Users` (mail varchar(255) NOT NULL PRIMARY KEY,firstname varchar(255) NOT NULL,lastname varchar(255) not NULL,location varchar(255) not null,age int not null,gender varchar(255) not null,stat varchar(255) not null)";
    SQL.query(Q1, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating table" });
            return;
        }
        console.log('created Users table');
    })
    res.send('Users table has created')
    next();
}

const CreateTableTeachers = (req, res, next) => {
    const Q1 = "CREATE TABLE IF NOT EXISTS `Teachers`(  mail varchar(255) NOT NULL PRIMARY KEY,price int NOT NULL, method varchar(255) NOT NULL,rate int NOT NULL,about varchar(1000),exp varchar(1000),education varchar(1000), FOREIGN KEY (mail) REFERENCES Users(mail))";
    SQL.query(Q1, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating table" });
            return;
        }
        console.log('created Teachers table');
    })
    res.send('Teachers table has created')
    next();
}

const CreateTablePasswords = (req, res, next) => {
    const Q1 = "CREATE TABLE IF NOT EXISTS `Passwords`(mail varchar(255) NOT NULL PRIMARY KEY,pass varchar(255) not null,type int not null,FOREIGN KEY (mail) REFERENCES Users(mail))";
    SQL.query(Q1, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating table" });
            return;
        }
        console.log('created Passwords table');
    })
    res.send('Passwords table has created')
    next();
}

const CreateTableTeachersSpecial = (req, res, next) => {
    const Q1 = "CREATE TABLE IF NOT EXISTS `TeachersSpecial`(mail varchar(255) NOT NULL ,special varchar(255) NOT NULL ,primary key(mail,special),FOREIGN KEY (mail) REFERENCES Users(mail))";
    SQL.query(Q1, (err, mySQLres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating table" });
            return;
        }
        console.log('created TeacherSpecial table');
    })
    res.send('TeacherSpecial table has created')
    next();
}

const CreateViewForSearch = (req, res, next) => {
  const createViewQuery = `
    CREATE VIEW ForSearch AS
    SELECT t.mail, t.method, u.location, t.rate, CONCAT(CONCAT(u.firstname, ' '), u.lastname) AS name, t.price, ts.special
    FROM Teachers AS t
    JOIN Users AS u ON t.mail = u.mail
    JOIN TeachersSpecial AS ts ON t.mail = ts.mail
    ORDER BY t.rate DESC
  `;

  SQL.query(createViewQuery, (err, mySQLres) => {
    if (err) {
      console.log("Error creating 'ForSeforsearcharch' view:", err);
      res.status(400).send({ message: "Error in creating view" });
      return;
    }
    res.send("Created 'ForSearch' view");
    next();
  });
};

const CreateViewForNewTeacher = (req, res, next) => {
  const createViewQuery = `
    CREATE VIEW ForNewTeacher AS
    SELECT t.mail, t.rate, CONCAT(CONCAT(u.firstname, ' '), u.lastname) AS name, t.about, t.exp, t.education
    FROM Teachers AS t
    JOIN Users AS u ON t.mail = u.mail
  `;

  SQL.query(createViewQuery, (err, mySQLres) => {
    if (err) {
      console.log("Error creating 'ForNewTeacher' view:", err);
      res.status(400).send({ message: "Error in creating view" });
      return;
    }

    res.send("Created 'ForNewTeacher' view");
    next();
  });
};

const CreateViewFullNames = (req, res, next) => {
  const createViewQuery = `
    CREATE VIEW FullNames AS
    SELECT mail, CONCAT(CONCAT(firstname, ' '), lastname) AS name
    FROM users
  `;

  SQL.query(createViewQuery, (err, mySQLres) => {
    if (err) {
      console.log("Error creating 'FullNames' view:", err);
      res.status(400).send({ message: "Error in creating view" });
      return;
    }

    res.send("Created 'FullNames' view");
    next();
  });
};

const DropTableUsers = (req, res, next) => {
    const Q4 = "DROP TABLE IF EXISTS Users";
    SQL.query(Q4, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({ message: "error in dropping table" + err });
            return;
        }
        console.log("table users dropped");
    })
    res.send("Dropped Users")
    next()
}

const DropTableTeachers = (req, res, next) => {
    const Q4 = "DROP TABLE IF EXISTS Teachers";
    SQL.query(Q4, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({ message: "error in dropping table" + err });
            return;
        }
        console.log("table users dropped");
    })
    res.send("Dropped Teachers")
    next()
}

const DropTablePasswords = (req, res, next) => {
    const Q4 = "DROP TABLE IF EXISTS Passwords";
    SQL.query(Q4, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({ message: "error in dropping table" + err });
            return;
        }
        console.log("table users dropped");
    })
    res.send("Dropped Passwords")
    next()
}

const DropTableTeachersSpecial = (req, res, next) => {
    const Q4 = "DROP TABLE IF EXISTS TeachersSpecial";
    SQL.query(Q4, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({ message: "error in dropping table" + err });
            return;
        }
        console.log("table users dropped");
    })
    res.send("Dropped TeachersSpecial")
    next()
}

const DropViewForSearch = (req, res, next) => {
    const Q4 = "DROP View IF EXISTS ForSearch";
    SQL.query(Q4, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({ message: "error in dropping table" + err });
            return;
        }
        console.log("table users dropped");
    })
    res.send("Dropped View ForSearch")
    next()
}

const DropViewForNewTeacher = (req, res, next) => {
    const Q4 = "DROP View IF EXISTS ForNewTeacher";
    SQL.query(Q4, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({ message: "error in dropping table" + err });
            return;
        }
        console.log("table users dropped");
    })
    res.send("Dropped View ForNewTeacher")
    next()
}

const DropViewFullNames = (req, res, next) => {
    const Q4 = "DROP View IF EXISTS FullNames";
    SQL.query(Q4, (err, mySQLres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({ message: "error in dropping table" + err });
            return;
        }
        console.log("table users dropped");
    })
    res.send("Dropped View FullNames")
    next()
}

const InsertDataUsers = (req, res, next) => {
    const Q2 = "INSERT INTO Users SET ?";
    const csvFilePath = path.join(__dirname, "Users.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj); // for learning perpose
            jsonObj.forEach(element => {
                const NewEntry = {
                    "mail": element.Email,
                    "firstname": element.First,
                    "lastname": element.Last,
                    "location": element.Location,
                    "age": element.Age,
                    "gender": element.Gender,
                    "stat": element.Status
                }
                SQL.query(Q2, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data", err);
                    }
                    console.log("created row sucssefuly ");
                });
            });
        });
    res.send("inserted")
    next()
};

const InsertDataPasswords = (req, res, next) => {
    const Q2 = "INSERT INTO Passwords SET ?";
    const csvFilePath = path.join(__dirname, "Passwords.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj); // for learning perpose
            jsonObj.forEach(element => {
                const NewEntry = {
                    "mail": element.Email,
                    "pass": element.Password,
                    "type": element.Type
                }
                SQL.query(Q2, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data", err);
                    }
                    console.log("created row sucssefuly ");
                });
            });
        });
    res.send("inserted")
    next()
};

const InsertDataTeachers = (req, res, next) => {
    const Q2 = "INSERT INTO Teachers SET ?";
    const csvFilePath = path.join(__dirname, "Teachers.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj); // for learning perpose
            jsonObj.forEach(element => {
                const NewEntry = {
                    "mail": element.Email,
                    "price": element.Price,
                    "method": element.Method,
                    "rate": element.Rate,
                    "about": element.About,
                    "exp": element.Exp,
                    "education": element.Education
                }
                SQL.query(Q2, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data", err);
                    }
                    console.log("created row sucssefuly ");
                });
            });
        });
    res.send("inserted")
    next()
};

const InsertDataTeachersSpecial = (req, res, next) => {
    const Q2 = "INSERT INTO TeachersSpecial SET ?";
    const csvFilePath = path.join(__dirname,"TeachersSpecial.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj); // for learning perpose
            jsonObj.forEach(element => {
                const NewEntry = {
                    "mail": element.Email,
                    "special": element.Special
                }
                SQL.query(Q2, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data", err);
                    }
                    console.log("created row sucssefuly ");
                });
            });
        });
    res.send("inserted")
    next()
};




module.exports = {
    CreateTableUsers,CreateTableTeachers, CreateTablePasswords, CreateTableTeachersSpecial,CreateViewForNewTeacher,CreateViewFullNames,DropTableTeachers,CreateViewForSearch, DropTablePasswords, DropTableTeachersSpecial, DropTableUsers, DropViewForSearch, DropViewForNewTeacher, DropViewFullNames,InsertDataUsers,InsertDataPasswords,InsertDataTeachers,InsertDataTeachersSpecial
}