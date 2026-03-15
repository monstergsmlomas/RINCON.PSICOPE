const password = "psicope123";

const btn = document.getElementById("loginBtn");

btn.addEventListener("click", () => {

const input = document.getElementById("adminPassword").value;

if(input === password){

localStorage.setItem("adminAuth","true");

window.location.href = "panel.html";

}else{

document.getElementById("loginError").textContent = "Contraseña incorrecta";

}

});