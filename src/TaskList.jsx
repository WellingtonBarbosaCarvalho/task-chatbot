import React, { useState } from 'react';
import { CheckCircle2, Circle, Search, ChevronDown, ChevronRight, FileText, Folder, Code, Settings, Rocket, Database, Palette, MessageSquare, Target, Zap, Gift } from 'lucide-react';

const TaskList = () => {
  const [tasks, setTasks] = useState({
    // ✅ JÁ FEITO - Base do Sistema CONFIRMADO
    "system_foundation": [
      { 
        id: "auth_system", 
        text: "Sistema de autenticação completo", 
        completed: true, 
        priority: "crítica",
        subtasks: [
          { id: "auth_routes", text: "Rotas /login, /register, /logout", completed: true, file: "start/routes.ts", description: "✅ Confirmado nas rotas" },
          { id: "auth_controller", text: "AuthController com métodos", completed: true, file: "app/controllers/auth_controller.ts", description: "✅ index, register, login, logout, dashboard" },
          { id: "user_model", text: "User model funcionando", completed: true, file: "app/models/user.ts", description: "✅ Migration 1748654699051 rodada" }
        ]
      },
      { 
        id: "plans_crud_complete", 
        text: "CRUD Plans 100% completo", 
        completed: true, 
        priority: "alta",
        subtasks: [
          { id: "plans_migration", text: "Migration plans", completed: true, file: "database/migrations/1748997859200_create_add_plans_table", description: "✅ Batch 2 completed" },
          { id: "plans_model", text: "Plan model", completed: true, file: "app/models/plan.ts", description: "✅ Com relacionamento ManyToMany" },
          { id: "plans_controller", text: "PlansController completo", completed: true, file: "app/controllers/plans_controller.ts", description: "✅ index, store, show funcionando" },
          { id: "plans_routes", text: "Rotas plans funcionando", completed: true, file: "start/routes.ts", description: "✅ GET/POST /admin/plans, GET /admin/plans/:id" }
        ]
      },
      { 
        id: "companies_base", 
        text: "Companies estrutura base", 
        completed: true, 
        priority: "alta",
        subtasks: [
          { id: "companies_migration", text: "Migration companies", completed: true, file: "database/migrations/1748997916737_create_add_companies_table", description: "✅ Batch 2 completed" },
          { id: "companies_model", text: "Company model base", completed: true, file: "app/models/company.ts", description: "✅ Com relacionamento plans" },
          { id: "companies_pivot", text: "Pivot companies_plans", completed: true, file: "database/migrations/1748998383501_create_add_companies_plans_pivots_table", description: "✅ Batch 2 completed" },
          { id: "companies_controller_partial", text: "CompaniesController parcial", completed: true, file: "app/controllers/companies_controller.ts", description: "✅ index() e store() implementados" }
        ]
      }
    ],

    // 🚧 PRIORIDADE MÁXIMA - Fundação Multi-tenant
    "multi_tenant_foundation": [
      { 
        id: "user_company_relation", 
        text: "User → Company relationship", 
        completed: false, 
        priority: "crítica",
        subtasks: [
          { id: "user_company_migration", text: "Migration add company_id to users", completed: false, file: "database/migrations/", description: "node ace make:migration add_company_id_to_users" },
          { id: "user_company_migration_content", text: "Conteúdo da migration", completed: false, file: "database/migrations/XXXX_add_company_id_to_users", description: "table.integer('company_id').unsigned().references('companies.id')" },
          { id: "user_model_belongs_to", text: "User belongsTo Company", completed: false, file: "app/models/user.ts", description: "@belongsTo(() => Company) declare company: BelongsTo<typeof Company>" },
          { id: "company_model_has_many", text: "Company hasMany Users", completed: false, file: "app/models/company.ts", description: "@hasMany(() => User) declare users: HasMany<typeof User>" },
          { id: "run_user_migration", text: "Rodar migration", completed: false, file: "terminal", description: "node ace migration:run" }
        ]
      },
      { 
        id: "tenant_middleware", 
        text: "Middleware isolamento de dados", 
        completed: false, 
        priority: "crítica",
        subtasks: [
          { id: "create_tenant_middleware", text: "Criar TenantMiddleware", completed: false, file: "app/middleware/tenant_middleware.ts", description: "node ace make:middleware tenant" },
          { id: "tenant_middleware_logic", text: "Lógica de isolamento", completed: false, file: "app/middleware/tenant_middleware.ts", description: "ctx.auth.user.company_id + adicionar where automático" },
          { id: "register_tenant_middleware", text: "Registrar no kernel", completed: false, file: "start/kernel.ts", description: "Adicionar 'tenant': () => import('#middleware/tenant_middleware')" },
          { id: "apply_tenant_routes", text: "Aplicar em rotas client", completed: false, file: "start/routes.ts", description: "router.group().middleware(['auth', 'tenant'])" }
        ]
      },
      { 
        id: "companies_crud_complete", 
        text: "Completar CRUD Companies", 
        completed: false, 
        priority: "alta",
        subtasks: [
          { id: "companies_show_route", text: "Rota GET /admin/companies/:id", completed: false, file: "start/routes.ts", description: "router.get('companies/:id', [CompaniesController, 'show'])" },
          { id: "companies_show_method", text: "Método show() no controller", completed: false, file: "app/controllers/companies_controller.ts", description: "Buscar company + preload plans e users" },
          { id: "companies_edit_routes", text: "Rotas edit/update/delete", completed: false, file: "start/routes.ts", description: "GET companies/:id/edit, PUT companies/:id, DELETE companies/:id" },
          { id: "companies_update_method", text: "Métodos update() e destroy()", completed: false, file: "app/controllers/companies_controller.ts", description: "Validação + update + soft delete" }
        ]
      },
      { 
        id: "user_seeder_fix", 
        text: "Corrigir User Seeder para companies", 
        completed: false, 
        priority: "média",
        subtasks: [
          { id: "update_user_seeder", text: "Atualizar UserSeeder", completed: false, file: "database/seeders/user_seeder.ts", description: "Adicionar company_id aos users criados" },
          { id: "fix_duplicate_email", text: "Resolver email duplicado", completed: false, file: "database/seeders/user_seeder.ts", description: "Verificar se user já existe antes de criar" },
          { id: "run_fresh_seed", text: "Rodar seed limpo", completed: false, file: "terminal", description: "node ace db:seed ou migration:fresh + seed" }
        ]
      }
    ],

    // 🤖 CHATBOT CORE - Models & Database
    "chatbot_models": [
      { 
        id: "chatbot_model_complete", 
        text: "Model Chatbot completo", 
        completed: false, 
        priority: "crítica",
        subtasks: [
          { id: "chatbot_migration", text: "Migration chatbots table", completed: false, file: "database/migrations/", description: "node ace make:migration chatbots" },
          { id: "chatbot_migration_schema", text: "Schema da migration", completed: false, file: "database/migrations/XXXX_chatbots", description: "id, company_id, name, description, config:json, status:enum, timestamps" },
          { id: "chatbot_model_file", text: "Criar Chatbot model", completed: false, file: "app/models/chatbot.ts", description: "node ace make:model chatbot" },
          { id: "chatbot_company_relation", text: "Chatbot → Company relation", completed: false, file: "app/models/chatbot.ts", description: "@belongsTo(() => Company)" },
          { id: "company_chatbots_relation", text: "Company → Chatbots relation", completed: false, file: "app/models/company.ts", description: "@hasMany(() => Chatbot)" }
        ]
      },
      { 
        id: "conversation_model", 
        text: "Model Conversation", 
        completed: false, 
        priority: "crítica",
        subtasks: [
          { id: "conversation_migration", text: "Migration conversations", completed: false, file: "database/migrations/", description: "node ace make:migration conversations" },
          { id: "conversation_schema", text: "Schema conversations", completed: false, file: "database/migrations/XXXX_conversations", description: "id, chatbot_id, user_session:string, status:enum, started_at, ended_at" },
          { id: "conversation_model_file", text: "Conversation model", completed: false, file: "app/models/conversation.ts", description: "node ace make:model conversation" },
          { id: "conversation_chatbot_rel", text: "Conversation → Chatbot", completed: false, file: "app/models/conversation.ts", description: "@belongsTo(() => Chatbot)" },
          { id: "chatbot_conversations_rel", text: "Chatbot → Conversations", completed: false, file: "app/models/chatbot.ts", description: "@hasMany(() => Conversation)" }
        ]
      },
      { 
        id: "message_model", 
        text: "Model Message", 
        completed: false, 
        priority: "crítica",
        subtasks: [
          { id: "message_migration", text: "Migration messages", completed: false, file: "database/migrations/", description: "node ace make:migration messages" },
          { id: "message_schema", text: "Schema messages", completed: false, file: "database/migrations/XXXX_messages", description: "id, conversation_id, content:text, sender_type:enum(user,bot,system), metadata:json" },
          { id: "message_model_file", text: "Message model", completed: false, file: "app/models/message.ts", description: "node ace make:model message" },
          { id: "message_conversation_rel", text: "Message → Conversation", completed: false, file: "app/models/message.ts", description: "@belongsTo(() => Conversation)" },
          { id: "conversation_messages_rel", text: "Conversation → Messages", completed: false, file: "app/models/conversation.ts", description: "@hasMany(() => Message)" }
        ]
      }
    ],

    // 🎨 ÁREA DO CLIENTE - Dashboard & Management
    "client_area": [
      { 
        id: "client_dashboard_setup", 
        text: "Setup área do cliente", 
        completed: false, 
        priority: "alta",
        subtasks: [
          { id: "client_controller", text: "Criar ClientController", completed: false, file: "app/controllers/client_controller.ts", description: "node ace make:controller client" },
          { id: "client_routes_group", text: "Group rotas /client", completed: false, file: "start/routes.ts", description: "router.group().prefix('/client').middleware(['auth', 'tenant'])" },
          { id: "client_dashboard_route", text: "Rota /client/dashboard", completed: false, file: "start/routes.ts", description: "router.get('/dashboard', [ClientController, 'dashboard'])" },
          { id: "client_dashboard_method", text: "Método dashboard no ClientController", completed: false, file: "app/controllers/client_controller.ts", description: "Buscar métricas da company (chatbots count, etc)" }
        ]
      },
      { 
        id: "chatbots_management", 
        text: "Gestão de Chatbots", 
        completed: false, 
        priority: "alta",
        subtasks: [
          { id: "fix_chatbot_route", text: "Corrigir rota chatbot atual", completed: false, file: "start/routes.ts", description: "Mover GET /admin/chatbot para /client/chatbots" },
          { id: "chatbots_index_method", text: "Método index() - listar chatbots", completed: false, file: "app/controllers/client_controller.ts", description: "Listar chatbots da company do user logado" },
          { id: "chatbots_crud_routes", text: "Rotas CRUD chatbots", completed: false, file: "start/routes.ts", description: "GET/POST /chatbots, GET/PUT /chatbots/:id, DELETE /chatbots/:id" },
          { id: "chatbots_crud_methods", text: "Métodos CRUD no ClientController", completed: false, file: "app/controllers/client_controller.ts", description: "create, store, show, edit, update, destroy" }
        ]
      },
      { 
        id: "chatbot_forms", 
        text: "Formulários Chatbot", 
        completed: false, 
        priority: "alta",
        subtasks: [
          { id: "chatbot_validator", text: "Validator para Chatbot", completed: false, file: "app/validators/chatbot_validator.ts", description: "node ace make:validator chatbot" },
          { id: "chatbot_validation_rules", text: "Regras de validação", completed: false, file: "app/validators/chatbot_validator.ts", description: "name: required|string, description: string, config: object" },
          { id: "chatbot_create_view", text: "View criar chatbot", completed: false, file: "inertia/pages/client/chatbots/Create.tsx", description: "Form com name, description, configurações básicas" },
          { id: "chatbot_edit_view", text: "View editar chatbot", completed: false, file: "inertia/pages/client/chatbots/Edit.tsx", description: "Form preenchido para edição" }
        ]
      }
    ],

    // 💬 SISTEMA DE CHAT - Core do Produto
    "chat_system": [
      { 
        id: "websocket_infrastructure", 
        text: "Infraestrutura WebSocket", 
        completed: false, 
        priority: "crítica",
        subtasks: [
          { id: "install_socketio", text: "Instalar Socket.IO", completed: false, file: "package.json", description: "npm install socket.io @types/socket.io" },
          { id: "socket_service", text: "Criar SocketService", completed: false, file: "app/services/socket_service.ts", description: "Service para gerenciar conexões WebSocket" },
          { id: "socket_boot", text: "Inicializar no boot da aplicação", completed: false, file: "start/app.ts", description: "Startar socket server junto com HTTP server" },
          { id: "socket_namespaces", text: "Namespaces por chatbot", completed: false, file: "app/services/socket_service.ts", description: "io.of(`/chatbot/${chatbotId}`)" }
        ]
      },
      { 
        id: "conversation_service", 
        text: "Service de Conversas", 
        completed: false, 
        priority: "crítica",
        subtasks: [
          { id: "conversation_service_file", text: "Criar ConversationService", completed: false, file: "app/services/conversation_service.ts", description: "Service para lógica de conversas" },
          { id: "start_conversation_method", text: "Método startConversation()", completed: false, file: "app/services/conversation_service.ts", description: "Criar nova conversation + primeira mensagem de boas-vindas" },
          { id: "send_message_method", text: "Método sendMessage()", completed: false, file: "app/services/conversation_service.ts", description: "Salvar mensagem + emitir via socket" },
          { id: "end_conversation_method", text: "Método endConversation()", completed: false, file: "app/services/conversation_service.ts", description: "Marcar conversation como ended" }
        ]
      },
      { 
        id: "ai_integration", 
        text: "Integração com IA", 
        completed: false, 
        priority: "crítica",
        subtasks: [
          { id: "install_ai_sdk", text: "Instalar OpenAI SDK", completed: false, file: "package.json", description: "npm install openai" },
          { id: "ai_service_file", text: "Criar AIService", completed: false, file: "app/services/ai_service.ts", description: "Service para integração com OpenAI/Claude" },
          { id: "ai_env_config", text: "Configurar env vars", completed: false, file: ".env", description: "OPENAI_API_KEY, AI_MODEL, etc" },
          { id: "generate_response_method", text: "Método generateResponse()", completed: false, file: "app/services/ai_service.ts", description: "Enviar contexto + configuração do chatbot para IA" }
        ]
      },
      { 
        id: "chat_api_endpoints", 
        text: "API Endpoints do Chat", 
        completed: false, 
        priority: "alta",
        subtasks: [
          { id: "chat_controller", text: "Criar ChatController", completed: false, file: "app/controllers/chat_controller.ts", description: "node ace make:controller chat" },
          { id: "chat_routes", text: "Rotas API do chat", completed: false, file: "start/routes.ts", description: "POST /api/chat/:chatbotId/message, GET /api/chat/:chatbotId/history" },
          { id: "chat_cors", text: "Configurar CORS para embeds", completed: false, file: "config/cors.ts", description: "Permitir origins para widgets embeddados" },
          { id: "chat_rate_limiting", text: "Rate limiting", completed: false, file: "config/limiter.ts", description: "Limitar requests por IP/chatbot" }
        ]
      }
    ],

    // 🎨 CHAT WIDGET - Interface do Usuário
    "chat_widget": [
      { 
        id: "widget_components", 
        text: "Componentes do Widget", 
        completed: false, 
        priority: "alta",
        subtasks: [
          { id: "chat_widget_main", text: "Componente ChatWidget principal", completed: false, file: "inertia/components/chat/ChatWidget.tsx", description: "Container principal do widget" },
          { id: "message_list_component", text: "Componente MessageList", completed: false, file: "inertia/components/chat/MessageList.tsx", description: "Lista de mensagens user/bot" },
          { id: "message_input_component", text: "Componente MessageInput", completed: false, file: "inertia/components/chat/MessageInput.tsx", description: "Input + botão enviar + loading states" },
          { id: "typing_indicator", text: "Indicador de digitação", completed: false, file: "inertia/components/chat/TypingIndicator.tsx", description: "Mostrar quando bot está 'pensando'" }
        ]
      },
      { 
        id: "widget_socket_client", 
        text: "Cliente WebSocket", 
        completed: false, 
        priority: "alta",
        subtasks: [
          { id: "socket_hook", text: "Hook useSocket", completed: false, file: "inertia/hooks/useSocket.ts", description: "Hook React para conectar WebSocket" },
          { id: "socket_client_config", text: "Configuração cliente socket", completed: false, file: "inertia/hooks/useSocket.ts", description: "Conectar namespace específico do chatbot" },
          { id: "socket_event_handlers", text: "Handlers de eventos", completed: false, file: "inertia/hooks/useSocket.ts", description: "message, typing, disconnect, error" },
          { id: "socket_reconnection", text: "Lógica de reconexão", completed: false, file: "inertia/hooks/useSocket.ts", description: "Auto-reconnect com backoff" }
        ]
      },
      { 
        id: "embed_system", 
        text: "Sistema de Embed", 
        completed: false, 
        priority: "média",
        subtasks: [
          { id: "embed_code_generator", text: "Gerador de código embed", completed: false, file: "app/controllers/client_controller.ts", description: "Gerar <script> tag para cada chatbot" },
          { id: "embed_script", text: "Script embed.js", completed: false, file: "public/js/embed.js", description: "Script standalone para carregar widget" },
          { id: "widget_iframe", text: "Widget em iframe", completed: false, file: "inertia/pages/embed/Widget.tsx", description: "Versão iframe do widget" },
          { id: "embed_customization", text: "Personalização visual", completed: false, file: "inertia/components/chat/", description: "Cores, posição, tamanho configuráveis" }
        ]
      }
    ],

    // 📊 ANALYTICS & MONITORING
    "analytics_monitoring": [
      { 
        id: "conversation_analytics", 
        text: "Analytics de Conversas", 
        completed: false, 
        priority: "média",
        subtasks: [
          { id: "analytics_controller", text: "AnalyticsController", completed: false, file: "app/controllers/analytics_controller.ts", description: "node ace make:controller analytics" },
          { id: "conversation_metrics", text: "Métricas de conversas", completed: false, file: "app/controllers/analytics_controller.ts", description: "Total, ativas, finalizadas por período" },
          { id: "message_metrics", text: "Métricas de mensagens", completed: false, file: "app/controllers/analytics_controller.ts", description: "Count user vs bot, média por conversa" },
          { id: "analytics_dashboard", text: "Dashboard analytics", completed: false, file: "inertia/pages/client/Analytics.tsx", description: "Gráficos com métricas dos chatbots" }
        ]
      },
      { 
        id: "real_time_monitoring", 
        text: "Monitoramento Tempo Real", 
        completed: false, 
        priority: "baixa",
        subtasks: [
          { id: "active_conversations", text: "Conversas ativas ao vivo", completed: false, file: "inertia/pages/client/LiveChat.tsx", description: "Lista de conversas acontecendo agora" },
          { id: "conversation_viewer", text: "Visualizador de conversa", completed: false, file: "inertia/pages/client/ConversationView.tsx", description: "Ver conversa individual em tempo real" },
          { id: "operator_takeover", text: "Operador assumir conversa", completed: false, file: "app/services/conversation_service.ts", description: "Transferir bot → humano" },
          { id: "notification_system", text: "Sistema de notificações", completed: false, file: "inertia/hooks/useNotifications.ts", description: "Alertas para operadores" }
        ]
      }
    ],

    // 💳 BILLING & PLAN ENFORCEMENT  
    "billing_enforcement": [
      { 
        id: "plan_limits", 
        text: "Enforcement de Limites", 
        completed: false, 
        priority: "alta",
        subtasks: [
          { id: "usage_tracking_service", text: "Service para tracking", completed: false, file: "app/services/usage_service.ts", description: "Contar mensagens/mês por company" },
          { id: "plan_middleware", text: "Middleware verificar limites", completed: false, file: "app/middleware/plan_limit_middleware.ts", description: "Bloquear se excedeu plano" },
          { id: "usage_model", text: "Model Usage", completed: false, file: "app/models/usage.ts", description: "Armazenar uso mensal por company" },
          { id: "limit_warnings", text: "Avisos de limite", completed: false, file: "app/services/notification_service.ts", description: "Notificar quando próximo do limite" }
        ]
      }
    ]
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPhase, setSelectedPhase] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [expandedTasks, setExpandedTasks] = useState({});

  const phases = {
    system_foundation: { name: "✅ Base do Sistema (CONFIRMADO)", icon: CheckCircle2, color: "bg-green-500" },
    multi_tenant_foundation: { name: "🚧 Fundação Multi-tenant", icon: Database, color: "bg-red-500" },
    chatbot_models: { name: "🤖 Models Chatbot", icon: Database, color: "bg-blue-500" },
    client_area: { name: "🎨 Área do Cliente", icon: Palette, color: "bg-purple-500" },
    chat_system: { name: "💬 Sistema de Chat", icon: MessageSquare, color: "bg-teal-500" },
    chat_widget: { name: "🎨 Chat Widget", icon: MessageSquare, color: "bg-indigo-500" },
    analytics_monitoring: { name: "📊 Analytics & Monitoring", icon: Target, color: "bg-emerald-500" },
    billing_enforcement: { name: "💳 Billing & Enforcement", icon: Rocket, color: "bg-yellow-500" }
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
    if (filename.includes('/') || filename.includes('terminal')) return <Folder className="h-3 w-3" />;
    return <FileText className="h-3 w-3" />;
  };

  const getNextPriorityTasks = () => {
    return Object.values(tasks).flat()
      .filter(task => !task.completed && (task.priority === 'crítica'))
      .slice(0, 3);
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
  const nextPriorityTasks = getNextPriorityTasks();

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
              <p className="text-slate-600">Baseado no estado real confirmado do projeto</p>
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

          {/* Next Critical Tasks */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              🚨 Próximas Tarefas CRÍTICAS
            </h3>
            <div className="space-y-3">
              {nextPriorityTasks.map((task, index) => (
                <div key={task.id} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="text-slate-900 font-medium">{task.text}</span>
                  <span className="ml-auto px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                    CRÍTICA
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>🎯 FOCO TOTAL:</strong> Completar Multi-tenant Foundation primeiro! 
                Sem isso, o chatbot será global (não isolado por company).
              </p>
            </div>
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
                            task.completed ? 'bg-green-50' : 
                            task.priority === 'crítica' ? 'bg-red-50 hover:bg-red-100' :
                            'bg-slate-50 hover:bg-slate-100'
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
                              <Circle className={`h-5 w-5 hover:text-slate-600 ${
                                task.priority === 'crítica' ? 'text-red-500' : 'text-slate-400'
                              }`} />
                            )}
                          </button>
                          
                          <div className="flex-1 min-w-0" onClick={() => toggleExpanded(task.id)}>
                            <p className={`font-medium ${
                              task.completed ? 'text-green-800 line-through' : 
                              task.priority === 'crítica' ? 'text-red-900' : 'text-slate-900'
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
            🎯 Task list atualizada baseada no estado REAL confirmado do projeto!
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskList;