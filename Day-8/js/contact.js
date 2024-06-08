function submitData() {
    const name = document.getElementById("name")?.value;
    const email = document.getElementById("email")?.value;
    const phone = document.getElementById("phone")?.value;
    const subject = document.getElementById("subject")?.value;
    const message = document.getElementById("message")?.value;
  
    // Perkondisian
    if (name == "") {
     alert("Name harus diisi"); // Kondisi 1
    } else if (email == "") {
      alert("Email Harus Diisi"); // kondisi 2
    } else if (phone == "") {
      alert("Phone Number tidak boleh kosong"); //kondisi 3
    } else if (subject == "") {
      alert("Subject tidak boleh kosong"); // kondisi 4
    } else if (message == "") {
      alert("Message tidak boleh kosong"); // kondisi 5
    }
    //    else {
    //     alert("jika semua kondisi sudah terpenuhi"); // kondisi terakhir
    //   }
  
    //   kita dapat memberikan kondisi lebih dari 1 dengan tanda hubung
    //  && (dan), || or
  
    //   if (
    //     inputName == "" &&
    //     inputEmail == "" &&
    //     inputPhone == "" &&
    //     inputSubject == "" &&
    //     inputMessage == ""
    //   ) {
    //     alert("Input Form harus diisi"); // Kondisi 1
    //   }
  
    // untuk perkondisian kerangkanya tidak harus menggunakan if, else if, dan else
    // kita bisa menggunakan if aja, atau else if aja, atau if else aja
    // yang tidak boleh adalah untuk kondisi pertama tidak menggunakan if
    // jadi if adalah kode wajib yang digunakan untuk permulaan sebuah perkondisian
  
    //   ketika dalam perkondisian kondisi yang tsudah terpenuhi maka akan mengecek perkondisian dibawahnya
  
    console.log(
      `Name : ${name}\nEmail : ${email}\nPhone : ${phone}\nSubject : ${subject}\nMessage : ${message}`
    );
  
    let a = document.createElement("a");
    a.href = `mailto:${email}?subject=${subject}&body=Hello my name ${name}, and my number ${phone} ${message}`;
    a.click();
  }