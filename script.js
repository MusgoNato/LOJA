document.addEventListener("DOMContentLoaded", function() {
    // Fetch retorna uma promessa que sera resolvida com a resposta da requisição
    fetch('produtos.json') 
        .then(response => {

            // Quando a promessa é resolvida, a variavel response contem a resposta da requisição em formato JSON
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo JSON');
            }
            return response.json();
        })
        .then(produtos => {
            const vitrine = document.getElementById('vitrine_produtos');
            produtos.forEach(produto => {
                const produtoDiv = document.createElement('div');
                    produtoDiv.classList.add('produto');
                    
                    const img = document.createElement('img');
                    img.src = produto.imagem;
                    img.alt = produto.alt;
                    
                    const span = document.createElement('span');
                    span.textContent = produto.nome;
                    
                    const p = document.createElement('p');
                    p.textContent = `Preço: ${produto.preco}`;
                    
                    // Container para os controles de quantidade
                    const quantidadeContainer = document.createElement('div');
                    quantidadeContainer.classList.add('quantidade-container');
                    
                    // Botão de decremento
                    const btnDecrement = document.createElement('button');
                    btnDecrement.type = 'button';
                    btnDecrement.textContent = '-';
                    btnDecrement.classList.add('btn-decrement');
                    
                    // Campo de quantidade
                    const quantidadeInput = document.createElement('input');
                    quantidadeInput.type = 'number';
                    quantidadeInput.value = 1;
                    quantidadeInput.min = 1;
                    quantidadeInput.id = `quantidade-${produto.nome}`;
                    
                    // Botão de incremento
                    const btnIncrement = document.createElement('button');
                    btnIncrement.type = 'button';
                    btnIncrement.textContent = '+';
                    btnIncrement.classList.add('btn-increment');
                    
                    // Função para atualizar a quantidade e o preço total
                    function updateQuantity(increment) {
                        let quantidade = parseInt(quantidadeInput.value);
                        quantidade += increment;
                        if (quantidade < 1) quantidade = 1;
                        quantidadeInput.value = quantidade;

                        const precoTotal = quantidade * parseFloat(produto.preco.replace(',', '.'));
                        link.href = `formulario_compra.html?produto=${encodeURIComponent(produto.nome)}&quantidade=${quantidade}&preco=${encodeURIComponent(precoTotal.toFixed(2))}`;
                    }
                    
                    btnDecrement.addEventListener('click', () => updateQuantity(-1));
                    btnIncrement.addEventListener('click', () => updateQuantity(1));
                    quantidadeInput.addEventListener('input', () => updateQuantity(0));
                    
                    // Adiciona os controles de quantidade ao container
                    quantidadeContainer.appendChild(btnDecrement);
                    quantidadeContainer.appendChild(quantidadeInput);
                    quantidadeContainer.appendChild(btnIncrement);
                    
                    const link = document.createElement('a');
                    link.classList.add('BBotao_compra');
                    link.href = `formulario_compra.html?produto=${encodeURIComponent(produto.nome)}&quantidade=1&preco=${encodeURIComponent(produto.preco)}`;
                    link.textContent = 'Comprar';
                    
                    produtoDiv.appendChild(img);
                    produtoDiv.appendChild(span);
                    produtoDiv.appendChild(p);
                    produtoDiv.appendChild(quantidadeContainer);
                    produtoDiv.appendChild(link);
                    vitrine.appendChild(produtoDiv);
            });
        })
        .catch(error => console.error('Erro ao carregar os produtos:', error));
});
