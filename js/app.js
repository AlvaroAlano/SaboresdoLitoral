document.addEventListener('DOMContentLoaded', function() {
  // Seleciona todas as categorias e produtos
  const categories = document.querySelectorAll('.category');
  const products = document.querySelectorAll('.product');

  // Função para mostrar produtos com base na categoria selecionada
  function filterProducts(category) {
    // Se a categoria for "all", mostrar todos os produtos
    if (category === 'all') {
      products.forEach(product => {
        product.style.display = 'flex'; // Mostrar o produto
      });
    } else {
      products.forEach(product => {
        // Verifica a categoria do produto
        if (product.getAttribute('data-category') === category) {
          product.style.display = 'flex'; // Mostrar o produto
        } else {
          product.style.display = 'none'; // Esconder o produto
        }
      });
    }
  }

  // Adiciona um event listener para cada categoria
  categories.forEach(category => {
    category.addEventListener('click', function() {
      // Remove a classe 'active' de todas as categorias
      categories.forEach(cat => cat.classList.remove('active'));
      
      // Adiciona a classe 'active' à categoria clicada
      this.classList.add('active');

      // Pega a categoria clicada
      const selectedCategory = this.getAttribute('data-category');

      // Chama a função para filtrar os produtos
      filterProducts(selectedCategory);
    });
  });
});

window.addEventListener('resize', function() {
  if (window.innerHeight < 500) {  // Defina o tamanho da janela ao detectar o teclado
    document.querySelector('footer').style.display = 'none'; // Esconde o footer
  } else {
    document.querySelector('footer').style.display = 'flex'; // Mostra o footer novamente
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Função para aumentar ou diminuir a quantidade
  const updateQuantity = (button, action) => {
    const quantityElement = button.parentElement.querySelector('.quantity');
    let currentQuantity = parseInt(quantityElement.textContent); // Converte o texto em número

    if (action === 'increment') {
      currentQuantity++; // Aumenta o valor
    } else if (action === 'decrement' && currentQuantity > 0) {
      currentQuantity--; // Diminui o valor, mas não pode ser menor que 0
    }

    quantityElement.textContent = `${currentQuantity} kg`; // Atualiza o texto da quantidade
  };

  // Seleciona todos os botões de incremento e decremento
  const incrementButtons = document.querySelectorAll('.increment');
  const decrementButtons = document.querySelectorAll('.decrement');

  // Adiciona eventos de clique para os botões de incremento
  incrementButtons.forEach(button => {
    button.addEventListener('click', function() {
      updateQuantity(button, 'increment');
    });
  });

  // Adiciona eventos de clique para os botões de decremento
  decrementButtons.forEach(button => {
    button.addEventListener('click', function() {
      updateQuantity(button, 'decrement');
    });
  });
});