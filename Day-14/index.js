const express = require("express");
const {Sequelize, QueryTypes} = require("sequelize")
const confiq = require("./config/config.json")
const sequelize = new Sequelize(confiq.development)
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");

// ini ada di node js
const path = require("path");

const app = express();
const port = 5000;


// app.set
// mendeskripsikan templte engine apa yang dipake
app.set("view engine", "hbs");
// ini memberitahu si templte engine ngambilnya dari folder mana
app.set("views", path.join(__dirname, "src/views"));

// ini untuk assets
app.use("/assests", express.static(path.join(__dirname, "src/assests")));
app.use("/upload", express.static(path.join(__dirname, "upload")));
// middleware -> yang berfungsi sebagai alat memproses inputan dari form (Request)
app.use(express.urlencoded({ extended: false }));

app.use(flash());
app.use(
  session({
    name: "data",
    secret: "rahasiabgtcui",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// Routing
app.get("/", home);
app.get("/blog", blog);
app.get("/add-blog", viewblog);
app.post("/add-blog", addBlog);
app.get("/blog-detail/:id", blogDetail);
app.get("/update-blog/:id", editBlogView);
app.post("/update-blog", updateBlog);
app.post("/delete-blog/:id", deleteBlog);
app.get("/testimonial", testimonial);
app.get("/contact", contactme);

// login
app.get("/login", loginView);
app.post("/login", login);
app.get("/register", registerView);
app.post("/register", register);
app.get("/logout", logout);

function home(req, res) {
  const isLogin = req.session.isLogin;
  const user = req.session.user;

  res.render("index", { user, isLogin });
}

async function blog(req, res) {
  const query =`SELECT * FROM "Blogs"`
  const obj = await sequelize.query(query,{type: QueryTypes.SELECT})

  const isLogin = req.session.isLogin;
  const user = req.session.user;
  
  res.render("blog", { data: obj, isLogin, user });
}

function viewblog(req, res) {
  res.render("add-blog");
}

function home(req, res) {
  const isLogin = req.session.isLogin;
  const user = req.session.user;

  res.render("index", { user, isLogin });
}

// Array Manipulation
 async function addBlog(req, res) {
  const { title, startDate, endDate, deskripsi, nodejs, reactjs, nextjs, typescript, gambar} = req.body;

  let query =`INSERT INTO "Blogs"(title, "startDate", "endDate", deskripsi, nodejs, reactjs, nextjs, typescript, gambar)
    VALUES ( '${title}', '${startDate}', '${endDate}', '${deskripsi}', '${nodejs ? nodejs :""}', '${reactjs ? reactjs :""}', '${nextjs ? nextjs :""}', '${typescript ? typescript :""}', '${gambar}')`;

   await sequelize.query(query,{type: QueryTypes.INSERT})
  
  res.redirect("blog");
}

async function blogDetail(req, res) {
  
  const { id } = req.params;

  const query =`SELECT * FROM "Blogs" WHERE id=${id}`
  const obj = await sequelize.query(query,{type: QueryTypes.SELECT})

  const isLogin = req.session.isLogin;
  const user = req.session.user;

  res.render("blog-detail", { detail: obj[0] ,user, isLogin});
}

async function editBlogView(req, res) {
  const { id } = req.params;

  const query =`SELECT * FROM "Blogs" WHERE id=${id}`
  const obj = await sequelize.query(query,{type: QueryTypes.SELECT})

  const isLogin = req.session.isLogin;
  const user = req.session.user;

  res.render("update-blog", { data: obj[0] ,user, isLogin });
}

async function updateBlog(req, res) {
  const { title, startDate, endDate, deskripsi , nodejs, reactjs, nextjs, typescript, id, gambar } = req.body;

  const data = await sequelize.query(`UPDATE public."Blogs"
    SET title='${title}', "startDate"='${startDate}', "endDate"='${endDate}', deskripsi='${deskripsi}', nodejs='${nodejs ? nodejs :""}', reactjs='${reactjs ? reactjs: ""}', nextjs='${nextjs ? nextjs:""}', typescript='${typescript ? typescript:""}', gambar='${gambar}'
    WHERE id=${id};`,{ type: QueryTypes.UPDATE})

  res.redirect("/blog");
}

async function deleteBlog(req, res) {
  const { id } = req.params;

  const query =`DELETE FROM "Blogs" WHERE id=${id}`
  const obj = await sequelize.query(query,{type: QueryTypes.DELETE})
  
  res.redirect("/blog");
}

function testimonial(req, res) {

  const isLogin = req.session.isLogin;
  const user = req.session.user;

  res.render("testimonial", {user, isLogin});
}

function contactme(req, res) {

  const isLogin = req.session.isLogin;
  const user = req.session.user;

  res.render("contact" ,{user, isLogin});
}

function loginView(req, res) {
  res.render("login-form");
}

async function login(req, res) {
  const { email, password } = req.body;
  const query = `SELECT * FROM "Users" WHERE email='${email}'`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  if (!obj.length) {
    req.flash("danger", "Login Failed: Email is wrong!");
    return res.redirect("/login");
  }

  bcrypt.compare(password, obj[0].password, (err, result) => {
    if (err) {
      req.flash("danger", "Login Failed: Internal Server Error");
      return res.redirect("/login");
    }

    if (!result) {
      req.flash("danger", "Login Failed: Password is wrong!");
      return res.redirect("/login");
    }

    req.flash("success", "Login Success!");
    req.session.isLogin = true;
    req.session.user = {
      name: obj[0].name,
      email: obj[0].email,
    };

    res.redirect("/");
  });
}

function registerView(req, res) {
  res.render("register-form");
}

async function register(req, res) {
  const { name, email, password } = req.body;

  // misal dikasih kondisi apakah data yg didatabase sudah ada atau belum
  const query = `SELECT * FROM "Users" WHERE email='${email}'`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  // if(obj[0].length === 1){
  //   req.flash("danger", "Register Failed: Email Already Use!");
  //   return res.redirect("/register");
  // }

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      req.flash(
        "danger",
        "Register Failed : Password failde to be encyptionsss!"
      );
      return res.redirect("/register");
    }

    const query = `INSERT INTO "Users"(name, email, password) VALUES ('${name}','${email}','${hash}')`;
    await sequelize.query(query, { type: QueryTypes.INSERT });
    req.flash("success", "Register Success!");
    res.redirect("/login");
  });
}

function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/login");
  });
}

app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
});