// 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

window.addEventListener("load", carregaInformacoesUsuario);

async function carregaInformacoesUsuario() {
    let dadosPerfil = await buscaInformacoesGitHub();
    carregaInformacoesNaTela(dadosPerfil);
}

function buscaInformacoesGitHub() {
    return axios
        .get("https://api.github.com/users/GuilhermeSAraujo")
        .then((response) => {
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
    campos.numeroRepositoriosPublicos.appendChild(document.createTextNode(dadosPerfil.numeroRepositoriosPublicos));
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

function formataData(dataParam){
    let data = new Date(dataParam);
    return data.toLocaleDateString("pt-BR");
}