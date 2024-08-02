import { ICity } from "../model/ICity";

// Selecciona los elementos del DOM
const form = document.querySelector("form") as HTMLFormElement | null;
const city = document.querySelector("#new-city") as HTMLInputElement | null;
const country = document.querySelector("#new-country") as HTMLInputElement | null;
const cityDescription = document.querySelector("#newCity-description") as HTMLTextAreaElement | null;
const imageUrl = document.querySelector("#new-image-url") as HTMLInputElement | null;

if (form && city && country && cityDescription && imageUrl) {
  // Obtiene las ciudades del localStorage y maneja posibles errores
  let cityArray: ICity[] = [];
  try {
    const storedCities = localStorage.getItem("cityArray");
    cityArray = storedCities ? JSON.parse(storedCities) : [];
  } catch (error) {
    console.error("Error parsing cityArray from localStorage", error);
  }

  form.addEventListener("submit", (event: Event) => {
    event.preventDefault();

    if (!city.value.trim() || !country.value.trim() || !cityDescription.value.trim()) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    // Validar la URL de la imagen
    try {
      new URL(imageUrl.value); // Verifica si la URL es válida
    } catch (_) {
      alert("URL inválida.");
      return;
    }

    const newCity: ICity = {
      city: city.value,
      country: country.value,
      date: new Date(),
      cityDescription: cityDescription.value,
      imageUrl: imageUrl.value // Usa imageUrl en lugar de url
    };

    // Añade la nueva ciudad al array y guarda en localStorage
    cityArray.push(newCity);
    try {
      localStorage.setItem("cityArray", JSON.stringify(cityArray));
    } catch (error) {
      console.error("Error saving cityArray to localStorage", error);
      alert("Error al guardar la ciudad.");
      return;
    }

    // Resetea el formulario y proporciona retroalimentación al usuario
    form.reset();
    alert("Se agregó la ciudad");
 window.location.href = "home.html";
  });
} else {
  console.error("Formulario o campos no encontrados.");
}
