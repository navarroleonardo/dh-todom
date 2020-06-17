const tarefas = [
    {
        id: 10,
        prioridade: 1,
        texto: "Ir ao mercado",
        feita: true
    },
    {
        id: 20,
        prioridade: 1,
        texto: "Beber energético",
        feita: false
    },
    {
        id: 22,
        prioridade: 2,
        texto: "Cortar o cabelo",
        feita: true
    },
    {
        id: 25,
        prioridade: 3,
        texto: "Gravar vídeo",
        feita: false
    },
];

function mostrarTabela(tarefa) {
    // capturando a table
    const table = document.getElementById('table');

    // criar uma nova linha e adicioná-la a tabela
    const novaLinha = document.createElement('tr');

    // dar a essa linha a classe adequada
    novaLinha.className = tarefa.feita ? 'done' : '';

    // criar um input checkbox
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');

    // marcar o input checkbox caso necessario
    checkbox.checked = tarefa.feita;
    checkbox.addEventListener('click', (evt) => {

        // altera o status da tarefa no array
        tarefa.feita = !tarefa.feita;
        console.log(tarefa);

        // capturando a linha referente a tarefa a ser removida
        let tr = evt.target.parentNode.parentNode;

        // alterando classe da linha no DOM
        tr.classList.toggle('done');
    })

    // criar uma celula
    const tdCheckbox = document.createElement('td');

    // adicionar o input a celula criada
    tdCheckbox.appendChild(checkbox);

    // criar a celula de texto e adicionar a ela o texto
    const tdTexto = document.createElement('td');
    let strPrioridade = ['baixa', 'media', 'alta'][tarefa.prioridade - 1];
    tdTexto.innerText = '[' + strPrioridade + '] ' + tarefa.texto;

    // criar um elemento 'i' da classe material-icons contendo o texto delete
    const icon = document.createElement('i');
    icon.classList.add('material-icons');
    icon.innerText = 'delete';
    icon.addEventListener('click', (evt) => {

        if (!confirm("Tem certeza que deseja remover a tarefa?")) {
            return;
        }

        // remove do array de tarefas
        removerTarefa(tarefa.id);

        // capturando a linha referente a tarefa a ser removida
        let tr = evt.target.parentNode.parentNode;

        // removendo da DOM
        tr.remove();

        // mostrar mensagem de sucesso
        let sucessoDelete = document.querySelector('.sucesso-delete');
        sucessoDelete.style.opacity = 1;

        setTimeout(() => {
            sucessoDelete.style.opacity = 0;
        }, 3000)
    });

    // criar uma celula
    const tdIcon = document.createElement('td');

    // adicionar à celula criada o elemento i
    tdIcon.appendChild(icon);

    // adicionar as três celulas criadas a linha criada
    novaLinha.appendChild(tdCheckbox);
    novaLinha.appendChild(tdTexto);
    novaLinha.appendChild(tdIcon);

    // adicionar a linha a tabela
    table.appendChild(novaLinha);

}

function mostrarTarefas(tarefas) {

    const table = document.getElementById('table');
    table.innerText = '';

    for (const tarefa of tarefas) {
        mostrarTabela(tarefa);
    }
}

function removerTarefa(id) {
    let pos = tarefas.findIndex(tarefa => tarefa.id == id);
    tarefas.splice(pos, 1);
}

const form = document.getElementById('form');

form.addEventListener('submit', (evt) => {
    // removendo comportamento padrão do botão
    evt.preventDefault();

    // armazenando texto do input
    const input = document.getElementById('tf_2do');
    let novaTarefa = input.value;

    let regex = /#[1-3]\ /;

    // declarando prioridade e texto
    if (regex.test(novaTarefa)) {
        var prioridade = Number(novaTarefa[1]);
        var texto = novaTarefa.substr(3);
    } else {
        var prioridade = 1;
        var texto = novaTarefa;
    }

    // declarando id
    let id = tarefas[tarefas.length - 1]?.id + 1 || 1;

    // armazenando a nova tarefa no array
    tarefas.push({
        id,
        prioridade,
        texto,
        feita: false
    });

    // adicionando tarefa ao DOM
    mostrarTabela(tarefas[tarefas.length - 1]);

    // mostrar mensagem de sucesso
    let sucessoCreate = document.querySelector('.sucesso-create');
    sucessoCreate.style.opacity = 1;

    setTimeout(() => {
        sucessoCreate.style.opacity = 0;
    }, 3000)
});

mostrarTarefas(tarefas);