// Função para carregar todos os filmes ao abrir a página
function carregarTodosFilmes() {
    mostrarLoading(true);

    fetch("http://localhost:8080/apis/list-movies")
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar filmes');
            }
            return response.json();
        })
        .then(filmes => {
            renderizarResultados(filmes);
            atualizarContadorResultados(filmes.length);
        })
        .catch(error => {
            console.error('Erro ao carregar filmes:', error);
            document.getElementById('resultado').innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-exclamation-circle text-6xl text-red-500 mb-4"></i>
                    <h3 class="text-2xl font-semibold text-gray-400">Erro ao carregar filmes</h3>
                    <p class="text-gray-500 mt-2">Tente novamente mais tarde</p>
                </div>
            `;
            atualizarContadorResultados(0);
        })
        .finally(() => {
            mostrarLoading(false);
        });
}

// Função de pesquisa por palavra-chave
function pesquisarFilmesKW() {
    const keyword = document.getElementById('keyword').value;
    if (!keyword) {
        alert('Por favor, digite um título para pesquisar');
        return;
    }

    mostrarLoading(true);

    fetch("http://localhost:8080/apis/list-keyword?keyword=" + keyword)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na pesquisa');
            }
            return response.json();
        })
        .then(filmes => {
            renderizarResultados(filmes);
        })
        .catch(error => {
            console.error('Erro na pesquisa:', error);
            document.getElementById('resultado').innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-exclamation-circle text-6xl text-red-500 mb-4"></i>
                    <h3 class="text-2xl font-semibold text-gray-400">Erro ao buscar filmes</h3>
                    <p class="text-gray-500 mt-2">Tente novamente mais tarde</p>
                </div>
            `;
            atualizarContadorResultados(0);
        })
        .finally(() => {
            mostrarLoading(false);
        });
}

// Função de pesquisa por gênero
function pesquisarFilmesGenero() {
    const genero = document.getElementById('genero').value;
    if (!genero) {
        alert('Por favor, selecione um gênero');
        return;
    }

    mostrarLoading(true);

    fetch("http://localhost:8080/apis/list-genre/" + genero)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na pesquisa');
            }
            return response.json();
        })
        .then(filmes => {
            renderizarResultados(filmes);
        })
        .catch(error => {
            console.error('Erro na pesquisa:', error);
            document.getElementById('resultado').innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-exclamation-circle text-6xl text-red-500 mb-4"></i>
                    <h3 class="text-2xl font-semibold text-gray-400">Erro ao buscar filmes</h3>
                    <p class="text-gray-500 mt-2">Tente novamente mais tarde</p>
                </div>
            `;
            atualizarContadorResultados(0);
        })
        .finally(() => {
            mostrarLoading(false);
        });
}

// Função de pesquisa por ano
function pesquisarFilmesAno() {
    const anoInicio = document.getElementById('anoInicio').value;
    const anoFim = document.getElementById('anoFim').value;

    if (!anoInicio || !anoFim) {
        alert('Por favor, preencha o ano inicial e final');
        return;
    }

    mostrarLoading(true);

    fetch(`http://localhost:8080/apis/list-year/${anoInicio}/${anoFim}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na pesquisa');
            }
            return response.json();
        })
        .then(filmes => {
            renderizarResultados(filmes);
        })
        .catch(error => {
            console.error('Erro na pesquisa:', error);
            document.getElementById('resultado').innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-exclamation-circle text-6xl text-red-500 mb-4"></i>
                    <h3 class="text-2xl font-semibold text-gray-400">Erro ao buscar filmes</h3>
                    <p class="text-gray-500 mt-2">Tente novamente mais tarde</p>
                </div>
            `;
            atualizarContadorResultados(0);
        })
        .finally(() => {
            mostrarLoading(false);
        });
}

// Função principal para renderizar resultados em cards
function renderizarResultados(filmes) {
    const resultadoDiv = document.getElementById('resultado');

    if (!filmes || filmes.length === 0) {
        resultadoDiv.innerHTML = `
            <div class="col-span-full text-center py-16">
                <div class="bg-gray-800 rounded-2xl p-12 max-w-md mx-auto">
                    <i class="fas fa-film text-7xl text-gray-600 mb-6"></i>
                    <h3 class="text-3xl font-semibold text-gray-300 mb-3">Nenhum filme encontrado</h3>
                    <p class="text-gray-500 text-lg mb-6">Não encontramos filmes com os critérios selecionados.</p>
                    <button onclick="carregarTodosFilmes()" class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg transition duration-300">
                        <i class="fas fa-undo mr-2"></i>Ver todos os filmes
                    </button>
                </div>
            </div>
        `;
        return;
    }




    let html = '';
    filmes.forEach((filme, index) => {
        // Pega os valores com os nomes corretos da sua API
        const titulo = filme.title || 'Título não disponível';
        const ano = filme.year || 'Ano não disponível';
        const genero = filme.category?.nome || 'Gênero não disponível';
        const thumb = filme.thumb || null;
        const poster = filme.poster || null;
        const id = filme.id || index;

        // Atraso na animação baseado no índice
        const delay = index * 0.1;

        html += `
            <div class="group relative bg-gray-800 rounded-2xl overflow-hidden hover:transform hover:scale-105 hover:shadow-2xl transition-all duration-500 animate-fadeIn" 
                 style="animation-delay: ${delay}s">
                
                <!-- Badge de ano -->
                <div class="absolute top-4 right-4 z-10">
                    <span class="bg-yellow-400 text-gray-900 text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                        ${ano}
                    </span>
                </div>
                
                <!-- Poster do filme -->
                <div class="relative aspect-[2/3] bg-gradient-to-br from-gray-700 to-gray-900 overflow-hidden">
                    ${thumb ?
            `<img src="/thumbs/${thumb}" alt="${titulo}" 
                              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>` :
            `<div class="w-full h-full flex flex-col items-center justify-center p-6">
                            <i class="fas fa-film text-7xl text-gray-600 mb-4"></i>
                            <span class="text-gray-500 text-center">Poster não disponível</span>
                        </div>`
        }
                    
                    <!-- Overlay com informações adicionais -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div class="p-6 w-full">
                            <div class="flex items-center space-x-2 text-sm text-gray-300 mb-3">
                                <i class="fas fa-tag text-yellow-400"></i>
                                <span class="bg-gray-800 bg-opacity-75 px-3 py-1 rounded-full">${genero}</span>
                            </div>
                            
                            ${poster ? `
                               <button onclick="abrirPoster('/posters/${poster}')"
                                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-300 text-center mb-2">
                                    <i class="fas fa-image mr-2"></i>Ver Poster
                                </button>
                            ` : ''}
                            
                            <button onclick="verDetalhes(${id})" 
                                    class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-4 rounded-xl transition duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                                <i class="fas fa-info-circle"></i>
                                <span>Ver Detalhes</span>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Informações do filme (sempre visíveis) -->
                <div class="p-5">
                    <h3 class="font-bold text-lg text-white mb-2 line-clamp-2 group-hover:text-yellow-400 transition-colors duration-300">
                        ${titulo}
                    </h3>
                    <div class="flex items-center justify-between text-sm">
                        <div class="flex items-center space-x-3 text-gray-400">
                            <span class="flex items-center">
                                <i class="fas fa-calendar-alt mr-1 text-yellow-400"></i>
                                ${ano}
                            </span>
                            <span class="flex items-center">
                                <i class="fas fa-tag mr-1 text-yellow-400"></i>
                                ${genero}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    resultadoDiv.innerHTML = html;
    atualizarContadorResultados(filmes.length);
}

// Função para limpar filtros e voltar para todos os filmes
function limparFiltros() {
    const filtros = document.getElementById('filtros');
    if (filtros) filtros.value = '';
    filtrarFilmes();

    // Limpa os campos de input
    const keyword = document.getElementById('keyword');
    const anoInicio = document.getElementById('anoInicio');
    const anoFim = document.getElementById('anoFim');

    if (keyword) keyword.value = '';
    if (anoInicio) anoInicio.value = '';
    if (anoFim) anoFim.value = '';

    // Recarrega todos os filmes
    carregarTodosFilmes();
}

// Função para mostrar loading durante as requisições
function mostrarLoading(mostrar) {
    const spinner = document.getElementById('loading-spinner');
    const resultados = document.getElementById('resultado');

    if (!spinner) return;

    if (mostrar) {
        spinner.classList.remove('hidden');
        if (resultados) resultados.classList.add('opacity-50');
    } else {
        spinner.classList.add('hidden');
        if (resultados) resultados.classList.remove('opacity-50');
    }
}

// Função para atualizar o contador de resultados
function atualizarContadorResultados(quantidade) {
    const contador = document.getElementById('contador-resultados');
    if (contador) {
        if (quantidade > 0) {
            contador.textContent = `${quantidade} ${quantidade === 1 ? 'filme' : 'filmes'}`;
            contador.classList.remove('hidden');
        } else {
            contador.classList.add('hidden');
        }
    }
}

// Função para mostrar/esconder seções de busca
function filtrarFilmes() {
    const filtro = document.getElementById('filtros').value;

    // Esconde todas as seções
    const secaoTitulo = document.getElementById('secao-titulo');
    const secaoGenero = document.getElementById('secao-genero');
    const secaoAno = document.getElementById('secao-ano');

    if (secaoTitulo) secaoTitulo.style.display = 'none';
    if (secaoGenero) secaoGenero.style.display = 'none';
    if (secaoAno) secaoAno.style.display = 'none';

    // Mostra a seção selecionada
    if (filtro === 'titulo' && secaoTitulo) {
        secaoTitulo.style.display = 'block';
        secaoTitulo.classList.add('animate-slideDown');
    } else if (filtro === 'genero' && secaoGenero) {
        secaoGenero.style.display = 'block';
        secaoGenero.classList.add('animate-slideDown');
    } else if (filtro === 'ano' && secaoAno) {
        secaoAno.style.display = 'block';
        secaoAno.classList.add('animate-slideDown');
    }
}

// Função para mudar visualização (grid/lista)
function mudarVisualizacao(tipo) {
    const resultado = document.getElementById('resultado');
    if (tipo === 'grid') {
        resultado.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';
    }
}

//popover
function abrirPoster(src) {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.85)';
    overlay.innerHTML = `<img src="${src}" style="max-height:90vh;max-width:90vw;border-radius:12px"/>`;
    overlay.onclick = () => overlay.remove();
    document.body.appendChild(overlay);
}

// Adiciona animações CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-fadeIn {
        animation: fadeIn 0.6s ease-out forwards;
        opacity: 0;
    }
    
    .animate-slideDown {
        animation: slideDown 0.4s ease-out forwards;
    }
    
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Carrega os gêneros se existir a função
    if (typeof carregaGenero === 'function') {
        carregaGenero();
    }

    // Inicializa com a seção de busca escondida
    filtrarFilmes();

    // Carrega todos os filmes
    carregarTodosFilmes();
});