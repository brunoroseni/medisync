// ==========================================
// 🗄️ MEDISYNC - BANCO DE DADOS ESTÁTICO
// ==========================================

// Dados simulados para demonstração do MVP

const DB_ESTATICO = {
    // Pacientes
    pacientes: [
        {
            id: 1,
            nome: "João Silva",
            cpf: "123.456.789-00",
            email: "joao.silva@email.com",
            telefone: "(11) 99999-9999",
            dataNascimento: "1985-03-15",
            sexo: "M",
            tipoSanguineo: "A+",
            endereco: {
                cep: "01234-567",
                rua: "Rua das Flores, 123",
                bairro: "Centro",
                cidade: "São Paulo",
                estado: "SP"
            },
            alergias: ["Penicilina", "Dipirona"],
            condicoesCronicas: ["Hipertensão Arterial"],
            contatoEmergencia: {
                nome: "Maria Silva",
                parentesco: "Esposa",
                telefone: "(11) 98888-8888"
            }
        },
        {
            id: 2,
            nome: "Maria Santos",
            cpf: "987.654.321-00",
            email: "maria.santos@email.com",
            telefone: "(11) 88888-8888",
            dataNascimento: "1978-07-22",
            sexo: "F",
            tipoSanguineo: "O+",
            endereco: {
                cep: "02345-678",
                rua: "Av. Principal, 456",
                bairro: "Vila Nova",
                cidade: "São Paulo",
                estado: "SP"
            },
            alergias: [],
            condicoesCronicas: [],
            contatoEmergencia: {
                nome: "Pedro Santos",
                parentesco: "Marido",
                telefone: "(11) 77777-7777"
            }
        }
    ],

    // Médicos
    medicos: [
        {
            id: 1,
            nome: "Dr. Maria Santos",
            crm: "CRM/SP 123456",
            especialidade: "Cardiologia",
            email: "maria.santos@cardiosaude.com.br",
            telefone: "(11) 3333-3333",
            instituicao: "Clínica CardioSaúde"
        },
        {
            id: 2,
            nome: "Dr. Pedro Lima",
            crm: "CRM/SP 789012",
            especialidade: "Oftalmologia",
            email: "pedro.lima@hospital.com.br",
            telefone: "(11) 4444-4444",
            instituicao: "Hospital São José"
        }
    ],

    // Consultas
    consultas: [
        {
            id: 1,
            pacienteId: 1,
            medicoId: 1,
            data: "2024-11-01T14:30:00",
            motivo: "Consulta de retorno - Hipertensão",
            sintomas: "Paciente refere estar bem, sem sintomas",
            exameFisico: "PA: 120x80mmHg, FC: 72bpm, ausculta cardíaca normal",
            diagnostico: "Hipertensão arterial sistêmica controlada",
            prescricao: "Manter Losartana 50mg 1x/dia pela manhã",
            observacoes: "Paciente assintomático, pressão controlada",
            retorno: "2025-05-01",
            status: "concluida"
        },
        {
            id: 2,
            pacienteId: 2,
            medicoId: 2,
            data: "2024-10-28T16:00:00",
            motivo: "Exame de vista de rotina",
            sintomas: "Dificuldade para enxergar de longe",
            exameFisico: "Acuidade visual OD: 20/40, OE: 20/50",
            diagnostico: "Miopia leve bilateral",
            prescricao: "Óculos para longe (-1,25 OD / -1,50 OE)",
            observacoes: "Orientado uso contínuo dos óculos",
            retorno: "2025-10-28",
            status: "concluida"
        }
    ],

    // Exames
    exames: [
        {
            id: 1,
            pacienteId: 1,
            medicoId: 1,
            tipo: "Hemograma Completo",
            data: "2024-11-02",
            local: "Lab Diagnóstico",
            status: "disponivel",
            resultado: "Todos os parâmetros dentro da normalidade",
            observacoes: "Hemácias: 4.8M, Leucócitos: 7.2K, Plaquetas: 285K"
        },
        {
            id: 2,
            pacienteId: 1,
            medicoId: 1,
            tipo: "Eletrocardiograma",
            data: "2024-10-25",
            local: "Clínica CardioSaúde",
            status: "disponivel",
            resultado: "ECG normal, ritmo sinusal regular",
            observacoes: "FC: 68bpm, sem alterações do ST-T"
        }
    ],

    // Cirurgias
    cirurgias: [
        {
            id: 1,
            pacienteId: 1,
            cirurgiao: "Dr. Roberto Fernandes",
            tipo: "Apendicectomia",
            data: "2023-03-15",
            local: "Hospital Santa Maria",
            descricao: "Apendicectomia laparoscópica por apendicite aguda",
            tempoInternacao: "2 dias",
            recuperacao: "Completa, sem complicações"
        }
    ],

    // Medicamentos
    medicamentos: [
        {
            id: 1,
            pacienteId: 1,
            nome: "Losartana",
            dosagem: "50mg",
            frequencia: "1x ao dia",
            periodo: "Manhã",
            prescritor: "Dr. Maria Santos",
            dataInicio: "2024-01-15",
            ativo: true
        },
        {
            id: 2,
            pacienteId: 1,
            nome: "Sinvastatina",
            dosagem: "20mg",
            frequencia: "1x ao dia",
            periodo: "Noite",
            prescritor: "Dr. Maria Santos",
            dataInicio: "2024-06-01",
            ativo: true
        }
    ],

    // Usuários do sistema
    usuarios: [
        {
            id: 1,
            nome: "Dr. Maria Santos",
            email: "maria.santos@cardiosaude.com.br",
            tipo: "medico",
            crm: "CRM/SP 123456",
            especialidade: "Cardiologia",
            cargo: "Médico",
            nivelAcesso: "total",
            status: "ativo",
            ultimoAcesso: "2024-11-05T08:30:00",
            instituicao: "Clínica CardioSaúde"
        },
        {
            id: 2,
            nome: "Enf. Ana Costa",
            email: "ana.costa@cardiosaude.com.br",
            tipo: "enfermeiro",
            coren: "COREN/SP 345678",
            especialidade: "Enfermagem",
            cargo: "Enfermeiro",
            nivelAcesso: "consultas",
            status: "ativo",
            ultimoAcesso: "2024-11-05T07:15:00",
            instituicao: "Clínica CardioSaúde"
        }
    ],

    // Instituições
    instituicoes: [
        {
            id: 1,
            nome: "Clínica CardioSaúde",
            cnpj: "12.345.678/0001-90",
            tipo: "clinica",
            endereco: "Rua das Clínicas, 123 - Centro - São Paulo/SP",
            telefone: "(11) 3333-3333",
            email: "contato@cardiosaude.com.br",
            responsavelTecnico: "Dr. Maria Santos - CRM/SP 123456",
            configuracoes: {
                sessaoTimeout: 60,
                backupFrequencia: "diario",
                notificacoesEmail: true,
                auditoria: true
            }
        }
    ],

    // Agendamentos
    agendamentos: [
        {
            id: 1,
            pacienteId: 1,
            medicoId: 1,
            data: "2024-11-15T14:30:00",
            tipo: "consulta",
            status: "agendado",
            observacoes: "Consulta de retorno cardiológica"
        },
        {
            id: 2,
            pacienteId: 1,
            medicoId: 2,
            data: "2024-11-22T09:00:00",
            tipo: "consulta",
            status: "agendado",
            observacoes: "Consulta oftalmológica"
        }
    ]
};

// Funções auxiliares para acessar os dados
const DataService = {
    // Pacientes
    getPaciente: (id) => DB_ESTATICO.pacientes.find(p => p.id === id),
    getPacientes: () => DB_ESTATICO.pacientes,
    
    // Médicos
    getMedico: (id) => DB_ESTATICO.medicos.find(m => m.id === id),
    getMedicos: () => DB_ESTATICO.medicos,
    
    // Consultas
    getConsulta: (id) => DB_ESTATICO.consultas.find(c => c.id === id),
    getConsultasPaciente: (pacienteId) => DB_ESTATICO.consultas.filter(c => c.pacienteId === pacienteId),
    getConsultasMedico: (medicoId) => DB_ESTATICO.consultas.filter(c => c.medicoId === medicoId),
    
    // Exames
    getExame: (id) => DB_ESTATICO.exames.find(e => e.id === id),
    getExamesPaciente: (pacienteId) => DB_ESTATICO.exames.filter(e => e.pacienteId === pacienteId),
    
    // Cirurgias
    getCirurgiasPaciente: (pacienteId) => DB_ESTATICO.cirurgias.filter(c => c.pacienteId === pacienteId),
    
    // Medicamentos
    getMedicamentosPaciente: (pacienteId) => DB_ESTATICO.medicamentos.filter(m => m.pacienteId === pacienteId && m.ativo),
    
    // Usuários
    getUsuario: (id) => DB_ESTATICO.usuarios.find(u => u.id === id),
    getUsuarios: () => DB_ESTATICO.usuarios,
    
    // Agendamentos
    getAgendamentosPaciente: (pacienteId) => DB_ESTATICO.agendamentos.filter(a => a.pacienteId === pacienteId),
    getAgendamentosMedico: (medicoId) => DB_ESTATICO.agendamentos.filter(a => a.medicoId === medicoId),
    
    // Busca
    buscarPacientes: (termo) => {
        return DB_ESTATICO.pacientes.filter(p => 
            p.nome.toLowerCase().includes(termo.toLowerCase()) ||
            p.cpf.includes(termo)
        );
    }
};

// Simular operações assíncronas
const ApiService = {
    login: (email, senha, tipo) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simular login bem-sucedido
                const usuario = DB_ESTATICO.usuarios.find(u => u.email === email);
                if (usuario) {
                    resolve({
                        success: true,
                        user: usuario,
                        token: 'fake_jwt_token_' + Date.now()
                    });
                } else {
                    resolve({
                        success: false,
                        message: 'Usuário não encontrado'
                    });
                }
            }, 1000);
        });
    },
    
    salvarConsulta: (dadosConsulta) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const novaConsulta = {
                    id: DB_ESTATICO.consultas.length + 1,
                    ...dadosConsulta,
                    status: 'concluida'
                };
                DB_ESTATICO.consultas.push(novaConsulta);
                resolve({
                    success: true,
                    consulta: novaConsulta
                });
            }, 800);
        });
    },
    
    cadastrarPaciente: (dadosPaciente) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const novoPaciente = {
                    id: DB_ESTATICO.pacientes.length + 1,
                    ...dadosPaciente
                };
                DB_ESTATICO.pacientes.push(novoPaciente);
                resolve({
                    success: true,
                    paciente: novoPaciente,
                    senhaTemporaria: 'temp' + Math.random().toString(36).substr(2, 6)
                });
            }, 1200);
        });
    }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.DB_ESTATICO = DB_ESTATICO;
    window.DataService = DataService;
    window.ApiService = ApiService;
}

console.log('🗄️ Banco de dados estático carregado:', DB_ESTATICO);