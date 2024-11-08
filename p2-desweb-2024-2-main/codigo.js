import { hex_sha256 } from './sha256-min.mjs';

// Variáveis e funções de suporte
let atletas = [];
console.log(hex_sha256("LIBERTADORES"));

function entrada() {
  sessionStorage.setItem('token', 'acesso');
  document.body.innerHTML = '';

  // Criação dos elementos com classes de estilo
  const container = document.createElement('div');
  container.id = 'container-entrada';
  container.classList.add('entrada-container');

  const header = document.createElement('div');
  header.classList.add('entrada-header');

  const titulo = document.createElement('h1');
  titulo.innerText = 'Bem-vindo!';
  titulo.classList.add('titulo');

  const descricao = document.createElement('p');
  descricao.innerText = 'Criado com objetivos didáticos para a disciplina Desenvolvimento Web do Ibmec Rio.';
  descricao.classList.add('descricao');

  header.appendChild(titulo);
  header.appendChild(descricao);

  const formContainer = document.createElement('div');
  formContainer.id = 'fake-form';
  formContainer.classList.add('form-container');

  const inputSenha = document.createElement('input');
  inputSenha.id = 'input-senha';
  inputSenha.type = 'password';
  inputSenha.placeholder = 'Digite a senha';
  inputSenha.classList.add('input-senha');

  const botaoEntrar = document.createElement('button');
  botaoEntrar.innerText = 'Entrar';
  botaoEntrar.classList.add('botao');
  botaoEntrar.onclick = () => {
    testa_senha(document.getElementById('input-senha').value);
  };

  const textoLogin = document.createElement('p');
  textoLogin.innerText = 'Efetue login com a senha: LIBERTADORES';
  textoLogin.classList.add('texto-login');

  formContainer.appendChild(inputSenha);
  formContainer.appendChild(botaoEntrar);
  formContainer.appendChild(textoLogin);

  container.appendChild(header);
  container.appendChild(formContainer);

  document.body.appendChild(container);
  document.body.classList.add('body-flex');
}

function configura_botao(botao) {
  botao.classList.add('botao-estilizado');
}

function testa_senha(senha) {
  const senhaCorreta = "LIBERTADORES";
  if (hex_sha256(senha) === hex_sha256(senhaCorreta)) {
    sessionStorage.setItem('token', 'validado');
    window.location.href = '/';
  } else {
    alert('Senha incorreta!');
  }
}

// Chamada inicial
entrada();

