Roteiro Crud - localStorage

* Create
- Criar as funções para o get(pegar os dados no banco de dados e se não tiver um criar) e para o set (setar os dados no banco) no localStorage, transformando em JSON e String
- Criar um banco de dados fictício 
- Criar a função para ler o banco, fazer o push e setar os dados

* Read
- Criar função com o get para ler o banco

* Update
- Criar função pegando o index e o parâmetro
- Variável lendo o banco
- variável pegando o index recendo o parâmetro daquele index
- 





=============================================================
* Ex: Create

Ex: Objeto DB
const list_client = {
  chave: 'valor',
  chave: 'valor',
  chave: 'valor',
}

Ex: Função usando localStorage
const createClient = (client) => {
  localStorage.setItem('db_client', JSON.stringify(client))
}

createClient(list_client);

---------------------------------------------------------------------


1 - Linha 13, criação de uma função que irá receber um parâmetro com os dados(objeto) do cliente

2 - Linha 6, criação do array temporário que vai receber os dados dos clientes(objeto com chaves e valores definidos), para não alterar os dados diretamente do banco de dados

3 - Linha 14, na função  createClient(objeto como parâmetro)   de criação (no caso usando o localStorage), usar o método localStorage.setItem('chave', 'valor');

4 - Para o local receber os dados eles precisam ser transformados em string, então se usa: localStorage.setItem('db_client', JSON.stringify(client));

PROBLEMA: Dessa forma ele está substituindo e não adicionando. Para solucionar isso é preciso enviar o array com os dados dentro e não cada objeto em si.

-------------------------------------------------------------------------


const createClient = (client) => {
  const db_client = JSON.parse(localStorage.getItem('db_client') || '[]');
  db_client.push(client);
  localStorage.setItem('db_client', JSON.stringify(db_client));
}

5 - Linha 36, lê o que tem no banco de dados (localStorage(getItem)), transforma em JSON (parse), e armazena dentro da variável. E se não tiver o banco criado, criar o array para armazenar. 

6 - Linha 37 - Usa o push para adicionar no array

7 - Linha 38 - Li, acrescentei e agora vou enviar para o banco de dados, onde o db_client é a key. Transformo o dado, que é o value, em string para incluir no localStorage juntamente com os novos dados adicionados.

8 - Como a leitura do banco de dados e a transformação em JSON, e a inserção no banco de dados, e a transformação em string, será feita diversas vezes, então é melhor separar essas funções.

  const getLocal = () => JSON.parse(localStorage.getItem('db_client') || '[]');
  const setLocal = (dbClient) => localStorage.setItem('db_client', JSON.stringify(dbClient));

  const createClient(client) {
    const dbClient = getLocal();
    db_client.push(client);
    setLocal(dbClient);
  }

  Os parâmetros ficam assim, toda vez que for pegar os dados (get) acessar o db_client para consulta, e toda vez que for enviar dados (set), enviar o dbClient para o db_client