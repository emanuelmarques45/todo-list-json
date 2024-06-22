const main = document.querySelector("main");

window.onload = (e) => {
  fetch("meusdados.json")
    .then((response) => response.json())
    .then((dados) => {
      let h2 = document.createElement("h2");
      h2.innerText = dados.descricao;
      main.appendChild(h2);

      let paragrafo = document.createElement("p");
      let texto = `Atividade desenvolvida para o curso  ${dados.curso} no ano de ${dados.ano}`;
      paragrafo.innerText = texto;
      main.appendChild(paragrafo);

      paragrafo = document.createElement("p");
      texto = `Aluno ${dados.autor}`;
      paragrafo.innerText = texto;
      main.appendChild(paragrafo);
    });
};
