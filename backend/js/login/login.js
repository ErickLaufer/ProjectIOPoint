document.addEventListener('DOMContentLoaded', function() {
    const { ipcRenderer } = require('electron');

    let isUpdating = false;

    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio do formulário padrão

        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        if (username === 'flop' && password === 'flop') {
            if(isUpdating === true) {
                document.getElementById('loginMessage').innerHTML = '<div class="alert alert-warning"> Atualização em andamento...</div>';
            }else{
            document.getElementById('loginMessage').innerHTML = '<div class="alert alert-success"> Carregando página... </div>';
            }   
            
            setTimeout(function() {
                window.location.href = 'index.html';
             }, 2000);
        } else {
            document.getElementById('loginMessage').innerHTML = '<div class="alert alert-danger" role="alert"> Verifique seus dados! </div>';
        }
    });
    ipcRenderer.on('update-message', (event, message) => {
        console.log('Mensagem recebida:', message); // Verifique se este log aparece
        document.getElementById('updateMessage').innerText = message;

        if(message.includes('Atualização disponível')) {
            isUpdating = true;
        }
    });
});