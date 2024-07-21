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
                p.textContent = produto.preco;
                
                const link = document.createElement('a');
                link.classList.add('BBotao_compra');
                link.href = `formulario_compra.html?produto=${encodeURIComponent(produto.nome)}&preco=${encodeURIComponent(produto.preco)}`;
                link.textContent = 'Comprar';
                
                produtoDiv.appendChild(img);
                produtoDiv.appendChild(span);
                produtoDiv.appendChild(p);
                produtoDiv.appendChild(link);
                vitrine.appendChild(produtoDiv);
            });
        })
        .catch(error => console.error('Erro ao carregar os produtos:', error));
});
