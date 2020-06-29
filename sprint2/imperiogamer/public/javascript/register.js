const form = document.querySelector("#registro-usuario");
const nombre = document.querySelector("#name");
const apellido = document.querySelector("#apellido");
const direccion = document.querySelector("#direccion");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const error = document.querySelector("#error");

let mensajes = [];
let input = document.querySelectorAll("input");

function inputRojo(elemento) {
  elemento.classList.add("input-error");
}

function inputVerde(elemento) {
  elemento.classList.add("input-exito");
}

function validarNombre(nombreUsuario) {
  if (nombreUsuario === "" || nombreUsuario === null) {
    mensajes.push("Debe ingresar un nombre.");
    inputRojo(nombre);
  } else {
    inputVerde(nombre);
  }
}

function validarApellido(apellidoUsuario) {
  if (apellidoUsuario === "" || apellidoUsuario === null) {
    mensajes.push("Debe ingresar un apellido.");
    inputRojo(apellido);
  } else {
    inputVerde(apellido);
  }
}

function validarDireccion(direccionUsuario) {
  if (direccionUsuario === "" || direccionUsuario === null) {
    mensajes.push("Debe ingresar una dirección.");
    inputRojo(direccion);
  } else {
    inputVerde(direccion);
  }
}

function validarEmail(emailUsuario) {
  if (emailUsuario === "" || email === null) {
    mensajes.push("Debe ingresar un correo electrónico válido.");
    inputRojo(email);
  } else {
    inputVerde(email);
  }
}

function validarPassword(passwordUsuario) {
  if (passwordUsuario === "" || passwordUsuario === null) {
    mensajes.push("Debe ingresar una contraseña.");
    inputRojo(password);
    password.value = "";
  } else if (passwordUsuario.length < 8) {
    mensajes.push("La contraseña debe tener al menos 8 caracteres.");
    inputRojo(password);
    password.value = "";
  } else {
    inputVerde(password);
  }
}

function crearUl() {
  error.innerHTML = "<ul id= 'lista'></ul>";
  console.log(error.innerHTML);
  console.log(error.innerHTML == "<ul id= 'lista'></ul>");
}

function crearLi() {
  let lista = document.querySelector("#lista");
  console.log(lista);
  mensajes.forEach(function (element) {
    lista.innerHTML += `<li class="msg-error">${element}</li>`;
  });
  mensajes = [];
}

form.addEventListener("submit", function (e) {
  validarNombre(nombre.value);
  validarApellido(apellido.value);
  validarDireccion(direccion.value);
  validarEmail(email.value);
  validarPassword(password.value);

  if (mensajes.length > 0) {
    e.preventDefault();
    crearUl();
    let ul = document.getElementById("lista");
    ul.insertAdjacentHTML(
      "beforebegin",
      "<h4 class='mensaje-error'>Error</h4>"
    );
    crearLi();
  }
});
