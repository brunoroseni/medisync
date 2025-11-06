// ==========================================
// MEDISYNC - JAVASCRIPT PRINCIPAL
// ==========================================

// Inicialização quando o DOM está carregado
document.addEventListener("DOMContentLoaded", function () {
  initializeMediSync();
});

// Função principal de inicialização
function initializeMediSync() {
  // Aplicar máscaras aos campos
  applyMasks();

  // Configurar navegação mobile
  setupMobileNavigation();

  // Configurar tooltips
  setupTooltips();

  // Verificar autenticação
  checkAuthentication();

  // Ajustar tabelas para visualização mobile
  makeTablesResponsive();
}

// ==========================================
// NAVEGAÇÃO MOBILE
// ==========================================

function setupMobileNavigation() {
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (!mobileToggle || !navMenu) {
    return;
  }

  const menuId = mobileToggle.getAttribute("aria-controls") || "primary-navigation";
  if (!navMenu.id) {
    navMenu.id = menuId;
  }
  mobileToggle.setAttribute("aria-controls", navMenu.id);
  mobileToggle.setAttribute("aria-expanded", "false");

  const toggleMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const isOpen = navMenu.classList.toggle("active");
    mobileToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  };

  const closeMenu = () => {
    if (!navMenu.classList.contains("active")) return;
    navMenu.classList.remove("active");
    mobileToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  mobileToggle.addEventListener("click", toggleMenu);

  mobileToggle.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      toggleMenu(event);
    }
  });

  const focusableItems = navMenu.querySelectorAll("a, button");
  focusableItems.forEach((item) => {
    item.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("click", (event) => {
    if (!navMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      mobileToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
}

// ==========================================
// MÁSCARAS DE CAMPOS
// ==========================================

function applyMasks() {
  // Máscara para CPF
  const cpfInputs = document.querySelectorAll(
    'input[placeholder*="000.000.000-00"]'
  );
  cpfInputs.forEach((input) => {
    input.addEventListener("input", function (e) {
      applyCPFMask(e.target);
    });
  });

  // Máscara para CEP
  const cepInputs = document.querySelectorAll(
    'input[placeholder*="00000-000"]'
  );
  cepInputs.forEach((input) => {
    input.addEventListener("input", function (e) {
      applyCEPMask(e.target);
    });
  });

  // Máscara para telefone
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach((input) => {
    input.addEventListener("input", function (e) {
      applyPhoneMask(e.target);
    });
  });
}

function applyCPFMask(input) {
  let value = input.value.replace(/\D/g, "");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  input.value = value;
}

function applyCEPMask(input) {
  let value = input.value.replace(/\D/g, "");
  value = value.replace(/(\d{5})(\d)/, "$1-$2");
  input.value = value;
}

function applyPhoneMask(input) {
  let value = input.value.replace(/\D/g, "");
  if (value.length <= 10) {
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d{4})(\d)/, "$1-$2");
  } else {
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
  }
  input.value = value;
}

// ==========================================
// AUTENTICAÇÃO E SESSÃO
// ==========================================

function checkAuthentication() {
  const currentPage = window.location.pathname;
  const userType = localStorage.getItem("userType");

  // Páginas que requerem autenticação
  const protectedPages = [
    "dash-paciente.html",
    "dash-medico.html",
    "prontuario.html",
    "consulta.html",
    "cad-paciente.html",
    "usuarios.html",
    "configuracoes.html",
    "perfil.html",
  ];

  const isProtectedPage = protectedPages.some((page) =>
    currentPage.includes(page)
  );

  if (isProtectedPage && !userType) {
    // Redirecionar para login se não autenticado
    if (currentPage.includes("paciente")) {
      window.location.href = "../paciente/login.html";
    } else {
      window.location.href = "../medico/login.html";
    }
  }
}

function logout() {
  // Limpar dados de sessão
  localStorage.clear();
  sessionStorage.clear();

  // Redirecionar para página inicial
  window.location.href = "../index.html";
}

// ==========================================
// TOOLTIPS E HELPERS
// ==========================================

function setupTooltips() {
  // Configurar tooltips básicos
  const tooltipElements = document.querySelectorAll("[data-tooltip]");
  tooltipElements.forEach((element) => {
    element.addEventListener("mouseenter", showTooltip);
    element.addEventListener("mouseleave", hideTooltip);
  });
}

function showTooltip(event) {
  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.textContent = event.target.getAttribute("data-tooltip");
  tooltip.style.cssText = `
        position: absolute;
        background: #333;
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 14px;
        z-index: 1000;
        pointer-events: none;
    `;

  document.body.appendChild(tooltip);

  const rect = event.target.getBoundingClientRect();
  tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + "px";
  tooltip.style.left =
    rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px";
}

function hideTooltip() {
  const tooltip = document.querySelector(".tooltip");
  if (tooltip) {
    tooltip.remove();
  }
}

// ==========================================
// UTILITÁRIOS GERAIS
// ==========================================

// Formatar data para exibição brasileira
function formatDateBR(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
}

// Formatar data e hora para exibição brasileira
function formatDateTimeBR(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("pt-BR");
}

// Validar CPF
function validateCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

  const cpfArray = cpf.split("").map(Number);

  for (let t = 9; t < 11; t++) {
    let d = 0;
    for (let c = 0; c < t; c++) {
      d += cpfArray[c] * (t + 1 - c);
    }
    d = ((10 * d) % 11) % 10;
    if (cpfArray[t] !== d) return false;
  }

  return true;
}

// Validar email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Mostrar notificação
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${
              type === "success"
                ? "var(--verde-agua)"
                : type === "error"
                ? "var(--rosa-vivo)"
                : "var(--azul-medio)"
            };
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
        ">
            ${message}
        </div>
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 4000);
}

// Confirmar ação
function confirmAction(message, callback) {
  if (confirm(message)) {
    callback();
  }
}

// Buscar CEP (simulado)
function buscarCEP(cep, callback) {
  // Simular busca de CEP
  setTimeout(() => {
    const mockData = {
      logradouro: "Rua das Flores",
      bairro: "Centro",
      localidade: "São Paulo",
      uf: "SP",
    };
    callback(mockData);
  }, 500);
}

// ==========================================
// ANIMAÇÕES E EFEITOS
// ==========================================

// Adicionar CSS para animações
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .fade-in {
        animation: fadeIn 0.3s ease;
    }
    
    .loading {
        opacity: 0.6;
        pointer-events: none;
    }
    
    .loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border: 2px solid var(--azul-medio);
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ==========================================
// RESPONSIVIDADE ADICIONAL
// ==========================================

// Ajustar tabelas para mobile
function makeTablesResponsive() {
  const tables = document.querySelectorAll(".table");
  tables.forEach((table) => {
    if (!table.closest(".table-responsive")) {
      const wrapper = document.createElement("div");
      wrapper.className = "table-responsive";
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }
  });
}

// Executar quando redimensionar a janela
window.addEventListener("resize", function () {
  makeTablesResponsive();
});

// ==========================================
// EXPORT PARA USO GLOBAL
// ==========================================

// Tornar funções disponíveis globalmente
window.MediSync = {
  logout,
  validateCPF,
  validateEmail,
  formatDateBR,
  formatDateTimeBR,
  showNotification,
  confirmAction,
  buscarCEP,
  makeTablesResponsive,
};

console.log("MediSync JavaScript carregado com sucesso!");
