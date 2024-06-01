let dataproject = [];
function submitBlog(event) {
    event.preventDefault();
    document.getElementById("content-project").innerHTML = ""
    let project = document.getElementById("project").value;
    let dateawal = document.getElementById("date-awal").value;
    let dateend = document.getElementById("date-end").value;
    let deskripsi = document.getElementById("deskripsi").value;
    let nodejs = document.getElementById("nodejs").checked;
    let reactjs = document.getElementById("reactjs").checked;
    let nextjs = document.getElementById("nextjs").checked;
    let typescript = document.getElementById("typescript").checked;
    let image = document.getElementById("inputImage").files;

    if (project == "") {
        alert("Nama Project harus diisi");
    } else if (dateawal == "") {
        alert("Date awal harus diisi");
    } else if (dateend == "") {
        alert("Date akhir harus diisi");
    } else if (deskripsi == "") {
        alert("deskripsi harus diisi");
    } else if (
        nodejs == false &&
        reactjs == false &&
        nextjs == false &&
        typescript == false
    ) {
        alert("Pilih satu atau lebih Technology");
    } else if (image.length == 0) {
        alert("Masukkan gambar ");
    }

    inputImage = URL.createObjectURL(image[0]);

    const blog = {
        title: project,
        content: deskripsi,
        image: inputImage,
        durasi: dateawal +" - "+ dateend,
        react: reactjs ? `<img src="./img/react.png" alt="nodejs" width="40px">` : "",
        node: nodejs ?  `<img src="./img/node.png" alt="nodejs" width="40px">` : "",
        next: nextjs ? `<img src="./img/next.png" alt="nodejs" width="40px">` : "",
        typescript: typescript ? `<img src="./img/ts.png" alt="nodejs" width="40px">` : "",
    };

    dataproject.push(blog);
    console.log("dataArray:", dataproject);
    console.log(new Date());
    renderproject();
}

function renderproject() {
    document.getElementById("ctn2");
    for (let index = 0; index < dataproject.length; index++) {
        document.getElementById("content-project").innerHTML += `
          
        <div
        style ="
        border: 2px solid;
        width: 200px;
        border-radius: 15px;
        padding: 15px;
        margin: 100px auto;
        
        ">

    <div>
        <img src="${dataproject[index].image}" width="100%" style="max-height: 200px;">
    </div>

    <div>
        <h1>${dataproject[index].title}</h1>
        <p>${dataproject[index].durasi}</p>
        <p> ${dataproject[index].content} </p>
    </div>

    <div>
    ${dataproject[index].node}
    ${dataproject[index].react}
    ${dataproject[index].next}
    ${dataproject[index].typescript}
    </div>
</div>

        `;
    }
}
