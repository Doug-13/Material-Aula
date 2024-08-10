// Cria a função Header
import React, { useState } from 'react';
import logo from '../assets/Designer.jpeg'; // Substitua pelo caminho real da sua imagem
import './Header.css';

function Header() {
  // Define os estados para o nome de usuário e senha
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Função de login
  const handleLogin = (event) => {
    event.preventDefault();
    // Lógica de autenticação aqui
    console.log('Login:', username, password);
    // Limpa os campos após o login
    setUsername('');
    setPassword('');
  };

  return (
    <header className="Header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Casa dos desenvolvedores</h1> {/* Substitua pelo título desejado */}
      </div>
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>
      </div>
    </header>
  );
}

export default Header;
