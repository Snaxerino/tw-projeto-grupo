document.addEventListener("DOMContentLoaded", () => {
	
	const inputFile = document.getElementById("uploadNotas")
	const tabelaNotas = document.getElementById("tabela-notas")

	let notas = JSON.parse(sessionStorage.getItem("notas")) || []
	
	function exibirNotas() {
		tabelaNotas.innerHTML = ""
		notas.forEach(nota => {
			let row = document.createElement("tr")
			row.innerHTML = `<td>${nota.nome}</td><td>${nota.unidadeCurricular}</td><td class="nota">${nota.nota}</td>`
			tabelaNotas.appendChild(row)
		})
	}

	exibirNotas()

	document.getElementById("carregarNotas").addEventListener("click", () => {
		const file = inputFile.files[0]

		if (!file) {
			alert("Por favor, selecione um ficheiro CSV!")
			return
		}

		const reader = new FileReader()

		reader.onload = (e) => {
			const conteudo = e.target.result
			const linhas = conteudo.split("\n").slice(1)

			linhas.forEach(linha => {
				const [nome, unidadeCurricular, nota] = linha.split(",")

				if (nome && unidadeCurricular && nota) {
					notas.push({ nome: nome.trim(), unidadeCurricular: unidadeCurricular.trim(), nota: nota.trim() })
				}
			});

			sessionStorage.setItem("notas", JSON.stringify(notas))
			exibirNotas()
		};

		reader.readAsText(file)
	});
});