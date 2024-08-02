import { ICity } from "../model/ICity";

// Selecciona los elementos del DOM
const cityContainer = document.querySelector("#city-container") as HTMLDivElement | null;


// Obtiene las ciudades del localStorage y maneja posibles errores
let cityArray: ICity[] = [];
try {
  const storedCities = localStorage.getItem("cityArray");
  cityArray = storedCities ? JSON.parse(storedCities) : [];
} catch (error) {
  console.error("Error parsing cityArray from localStorage", error);
}

// Función para eliminar una ciudad
const deleteCity = (index: number) => {
  cityArray.splice(index, 1); // Elimina la ciudad del array
  localStorage.setItem("cityArray", JSON.stringify(cityArray)); // Actualiza el localStorage
  displayCities(); // Vuelve a mostrar las tarjetas actualizadas
};

// Función para editar una ciudad
const editCity = (index: number) => {
  const city = cityArray[index];
  const newName = prompt("Edit city name:", city.city) ?? city.city;
  const newCountry = prompt("Edit country:", city.country) ?? city.country;
  const newDate = prompt("Edit date (YYYY-MM-DD):", city.date) ?? city.date;
  const newDescription = prompt("Edit description:", city.cityDescription) ?? city.cityDescription;

  cityArray[index] = {
    ...city,
    city: newName,
    country: newCountry,
    date: newDate, // Aquí tratamos `date` como string
    cityDescription: newDescription
  };

  localStorage.setItem("cityArray", JSON.stringify(cityArray)); // Actualiza el localStorage
  displayCities(); // Vuelve a mostrar las tarjetas actualizadas
};

// Función para mostrar las ciudades
const displayCities = () => {
  if (!cityContainer) return;

  cityContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();

  cityArray.forEach((city, index) => {
    const cityCard = document.createElement("div");
    cityCard.className = "city-card";

    // Crear y añadir la imagen a la tarjeta
    const cityImg = document.createElement("img");
    cityImg.src = city.imageUrl;
    cityImg.alt = `${city.city} image`;
    cityImg.className = "city-image";
    cityImg.onerror = () => {
      console.error(`Error loading image: ${city.imageUrl}`);
      cityImg.src = "default-image.jpg";
    };

    // Crear un contenedor para la información de la ciudad
    const cityInfo = document.createElement("div");
    cityInfo.className = "city-info";

    const cityName = document.createElement("h2");
    cityName.textContent = city.city;

    const cityCountry = document.createElement("h3");
    cityCountry.textContent = city.country;

    const cityDate = document.createElement("p");
    // Asegúrate de que `city.date` es una cadena
    cityDate.textContent = new Date(city.date).toLocaleDateString();

    const cityDesc = document.createElement("p");
    cityDesc.textContent = city.cityDescription;

    // Crear y añadir los botones de editar y eliminar
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = () => editCity(index);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteCity(index);

    // Añadir los botones a la tarjeta
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    // Añadir los elementos al contenedor de información
    cityInfo.appendChild(cityName);
    cityInfo.appendChild(cityCountry);
    cityInfo.appendChild(cityDate);
    cityInfo.appendChild(cityDesc);
    cityInfo.appendChild(buttonContainer); // Añadir el contenedor de botones

    // Añadir la imagen y el contenedor de información a la tarjeta
    cityCard.appendChild(cityImg);
    cityCard.appendChild(cityInfo);

    fragment.appendChild(cityCard);
  });

  cityContainer.appendChild(fragment);
};

// Llama a la función para mostrar las ciudades
displayCities();