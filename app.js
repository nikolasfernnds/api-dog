/******************************************************************************
 * Objetivo: Arquivo para produzir a buscar de raças com uma API
 * Data: 09/09/2025
 * Desenvolvedor: Nikolas Fernandes
 * Versão: 1.0
******************************************************************************/

'use strict';

const input = document.getElementById('breed-input');
const button = document.getElementById('search-btn');
const galeria = document.getElementById('galeria');
const mensagemDeErro = document.getElementById('mensagemDeErro');

async function buscarImagens(raca) {
  const url = `https://dog.ceo/api/breed/${raca}/images`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'error') {
      throw new Error('Raça não encontrada');
    }

    exibirImagens(data.message.slice(0, 100));
    mensagemDeErro.textContent = '';

  } catch (erro) {
    errorMessage.textContent = erro.message || 'Erro ao buscar imagens.';
    galeria.innerHTML = '';
  }
}

function exibirImagens(listaDeImagens) {
  galeria.innerHTML = '';

  listaDeImagens.forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = 'Imagem de cachorro';
    galeria.appendChild(img);
  });
}

button.addEventListener('click', () => {
  const raca = input.value.toLowerCase().trim();
  
  if (raca) {
    buscarImagens(raca);
  } else {
    mensagemDeErro.textContent = 'Digite uma raça válida.';
    galeria.innerHTML = '';
  }
});
