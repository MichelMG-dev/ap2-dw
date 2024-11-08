// Import the sha256 hashing function
import { hex_sha256 } from './sha256-min.mjs';

// Array to store the athlete data
let atletas = [];

// Console log the SHA256 hash of the password
console.log(hex_sha256('LIBERTADORES'));

// Function to display the login screen
const entrada = () => {
  sessionStorage.setItem('página', 'entrada');
  document.body.innerHTML = '';

  const containerEntrada = document.createElement('div');
  containerEntrada.id = 'container-entrada';

  const title = document.createElement('h1');
  title.textContent = 'Atletas Botafogo 2024-1';
  containerEntrada.appendChild(title);

  const logoutButton = document.createElement('button');
  logoutButton.innerText = 'Sair';
  logoutButton.classList.add('button');
  logoutButton.onclick = () => {
    sessionStorage.removeItem('token');
    window.location.pathname = '/';
  };
  containerEntrada.appendChild(logoutButton);

  const instructions = document.createElement('p');
  instructions.innerHTML = 'Efetue login com a senha: LIBERTADORES';
  containerEntrada.appendChild(instructions);

  document.body.appendChild(containerEntrada);
};

// Function to handle the login process
const testa_senha = senha => {
  const correctPassword = 'ce855f48b7422de36b50512a9a0a06a59d4f2f6efac6f439456777a396773cc1';
  if (hex_sha256(senha) === correctPassword) {
    sessionStorage.setItem('token', 'um_token');
    window.location.pathname = '/jogadores';
  } else {
    alert('Senha incorreta!');
  }
};

// Function to fetch athlete data
const pega_elenco = async caminho => {
  const url = 'https://botafogo-atletas.mange.li/2024-1';
  const response = await fetch(url + '/' + caminho);
  const data = await response.json();
  return data;
};

// Function to display athlete selection screen
const jogadores = () => {
  sessionStorage.setItem('página', 'jogadores');
  document.body.innerHTML = '';

  const headerContainer = document.createElement('div');
  headerContainer.id = 'header-container';
  headerContainer.classList.add('container-entrada'); // Reusing class for consistency

  const headerTitle = document.createElement('h1');
  headerTitle.textContent = 'Atletas do Botafogo em 2024-1';
  headerContainer.appendChild(headerTitle);

  const logoutButton = document.createElement('button');
  logoutButton.innerText = 'Sair';
  logoutButton.classList.add('button');
  logoutButton.onclick = () => {
    sessionStorage.removeItem('token');
    window.location.pathname = '/';
  };
  headerContainer.appendChild(logoutButton);
  document.body.appendChild(headerContainer);

  const choicesContainer = document.createElement('div');
  choicesContainer.id = 'barra-escolhas';

  const groupDropdown = document.createElement('select');
  groupDropdown.id = 'select-plantel';
  groupDropdown.onchange = e => {
    handleElenco(e.target.value);
  };
  
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.textContent = 'Escolha o elenco';
  groupDropdown.appendChild(defaultOption);

  const groups = [
    { titulo: 'Masculino', caminho: 'masculino' },
    { titulo: 'Feminino', caminho: 'feminino' },
    { titulo: 'Elenco Completo', caminho: 'all' }
  ];

  groups.forEach(group => {
    const groupOption = document.createElement('option');
    groupOption.textContent = group.titulo;
    groupOption.value = group.caminho;
    groupDropdown.appendChild(groupOption);
  });
  choicesContainer.appendChild(groupDropdown);
  document.body.appendChild(choicesContainer);

  const athleteContainer = document.createElement('div');
  athleteContainer.id = 'container-jogadores';
  document.body.appendChild(athleteContainer);

  const loadingMessage = document.createElement('h2');
  loadingMessage.id = 'texto-espera';
  loadingMessage.textContent = 'Carregando...';
  document.body.appendChild(loadingMessage);
};

const handleElenco = async caminho => {
  const loadingMessage = document.getElementById('texto-espera');
  const athleteContainer = document.getElementById('container-jogadores');

  loadingMessage.style.display = 'grid';
  athleteContainer.style.display = 'none';

  const data = await pega_elenco(caminho);
  showAthletes(data, athleteContainer);
  atletas = data;

  athleteContainer.style.display = 'grid';
  loadingMessage.style.display = 'none';
};

// Function to display athletes
const showAthletes = (athletes, container) => {
  container.innerHTML = '';
  athletes.forEach(athlete => {
    const athleteCard = document.createElement('div');
    athleteCard.classList.add('athlete-card');
    athleteCard.dataset.id = athlete.id;

    const athleteImage = document.createElement('img');
    athleteImage.src = athlete.imagem;
    athleteImage.alt = `Imagem de ${athlete.nome_completo}, atleta de futebol do Botafogo.`;
    athleteCard.appendChild(athleteImage);

    const athleteName = document.createElement('h2');
    athleteName.textContent = athlete.nome;
    athleteCard.appendChild(athleteName);

    const athletePosition = document.createElement('h3');
    athletePosition.textContent = 'Posição';
    athleteCard.appendChild(athletePosition);

    athleteCard.onclick = () => {
      window.location.pathname = `/detalhes.html?id=${athlete.id}`;
    };

    container.appendChild(athleteCard);
  });
};

// Window load event listener
window.onload = () => {
  if (sessionStorage.getItem('token')) {
    jogadores();
  } else {
    entrada();
  }
};
