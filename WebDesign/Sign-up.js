

function ValidateEmail(email)
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}
function Valid(){
    const email = document.getElementById('Email').value;
    const FirstName = document.getElementById('FirstName').value;
    const LastName = document.getElementById('LastName').value;
    const City = document.getElementById('City').value;
    const Age = document.getElementById('Age').value;
    const Password = document.getElementById('Password').value;
    const Gender = document.getElementById('Gender').value;
    if(!ValidateEmail(email)){
        return false;
    }else if(FirstName == null || FirstName == ""){
        alert("Please enter your first name")
        return false;
    }else if(LastName == null|| LastName == "" ){
        alert("Please enter your last name")
        return false;
    }else if(City == null || City == ""){
        alert("Please enter your city")
        return false;
    }else if(Age == null || Age == ""){
        alert("Please enter your age")
        return false;
    }else if(Password == null || Password ==""){
        alert("Please enter your password")
        return false;
    }else if(Gender == null || Gender ==""){
        alert("Please enter your gender")
        return false;
    }else
        return true;
}

function CheckStatus(){
    const Status = document.getElementById('Status').value;
   if(Status == null || Status =="") {
       alert("Please enter your status")
       return false;
   }else
       return true;
}



function SignUpTeacher(){
     if(Valid()){
         window.location.replace("SignAsTeacher.html");
     }
}

function SignUpStudent(){
     if(Valid()&&CheckStatus()){
         window.location.replace("HomePage.html");
     }
}