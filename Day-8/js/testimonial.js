const TestimoniData = [
    {
      image:
        "https://cdn.idntimes.com/content-images/post/20240523/4-628ffb822844dbb7abd67e7f8525532b.jpg",
      content: "Aku Akan selalu menangkan hatimu",
      author: "Jeane Victoria eks JKT48",
      rating: 1,
    },
    {
      image:
        "https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/jawapos/2022/04/zee-jkt48.jpg",
      content: "Si gadis tomboy yang semangatnya meletup-letup",
      author: "Azizi Asadel JKT48",
      rating: 5,
    },
    {
      image:
        "https://shopee.co.id/inspirasi-shopee/wp-content/uploads/2023/10/christy-jkt48-2.jpg",
      content: "Peduli dan baik hati, Siapakah dia?",
      author: "Angelina Cristy JKT48",
      rating: 3,
    },
    {
      image:
        "https://api.duniagames.co.id/api/content/upload/file/12614546371683275585.jpg",
      content: "Gadis kolaris yang suka berimajinasi, Terangi harimu dengan senyum karamelku.",
      author: "Freya Jayawardana Jkt48",
      rating: 4,
    },
    {
      image:
        "https://i.pinimg.com/originals/21/6c/38/216c3859f1898cab471ddec064d19e53.jpg",
      content: "Melaju cepat bagai motor 1000cc, Aku si gadis penyuka motor",
      author: "Amanda Sukma JKT48",
      rating: 2,
    },
    {
      image:
        "https://cdn.idntimes.com/content-images/post/20240310/snapinstaapp-324401509-204848975382690-7925727270270139328-n-1080-65afb24b4aebd83c5aa5303cae5f48ad.jpg",
      content: "Watashi no kokoro unlock, akan menemani hari-harimu dengan sepenuh hati.",
      author: "Indira Putri Seruni JKT48",
      rating: 2,
    }
  ];
  
  function html(item) {
    return `
      <div class="testimonial">
          <img src="${item.image}" alt="testimonial" class="profile-testimonial">
              <p class="quote">${item.content}</p>
              <p class="author">- ${item.author}</p>
              <p class="author">${item.rating} <i class="fa-solid fa-star"></i></p>
      </div>`;
  }
  
  function allTestimonial() {
    let testimonialHtml = ``;
    TestimoniData.forEach((item) => {
      testimonialHtml += html(item);
    });
  
    document.getElementById("testimonials").innerHTML = testimonialHtml;
  }
  
  allTestimonial();
  
  function filterTestimonials(rating) {
    let testimonialHtml = ``;
    const testimonialFilter = TestimoniData.filter((item) => {
      return item.rating === rating;
    });
  
    if (testimonialFilter.length === 0) {
      testimonialHtml = `<h1> Data not found!</h1>`;
    } else {
      testimonialFilter.forEach((item) => {
        testimonialHtml += html(item);
      });
    }
  
    document.getElementById("testimonials").innerHTML = testimonialHtml;
  }