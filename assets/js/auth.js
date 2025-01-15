// auth.js

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".login");

    // Lista de utilizadores pré-definidos
    const users = [
        { username: "admin", password: "12345", role: "admin" },
        { username: "professor1", password: "prof123", role: "professor" },
        { username: "professor2", password: "prof456", role: "professor" },
        { username: "aluno1", password: "aluno123", role: "aluno" },
        { username: "aluno2", password: "aluno456", role: "aluno" }
    ];

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita o envio padrão do formulário

        const usernameInput = document.getElementById("utilizador").value;
        const passwordInput = document.getElementById("password").value;

        // Verifica se as credenciais fornecidas correspondem a algum utilizador
        const user = users.find(user => user.username === usernameInput && user.password === passwordInput);

        if (user) {

            // Redirecionar com base no tipo de utilizador
            switch (user.role) {
                case "admin":
                    window.location.href = "dashboard.html";
                    break;
                case "professor":
                    window.location.href = "professor_dashboard.html";
                    break;
                case "aluno":
                    window.location.href = "aluno_dashboard.html";
                    break;
                default :
                   console.log("failed");
            }
        } else {
            console.log("failed");
        }
    });
});