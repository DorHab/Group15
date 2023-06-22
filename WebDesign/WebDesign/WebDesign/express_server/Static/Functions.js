
  function displayform() {
  if (document.cookie != "") {
    var cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('User='))
      .split('=')[1];
    document.getElementById('login-btn').style.display = "none";
    document.getElementById('Logout').style.display = "block";
    document.getElementById('Name').style.display = "block";
    document.getElementById('UserFullName').innerText = "Hello, " + decodeURIComponent(cookieValue);
    const cookies = document.cookie.split(';'); // Split the cookies string into an array
    let type = null;
    let CookieMail = null;
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim(); // Remove any leading or trailing spaces
      if (cookie.startsWith('type=')) {
        type = cookie.substring('type='.length);
      }
      if (cookie.startsWith('Email')) {
        CookieMail = cookie.substring('Email='.length);
      }
    }
    if (type == 1) {
      document.getElementById('MyProfile').style.display = "block";
      const emailElement = document.getElementById('email');
      if (emailElement && emailElement.value) {
        const emailValue = emailElement.value;
        if (emailValue == decodeURIComponent(CookieMail)) {
          document.getElementById('edit-btn').style.display = "block";
        }
      }
    }else
    {
       document.getElementById('book-lesson-btn').style.display = "block";
    }
  }
}

  function deleteAllCookies() {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
  window.location.href = 'Login';
}

  function sendemail() {
          Email.send({
            Host: "smtp.elasticemail.com",
            Username: "Teacher4yousite@gmail.com",
            Password: "FB042C0003AF4E98863862DC398437E1CE1E",
            To: document.getElementById("teach").value,
            From: "Teacher4yousite@gmail.com",
            Subject: document.getElementById("subject").value,
            Body: "from : " + document.getElementById("from").value + "\n" + document.getElementById("message").value
          }).then(
              message => alert(message)
    );
  window.location.href = '/';
  }


  displayform()
