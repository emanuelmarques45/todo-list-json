const botaoAdiciona = document.querySelector("button");
const inputTarefa = document.querySelector("#tarefa");
const lista = document.querySelector("#lista");

//cria um listener para monitorar o clique do botão
botaoAdiciona.addEventListener("click", adicionaTarefa);

//função que vai adicionar a tarefa à lista
async function adicionaTarefa() {
  //tamanho mínimo de 3 caracteres
  if (inputTarefa.value.length > 3) {
    const response = await fetch("http://localhost:3000/novaTarefa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "descricao": "teste" }),
    });

    const dados = await response.json();

    console.log(dados);

    let itemDiv = document.createElement("div");
    itemDiv.classList.add("container-tarefa");
    let li = document.createElement("li");
    li.innerText = inputTarefa.value;
    itemDiv.appendChild(li);
    let btnContainer = document.createElement("div");
    let btnFeito = document.createElement("button");
    btnFeito.id = "feito";
    btnFeito.innerHTML = '<i class="fas fa-check"></i>';
    let btnDeleta = document.createElement("button");
    btnDeleta.innerHTML = '<i class="fas fa-trash"></i>';
    btnDeleta.id = "deleta";
    btnContainer.append(btnFeito, btnDeleta);
    itemDiv.appendChild(btnContainer);
    lista.appendChild(itemDiv);
    inputTarefa.value = "";
  }
}

inputTarefa.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    adicionaTarefa();
  }
});

lista.addEventListener("click", marcaFeito);

function marcaFeito(e) {
  if (e.target.nodeName == "BUTTON" && e.target.id == "feito") {
    console.log(
      e.target.parentElement.parentElement
        .querySelector("li")
        .classList.toggle("completa")
    );
  }
}

lista.addEventListener("click", deleta);

function deleta(e) {
  if (e.target.nodeName == "BUTTON" && e.target.id == "deleta") {
    e.target.parentElement.parentElement.remove();
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("http://localhost:3000/tarefas");
  const tarefas = await response.json();

  tarefas.forEach((tarefa) => {
    let itemDiv = document.createElement("div");
    itemDiv.classList.add("container-tarefa");
    let li = document.createElement("li");
    li.innerText = tarefa.descricao;
    itemDiv.appendChild(li);
    let btnContainer = document.createElement("div");
    let btnFeito = document.createElement("button");
    btnFeito.id = "feito";
    btnFeito.innerHTML = '<i class="fas fa-check"></i>';
    let btnDeleta = document.createElement("button");
    btnDeleta.innerHTML = '<i class="fas fa-trash"></i>';
    btnDeleta.id = "deleta";
    btnContainer.append(btnFeito, btnDeleta);
    itemDiv.appendChild(btnContainer);
    lista.appendChild(itemDiv);
  });
});
