import React, { useState } from 'react';
import { CheckCircle2, Circle, Search, ChevronDown, ChevronRight, FileText, Folder, Code, Settings, Rocket, Database, Palette, MessageSquare, Target, Zap, Gift } from 'lucide-react';

const TaskList = () => {
  const [tasks, setTasks] = useState({
    // ✅ JÁ FEITO - Base do Sistema
    "system_foundation": [
      { 
        id: "auth_system", 
        text: "Sistema de autenticação", 
        completed: true, 
        priority: "crítica",
        subtasks: []
      },
      { 
        id: "company_model", 
        text: "Model Company", 
        completed: true, 
        priority: "alta",
        subtasks: []
      },
      { 
        id: "plan_model", 
        text: "Model Plan", 
        completed: true, 
        priority: "alta",
        subtasks: []
      }
    ],

    // 🚧 EM ANDAMENTO - Completar Base
    "complete_foundation": [
      { 
        id: "companies_crud_complete", 
        text: "Completar CRUD Companies", 
        completed: false, 
        priority: "alta",
        subtasks: [
          { id: "companies_show", text: "Implementar companies/:id route", completed: false, file: "start/routes.ts", description: "Adicionar rota GET /admin/companies/:id" },
          { id: "companies_show_method", text: "Método show() no CompaniesController", completed: false, file: "app/controllers/companies_controller.ts", description: "Criar método show com preload de plans" },
          { id: "companies_edit_route", text: "Rota para editar company", completed: false, file: "start/routes.ts", description: "POST /admin/companies/:id/edit" },
          { id: "companies_edit_method", text: "Método update() no controller", completed: false, file: "app/controllers/companies_controller.ts", description: "Validação + update da company" },
          { id: "companies_delete", text: "Soft delete de companies", completed: false, file: "app/controllers/companies_controller.ts", description: "Método destroy() com soft delete" }
        ]
      },
      { 
        id: "user_company_relation", 
        text: "Relacionar User → Company (multi-tenancy)", 
        completed: false, 
        priority: "crítica",
        subtasks: [
          { id: "user_migration", text: "Migration: adicionar company_id em users", completed: false, file: "database/migrations/", description: "node ace make:migration add_company_id_to_users" },
          { id: "user_model_relation", text: "Relacionamento no User model", completed: false, file: "app/models/user.ts", description: "Adicionar @belongsTo(() => Company)" },
          { id: "company_users_relation", text: "Relacionamento no Company model", completed: false, file: "app/models/company.ts", description: "Adicionar @hasMany(() => User)" },
          { id: "user_seeder", text: "Atualizar seeder com company_id", completed: false, file: "database/seeders/", description: "Relacionar users existentes com companies" }
        ]
      },
      { 
        id: "tenant_middleware", 
        text: "Middleware para isolamento de dados", 
        completed: false, 
        priority: "crítica",
        subtasks: [
          { id: "create_tenant_middleware", text: "Criar TenantMiddleware", completed: false, file: "app/middleware/tenant_middleware.ts", description: "node ace make:middleware tenant" },
          { id: "implement_tenant_logic", text: "Implementar lógica de isolamento", completed: false, file: "app/middleware/tenant_middleware.ts", description: "Verificar ctx.auth.user.company_id e filtrar queries" },
          { id: "register_middleware", text: "Registrar middleware", completed: false, file: "start/kernel.ts", description: "Adicionar tenant middleware no kernel" },
          { id: "apply_to_routes", text: "Aplicar em rotas protegidas", completed: false, file: "start/routes.ts", description: "Adicionar .middleware(['tenant']) nas rotas" }
        ]
      },
      { 
        id: "company_dashboard", 
        text: "Dashboard específico da company", 
        completed: false, 
        priority: "alta",
        subtasks: [
          { id: "company_dashboard_route", text: "Rota /client/dashboard", completed: false, file: "start/routes.ts", description: "Nova rota group para área do cliente" },
          { id: "client_controller", text: "Criar ClientController", completed: false, file: "app/controllers/client_controller.ts", description: "node ace make:controller client" },
          { id: "dashboard_stats", text: "Métricas da company", completed: false, file: "app/controllers/client_controller.ts", description: "Contar chatbots, conversas da company" },
          { id: "dashboard_page", text: "Página Inertia do dashboard", completed: false, file: "inertia/pages/client/Dashboard.tsx", description: "Componente React com cards de métricas" }
        ]
      }
    ],

    // 🤖 CHATBOT CORE - Models & Database
    "chatbot_models": [
      { 
        id: "chatbot_model", 
        text: "Model Chatbot completo", 
        completed: false, 
        priority: "crítica",
        subtasks: [
          { id: "chatbot_migration", text: "Migration chatbots table", completed: false, file: "database/migrations/", description: "node ace make:migration chatbots (id, company_id, name, description, config, status)" },
          { id: "chatbot_model_file", text: "Criar Chatbot model", completed: false, file: "app/models/chatbot.ts", description: "node ace make:model chatbot" },
          { id: "chatbot_company_relation", text: "Relacionamento Chatbot → Company", completed: false, file: "app/models/chatbot.ts", description: "@belongsTo(() => Company)" },
          { id: "company_chatbots_relation", text: "Relacionamento Company → Chatbots", completed: false, file: "app/models/company.ts", description: "@hasMany(() => Chatbot)" }
        ]
      },
      { 
        id: "conversation_model", 
        text: "Model Conversation", 
        completed: false, 
        priority: "crítica",
        subtasks: [
          { id: "conversation_migration", text: "Migration conversations", completed: false, file: "database/migrations/", description: "node ace make:migration conversations (id, chatbot_id, user_session, status, started_at, ended_at)" },
          { id: "conversation_model_file", text: "Criar Conversation model", completed: false, file: "app/models/conversation.ts", description: "node ace make:model conversation" },
          { id: "conversation_chatbot_relation", text: "Relacionamento → Chatbot", completed: false, file: "app/models/conversation.ts", description: "@belongsTo(() => Chatbot)" },
          { id: "conversation_messages_relation", text: "Relacionamento → Messages", completed: false, file: "app/models/conversation.ts", description: "@hasMany(() => Message)" }
        ]
      },
      { 
        id: "message_model", 
        text: "Model Message", 
        completed: false, 
        priority: "crítica",
        subtasks: [
          { id: "message_migration", text: "Migration messages", completed: false, file: "database/migrations/", description: "node ace make:migration messages (id, conversation_id, content, sender_type, metadata)" },
          { id: "message_model_file", text: "Criar Message model", completed: false, file: "app/models/message.ts", description: "node ace make:model message" },
          { id: "message_conversation_relation", text: "Relacionamento → Conversation", completed: false, file: "app/models/message.ts", description: "@belongsTo(() => Conversation)" },
          { id: "message_enum", text: "Enum para sender_type", completed: false, file: "app/models/message.ts", description: "user | bot | system" }
        ]
      }
    ],

    // 🎨 CHATBOT MANAGEMENT - Dashboard Cliente  
    "chatbot_management": [
      { 
        id: "chatbots_list_page", 
        text: "Página listar chatbots", 
        completed: false, 
        priority: "alta",
        subtasks: [
          { id: "chatbots_index_route", text: "Rota /client/chatbots", completed: false, file: "start/routes.ts", description: "GET /client/chatbots" },
          { id: "chatbots_index_method", text: "Método index no ClientController", completed: false, file: "app/controllers/client_controller.ts", description: "Listar chatbots da company do user" },
          { id: "chatbots_index_page", text: "Página React chatbots/Index", completed: false, file: "inertia/pages/client/chatbots/Index.tsx", description: "Tabela com lista de chatbots + botão criar" },
          { id: "chatbots_tenant_filter", text: "Filtrar por company no middleware", completed: false, file: "app/middleware/tenant_middleware.ts", description: "Garantir isolamento por company_id" }
        ]
      },
      { 
        id: "chatbot_create_form", 
        text: "Formulário criar chatbot", 
        completed: false, 
        priority: "alta",
        subtasks: [
          { id: "chatbot_create_route", text: "Rotas GET/POST create", completed: false, file: "start/routes.ts", description: "GET /client/chatbots/create + POST /client/chatbots" },
          { id: "chatbot_store_method", text: "Método store()", completed: false, file: "app/controllers/client_controller.ts", description: "Validar + criar chatbot com company_id" },
          { id: "chatbot_create_page", text: "Página React Create", completed: false, file: "inertia/pages/client/chatbots/Create.tsx", description: "Form com name, description, config básico" },
          { id: "chatbot_validation", text: "Validação com VineJS", completed: false, file: "app/validators/chatbot_validator.ts", description: "node ace make:validator chatbot" }
        ]
      },
      { 
        id: "chatbot_edit_form", 
        text: "Formulário editar chatbot", 
        completed: false, 
        priority: "alta",
        subtasks: [
          { id: "chatbot_edit_routes", text: "Rotas GET/PUT edit", completed: false, file: "start/routes.ts", description: "GET /client/chatbots/:id/edit + PUT /client/chatbots/:id" },
          { id: "chatbot_edit_show_method", text: "Método show() para edit", completed: false, file: "app/controllers/client_controller.ts", description: "Buscar chatbot by id + company_id" },
          { id: "chatbot_update_method", text: "Método update()", completed: false, file: "app/controllers/client_controller.ts", description: "Validar + atualizar chatbot" },
          { id: "chatbot_edit_page", text: "Página React Edit", completed: false, file: "inertia/pages/client/chatbots/Edit.tsx", description: "Form preenchido com dados do chatbot" }
        ]
      }
    ],

    // 💬 CHAT SYSTEM - Core do Produto
    "chat_system": [
      { 
        id: "websocket_setup", 
        text: "Configurar WebSocket", 
        completed: false, 
        priority: "crítica",
        subtasks: [
          { id: "install_socket_io", text: "Instalar Socket.IO", completed: false, file: "package.json", description: "npm install socket.io @types/socket.io" },
          { id: "websocket_service", text: "Criar SocketService", completed: false, file: "app/services/socket_service.ts", description: "Configurar servidor WebSocket" },
          { id: "websocket_boot", text: "Inicializar no boot", completed: false, file: "start/app.ts", description: "Startar socket server junto com HTTP" },
          { id: "websocket_namespace", text: "Namespace por chatbot", completed: false, file: "app/services/socket_service.ts", description: "/chatbot/:id namespace" }
        ]
      },
      { 
        id: "conversation_service", 
        text: "Service gerenciar conversas", 
        completed: false, 
        priority: "crítica",
        subtasks: [
          { id: "create_conversation_service", text: "Criar ConversationService", completed: false, file: "app/services/conversation_service.ts", description: "Service para lógica de conversas" },
          { id: "start_conversation", text: "Método startConversation()", completed: false, file: "app/services/conversation_service.ts", description: "Criar nova conversation + primeira mensagem" },
          { id: "send_message", text: "Método sendMessage()", completed: false, file: "app/services/conversation_service.ts", description: "Salvar mensagem + emitir via socket" },
          { id: "end_conversation", text: "Método endConversation()", completed: false, file: "app/services/conversation_service.ts", description: "Marcar conversation como ended" }
        ]
      },
      { 
        id: "ai_integration", 
        text: "Integração IA", 
        completed: false, 
        priority: "crítica",
        subtasks: [
          { id: "install_openai", text: "Instalar OpenAI SDK", completed: false, file: "package.json", description: "npm install openai" },
          { id: "ai_service", text: "Criar AIService", completed: false, file: "app/services/ai_service.ts", description: "Service para integração com IA" },
          { id: "ai_config", text: "Config vars para API keys", completed: false, file: "config/app.ts", description: "OPENAI_API_KEY environment" },
          { id: "generate_response", text: "Método generateResponse()", completed: false, file: "app/services/ai_service.ts", description: "Enviar contexto + gerar resposta" }
        ]
      },
      { 
        id: "chat_widget_component", 
        text: "Widget React do chat", 
        completed: false, 
        priority: "alta",
        subtasks: [
          { id: "widget_component", text: "Componente ChatWidget", completed: false, file: "inertia/components/ChatWidget.tsx", description: "Componente principal do chat" },
          { id: "message_list", text: "Lista de mensagens", completed: false, file: "inertia/components/MessageList.tsx", description: "Renderizar mensagens user/bot" },
          { id: "message_input", text: "Input enviar mensagem", completed: false, file: "inertia/components/MessageInput.tsx", description: "Input + botão send" },
          { id: "socket_client", text: "Client Socket.IO", completed: false, file: "inertia/hooks/useSocket.ts", description: "Hook para conectar com WebSocket" }
        ]
      }
    ],

    // 📊 ANALYTICS & REPORTS
    "analytics_reports": [
      { 
        id: "conversation_analytics", 
        text: "Analytics de conversas", 
        completed: false, 
        priority: "média",
        subtasks: [
          { id: "analytics_controller", text: "Criar AnalyticsController", completed: false, file: "app/controllers/analytics_controller.ts", description: "node ace make:controller analytics" },
          { id: "conversation_stats", text: "Stats de conversas", completed: false, file: "app/controllers/analytics_controller.ts", description: "Contar conversas por período" },
          { id: "message_stats", text: "Stats de mensagens", completed: false, file: "app/controllers/analytics_controller.ts", description: "Contar mensagens user vs bot" },
          { id: "analytics_page", text: "Página Analytics", completed: false, file: "inertia/pages/client/Analytics.tsx", description: "Dashboard com gráficos" }
        ]
      }
    ]
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPhase, setSelectedPhase] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [expandedTasks, setExpandedTasks] = useState({});

  const phases = {
    system_foundation: { name: "✅ Base do Sistema (PRONTO)", icon: CheckCircle2, color: "bg-green-500" },
    complete_foundation: { name: "🚧 Completar Fundação", icon: Database, color: "bg-orange-500" },
    chatbot_models: { name: "🤖 Models Chatbot", icon: Database, color: "bg-blue-500" },
    chatbot_management: { name: "🎨 Gestão de Chatbots", icon: Palette, color: "bg-purple-500" },
    chat_system: { name: "💬 Sistema de Chat", icon: MessageSquare, color: "bg-teal-500" },
    analytics_reports: { name: "📊 Analytics & Reports", icon: Target, color: "bg-emerald-500" }
  };

  const priorityColors = {
    "crítica": "bg-red-100 text-red-800 border-red-200",
    "alta": "bg-orange-100 text-orange-800 border-orange-200",
    "média": "bg-blue-100 text-blue-800 border-blue-200",
    "baixa": "bg-gray-100 text-gray-800 border-gray-200"
  };

  const toggleTask = (phaseKey, taskId) => {
    setTasks(prev => ({
      ...prev,
      [phaseKey]: prev[phaseKey].map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    }));
  };

  const toggleSubtask = (phaseKey, taskId, subtaskId) => {
    setTasks(prev => ({
      ...prev,
      [phaseKey]: prev[phaseKey].map(task =>
        task.id === taskId ? {
          ...task,
          subtasks: task.subtasks.map(subtask =>
            subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask
          )
        } : task
      )
    }));
  };

  const toggleExpanded = (taskId) => {
    setExpandedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const getPhaseProgress = (phaseKey) => {
    const phaseTasks = tasks[phaseKey];
    const allItems = phaseTasks.reduce((acc, task) => {
      acc.push(task);
      acc.push(...task.subtasks);
      return acc;
    }, []);
    const completed = allItems.filter(item => item.completed).length;
    return { completed, total: allItems.length, percentage: allItems.length ? Math.round((completed / allItems.length) * 100) : 0 };
  };

  const getOverallProgress = () => {
    const allItems = Object.values(tasks).flat().reduce((acc, task) => {
      acc.push(task);
      acc.push(...task.subtasks);
      return acc;
    }, []);
    const completed = allItems.filter(item => item.completed).length;
    return { completed, total: allItems.length, percentage: Math.round((completed / allItems.length) * 100) };
  };

  const getFileIcon = (filename) => {
    if (filename.includes('.ts') || filename.includes('.js')) return <Code className="h-3 w-3" />;
    if (filename.includes('.tsx') || filename.includes('.jsx')) return <Code className="h-3 w-3" />;
    if (filename.includes('/')) return <Folder className="h-3 w-3" />;
    return <FileText className="h-3 w-3" />;
  };

  const filteredPhases = Object.keys(phases).filter(phaseKey => {
    if (selectedPhase !== 'all' && phaseKey !== selectedPhase) return false;
    
    const phaseTasks = tasks[phaseKey];
    return phaseTasks.some(task => {
      const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.subtasks.some(subtask => subtask.text.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
      return matchesSearch && matchesPriority;
    });
  });

  const getFilteredTasks = (phaseKey) => {
    return tasks[phaseKey].filter(task => {
      const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.subtasks.some(subtask => subtask.text.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
      return matchesSearch && matchesPriority;
    });
  };

  const overallProgress = getOverallProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Rocket className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Chatbot SaaS Platform</h1>
              <p className="text-slate-600">Guia detalhado com subtarefas e orientações</p>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900">Progresso Geral</h2>
              <span className="text-2xl font-bold text-blue-600">{overallProgress.percentage}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3 mb-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${overallProgress.percentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-slate-600">
              {overallProgress.completed} de {overallProgress.total} itens concluídos
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar tarefas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <select
                value={selectedPhase}
                onChange={(e) => setSelectedPhase(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="all">Todas as Fases</option>
                {Object.entries(phases).map(([key, phase]) => (
                  <option key={key} value={key}>{phase.name}</option>
                ))}
              </select>

              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="all">Todas as Prioridades</option>
                <option value="crítica">Crítica</option>
                <option value="alta">Alta</option>
                <option value="média">Média</option>
                <option value="baixa">Baixa</option>
              </select>
            </div>
          </div>
        </div>

        {/* Task Phases */}
        <div className="space-y-6">
          {filteredPhases.map(phaseKey => {
            const phase = phases[phaseKey];
            const progress = getPhaseProgress(phaseKey);
            const filteredTasks = getFilteredTasks(phaseKey);
            const Icon = phase.icon;

            return (
              <div key={phaseKey} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Phase Header */}
                <div className="p-6 border-b border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 ${phase.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{phase.name}</h3>
                        <p className="text-sm text-slate-600">{progress.completed}/{progress.total} itens concluídos</p>
                      </div>
                    </div>
                    <span className="text-lg font-semibold text-slate-700">{progress.percentage}%</span>
                  </div>
                  
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className={`${phase.color} h-2 rounded-full transition-all duration-500 ease-out`}
                      style={{ width: `${progress.percentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Tasks */}
                <div className="p-6">
                  <div className="space-y-4">
                    {filteredTasks.map(task => (
                      <div key={task.id} className="border border-slate-200 rounded-xl overflow-hidden">
                        {/* Main Task */}
                        <div 
                          className={`flex items-center gap-4 p-4 cursor-pointer transition-all duration-200 hover:shadow-sm ${
                            task.completed ? 'bg-green-50' : 'bg-slate-50 hover:bg-slate-100'
                          }`}
                        >
                          <button 
                            className="flex-shrink-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTask(phaseKey, task.id);
                            }}
                          >
                            {task.completed ? (
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                            ) : (
                              <Circle className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                            )}
                          </button>
                          
                          <div className="flex-1 min-w-0" onClick={() => toggleExpanded(task.id)}>
                            <p className={`font-medium ${
                              task.completed ? 'text-green-800 line-through' : 'text-slate-900'
                            }`}>
                              {task.text}
                            </p>
                            {task.subtasks.length > 0 && (
                              <p className="text-sm text-slate-500 mt-1">
                                {task.subtasks.filter(s => s.completed).length}/{task.subtasks.length} subtarefas
                              </p>
                            )}
                          </div>
                          
                          <div className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
                            {task.priority}
                          </div>

                          {task.subtasks.length > 0 && (
                            <button 
                              onClick={() => toggleExpanded(task.id)}
                              className="flex-shrink-0 p-1 text-slate-400 hover:text-slate-600"
                            >
                              {expandedTasks[task.id] ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </button>
                          )}
                        </div>

                        {/* Subtasks */}
                        {expandedTasks[task.id] && task.subtasks.length > 0 && (
                          <div className="border-t border-slate-200 bg-slate-25">
                            {task.subtasks.map(subtask => (
                              <div 
                                key={subtask.id}
                                className={`flex items-start gap-4 p-4 border-b last:border-b-0 border-slate-100 cursor-pointer hover:bg-slate-50 ${
                                  subtask.completed ? 'bg-green-25' : ''
                                }`}
                                onClick={() => toggleSubtask(phaseKey, task.id, subtask.id)}
                              >
                                <button className="flex-shrink-0 mt-0.5">
                                  {subtask.completed ? (
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <Circle className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                                  )}
                                </button>
                                
                                <div className="flex-1 min-w-0">
                                  <p className={`text-sm font-medium ${
                                    subtask.completed ? 'text-green-800 line-through' : 'text-slate-800'
                                  }`}>
                                    {subtask.text}
                                  </p>
                                  
                                  {subtask.file && (
                                    <div className="flex items-center gap-2 mt-2 text-xs text-blue-600">
                                      {getFileIcon(subtask.file)}
                                      <code className="bg-blue-50 px-2 py-1 rounded border">
                                        {subtask.file}
                                      </code>
                                    </div>
                                  )}
                                  
                                  {subtask.description && (
                                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                                      {subtask.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm">
            🎯 Clique nas tarefas para ver subtarefas detalhadas com orientações específicas!
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskList;