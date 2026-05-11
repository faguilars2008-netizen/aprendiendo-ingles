// Obtener datos guardados
let nombre = localStorage.getItem("nombre");
let avatar = localStorage.getItem("avatar");

// Validar si existe nombre y avatar
if(nombre && avatar){

    // Mostrar bienvenida
    document.getElementById("bienvenida").innerHTML = `
        <h1>¡Bienvenido/a ${nombre}!</h1>
        <img src="${avatar}" width="250">
    `;

    // Voz de bienvenida
    let mensaje = new SpeechSynthesisUtterance(`Bienvenido ${nombre}`);
    mensaje.lang = "es-ES";

    speechSynthesis.speak(mensaje);

}else{

    document.getElementById("bienvenida").innerHTML = `
        <h2>Faltan datos del usuario</h2>
    `;
}
// BOTÓN CONTINUAR
function siguientePagina(){

    window.location.href = "aprende.html";

}