const inputTarefa = document.querySelector(".input-tarefa");
const tarefas = document.querySelector(".tarefas");

document.addEventListener("click", (e) => {

    const el = e.target;
    
    if(el.classList.contains("btn-tarefa")){
        if(!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }

    if(el.classList.contains("excluir")){
       el.parentElement.remove();
       salvarTarefas()
    }

})


function criaLi() {
    const li = document.createElement("li");
    return li;
}

function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    criaBotaoApagar(li);
    limpaInput()
    salvarTarefas()
}

function limpaInput() {
    inputTarefa.value = "";
    inputTarefa.focus();
}

function criaBotaoApagar(li) {
    li.innerText += " ";
    const btnApgar = document.createElement("button");
    btnApgar.innerHTML = "Excluir";
    btnApgar.setAttribute("class", "excluir");
    btnApgar.setAttribute("title", "Excluir Tarefa");
    li.appendChild(btnApgar)
}

function salvarTarefas() {
    const getLi = tarefas.querySelectorAll("li");
    const listaDeTarefas = [];

    for (let tarefa of getLi ){
        
        const allTarefas = tarefa.innerText.replace("Excluir","").trim();
        listaDeTarefas.push(allTarefas);
    }

    const tarefaJSON = JSON.stringify(listaDeTarefas);

    localStorage.setItem("@Tarefas", tarefaJSON);
}

function carregartarefas() {
    const tarefasJSON = localStorage.getItem("@Tarefas");
    listaDeTarefas = JSON.parse(tarefasJSON);
    for ( let tarefa of listaDeTarefas ){
        criaTarefa(tarefa);
    }
}

carregartarefas();