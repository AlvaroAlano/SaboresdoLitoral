document.addEventListener('DOMContentLoaded', function () {
  // Variável para armazenar a quantidade total de itens no carrinho
  let cartCount = 0;
  const cartItems = [];
  const cartItemsContainer = document.getElementById('cart-items');
  const totalPriceElement = document.querySelector('.total-price');
  const checkoutButton = document.getElementById('finalizar-compra');
  const cartBadge = document.getElementById('cart-count'); // Badge para o carrinho

  // Seleciona todos os elementos necessários
  const categories = document.querySelectorAll('.category');
  const products = document.querySelectorAll('.product');
  const footerIcons = document.querySelectorAll('.footer-icon');
  const contentSections = document.querySelectorAll('.content');
  const incrementButtons = document.querySelectorAll('.increment');
  const decrementButtons = document.querySelectorAll('.decrement');
  const categoriesContainer = document.querySelector('.categories');
  const searchBar = document.getElementById('search-bar');

  // Adicionar Função de Registro
// Adicionar Função de Login
document.querySelector('.login-form').addEventListener('submit', function(e) {
  e.preventDefault(); // Impede o envio padrão do formulário

  // Captura o valor do input de login
  const username = this.querySelector('input[type="text"]').value.trim(); // Campo para e-mail ou telefone
  const password = this.querySelector('input[type="password"]').value;

  // Formatação do telefone para (DD) XXXXX-XXXX
  const formattedUsername = username.replace(/\D/g, ''); // Remove caracteres não numéricos
  const ddd = formattedUsername.substring(0, 2); // Captura o DDD
  const phoneNumber = formattedUsername.substring(2); // Captura o restante do número

  // Verifica se o username é um telefone válido
  const finalUsername = (phoneNumber.length === 9)
    ? `(${ddd}) ${phoneNumber}` // Formato esperado
    : username; // Se não for um número válido, mantém o original

  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: finalUsername, password })
  })
  .then(response => {
    if (!response.ok) {
      return response.text().then(text => { throw new Error(text); });
    }
    return response.json(); // Retorna os dados se a resposta for ok
  })
  .then(data => {
    console.log(data);
    localStorage.setItem('token', data.token); // Armazenando o token
    window.location.href = 'sucesso.html'; // Redireciona para a tela de sucesso
  })
  .catch(error => {
    alert(error.message); // Mostra a mensagem de erro recebida do servidor
  });
});
  
// Adicionar Função de Login
document.querySelector('.login-form').addEventListener('submit', function(e) {
  e.preventDefault(); // Impede o envio padrão do formulário

  // Captura o valor do input de login
  const username = this.querySelector('input[type="text"]').value.trim(); // Campo para e-mail ou telefone
  const password = this.querySelector('input[type="password"]').value;

  // Formatação do telefone para (DD) XXXXX-XXXX
  const formattedUsername = username.replace(/\D/g, ''); // Remove caracteres não numéricos
  const ddd = formattedUsername.substring(0, 2); // Captura o DDD
  const phoneNumber = formattedUsername.substring(2); // Captura o restante do número

  const finalUsername = phoneNumber.length === 9 
    ? `(${ddd}) ${phoneNumber}` // Formato esperado
    : username; // Se não for um número válido, mantém o original

  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: finalUsername, password })
  })
  .then(response => {
    if (!response.ok) {
      return response.text().then(text => { throw new Error(text); });
    }
    return response.json(); // Retorna os dados se a resposta for ok
  })
  .then(data => {
    console.log(data);
    localStorage.setItem('token', data.token); // Armazenando o token
  })
  .catch(error => {
    alert(error.message); // Mostra a mensagem de erro recebida do servidor
  });
});

  // Atualiza o contador de produtos no carrinho
  function updateCartCount() {
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0); // Soma as quantidades de todos os itens
    const cartBadge = document.getElementById('cart-count'); // Badge para o carrinho

    if (totalItems > 0) {
      cartBadge.style.display = 'block'; // Mostra a bolinha se houver itens
      cartBadge.textContent = totalItems; // Atualiza o número de itens
    } else {
      cartBadge.style.display = 'none'; // Esconde a bolinha se não houver itens
    }
  }

  // Inicializa o badge como oculto
  cartBadge.style.display = 'none';

  function updateCart() {
    cartItemsContainer.innerHTML = ''; // Limpa o carrinho
    let total = 0;
    let totalItems = 0;

    // Itera sobre os itens do carrinho para calcular o total e renderizar os itens
    cartItems.forEach(item => {
        total += item.price * item.quantity;
        totalItems += item.quantity;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="product-controls">
                    <button class="decrement" data-index="${cartItems.indexOf(item)}">-</button>
                    <span class="quantity">${item.quantity} kg</span>
                    <button class="increment" data-index="${cartItems.indexOf(item)}">+</button>
                </div>
                <span class="cart-item-price">R$ ${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Atualiza o preço total
    totalPriceElement.textContent = `R$ ${total.toFixed(2)}`;

    // Atualiza o botão de fechar pedido com o número total de itens
    checkoutButton.textContent = `Fechar pedido (${totalItems} itens)`;

    // Atualiza a bolinha do carrinho com o número total de itens
    cartBadge.textContent = totalItems;
    if (totalItems > 0) {
        cartBadge.style.display = 'block';
    } else {
        cartBadge.style.display = 'none';
    }

    // === Adicionar sincronização da quantidade na tela de início ===
    updateProductQuantities();

    // Adiciona eventos de incremento e decremento para cada item no carrinho
    const incrementButtons = document.querySelectorAll('.increment');
    const decrementButtons = document.querySelectorAll('.decrement');

    incrementButtons.forEach(button => {
        button.addEventListener('click', function () {
            const itemIndex = this.getAttribute('data-index');
            cartItems[itemIndex].quantity++;
            updateCart(); // Atualiza o carrinho
        });
    });

    decrementButtons.forEach(button => {
      button.addEventListener('click', function () {
          const itemIndex = this.getAttribute('data-index');
          if (cartItems[itemIndex].quantity > 1) {
              cartItems[itemIndex].quantity--;
          } else {
              // Remove o item se a quantidade for igual a 1
              cartItems.splice(itemIndex, 1);
          }
          updateCart(); // Atualiza o carrinho
      });
  });
}

// Evento de clique para o botão "CRIAR CONTA"
document.getElementById('botao-criar-conta').addEventListener('click', function () {
  showSection('criar-conta'); // Mostra a tela de criar conta
});

// Evento de clique para o botão "Voltar" na tela de criar conta
document.getElementById('voltar-login').addEventListener('click', function () {
  // Oculta a tela de criar conta
  document.querySelector('#criar-conta').style.display = 'none';

  // Exibe a tela de login
  document.querySelector('#conta').style.display = 'block';
});

function updateProductQuantities() {
  products.forEach(product => {
      const productName = product.querySelector('h3').textContent;
      const cartItem = cartItems.find(item => item.name === productName);
      const quantityElement = product.querySelector('.quantity');

      if (cartItem) {
          quantityElement.textContent = `${cartItem.quantity} kg`; // Se o item estiver no carrinho, exibe a quantidade correta
      } else {
          quantityElement.textContent = '0 kg'; // Se o item não estiver no carrinho, exibe 0 kg
      }
  });
}

  function addToCart(productElement) {
    const name = productElement.querySelector('h3').textContent;
    const price = parseFloat(productElement.querySelector('.price').textContent.replace('R$', '').trim());
    const image = productElement.querySelector('img').src;
    const quantityText = productElement.querySelector('.quantity').textContent;
    const quantity = parseInt(quantityText.replace(' kg', '').trim());
  
    // Verificar se o item já está no carrinho
    let existingItem = cartItems.find(item => item.name === name);
  
    if (existingItem) {
      
      // incrementa a quantidade do produto de forma correta, adicionando 1 por clique.
      existingItem.quantity += 1; // Incrementa apenas 1 unidade
    } else {
      cartItems.push({ name, price, quantity: 1, image }); // Se o item não existir, adiciona com 1 unidade
    }
  
    // Atualiza a quantidade no controle (- 0kg +) na página de produtos
    productElement.querySelector('.quantity').textContent = `${existingItem ? existingItem.quantity : 1} kg`;
  
    // Atualiza o carrinho
    updateCart(); 
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
  }

  // Eventos de Incremento/Decremento
  incrementButtons.forEach(button => {
    button.addEventListener('click', function () {
      const product = button.closest('.product');
      const quantityElement = product.querySelector('.quantity');
      let currentQuantity = parseInt(quantityElement.textContent.replace(' kg', ''));
      currentQuantity++; // Incrementa visualmente a quantidade
      quantityElement.textContent = `${currentQuantity} kg`;

      addToCart(product); // Adiciona ao carrinho o produto com quantidade corrigida
    });
  });

  decrementButtons.forEach(button => {
    button.addEventListener('click', function () {
      const product = button.closest('.product');
      const quantityElement = product.querySelector('.quantity');
      let currentQuantity = parseInt(quantityElement.textContent.replace(' kg', ''));

      if (currentQuantity > 0) {
        currentQuantity--; // Decrementa visualmente a quantidade
        quantityElement.textContent = `${currentQuantity} kg`;

        // Verifica se o item existe no carrinho e diminui a quantidade
        const existingItem = cartItems.find(item => item.name === product.querySelector('h3').textContent);
        if (existingItem && existingItem.quantity > 1) {
          existingItem.quantity--; // Diminui a quantidade do item
        } else if (existingItem && existingItem.quantity === 1) {
          const itemIndex = cartItems.indexOf(existingItem);
          cartItems.splice(itemIndex, 1); // Remove o item se a quantidade for zero
        }

        updateCart();
      }
    });
  });

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

  // ===== Eventos de Categoria =====
  categories.forEach(category => {
    category.addEventListener('click', function () {
      categories.forEach(cat => cat.classList.remove('active')); // Remove a classe 'active' de todas as categorias
      this.classList.add('active'); // Adiciona a classe 'active' à categoria clicada
      const selectedCategory = this.getAttribute('data-category');
      filterProducts(selectedCategory); // Filtra os produtos com base na categoria
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
  window.addEventListener('resize', function() {
    if (window.innerHeight < 500) {
      document.querySelector('footer').style.display = 'none'; // Esconde o footer quando o teclado está visível
    } else {
      document.querySelector('footer').style.display = 'flex'; // Mostra o footer novamente
    }
  });

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
