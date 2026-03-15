const password = "psicope123";

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {

loginBtn.addEventListener("click", () => {

const input = document.getElementById("adminPassword").value;

if(input === password){

localStorage.setItem("adminAuth","true");

window.location.href = "panel.html";

}else{

document.getElementById("loginError").textContent = "Contraseña incorrecta";

}

});

}


// proteger panel
if(window.location.pathname.includes("panel.html")){

const auth = localStorage.getItem("adminAuth");

if(auth !== "true"){

window.location.href = "index.html";

}

}
