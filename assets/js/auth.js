function saveUserData(username, password) {
    const userData = {
        username: username,
        password: password,
    };

    localStorage.setItem('userData', JSON.stringify(userData));
    alert('Dados guardados com sucesso!');
}

function login(event) {
    event.preventDefault();

    const username = document.getElementById('utilizador').value;
    const password = document.getElementById('password').value;

    const storedData = JSON.parse(localStorage.getItem('userData'));

    if (storedData) {
        if (storedData.username === username && storedData.password === password) {
            alert('Login bem-sucedido!');
            window.location.href = '../pages/dashboard.html';
        } else {
            alert('Credenciais incorretas. Tente novamente.');
        }
    } else {
        alert('Credenciais erradas. Tente novamente.');
    }
}

document.querySelector('form.login').addEventListener('submit', login);

function registerUser(event) {
    event.preventDefault();

    const username = document.getElementById('utilizador').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        saveUserData(username, password);
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}