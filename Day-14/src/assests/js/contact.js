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
    console.log(
      `Name : ${name}\nEmail : ${email}\nPhone : ${phone}\nSubject : ${subject}\nMessage : ${message}`
    );
  
    let a = document.createElement("a");
    a.href = `mailto:${email}?subject=${subject}&body=Hello my name ${name}, and my number ${phone} ${message}`;
    a.click();
  }