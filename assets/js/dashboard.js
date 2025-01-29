document.addEventListener("DOMContentLoaded", () => {

    const utilizadorNumero = sessionStorage.getItem("utilizadorNumero")
    const utilizadorTurma = sessionStorage.getItem("utilizadorTurma")
    const utilizadorNome = sessionStorage.getItem("utilizadorNome")
    const utilizadorAvatar = sessionStorage.getItem("utilizadorAvatar")
    const utilizadorCargo = sessionStorage.getItem("utilizadorCargo")

    if (!utilizadorNome || !utilizadorAvatar) {
        window.location.href = "../index.html"; return
    }

    document.getElementById("utilizadorNumero").textContent = utilizadorNumero
    document.getElementById("utilizadorNome").textContent = utilizadorNome
    document.getElementById("utilizadorCargo").textContent = utilizadorCargo
    document.getElementById("utilizadorTurma").textContent = utilizadorTurma

    const avatarImg = document.getElementById("utilizadorAvatar")
    avatarImg.src = utilizadorAvatar
    avatarImg.alt = `Avatar de ${utilizadorNome}`
});

document.addEventListener("click", (e) => {
    const menu = document.getElementById("dropdown")
    menu.classList.toggle("show", e.target.closest(".perfil-utilizador"))
});

document.getElementById("logout").addEventListener("click", () => {
    sessionStorage.clear()
    window.location.href = "../index.html"
});

let notas = []

function salvarNota(event) {
    event.preventDefault()
    
    const nome = document.getElementById('nome').value.trim()
    const unidadeCurricular = document.getElementById('uc').value
    const nota = document.getElementById('nota').value

    const unidadesCurriculares = {
        'aed': 'Algoritmia e Estruturas de Dados',
        'fd': 'Fundamentos de Design',
        'mat': 'Matemática',
        'sc': 'Sistemas Computacionais',
        'tw': 'Tecnologias Web'
    };

    const unidadeCurricularNome = unidadesCurriculares[unidadeCurricular] || 'Desconhecida'

    if (!nome || !unidadeCurricular || !nota) {
        alert('Por favor, preencha todos os campos!')
        return;
    }

    notas.push({
        nome: nome,
        unidadeCurricular: unidadeCurricularNome,
        nota: nota
    });

    document.getElementById('form-nota').reset()

    alert('Nota adicionada com sucesso!')
}

function baixarNotas(event) {
    event.preventDefault()

    if (notas.length === 0) {
        alert('Não há notas para baixar.')
        return;
    }

    let csvContent = "Nome,Unidade Curricular,Nota\n";
    notas.forEach(nota => {
        if (nota.nome && nota.unidadeCurricular && nota.nota) {
            csvContent += `${nota.nome},${nota.unidadeCurricular},${nota.nota}\n`
        }
    })

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "notas.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    window.location.href = 'notas.html'
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-nota')
    if (form) {
        form.addEventListener('submit', salvarNota)
    }

    const botaoBaixar = document.querySelector('.btn-secondary')
    if (botaoBaixar) {
        botaoBaixar.addEventListener('click', baixarNotas)
    }
})
