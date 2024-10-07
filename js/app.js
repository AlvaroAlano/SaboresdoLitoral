document.addEventListener('DOMContentLoaded', function () {
  // Variável para armazenar a quantidade total de itens no carrinho
  let cartCount = 0;

  // Seleciona todos os elementos necessários
  const categories = document.querySelectorAll('.category');
  const products = document.querySelectorAll('.product');
  const footerIcons = document.querySelectorAll('.footer-icon');
  const contentSections = document.querySelectorAll('.content');
  const incrementButtons = document.querySelectorAll('.increment');
  const decrementButtons = document.querySelectorAll('.decrement');
  const categoriesContainer = document.querySelector('.categories');
  const searchBar = document.getElementById('search-bar');
  const cartBadge = document.getElementById('cart-count'); // Badge para o carrinho

  // ===== Função para atualizar o número de itens no carrinho =====
  function updateCartCount() {
    if (cartCount > 0) {
      cartBadge.style.display = 'block'; // Mostra a bolinha se houver itens
      cartBadge.textContent = cartCount; // Atualiza o número de itens
    } else {
      cartBadge.style.display = 'none'; // Esconde a bolinha se não houver itens
    }
  }

  // ===== Função para atualizar o valor total do carrinho =====
  function updateCartTotal() {
    let total = 0;
    products.forEach(product => {
      const price = parseFloat(product.querySelector('.price').textContent.replace('R$', '').trim());
      const quantity = parseInt(product.querySelector('.quantity').textContent);
      total += price * quantity; // Calcula o total
    });
    document.querySelector('.total-price').textContent = `R$ ${total.toFixed(2)}`; // Atualiza o total na tela
  }

  // Inicializa o badge como oculto
  cartBadge.style.display = 'none';

  // ===== Função para alternar visibilidade da senha e ícone do olho =====
  const passwordInput = document.getElementById('password-input');
  const togglePassword = document.getElementById('toggle-password');

  if (passwordInput && togglePassword) {
    togglePassword.addEventListener('click', function () {
      // Alternar o tipo de input entre 'password' e 'text'
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);

      // Alternar o ícone
      const icon = type === 'password' ? './img/eye-show-svgrepo-com.svg' : './img/eye-off-svgrepo-com.svg';
      togglePassword.setAttribute('src', icon);
    });
  }

  // ===== Função para remover acentos e normalizar strings =====
  function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Remove acentos
  }

  // ===== Função para mostrar produtos com base na categoria selecionada =====
  function filterProducts(category) {
    products.forEach(product => {
      product.style.display = (product.getAttribute('data-category') === category) ? 'flex' : 'none';
    });
  }

  // ===== Função para lidar com a exibição de seções com base no ícone do rodapé clicado =====
  function showSection(target) {
    contentSections.forEach(section => {
      section.style.display = 'none';
    });
    document.getElementById(target).style.display = 'block';
  }

  // ===== Função para definir o ícone ativo no rodapé =====
  function setActiveIcon(targetIcon) {
    footerIcons.forEach(icon => icon.classList.remove('active'));
    targetIcon.classList.add('active');
  }

  // ===== Função para atualizar a quantidade de produto e o carrinho =====
  function updateQuantity(button, action) {
    const quantityElement = button.parentElement.querySelector('.quantity');
    let currentQuantity = parseInt(quantityElement.textContent); // Converte o texto em número

    if (action === 'increment') {
      currentQuantity++; // Aumenta o valor
      cartCount++; // Incrementa o número de itens no carrinho
    } else if (action === 'decrement' && currentQuantity > 0) {
      currentQuantity--; // Diminui o valor, mas não pode ser menor que 0
      cartCount--; // Decrementa o número de itens no carrinho
    }

    quantityElement.textContent = `${currentQuantity} kg`; // Atualiza o texto da quantidade
    updateCartCount(); // Atualiza o contador de itens no carrinho
    updateCartTotal(); // Atualiza o total do carrinho
  }

  // ===== Função para verificar a altura da janela e esconder o rodapé se o teclado estiver visível (para dispositivos móveis) =====
  function handleResize() {
    if (window.innerHeight < 500) {
      document.querySelector('footer').style.display = 'none'; // Esconde o footer quando o teclado está visível
    } else {
      document.querySelector('footer').style.display = 'flex'; // Mostra o footer novamente
    }
  }

  // ===== Eventos de Categoria =====
  categories.forEach(category => {
    category.addEventListener('click', function () {
      categories.forEach(cat => cat.classList.remove('active')); // Remove a classe 'active' de todas as categorias
      this.classList.add('active'); // Adiciona a classe 'active' à categoria clicada
      const selectedCategory = this.getAttribute('data-category');
      filterProducts(selectedCategory); // Filtra os produtos com base na categoria
    });
  });

  // ===== Eventos de Incremento/Decremento =====
  incrementButtons.forEach(button => {
    button.addEventListener('click', function () {
      updateQuantity(button, 'increment'); // Atualiza a quantidade para incrementar
    });
  });

  decrementButtons.forEach(button => {
    button.addEventListener('click', function () {
      updateQuantity(button, 'decrement'); // Atualiza a quantidade para decrementar
    });
  });

  // ===== Eventos do Rodapé =====
  footerIcons.forEach(icon => {
    icon.addEventListener('click', function (e) {
      e.preventDefault();
      const target = this.getAttribute('data-target');
      showSection(target); // Mostra a seção correta
      setActiveIcon(this); // Define o ícone como ativo
    });
  });

  // Exibe a tela inicial ao carregar a página
  showSection('inicio');

  // ===== Aplicar o filtro na categoria ativa por padrão ao carregar a página =====
  const activeCategory = document.querySelector('.category.active').getAttribute('data-category');
  filterProducts(activeCategory); // Aplica o filtro na categoria ativa por padrão

  // Adiciona evento de redimensionamento para ocultar o rodapé quando o teclado estiver visível
  window.addEventListener('resize', handleResize);

  // ===== Funcionalidade de Pesquisa com tratamento de acentos =====
  if (searchBar) {
    searchBar.addEventListener('input', function () {
      const searchTerm = normalizeString(searchBar.value.toLowerCase()); // Captura o termo pesquisado e remove acentos

      products.forEach(product => {
        const productName = normalizeString(product.querySelector('h3').textContent.toLowerCase());
        const productDescription = normalizeString(product.querySelector('p').textContent.toLowerCase());

        // Se o nome ou a descrição do produto inclui o termo de pesquisa, exibe o produto
        if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
          product.style.display = 'flex';
        } else {
          product.style.display = 'none';
        }
      });
    });
  }
});
