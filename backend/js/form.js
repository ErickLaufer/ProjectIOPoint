window.onload = () => {
    document.getElementById("btn-enderecoBusca").addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const enderecoPredio = document.getElementById("enderecoPredio").value;

        fetch(`http://127.0.0.1:8080/buscaEndereco?predio=${enderecoPredio}`, {
            method: "GET",
        }).then(async(res) => {
            mostrarProdutosFlutuante(await res.json());
        }).catch((err) => {
            console.log(err);
        })
    });

    document.getElementById("btn-atualizaEndereco").addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const idProduto = document.getElementById("codigo_Produto").value;
        const idRua = document.getElementById("atualizaRua").value;
        const idPredio = document.getElementById("atualizaPredio").value;
        const idAndar = document.getElementById("atualizaAndar").value;
        const idEstoque = document.getElementById("atualizaEstoque").value;

        fetch(`http://127.0.0.1:8080/atualizaEndereco`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idProduto,
                idRua,
                idPredio,
                idAndar,
                idEstoque
            })
        }).then(async(res) => {
            console.log(await res.json());
        }).catch((err) => {
            console.log(err);
        });
    });

    document.getElementById("btn-consultaProduto").addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const id_produto = document.getElementById("consultaProduto").value;

        fetch(`http://127.0.0.1:8080/buscaEstoque?id_produto=${id_produto}`, {
            method: "GET",
        }).then(async(res) => {
            mostrarEstoqueProdutos(await res.json());
        }).catch((err) => {
            console.log(err);
        });
    });
};

function mostrarProdutosFlutuante(produtos) {
    // Remove o container existente se houver
    const existingContainer = document.getElementById('container-fluid');
    if (existingContainer) {
        existingContainer.remove();
    }

    // Cria o container flutuante
    const containerFlutuante = document.createElement('div');
    containerFlutuante.classList.add("container-fluid");
    containerFlutuante.id = "container-fluid";

    document.body.appendChild(containerFlutuante);

    const card = document.createElement('div');
    card.classList.add("card");
    containerFlutuante.appendChild(card);

    const cardHeader = document.createElement('div');
    cardHeader.classList.add("card-header");
    cardHeader.textContent = "Resultados";
    card.appendChild(cardHeader);

    const cardBody = document.createElement('div');
    cardBody.classList.add("card-body");
    card.appendChild(cardBody);

    const table = document.createElement('table');
    table.classList.add("table");
    cardBody.appendChild(table);

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const thId = document.createElement('th');
    thId.scope = "col";
    thId.textContent = "ID";

    const thDescricao = document.createElement('th');
    thDescricao.scope = "col";
    thDescricao.textContent = "Descrição";

    const thEstoque = document.createElement('th');
    thEstoque.scope = "col";
    thEstoque.textContent = "Estoque";

    const thPredio = document.createElement('th');
    thPredio.scope = "col";
    thPredio.textContent = "Prédio";

    headerRow.appendChild(thId);
    headerRow.appendChild(thDescricao);
    headerRow.appendChild(thEstoque);
    headerRow.appendChild(thPredio);
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    produtos.forEach(function(produto) {
        const row = document.createElement('tr');

        const cellId = document.createElement('td');
        cellId.textContent = produto.CODIGO;

        const cellDescricao = document.createElement('td');
        cellDescricao.textContent = produto.DESCRICAO;

        const cellEstoque = document.createElement('td');
        cellEstoque.textContent = `Mínimo: ${produto.ESTOQUEMINIMO ?? 0}, Máximo: ${produto.ESTOQUEMAXIMO ?? 0}`;

        const cellPredio = document.createElement('td');
        cellPredio.textContent = document.getElementById('enderecoPredio').value;

        row.appendChild(cellId);
        row.appendChild(cellDescricao);
        row.appendChild(cellEstoque);
        row.appendChild(cellPredio);
        tbody.appendChild(row);
    });
}

function mostrarEstoqueProdutos(produtos) {
    // Remove o container existente se houver
    const existingContainer = document.getElementById('fluid-container');
    if (existingContainer) {
        existingContainer.remove();
    }

    const containerMostraEstoque = document.createElement('div');
    containerMostraEstoque.classList.add("container-fluid");
    containerMostraEstoque.id = "fluid-container";

    document.body.appendChild(containerMostraEstoque);

    const listaProdutosEstoque = document.createElement("ul");
    listaProdutosEstoque.classList.add("list-group");
    containerMostraEstoque.appendChild(listaProdutosEstoque);

    produtos.forEach(function(produto) {
        const itemProdutoEstoque = document.createElement("li");
        itemProdutoEstoque.classList.add("list-group-item");
        itemProdutoEstoque.innerHTML = produto.ID + ' || ' + produto.DESCRICAO + ' || Estoque Mínimo: ' + (produto.MINIMO) + ' || Estoque Máximo: ' + (produto.MAXIMO) + ' || Saldo: ' + (produto.SALDO);
        listaProdutosEstoque.appendChild(itemProdutoEstoque);
    }); 
    
    
}