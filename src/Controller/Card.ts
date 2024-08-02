import { ICity } from "../Model/ICity";
import '../scss/Card.scss';

export const Card = (props: ICity, temperature: number): HTMLElement => {
    let { id, city, country, image } = props;
    const cardContainer = document.createElement("article") as HTMLElement;
    cardContainer.className = "card-container";

    const img = document.createElement("img") as HTMLImageElement;
    img.className = "img-card";

    const infoContainer = document.createElement("div") as HTMLElement;
    infoContainer.className = "cardInfo-container";

    // Contenedor del título de la ciudad y país
    const cityCountryContainer = document.createElement("div") as HTMLElement;
    cityCountryContainer.className = "city-country-container";

    // Contenedor de los iconos de edición y eliminación
    const iconsContainer = document.createElement("div") as HTMLElement;
    iconsContainer.className = "icons-container";

    // Ícono de lápiz para editar
    const editContainer = document.createElement("span");
    editContainer.className = "edit-container";
    const editIcon = document.createElement("i") as HTMLElement;
    editIcon.className = "bi bi-pencil-fill pencil-icon";
    editIcon.title = "Editar ciudad y país";

    editIcon.addEventListener("click", () => {
        const newCity = prompt("Introduce el nuevo nombre de la ciudad:", city);
        if (newCity !== null) {
            cardTitle.innerText = newCity;
        }

        const newCountry = prompt("Introduce el nuevo nombre del país:", country);
        if (newCountry !== null) {
            cardCountry.innerText = newCountry;
        }
    });

    editContainer.append(editIcon);

    // Ícono de cruz para eliminar
    const crossContainer = document.createElement("span");
    crossContainer.className = "cross-container";
    crossContainer.innerHTML = `<i product-id="${id}" class="bi bi-x-circle-fill"></i>`;

    // Agrega el event listener para eliminar la tarjeta y hacer la solicitud DELETE
    crossContainer.addEventListener("click", async () => {
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta ciudad?");
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:3000/cities/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    cardContainer.remove();
                } else {
                    console.error('Error al eliminar la ciudad del servidor');
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        }
    });

    // Añadir iconos al contenedor de iconos
    iconsContainer.append(editContainer, crossContainer);

    const cardTitle = document.createElement("h4") as HTMLHeadElement;
    cardTitle.className = "card-title";
    cardTitle.innerText = city;

    const cardCountry = document.createElement("p") as HTMLParagraphElement;
    cardCountry.innerText = country;

    // Añadir iconos al contenedor de ciudad y país
    cityCountryContainer.append(iconsContainer, cardTitle, cardCountry);

    const tempContainer = document.createElement("div") as HTMLElement;
    tempContainer.className = "temp-container";

    const temp = document.createElement("p") as HTMLElement;
    temp.innerText = `${String((temperature - 273.15).toFixed(2))} °C`;

    tempContainer.append(temp);

    img.src = image;

    infoContainer.append(cityCountryContainer, tempContainer);
    cardContainer.append(img, infoContainer);

    return cardContainer;
}
