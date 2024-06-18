const express = require("express");
const {Sequelize, QueryTypes} = require("sequelize")
const confiq = require("./config/config.json")
const sequelize = new Sequelize(confiq.development)

// ini ada di node js
const path = require("path");

const app = express();
const port = 5000;

let data = [];

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

function home(req, res) {
  res.render("index");
}

async function blog(req, res) {
  const query =`SELECT * FROM "Blogs"`
  const obj = await sequelize.query(query,{type: QueryTypes.SELECT})
  
  
  res.render("blog", { data: obj });
}

function viewblog(req, res) {
  res.render("add-blog");
}

// Array Manipulation
 async function addBlog(req, res) {
  const { title, startDate, endDate, deskripsi, nodejs, reactjs, nextjs, typescript, gambar} = req.body;

  let query =`INSERT INTO public."Blogs"(title, "startDate", "endDate", deskripsi, nodejs, reactjs, nextjs, typescript, gambar")
    VALUES ( '${title}', '${startDate}', '${endDate}', '${deskripsi}', '${nodejs}', '${reactjs}', '${nextjs}', '${typescript}', '${gambar}');`

   await sequelize.query(query,{typeof: QueryTypes.INSERT})
  
  res.redirect("/blog");
}

async function blogDetail(req, res) {
  
  const { id } = req.params;

  const query =`SELECT * FROM "Blogs" WHERE id=${id}`
  const obj = await sequelize.query(query,{type: QueryTypes.SELECT})

  console.log(obj);

  res.render("blog-detail", { detail: obj[0] });
}

async function editBlogView(req, res) {
  const { id } = req.params;

  const query =`SELECT * FROM "Blogs" WHERE id=${id}`
  const obj = await sequelize.query(query,{type: QueryTypes.SELECT})

  console.log(obj);

  console.log(data);
  res.render("update-blog", { data: obj[0] });
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
  res.render("testimonial");
}

function contactme(req, res) {
  res.render("contact");
}

app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
});