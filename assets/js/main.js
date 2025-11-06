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

  const menuId =
    mobileToggle.getAttribute("aria-controls") || "primary-navigation";
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
    if (
      !navMenu.contains(event.target) &&
      !mobileToggle.contains(event.target)
    ) {
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
// SISTEMA DE NOTIFICAÇÕES AVANÇADO
// ==========================================

// Criar container de notificações se não existir
function createToastContainer() {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  return container;
}

// Sistema de notificações toast profissional
function showToast(message, type = "info", duration = 4000) {
  const container = createToastContainer();

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  const icons = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
  };

  const titles = {
    success: "Sucesso",
    error: "Erro",
    warning: "Atenção",
    info: "Informação",
  };

  toast.innerHTML = `
    <div class="toast-header">
      <span class="toast-icon">${icons[type]}</span>
      <span>${titles[type]}</span>
      <button class="toast-close" onclick="closeToast(this)">×</button>
    </div>
    <div class="toast-body">${message}</div>
  `;

  container.appendChild(toast);

  // Animar entrada
  setTimeout(() => toast.classList.add("show"), 10);

  // Auto-remover
  setTimeout(() => {
    closeToast(toast.querySelector(".toast-close"));
  }, duration);

  return toast;
}

function closeToast(closeBtn) {
  const toast = closeBtn.closest(".toast");
  toast.classList.add("hide");
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 300);
}

// Loading overlay profissional
function showLoading(message = "Carregando...") {
  const overlay = document.createElement("div");
  overlay.id = "loading-overlay";
  overlay.className = "loading-overlay";
  overlay.innerHTML = `
    <div style="text-align: center;">
      <div class="loading-spinner"></div>
      <div class="loading-text">${message}</div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function hideLoading() {
  const overlay = document.getElementById("loading-overlay");
  if (overlay) {
    overlay.remove();
  }
}

// Estados de loading em botões
function setButtonLoading(button, loading = true) {
  if (loading) {
    button.dataset.originalText = button.textContent;
    button.classList.add("loading");
    button.disabled = true;
  } else {
    button.classList.remove("loading");
    button.disabled = false;
    if (button.dataset.originalText) {
      button.textContent = button.dataset.originalText;
    }
  }
}

// ==========================================
// VALIDAÇÕES MÉDICAS AVANÇADAS
// ==========================================

// Validar CRM por estado
function validateCRM(crm, estado) {
  const crmRegex = new RegExp(`^CRM\\/${estado}\\s\\d{4,6}$`);
  return crmRegex.test(crm);
}

// Validar COREN
function validateCOREN(coren, estado) {
  const corenRegex = new RegExp(`^COREN\\/${estado}\\s\\d{5,6}$`);
  return corenRegex.test(coren);
}

// Validar medicamento (simulado)
function validateMedicamento(nome) {
  const medicamentosComuns = [
    "Losartana",
    "Sinvastatina",
    "Metformina",
    "Omeprazol",
    "Dipirona",
    "Paracetamol",
    "Ibuprofeno",
    "Captopril",
    "Atenolol",
    "Hidroclorotiazida",
    "Amoxicilina",
    "Azitromicina",
  ];

  return medicamentosComuns.some((med) =>
    nome.toLowerCase().includes(med.toLowerCase())
  );
}

// Validação de sinais vitais
function validateVitalSigns(data) {
  const errors = [];

  if (data.pressao) {
    const pa = data.pressao.match(/(\d+)x(\d+)/);
    if (pa) {
      const sistolica = parseInt(pa[1]);
      const diastolica = parseInt(pa[2]);

      if (sistolica < 70 || sistolica > 250) {
        errors.push("Pressão sistólica fora do range normal (70-250 mmHg)");
      }
      if (diastolica < 40 || diastolica > 150) {
        errors.push("Pressão diastólica fora do range normal (40-150 mmHg)");
      }
    }
  }

  if (data.fc) {
    const fc = parseInt(data.fc);
    if (fc < 30 || fc > 220) {
      errors.push("Frequência cardíaca fora do range normal (30-220 bpm)");
    }
  }

  if (data.temperatura) {
    const temp = parseFloat(data.temperatura);
    if (temp < 32 || temp > 45) {
      errors.push("Temperatura fora do range normal (32-45°C)");
    }
  }

  return errors;
}

// ==========================================
// SISTEMA DE VALIDAÇÃO EM TEMPO REAL
// ==========================================

function setupRealTimeValidation() {
  // Validação de CPF em tempo real
  document.querySelectorAll('input[data-validate="cpf"]').forEach((input) => {
    input.addEventListener("input", function (e) {
      applyCPFMask(e.target);
      validateField(e.target, () => validateCPF(e.target.value));
    });
  });

  // Validação de email em tempo real
  document.querySelectorAll('input[type="email"]').forEach((input) => {
    input.addEventListener("blur", function (e) {
      validateField(e.target, () => validateEmail(e.target.value));
    });
  });

  // Validação de CRM
  document.querySelectorAll('input[data-validate="crm"]').forEach((input) => {
    input.addEventListener("blur", function (e) {
      const estado =
        document.querySelector('select[name="estado"]')?.value || "SP";
      validateField(e.target, () => validateCRM(e.target.value, estado));
    });
  });
}

function validateField(field, validator) {
  const formGroup = field.closest(".form-group");
  const existingError = formGroup.querySelector(".form-error");
  const existingSuccess = formGroup.querySelector(".form-success");

  // Remover estados anteriores
  formGroup.classList.remove("error", "success");
  if (existingError) existingError.remove();
  if (existingSuccess) existingSuccess.remove();

  if (field.value.trim() === "") return; // Não validar campos vazios

  const isValid = validator();

  if (isValid) {
    formGroup.classList.add("success");
    const successMsg = document.createElement("div");
    successMsg.className = "form-success";
    successMsg.innerHTML = "<span>✓</span> Válido";
    field.parentNode.appendChild(successMsg);
  } else {
    formGroup.classList.add("error");
    const errorMsg = document.createElement("div");
    errorMsg.className = "form-error";
    errorMsg.innerHTML = "<span>✕</span> Formato inválido";
    field.parentNode.appendChild(errorMsg);
  }
}

// ==========================================
// SIMULAÇÃO DE CÓDIGOS CID-10
// ==========================================

const CID_10_COMMON = {
  I10: "Hipertensão arterial sistêmica",
  "E11.9": "Diabetes mellitus tipo 2 sem complicações",
  "J44.1": "Doença pulmonar obstrutiva crônica com exacerbação aguda",
  "I25.9": "Doença isquêmica crônica do coração",
  "K21.9": "Doença do refluxo gastroesofágico sem esofagite",
  "M79.3": "Fibromialgia",
  "Z00.0": "Exame médico geral",
  "H52.1": "Miopia",
  "K59.0": "Constipação",
  "R50.9": "Febre não especificada",
};

function searchCID10(query) {
  return Object.entries(CID_10_COMMON)
    .filter(
      ([code, description]) =>
        description.toLowerCase().includes(query.toLowerCase()) ||
        code.includes(query.toUpperCase())
    )
    .slice(0, 5);
}

// ==========================================
// ATUALIZAÇÃO DA INICIALIZAÇÃO
// ==========================================

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

  // Configurar validação em tempo real
  setupRealTimeValidation();

  // Adicionar breadcrumbs
  addBreadcrumbs();
}

// Adicionar breadcrumbs automaticamente
function addBreadcrumbs() {
  const path = window.location.pathname;
  const breadcrumbContainer = document.querySelector(".breadcrumb");

  if (breadcrumbContainer) return; // Já existe

  let breadcrumbHTML = '<nav class="breadcrumb">';

  if (path.includes("/medico/")) {
    breadcrumbHTML += `
      <div class="breadcrumb-item">
        <a href="../index.html" class="breadcrumb-link">MediSync</a>
      </div>
      <div class="breadcrumb-item">
        <span class="breadcrumb-current">Área Médica</span>
      </div>
    `;
  } else if (path.includes("/paciente/")) {
    breadcrumbHTML += `
      <div class="breadcrumb-item">
        <a href="../index.html" class="breadcrumb-link">MediSync</a>
      </div>
      <div class="breadcrumb-item">
        <span class="breadcrumb-current">Área do Paciente</span>
      </div>
    `;
  } else if (path.includes("/instituicao/")) {
    breadcrumbHTML += `
      <div class="breadcrumb-item">
        <a href="../index.html" class="breadcrumb-link">MediSync</a>
      </div>
      <div class="breadcrumb-item">
        <span class="breadcrumb-current">Painel Institucional</span>
      </div>
    `;
  } else if (path.includes("/saas/")) {
    breadcrumbHTML += `
      <div class="breadcrumb-item">
        <a href="../index.html" class="breadcrumb-link">MediSync</a>
      </div>
      <div class="breadcrumb-item">
        <span class="breadcrumb-current">Console SaaS</span>
      </div>
    `;
  }

  breadcrumbHTML += "</nav>";

  const mainContent = document.querySelector(".main-content .container");
  if (mainContent && breadcrumbHTML !== '<nav class="breadcrumb"></nav>') {
    mainContent.insertAdjacentHTML("afterbegin", breadcrumbHTML);
  }
}

// ==========================================
// SIMULAÇÃO DE OPERAÇÕES ASSÍNCRONAS
// ==========================================

function simulateAsyncOperation(duration = 2000) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

// Exemplo de uso em formulários
async function submitForm(
  formData,
  successMessage = "Operação realizada com sucesso!"
) {
  const submitBtn = document.querySelector('button[type="submit"]');

  try {
    setButtonLoading(submitBtn, true);
    showLoading("Processando...");

    await simulateAsyncOperation(1500);

    hideLoading();
    showToast(successMessage, "success");

    return true;
  } catch (error) {
    hideLoading();
    showToast("Erro ao processar operação. Tente novamente.", "error");
    return false;
  } finally {
    setButtonLoading(submitBtn, false);
  }
}

// ==========================================
// MELHORIA DAS FUNÇÕES EXISTENTES
// ==========================================

// Atualizar função de notificação para usar o novo sistema
function showNotification(message, type = "info") {
  showToast(message, type);
}

// Manter compatibilidade com código existente
window.showNotification = showNotification;

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
