const fileInput = document.querySelector('#file-input');
const addButton = document.querySelector('#add-button');

addButton.addEventListener('click', async () => {
  const token = localStorage.getItem('token'); // Pega o token armazenado no localStorage

  const formData = new FormData();
  formData.append('file', fileInput.files[0]);

  const response = await fetch('/add', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
  } else {
    console.log(`Erro ${response.status}: ${response.statusText}`);
  }
});