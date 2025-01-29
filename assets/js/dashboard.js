document.addEventListener("DOMContentLoaded", () => {

    const utilizadorNumero = sessionStorage.getItem("utilizadorNumero");
    const utilizadorTurma = sessionStorage.getItem("utilizadorTurma");
    const utilizadorNome = sessionStorage.getItem("utilizadorNome");
    const utilizadorAvatar = sessionStorage.getItem("utilizadorAvatar");
    const utilizadorCargo = sessionStorage.getItem("utilizadorCargo");

    if (!utilizadorNome || !utilizadorAvatar) {
        window.location.href = "../index.html"; return
    }

    document.getElementById("utilizadorNumero").textContent = utilizadorNumero;
    document.getElementById("utilizadorNome").textContent = utilizadorNome;
    document.getElementById("utilizadorCargo").textContent = utilizadorCargo;
    document.getElementById("utilizadorTurma").textContent = utilizadorTurma;

    const avatarImg = document.getElementById("utilizadorAvatar");
    avatarImg.src = utilizadorAvatar;
    avatarImg.alt = `Avatar de ${utilizadorNome}`;
});

document.addEventListener("click", (e) => {
    const menu = document.getElementById("dropdown");
    menu.classList.toggle("show", e.target.closest(".perfil-utilizador"));
});

document.getElementById("logout").addEventListener("click", () => {
    sessionStorage.clear()
    window.location.href = "../index.html"
});

// Array para armazenar as notas
let notas = [];

// Função para salvar a nota
function salvarNota(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value.trim();
    const unidadeCurricular = document.getElementById('uc').value;
    const nota = document.getElementById('nota').value;

    // Mapeia os valores do select para nomes completos
    const unidadesCurriculares = {
        'aed': 'Algoritmia e Estruturas de Dados',
        'fd': 'Fundamentos de Design',
        'mat': 'Matemática',
        'sc': 'Sistemas Computacionais',
        'tw': 'Tecnologias Web'
    };

    const unidadeCurricularNome = unidadesCurriculares[unidadeCurricular] || 'Desconhecida';

    // Verifica se todos os campos estão preenchidos
    if (!nome || !unidadeCurricular || !nota) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Adiciona a nota ao array
    notas.push({
        nome: nome,
        unidadeCurricular: unidadeCurricularNome,
        nota: nota
    });

    // Limpa o formulário
    document.getElementById('form-nota').reset();

    alert('Nota adicionada com sucesso!');
}

// Função para baixar as notas como CSV
function baixarNotas(event) {
    event.preventDefault(); // Previne o comportamento padrão do botão

    if (notas.length === 0) {
        alert('Não há notas para baixar.');
        return;
    }

    // Cria o conteúdo CSV
    let csvContent = "Nome,Unidade Curricular,Nota\n";
    notas.forEach(nota => {
        // Garante que todos os campos estão preenchidos antes de adicionar ao CSV
        if (nota.nome && nota.unidadeCurricular && nota.nota) {
            csvContent += `${nota.nome},${nota.unidadeCurricular},${nota.nota}\n`;
        }
    });

    // Cria um Blob com o conteúdo CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Cria um link para download e clica nele
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "notas.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.location.href = 'notas.html';
}

// Adiciona os event listeners quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-nota');
    if (form) {
        form.addEventListener('submit', salvarNota);
    }

    const botaoBaixar = document.querySelector('.btn-secondary');
    if (botaoBaixar) {
        botaoBaixar.addEventListener('click', baixarNotas);
    }
});
