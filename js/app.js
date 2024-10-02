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