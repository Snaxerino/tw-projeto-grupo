const USERS = [
    { numero: 40342772, turma: "A e B", cargo: "Professor", nome: "Mário", password: "1234", avatar: "/assets/imgs/alunos/avatar.jpg"},
    { numero: 40240700, turma: "A e B", cargo: "Professor", nome: "João", password: "12345", avatar: "/assets/imgs/professores/avatar.jpg"},
]

const login = (event) => {
    event.preventDefault()
    const PRIVATE_PATH = "pages/dashboard.html"

    const utilizador = document.getElementById("utilizador").value.trim()
    const password = document.getElementById("password").value

    const utilizadorValido = USERS.find(credencial => 
        (credencial.nome === utilizador || String(credencial.numero) === utilizador) && 
        credencial.password === password
    );

    if (utilizadorValido) {
        sessionStorage.setItem("utilizadorNumero", utilizadorValido.numero)
        sessionStorage.setItem("utilizadorTurma", utilizadorValido.turma)
        sessionStorage.setItem("utilizadorNome", utilizadorValido.nome)
        sessionStorage.setItem("utilizadorAvatar", utilizadorValido.avatar)
        sessionStorage.setItem("utilizadorCargo", utilizadorValido.cargo)

        window.location.href = PRIVATE_PATH } else { alert("Credenciais inválidas. Tente novamente.")
    }
}

document.querySelector(".login").addEventListener("submit", login)