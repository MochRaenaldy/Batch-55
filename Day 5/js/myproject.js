function getfulltime(time){
    const date =time.getdate();
    const month =time.getmonth();
    const year =time.getyear();
    const hours =time.gethours();
    const minute =time.getminute();

    return `${date} ${month} ${year} ${hours} ${minute}`;
}

function getdistance(waktu){
    const timenow = new Date().getTime()
    const timepost = waktu;

    const distance = timenow - timepost;

    const distancesecond = Math.floor(distance / 1000)
    const distanceminute = Math.floor(distance / 1000/ 60)
    const distancehours = Math.floor(distance / 1000/ 60/ 60)
    const distanceday = Math.floor(distance / 1000/ 60/ 60/ 24)

    console.log(distancesecond);
    console.log(distanceminute);
    console.log(distancehours);
    console.log(distanceday);

    if (distanceday > 0){
        return `${distanceday} Day Ago`;
    } else if (distancehours > 0){
        return `${distancehours} Hours Ago`;
    } else if (distanceminute > 0){
        return `${distanceminute} Minute Ago`;
    } else if (distancesecond > 0){
        return `${distancesecond} Second Ago`;
    }

}




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
        postAt: new Date()
    };

    dataproject.push(blog);
    console.log("dataArray:", dataproject);
    renderproject();
}

function renderproject() {
    document.getElementById("content-project").innerHTML = "";
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

    <div style="display:flex; flex-direction: column; gap:10px;">
        <h2>${dataproject[index].title}</h2>
        <p style="font-size:10px; font-weight:600;"> Durasi: ${dataproject[index].durasi}</p>
        <p> ${dataproject[index].content} </p>
    </div>

    <div style="margin: 12px 0;">
    ${dataproject[index].node}
    ${dataproject[index].react}
    ${dataproject[index].next}
    ${dataproject[index].typescript}
    </div>
    <div style="
    display: flex;
    gap: 10px; 
    width: 100%;
    text-align: center;">
        <button class="btn-form">Edit</button>
        <button class="btn-form">Delete</button>
    </div>

    <div>
        PostAt : ${getdistance(dataproject[index].postAt)}
    </div>
</div>

        `;
    }
}


setInterval(() => {
    renderproject()
}, 1000);