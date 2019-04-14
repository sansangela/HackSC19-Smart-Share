function login() {
 
    var email = document.getElementById("e-mail");
    var pass = document.getElementById("password");
 
    if (email.value == "") {
 
        alert("Please enter your e-mail address");
 
    } else if (pass.value  == "") {
 
        alert("Please enter your passward");
 
    } else if(email.value == "admin" && pass.value == "123456"){
 
        window.location.href="../myTrip/myTrip.html";
 
    } else {
 
        alert("Please enter the correct e-mail and passward!")
    }
}
