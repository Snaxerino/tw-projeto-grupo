document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const logoutButton = document.getElementById('logoutButton');
    const message = document.getElementById('message');
    const welcomeMessage = document.getElementById('welcomeMessage');

    // Função para simular o armazenamento em um arquivo JSON
    function saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Função para carregar usuários do armazenamento local
    function loadUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : {};
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const users = loadUsers();

            if (users[username] && users[username].password === password) {
                localStorage.setItem('currentUser', username);
                window.location.href = 'private.html';
            } else {
                message.textContent = 'Usuário ou senha inválidos';
                message.style.color = 'red';
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const users = loadUsers();

            if (users[username]) {
                message.textContent = 'Usuário já existe';
                message.style.color = 'red';
            } else {
                users[username] = { password };
                saveUsers(users);
                message.textContent = 'Usuário registrado com sucesso';
                message.style.color = 'green';
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            }
        });
    }

    if (logoutButton) {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            window.location.href = 'index.html';
        } else {
            welcomeMessage.textContent = `Bem-vindo, ${currentUser}!`;
        }

        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }
});