// Importamos la interfaz ICity desde el módulo correspondiente
import { ICity } from "../model/ICity";

// Seleccionamos el formulario y los campos de entrada del documento HTML
const form = document.querySelector("form") as HTMLFormElement;
const city = document.querySelector("#new-city") as HTMLInputElement;
const country = document.querySelector("#new-country") as HTMLInputElement;
const cityDescription = document.querySelector("#newCity-description") as HTMLTextAreaElement;

// Recuperamos el array de ciudades desde el localStorage, si no existe, inicializamos un array vacío
const cityArray: ICity[] = JSON.parse(localStorage.getItem("cityArray") || "[]");

// Agregamos un evento al formulario para manejar el envío de datos
form.addEventListener("submit", (event: Event) => {
  event.preventDefault(); // Prevenimos el comportamiento por defecto del formulario

  // Validamos que los campos no estén vacíos
  if (!city.value.trim() || !country.value.trim() || !cityDescription.value.trim()) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  // Creamos un nuevo objeto de ciudad con los valores del formulario
  const newCity: ICity = {
    city: city.value,
    country: country.value,
    date: new Date(),
    cityDescription: cityDescription.value
  }

  // Añadimos la nueva ciudad al array
  cityArray.push(newCity);
  // Guardamos el array actualizado en el localStorage
  localStorage.setItem("cityArray", JSON.stringify(cityArray));
  // Reseteamos el formulario para limpiar los campos
  form.reset();
  // Mostramos una alerta al usuario confirmando que la ciudad se ha agregado
  alert("Se agregó la ciudad");
});
