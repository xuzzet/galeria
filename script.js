// Função para mostrar explicação ao clicar nas fotos
function showExplanation(title, text, containerIndex) {
    const modal = document.getElementById('explanation-modal');
    const titleElement = document.getElementById('explanation-title');
    const textElement = document.getElementById('explanation-text');
    const deleteButton = document.getElementById('delete-button');

    // Define o título e texto na modal
    titleElement.textContent = title;
    textElement.textContent = text;

    // Adiciona um botão de exclusão
    deleteButton.innerHTML = '<button onclick="deletePhoto(' + containerIndex + ')">Excluir Foto</button>';

    // Exibe a modal
    modal.style.display = 'block';
}

// Função para deletar a foto
function deletePhoto(containerIndex) {
    const gallery = document.querySelector('.grid-container');

    // Confirmação para evitar exclusão acidental
    const confirmation = confirm("Tem certeza de que deseja excluir esta foto?");

    if (confirmation) {
        // Remove o contêiner da galeria
        const containers = gallery.getElementsByClassName('photo-container');
        if (containerIndex >= 0 && containerIndex < containers.length) {
            containers[containerIndex].remove();
        }

        // Fecha a modal
        closeExplanation();
    }
}

// Função para fechar a modal
function closeExplanation() {
    const modal = document.getElementById('explanation-modal');

    // Fecha a modal
    modal.style.display = 'none';
}

// Adicione nova foto
function addNewPhoto() {
    const urlInput = document.getElementById('new-photo-url');
    const descriptionInput = document.getElementById('new-photo-description');
    const gallery = document.querySelector('.grid-container');

    // Validar se os campos estão preenchidos
    if (urlInput.value.trim() === '' || descriptionInput.value.trim() === '') {
        alert('Por favor, preencha todos os campos.');
        return false;
    }

    // Crie um novo contêiner
    const newPhotoContainer = document.createElement('div');
    newPhotoContainer.className = 'photo-container';
    newPhotoContainer.innerHTML = `<h2>Nova Foto</h2><img src="${urlInput.value}" alt="${descriptionInput.value}">`;
    newPhotoContainer.onclick = function () {
        showExplanation('Nova Foto', descriptionInput.value, gallery.children.length);
    };

    // Adicione o novo contêiner à grade
    gallery.appendChild(newPhotoContainer);

    // Limpar os campos do formulário
    urlInput.value = '';
    descriptionInput.value = '';

    return false; // Impede o envio do formulário padrão
}

// Função para ampliar a imagem ao clicar
function zoomImage(event) {
    const clickedImage = event.target;

    // Verifica se o elemento clicado é uma imagem dentro de um contêiner de foto
    if (clickedImage.tagName === 'IMG' && clickedImage.parentElement.classList.contains('photo-container')) {
        clickedImage.classList.toggle('zoomed');
    }
}

// Variável para armazenar a imagem ampliada
let zoomedImage = null;

// Função para ampliar a imagem ao clicar
function zoomImage(event) {
    const clickedImage = event.target;

    // Verifica se o elemento clicado é uma imagem dentro de um contêiner de foto
    if (clickedImage.tagName === 'IMG' && clickedImage.parentElement.classList.contains('photo-container')) {
        if (zoomedImage) {
            // Se já houver uma imagem ampliada, remove-a
            zoomedImage.classList.remove('zoomed');
            zoomedImage = null;
        } else {
            // Amplia a imagem clicada
            clickedImage.classList.add('zoomed');
            zoomedImage = clickedImage;
        }
    }
}

// Função para fechar a imagem ampliada
function closeZoomedImage() {
    if (zoomedImage) {
        zoomedImage.classList.remove('zoomed');
        zoomedImage = null;
    }
}
