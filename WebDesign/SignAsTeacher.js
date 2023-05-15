
function ChoseZoomFrontal(){
    const Zoom = document.getElementById('Zoom');
    const Frontal = document.getElementById('Frontal');
    if(Zoom.checked == true || Frontal.checked == true){
        return true;
    }
    alert("Please choose Zoom/Frontal or Both")
    return false;
}

function GoodAt(){
    const Math3units = document.getElementById('Math3units');
    const Math4units = document.getElementById('Math4units');
    const Math5units = document.getElementById('Math5units');
    const English3units = document.getElementById('English3units');
    const English4units = document.getElementById('English4units');
    const English5units = document.getElementById('English5units');
    const Physics = document.getElementById('Physics');
    if(Math3units.checked == true || Math4units.checked == true || Math5units.checked == true || English3units.checked == true || English4units.checked == true || English5units.checked  == true || Physics.checked == true ){
        return true;
    }
    alert("Please choose topic")
    return false;
}

function FilledAll(){
    const About = document.getElementById('About').value;
    const Education = document.getElementById('Education').value;
    const Exp = document.getElementById('Exp').value;
    if(About == null || About == ""){
        alert("Please write about your self")
        return false;
    }else if(Education == null || Education == ""){
        alert("Please write about your education ")
        return false;
    }else if(Exp == null|| Exp == "" ){
        alert("Please share your experience")
        return false;
    }else if (ChoseZoomFrontal() == true && GoodAt() == true){
        return true;
    }
    return false;
}

function FinishSigningUp(){
    if(FilledAll()){
         window.location.href = "HomePage.html";
    }
}


