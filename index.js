window.addEventListener("load", carregaInformacoesUsuario);
const botaoPesquisar = document.getElementById("pesquisar");
botaoPesquisar.addEventListener("click", carregaInformacoesPesquisa);
const modal = document.getElementById("modal");
const fecharModal = document.getElementById("fecharModal");
fecharModal.addEventListener("click", fechaModal);

async function carregaInformacoesUsuario() {
	let dadosPerfil = await buscaInformacoesGitHub();
	carregaInformacoesNaTela(dadosPerfil);
}

function buscaInformacoesGitHub() {
	return axios.get("https://api.github.com/users/GuilhermeSAraujo").then((response) => {
		let dadosResposta = response.data;
		return {
			usuario: dadosResposta.login,
			avatarUrl: dadosResposta.avatar_url,
			url: dadosResposta.html_url,
			nome: dadosResposta.name,
			empresa: dadosResposta.company,
			localizacao: dadosResposta.location,
			descricao: dadosResposta.bio,
			dataCriacao: dadosResposta.created_at,
			numeroSeguidores: dadosResposta.followers,
			numeroSeguindo: dadosResposta.following,
			numeroRepositoriosPublicos: dadosResposta.public_repos,
		};
	});
}

function carregaInformacoesNaTela(dadosPerfil) {
	let campos = buscaCamposHtml();
	campos.avatarUrl.href = dadosPerfil.url;
	campos.avatar.src = dadosPerfil.avatarUrl;
	campos.nome.textContent = dadosPerfil.nome;
	campos.usuario.textContent = "@" + dadosPerfil.usuario;
	campos.numeroSeguidores.appendChild(document.createTextNode(dadosPerfil.numeroSeguidores));
	campos.numeroSeguindo.appendChild(document.createTextNode(dadosPerfil.numeroSeguindo));
	campos.descricao.textContent = dadosPerfil.descricao;
	campos.empresa.appendChild(document.createTextNode(dadosPerfil.empresa));
	campos.localizacao.appendChild(document.createTextNode(dadosPerfil.localizacao));
	campos.numeroRepositoriosPublicos.appendChild(
		document.createTextNode(dadosPerfil.numeroRepositoriosPublicos)
	);
	campos.dataCriacao.appendChild(document.createTextNode(formataData(dadosPerfil.dataCriacao)));
}

function buscaCamposHtml() {
	return {
		avatarUrl: document.getElementById("avatarUrl"),
		avatar: document.getElementById("avatar"),
		nome: document.getElementById("nome"),
		usuario: document.getElementById("usuario"),
		numeroSeguidores: document.getElementById("numeroSeguidores"),
		numeroSeguindo: document.getElementById("numeroSeguindo"),
		descricao: document.getElementById("descricao"),
		empresa: document.getElementById("empresa"),
		localizacao: document.getElementById("localizacao"),
		numeroRepositoriosPublicos: document.getElementById("numeroRepositoriosPublicos"),
		dataCriacao: document.getElementById("dataCriacao"),
	};
}

function formataData(dataParam) {
	let data = new Date(dataParam);
	return data.toLocaleDateString("pt-BR");
}

function carregaInformacoesPesquisa(evento) {
	evento.preventDefault();
	const palavrasPesquisa = document.getElementById("barraDePesquisa").value;
	buscaResultadosGitHub(palavrasPesquisa);
}

function buscaResultadosGitHub(palavrasPesquisa) {
	let query = `https://api.github.com/search/users?q=${palavrasPesquisa}`;
	axios.get(query).then((response) => {
		mostraModal(response.data);
	});
}

function mostraModal(dados) {
	preencheDadosBusca(dados);
	modal.style.display = "block";
	console.log(modal)
}

function preencheDadosBusca(dados) {
	let colunaEsquerda = document.getElementById("colunaEsquerda");
	let colunaDireita = document.getElementById("colunaDireita");
	let infoUsuarios = dados.items;
	infoUsuarios.forEach((usuario, index) => {
		if (index < 6) {
			let card = document.createElement("div");
			card.className = "card";
			card.style.width = "10.5rem";
			let avatarUsuario = document.createElement("img");
			avatarUsuario.className = "card-img-top";
			avatarUsuario.src = usuario.avatar_url;
			avatarUsuario.style.width = "65%";
			let corpoCard = document.createElement("div");
			corpoCard.className = "card-body";
			let tituloCard = document.createElement("a");
			tituloCard.className = "card-title";
			tituloCard.textContent = usuario.login;
			tituloCard.href = usuario.html_url;
			tituloCard.target = "_blank";
			let linkRepositorios = document.createElement("a");
			linkRepositorios.textContent = "Repositórios";
			linkRepositorios.href = usuario.html_url + "?tab=repositories";
			linkRepositorios.target = "_blank";
			let quebraLinha = document.createElement("br");
			corpoCard.appendChild(tituloCard);
			corpoCard.appendChild(quebraLinha);
			corpoCard.appendChild(linkRepositorios);
			card.appendChild(avatarUsuario);
			card.appendChild(corpoCard);
			if (index % 2 == 0) {
				colunaEsquerda.appendChild(card);
			} else {
				colunaDireita.appendChild(card);
			}
		}
	});
}

function fechaModal() {
	modal.style.display = "none";
	let colunaEsquerda = document.getElementById("colunaEsquerda");
	let colunaDireita = document.getElementById("colunaDireita");
	colunaEsquerda.innerHTML = "";
	colunaDireita.innerHTML = "";
}