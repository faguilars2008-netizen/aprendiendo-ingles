let avatarSeleccionado = false;
let avatarElegido = "";
let vozFemenina = null;

// Cargar voces del navegador
function cargarVoces() {

    const voces = speechSynthesis.getVoices();

    // Buscar voces femeninas en español
    vozFemenina = voces.find(voz =>
        voz.lang.includes("es") &&
        (
            voz.name.includes("Paulina") ||
            voz.name.includes("Helena") ||
            voz.name.includes("Laura") ||
            voz.name.includes("Sabina") ||
            voz.name.includes("Maria") ||
            voz.name.includes("Google español")
        )
    );

    // Si no encuentra una femenina usa cualquier voz en español
    if(!vozFemenina){
        vozFemenina = voces.find(voz => voz.lang.includes("es"));
    }
}

// Esperar voces
speechSynthesis.onvoiceschanged = cargarVoces;

cargarVoces();


// FUNCIÓN HABLAR
function hablar(texto){

    speechSynthesis.cancel();

    const mensaje = new SpeechSynthesisUtterance(texto);

    mensaje.voice = vozFemenina;
    mensaje.lang = "es-ES";

    mensaje.rate = 0.92;
    mensaje.pitch = 1.25;
    mensaje.volume = 1;

    speechSynthesis.speak(mensaje);
}


// SELECCIONAR AVATAR
function seleccionarAvatar(img){

    let avatars = document.querySelectorAll(".avatars img");

    avatars.forEach(a =>{
        a.classList.remove("seleccionado");
    });

    img.classList.add("seleccionado");

    avatarSeleccionado = true;

    // GUARDAR RUTA DEL AVATAR
    avatarElegido = img.src;
}


// BOTÓN INGRESAR
function ingresar(){

    let nombre = document.getElementById("nombre").value.trim();

    // CASO 1
    if(nombre === "" && !avatarSeleccionado){

        hablar("Debes escribir tu nombre y seleccionar un avatar");
    }

    // CASO 2
    else if(nombre === "" && avatarSeleccionado){

        hablar("Debes escribir tu nombre");
    }

    // CASO 3
    else if(nombre !== "" && !avatarSeleccionado){

        hablar("Debes seleccionar un avatar");
    }

    // CASO 4
    else{

        hablar("Bien hecho " + nombre);

        // GUARDAR DATOS
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("avatar", avatarElegido);

        // EFECTO SERPENTINAS
        confetti({
            particleCount: 300,
            spread: 180,
            origin: { y: 0.6 }
        });

        // IR A OTRA PÁGINA
        setTimeout(() => {
            window.location.href = "bienvenida.html";
        }, 2500);
    }
}