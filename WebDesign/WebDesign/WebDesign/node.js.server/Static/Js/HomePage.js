

function Valid(){
    const Topic = document.getElementById('Topic').value;
    const Location = document.getElementById('Location').value;
    const Class = document.getElementById('Class').value;
    if(Topic == null || Topic == ""){
        alert("Please enter your topic")
        return false;
    }else if(Location == null || Location == ""){
        alert("Please enter location")
        return false;
    }else if(Class == null|| Class == "" ){
        alert("Please enter how you want to learn")
        return false;
    }else
        return true;
}


function SearchTeacher(){
     if(Valid()){
         window.location.href = "SearchResult.html";
     }
}


