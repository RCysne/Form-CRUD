// 'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => { 
    clearField();
    document.getElementById('modal')
    .classList.remove('active')

}
// ======== CRUD =========

// Armazenamento local (clientes fictício para teste inicial)
// const tempClient = [{
//     nome: "Ronaldo",
//     email: "ronaldo@ronaldo.com",
//     celular: "85999009999",
//     cidade: "Fortaleza"
// },
// {
//     nome: "Luciana",
//     email: "luciana@luciana.com",
//     celular: "85999999999",
//     cidade: "Fortaleza"
// },
// ]

// Funções
const getLocal = () => JSON.parse(localStorage.getItem('db_client') || '[]');
const setLocal = (dbClient) => localStorage.setItem('db_client', JSON.stringify(dbClient));

// 4 - DELETE
const deleteClient = (index) => {
    const dbClient = readClient(); // Lê o banco
    dbClient.splice(index, 1); // Retira o index indicado e somente 1  
    setLocal(dbClient); // Atualiza o banco
} 

// 3 - UPDATE
const updateClient = (index, client) => {
    const dbClient = readClient();
    dbClient[index] = client // Pega o que está no index e substitui pelo cliente novo
    setLocal(dbClient) // Atualiza o banco
}

// 2 - READ
const readClient = () => getLocal(); // Apenas lê 


// 1 - CREATE
const createClient = (client) => {

    // Consulta ao banco utilizada a cada inserção, então criar função
    // const db_client = JSON.parse(localStorage.getItem('db_client') || '[]');  --- trocado pela função getLocal
    const dbClient = getLocal();
    
    dbClient.push(client);
    
    // localStorage.setItem('db_client', JSON.stringify(db_client));
    setLocal(dbClient);
}


// Quando for acionado o updateClient, ele vai ler o que está no banco, fazer um forEach nos index adicionados no updateTable, criar a linha com o elemento html com os devidos valores capturados

// Linha tr criada, preenchida com os dados e apresentada no tbody
// Poderia usar em vez da id o ¨data-action¨ em cada elemento - data-action="edit-${index} - data-action="delete-${index}

const createRow = (client, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
    <td>${client.nome}</td>
    <td>${client.email}</td>
    <td>${client.celular}</td>
    <td>${client.cidade}</td>

    <td>
        <button type="button" class="button yellow" id="edit-${index}">Editar</button>
        <button type="button" class="button red" id="delete-${index}">Excluir</button>
    </td>
    ` // Escolher qual atributo usar na função editDelete (id ou data), e cada um com o index do botão
    // Dados guardados na memória

    // Apresentar os dados do newRow inserindo no elemento pai o newRow
    document.querySelector('#tableClient>tbody').appendChild(newRow);
}

// Limpando a tabela, pois a cada update ele repetia toda a tabela
// Passando por todas as linhas, pegando seu pai e apagando o filho
const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbClient = readClient();
    clearTable();
    dbClient.forEach(createRow); // Envia para o createRow, cliente por cliente
}

updateTable();





// ===== Eventos para capturar os dados do formulário
const isValidFields = () => {
    return document.getElementById('form').reportValidity(); // reportValidity é uma função nativa para verificação
}


// Limpando os campos
const clearField = () => {
    const fields = document.querySelectorAll('.modal-field');
    fields.forEach(field => field.value = '');
}

// Salvando os campos e pegando os valores digitados. depois criando o banco, fechando o modal já com a função de limpar os campos dentro
const saveClient = () => {
    if(isValidFields()) {
        const client = {
            nome: document.getElementById('name').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('mobile').value,
            cidade: document.getElementById('city').value
        }
        const index = document.getElementById('name').dataset.index;
        if(index == 'new') {
            createClient(client)
            updateTable();
            closeModal();
            console.log('Cadastro ok')
        } else {
            updateClient(index, client);
            updateTable();
            closeModal();
            console.log('Editando')
        }

    }
}

const fillFields = (client) => {
    document.getElementById('name').value = client.nome;
    document.getElementById('email').value = client.email;
    document.getElementById('mobile').value = client.celular;
    document.getElementById('city').value = client.cidade;
    document.getElementById('name').dataset.index = client.index;
}

const editClient = (index) => {
    const client = readClient()[index]; // Executa a leitura dos clientes, entregando um array e lendo o índice desejado
    client.index = index
    console.log(client);
    fillFields(client);
    openModal();
}

const editDelete = (event) => {
    if(event.target.type == 'button') {
        // posso utilizar o atributo data ou o id
        // console.log(event.target.dataset.action);
        const [action, index] = event.target.id.split('-');
        //console.log(action, index);

        if(action == 'edit') {
            console.log('Editando o cliente ' + index);
            editClient(index)
        } else {
            const client = readClient()[index]
            const response = confirm(`Deseja realmente excluir o cliente ${client.nome}`);
            if (response) {
                deleteClient(index);
                updateTable();
            }
            console.log('Deletando o cliente ' + index);
        }
        
    }


    // console.log(event.target.id);
}

// ====== Eventos =======

document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal);

document.getElementById('modalClose')
    .addEventListener('click', closeModal);

document.getElementById('salvar')
    .addEventListener('click', saveClient);

document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete);