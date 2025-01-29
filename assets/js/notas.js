document.addEventListener("DOMContentLoaded", () => {
	// Referência ao input de ficheiro e ao botão de carregar
	const inputFile = document.getElementById("uploadNotas");
	const tabelaNotas = document.getElementById("tabela-notas");

	// Carregar notas salvas no sessionStorage
	let notas = JSON.parse(sessionStorage.getItem("notas")) || [];
	
	// Função para exibir notas na tabela
	function exibirNotas() {
		tabelaNotas.innerHTML = "";
		notas.forEach(nota => {
			let row = document.createElement("tr");
			row.innerHTML = `<td>${nota.nome}</td><td>${nota.unidadeCurricular}</td><td class="nota">${nota.nota}</td>`;
			tabelaNotas.appendChild(row);
		});
	}

	// Chamada inicial para exibir notas salvas
	exibirNotas();

	// Evento para carregar um ficheiro CSV
	document.getElementById("carregarNotas").addEventListener("click", () => {
		const file = inputFile.files[0]; // Obter o ficheiro

		if (!file) {
			alert("Por favor, selecione um ficheiro CSV!");
			return;
		}

		const reader = new FileReader();

		reader.onload = (e) => {
			const conteudo = e.target.result;
			const linhas = conteudo.split("\n").slice(1); // Remove cabeçalho

			linhas.forEach(linha => {
				const [nome, unidadeCurricular, nota] = linha.split(",");

				if (nome && unidadeCurricular && nota) {
					notas.push({ nome: nome.trim(), unidadeCurricular: unidadeCurricular.trim(), nota: nota.trim() });
				}
			});

			sessionStorage.setItem("notas", JSON.stringify(notas)); // Guardar no sessionStorage
			exibirNotas(); // Atualizar tabela

			alert("Notas carregadas com sucesso!");
		};

		reader.readAsText(file);
	});
});