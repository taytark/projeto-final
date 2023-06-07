const materialModel = require("../models/materialModel");

async function fetchMaterials() {
  try {
    const response = await fetch('https://materiais-adaptados.onrender.com/materialstore/material/all', {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRheWFuZXRlc3RlQHJlcHJvZ3JhbWEuY29tIiwiaWF0IjoxNjcwNDQ1ODIwfQ.pXJMYlAhCFo_rhJB85LMY2bmwrnouRKU1pwq2hSqBy8' // Substitua YOUR_TOKEN_HERE pelo token de autenticação válido
      }
    });
    
    if (!response.ok) {
      throw new Error('Erro ao buscar os materiais.');
    }

    const materials = await materialModel.find();
    //const materials = await response.json();
    const materialsListElement = document.getElementById('materials-list');

    // Limpa a lista de materiais antes de adicionar os novos
    materialsListElement.innerHTML = '';

    // Itera sobre os materiais e exibe-os na página
    materials.forEach(material => {
      const materialElement = document.createElement('div');
       const arquivoURL = `https://s3-up-reprograma.s3.amazonaws.com/${material.nome}`
      materialElement.innerHTML = `
        <h3>${material.nome}</h3>
        <p>Descrição: ${material.description}</p>
        <p>Data de Upload: ${material.releaseDate}</p>
        <a href="${arquivoURL}">Download</a>
        <hr>
      `;
      materialsListElement.appendChild(materialElement);
    });
  } catch (error) {
    console.log(error);
    alert('Erro ao buscar os materiais.');
  }
}

// Chama a função para buscar os materiais ao carregar a página
window.onload = fetchMaterials;