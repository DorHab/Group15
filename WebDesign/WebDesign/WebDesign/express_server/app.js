// import and set up
const express = require('express')
const app = express();
const path = require('path');
const port = 3000;
const bodyParser = require('body-parser');
const sql = require('./DB/db')
const cookieParser = require('cookie-parser')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, "Static"))); //find the statics
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());//init cookie parser

//routes
app.get('/', (req, res) => {
    res.render('HomePage')
});
app.get('/Login', (req, res) => {
    res.render('Login')
});
app.get('/Sign-up_As_Student', (req, res) => {
    res.render('Sign-up_As_Student')
});
app.get('/SignAsTeacher', (req, res) => {
    res.render('SignAsTeacher')
});
app.get('/SearchResult.html', (req,res)=>{
    res.render('SearchResult')
})
app.get('/TeacherProfile', (req, res) => {
    const email = req.cookies.Email;
    const querySearch = 'Select * From ForNewTeacher WHERE mail = ?';
    sql.query(querySearch,email, (err, mysqlres) => {
    if (err) {
      res.status(500).json({ error: 'Cant' });
      return;
    }else{
        res.render('TeacherProfile',{V1:mysqlres})
    }
  });
});
app.get('/TeacherEdit' , (req,res)=>{
    const email = req.cookies.Email;
    const querySearch = 'Select * From ForNewTeacher WHERE mail = ?';
    sql.query(querySearch,email, (err, mysqlres) => {
    if (err) {
      res.status(500).json({ error: 'cant go there' });
      return;
    }else{
        res.render('TeacherEdit',{V1:mysqlres})
    }
  });
});
app.get('/SendMail', (req,res)=>{
    const teachemail = req.query.teach;
    const studentemail = req.cookies.Email;
    const email = [teachemail,studentemail]
    res.render('SendEmail',{V1:email})
});
app.get('/sss',(req,res)=>{
    res.send(req.query)
});

// post
const CRUD_operations = require("./DB/CRUD");
app.post('/StudentSignUp', CRUD_operations.CreateNewUser);
app.post('/SignAsTeach' ,CRUD_operations.CreateNewTeacher);
app.post('/search', (req, res) => {
  // Retrieve the search parameters from the request body
  const {topic, location, method} = req.body;
  // Construct the SQL query with the search parameters
  if (location == "AnyWhere" && method == "Both"){
       const query = `SELECT * FROM ForSearch WHERE special = ?`;
       const values = [topic];
       sql.query(query, values, (err, mysqlres) => {
    if (err) {
      console.log('Error fetching search results:', err);
      res.status(500).json({ error: 'Failed to fetch search results' });
    } else {
      // Pass the filtered data to your HTML template engine
      res.render('SearchResult', { V1: mysqlres });
      return;
    }
  });
  }else if(location == "AnyWhere"){
       const query = `SELECT * FROM ForSearch WHERE (method = ? OR method = ?) AND special = ?`;
       const values = [method,"Both",topic];
       sql.query(query, values, (err, mysqlres) => {
    if (err) {
      console.log('Error fetching search results:', err);
      res.status(500).json({ error: 'Failed to fetch search results' });
    } else {
      // Pass the filtered data to your HTML template engine
      res.render('SearchResult', { V1: mysqlres });
      return;
    }
  });
  }else if(method == "Both"){
       const query = `SELECT * FROM ForSearch WHERE (location = ? OR location = ?)  AND special = ?`;
       const values = [location,"AnyWhere",topic];
       sql.query(query, values, (err, mysqlres) => {
    if (err) {
      console.log('Error fetching search results:', err);
      res.status(500).json({ error: 'Failed to fetch search results' });
    } else {
      // Pass the filtered data to your HTML template engine
      res.render('SearchResult', { V1: mysqlres });
      return;
    }
  });
  }else{
      const query = `SELECT * FROM ForSearch WHERE (method = ? OR method = ?) AND (location = ? OR location = ?) AND special = ?`;
      const values = [method,"Both",location,"AnyWhere", topic];
      sql.query(query, values, (err, mysqlres) => {
    if (err) {
      console.log('Error fetching search results:', err);
      res.status(500).json({ error: 'Failed to fetch search results' });
    } else {
      // Pass the filtered data to your HTML template engine
      res.render('SearchResult', { V1: mysqlres });
      return;
    }
  });
  }
});
app.post('/profile', (req,res)=>{
    const about = req.body.about;
    const education = req.body.Education;
    const exp = req.body.Exp;
    const email = req.body.email;
    const values = [about,exp,education,email];
    const query = 'UPDATE Teachers SET about = ? , exp = ? , education = ? WHERE mail = ?';
    const querySearch = 'Select * From ForNewTeacher WHERE mail = ?';
    sql.query(query, values, (err, mysqlres) => {
    if (err) {
      res.status(500).json({ error: 'Bla' });
      return;
    }
  });
    sql.query(querySearch,email, (err, mysqlres) => {
    if (err) {
      res.status(500).json({ error: 'BlaBla' });
      return;
    }else{
        res.render('TeacherProfile',{V1:mysqlres})
    }
  });
});
app.post('/TeacherProfile',(req,res)=>{
    const email = req.body.email;
    const querySearch = 'Select * From ForNewTeacher WHERE mail = ?';
    sql.query(querySearch,email, (err, mysqlres) => {
    if (err) {
      res.status(500).json({ error: 'adsad' });
      return;
    }else{
        res.render('TeacherProfile',{V1:mysqlres})
    }
  });
});
app.post('/Logining', (req, res) => {
  const username = req.body.username;
  const pass = req.body.password;
  const value = [username, pass];
  const querySearch1 = 'SELECT * FROM FullNames WHERE mail = ?';
  const querySearch2 = 'SELECT * FROM PassWords WHERE mail = ? AND pass = ?';

  sql.query(querySearch1, value, (err, mysqlres) => {
    if (err) {
      res.status(500).json({ error: 'BlaBla' });
      return;
    }

    if (mysqlres.length === 0) {
      console.log("There is no such user");
      return res.redirect('/Login'); // Redirect to the login page
    }

    res.cookie('User', mysqlres[0].name);

    sql.query(querySearch2, value, (err, mysqlres) => {
      if (err) {
        res.status(500).json({ error: 'BlaBla' });
        return;
      }

      if (mysqlres.length === 0) {
        console.log("There is no such user");
        return res.redirect('/Login'); // Redirect to the login page
      }

      res.cookie('type', mysqlres[0].type);
      res.cookie('Email', username);
      res.render('HomePage');
    });
  });
});

// create insert and drop please use /tables to get into the website where u can init the tables
const CreateDB = require("./DB/CreateDB");
app.get('/tables',(req,res)=>{
    res.render('Tables')
})
app.get('/Users',CreateDB.CreateTableUsers);
app.get('/Teachers',CreateDB.CreateTableTeachers);
app.get('/Passwords',CreateDB.CreateTablePasswords);
app.get('/TeacherSpecial',CreateDB.CreateTableTeachersSpecial);
app.get('/ViewForSearch',CreateDB.CreateViewForSearch);
app.get('/ViewForNewTeacher',CreateDB.CreateViewForNewTeacher);
app.get('/ViewFullNames',CreateDB.CreateViewFullNames);
app.get('/InsertIntoUsers',CreateDB.InsertDataUsers);
app.get('/InsertIntoPasswords',CreateDB.InsertDataPasswords);
app.get('/InsertIntoTeachers',CreateDB.InsertDataTeachers);
app.get('/InsertIntoTeachersSpecial',CreateDB.InsertDataTeachersSpecial);
app.get('/DropPasswords',CreateDB.DropTablePasswords);
app.get('/DropTeacherSpecial',CreateDB.DropTableTeachersSpecial);
app.get('/DropTeachers',CreateDB.DropTableTeachers);
app.get('/DropUsers',CreateDB.DropTableUsers);
app.get('/DropViewForSearch',CreateDB.DropViewForSearch);
app.get('/DropViewForNewTeacher',CreateDB.DropViewForNewTeacher);
app.get('/DropViewForFullName',CreateDB.DropViewFullNames);






app.listen(port, () => {
    console.log("server is running on port: ", port);
});



