document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone");

  dropZoneElement.addEventListener("click", (e) => {
    inputElement.click();
  });

  // solo nos dejara selecionar un elemento
  inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
      updateThumbnail(dropZoneElement, inputElement.files[0]);
    }
  });

  // cuando te pones encima se pone en linea continua
  dropZoneElement.addEventListener("dragover", (e) => {
    console.log("Evento dragover");
    // con esta linea evitamos que se abra la foto en grande y se quede en el cuadro
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone__over");
  });

  // cuando te alejas se pone otra vez en linea discontinua
  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      console.log("Evento " + type);
      dropZoneElement.classList.remove("drop-zone__over");
    });
  });

  dropZoneElement.addEventListener("drop", (e) => {
    console.log("Evento drop");
    // con esta linea evitamos que se abra la foto en grande y se quede en el cuadro
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
    }

    dropZoneElement.classList.remove("drop-zone__over");
  });
});

/**
 * actualiza la zona de los thumbnail on a drop element.
 *
 * @param {HTMLElement} dropZoneElement
 * @param {File} file
 */

function updateThumbnail(dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

  // para que las letras de dentro desaparezcan una vez metido el file
  if (dropZoneElement.querySelector(".drop-zone__prompt")) {
    dropZoneElement.querySelector(".drop-zone__prompt").remove();
  }

  // no han elemnto thumbnail y lo creamos
  if (!thumbnailElement) {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("drop-zone__thumb");
    dropZoneElement.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = file.name;

  // muestra thumnail para archivos de imagen
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url("${reader.result}")`;
    };
  } else {
    thumbnailElement.style.backgroundImage = null;
  }
}
