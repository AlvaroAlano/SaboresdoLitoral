document.addEventListener('DOMContentLoaded', function () {
  // Seleciona todas as categorias e produtos
  const categories = document.querySelectorAll('.category');
  const products = document.querySelectorAll('.product');
  const footerIcons = document.querySelectorAll('.footer-icon');
  const contentSections = document.querySelectorAll('.content');
  const incrementButtons = document.querySelectorAll('.increment');
  const decrementButtons = document.querySelectorAll('.decrement');

  // ===== Alternar visibilidade da senha e ícone do olho =====
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

  /**
   * Função para mostrar produtos com base na categoria selecionada
   * @param {string} category 
   */
  function filterProducts(category) {
    products.forEach(product => {
      // Verifica a categoria do produto
      product.style.display = (product.getAttribute('data-category') === category) ? 'flex' : 'none';
    });
  }

  /**
   * Função para lidar com a exibição de seções com base no ícone do rodapé clicado
   * @param {string} target 
   */
  function showSection(target) {
    contentSections.forEach(section => {
      section.style.display = 'none';
    });
    document.getElementById(target).style.display = 'block';
  }

  /**
   * Função para definir o ícone ativo no rodapé
   * @param {HTMLElement} targetIcon 
   */
  function setActiveIcon(targetIcon) {
    footerIcons.forEach(icon => icon.classList.remove('active'));
    targetIcon.classList.add('active');
  }

  /**
   * Função para atualizar a quantidade de produto
   * @param {HTMLElement} button 
   * @param {string} action 
   */
  function updateQuantity(button, action) {
    const quantityElement = button.parentElement.querySelector('.quantity');
    let currentQuantity = parseInt(quantityElement.textContent); // Converte o texto em número

    if (action === 'increment') {
      currentQuantity++; // Aumenta o valor
    } else if (action === 'decrement' && currentQuantity > 0) {
      currentQuantity--; // Diminui o valor, mas não pode ser menor que 0
    }

    quantityElement.textContent = `${currentQuantity} kg`; // Atualiza o texto da quantidade
  }

  /**
   * Função para verificar a altura da janela e esconder o rodapé se o teclado estiver visível (para dispositivos móveis)
   */
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
});
