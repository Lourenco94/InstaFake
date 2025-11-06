// Importando o módulo 'express' e atribuindo-o à constante 'app'
const express = require('express');
const app = express();

// Importando o módulo 'http' e criando um servidor com ele
const http = require('http').createServer(app);

// Importando o módulo 'socket.io' e passando o servidor 'http' como parâmetro
const io = require('socket.io')(http);

// Rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Evento para quando o cliente se conecta ao servidor via Socket.io
io.on('connection', (socket) => {
  console.log('Usuário conectado');

  // Evento para mensagens do chat
  socket.on('chat message', (data) => {
    io.emit('chat message', data);
  });

  // Evento: usuário começou a digitar
  socket.on('digitando', (nome) => {
    socket.broadcast.emit('digitando', nome);
  });

  // Evento: usuário parou de digitar
  socket.on('parou digitar', () => {
    socket.broadcast.emit('parou digitar');
  });

  // Evento para quando o cliente se desconecta
  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});

// Inicia o servidor na porta 3000
http.listen(3000, () => {
  console.log('🚀 Servidor rodando na porta 3000');
  console.log('🌐 Acesse em: http://localhost:3000');
});
