const express = require("express");
// ini ada di node js
const path = require("path");

const app = express();
const port = 5000;

const data = [];

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

function blog(req, res) {
  res.render("blog", { data });
}

function viewblog(req, res) {
  res.render("add-blog");
}

// Array Manipulation
function addBlog(req, res) {
  const { title, startDate, endDate, deskripsi, nodejs, reactjs, nextjs, typescript, gambar} = req.body;

  const dataBlog = { title, startDate, endDate, deskripsi , nodejs, reactjs, nextjs, typescript , gambar};

  const unsif = data.unshift(dataBlog);

  res.redirect("/blog");
}

function blogDetail(req, res) {
  const { id } = req.params;

  const detail = data[id]

  res.render("blog-detail", { detail });
}

function updateBlog(req, res) {
  const { title, startDate, endDate, deskripsi , nodejs, reactjs, nextjs, typescript, id, gambar } = req.body;

  data[parseInt(id)] = {
    title,
    startDate, 
    endDate, 
    deskripsi , 
    nodejs, 
    reactjs, 
    nextjs, 
    typescript,
    gambar
  };

  res.redirect("/blog");
}

function deleteBlog(req, res) {
  const { id } = req.params;

  console.log("data sebelum:", data);
  data.splice(id, 1);
  console.log("data sesudah:", data);

  res.redirect("/blog");
}

function editBlogView(req, res) {
  const { id } = req.params;

  const datafilter = data[parseInt(id)];
  console.log(datafilter, "daat")
  datafilter.id = parseInt(id);
  datafilter.nextjs = datafilter.nextjs || ""
  datafilter.reactjs = datafilter.reactjs || ""
  datafilter.nodejs = datafilter.nodejs || ""
  datafilter.typescript = datafilter.typescript || ""
  res.render("update-blog", { data: datafilter });
}

function testimonial(req, res) {
  res.render("testimonial");
}

function contactme(req, res) {
  res.render("contact");
}

// Day-12
// update post / blog
// delete post 

app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
});