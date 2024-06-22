const testimonial = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  const rating = 

  xhr.open("GET", "https://api.npoint.io/88486dd1d7602f9ecb9d", true);

  xhr.onload = function () {
    if (xhr.status == 200) {
      resolve(JSON.parse(xhr.response));
    } else {
      reject("Erorr Loaded Data");
    }
  };

  xhr.onerror = function () {
    reject("404 Not Found");
  };

  xhr.send();
});

async function allTestimonial() {
  try {
    const response = await testimonial;
    let testimonialHtml = ``;

    saverating = ""

    response.forEach((item) => {
      testimonialHtml += `
      <div class="col-md-6 col-lg-4 mb-4 ">
      <div class="px-3 shadow-sm " style="height:max-content;">
        <img src="${item.image}" alt="testimonial" class="object-fit-cover" width="100%" height="200px">
            <p class="card-text">${item.content}</p>
            <p class="card-text text-end font-weight-bold">- ${item.author}</p>
            <p class="card-text text-end font-weight-bold">${item.rating} <i class="fa-solid fa-star"></i></p>
            </div>
            </div>`;
    });

    document.getElementById("testimonials").innerHTML = testimonialHtml;
  } catch (error) {
    console.log(error);
  }
}
// callback -> pemanggilan fungsi kembali
allTestimonial();

let saverating = "" 

function getRating() {
  return saverating
}


async function filterTestimonials(rating) {
  try {
    const response = await testimonial;
    let testimonialHtml = ``;

    saverating=rating;

    const dataFilter = response.filter((data) => data.rating === rating);
    if (dataFilter.length === 0) {
      testimonialHtml = `<h1> Data not found!</h1>`;
    } else {
      dataFilter.forEach((item) => {
        testimonialHtml += `<div class="col-md-6 col-lg-4 mb-4">
        <div class="px-3 shadow-sm" style="height:max-content;">
        <img src="${item.image}" alt="testimonial" class="object-fit-cover" width="100%" height="200px">
            <p class="card-text" style="height:120px;">${item.content}</p>
            <p class="card-text text-end font-weight-bold">- ${item.author}</p>
            <p class="card-text text-end font-weight-bold">${item.rating} <i class="fa-solid fa-star"></i></p>
      </div>
            </div>`;
      });
    }
    document.getElementById("testimonials").innerHTML = testimonialHtml;
  } catch (error) {
    console.log(error);
  }
}