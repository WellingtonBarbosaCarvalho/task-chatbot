import React, { useState } from 'react';
import { CheckCircle2, Circle, Search, Filter, Rocket, Database, Palette, MessageSquare, Target, Zap, Gift } from 'lucide-react';

const TaskList = () => {
  const [tasks, setTasks] = useState({
    // FASE 1: Fundação Multi-Tenant
    "database_migrations": [
      { id: "org_migration", text: "Criar migration 'organizations'", completed: false, priority: "alta" },
      { id: "chatbot_migration", text: "Criar migration 'chatbots'", completed: false, priority: "alta" },
      { id: "conversation_migration", text: "Criar migration 'conversations'", completed: false, priority: "alta" },
      { id: "message_migration", text: "Criar migration 'messages'", completed: false, priority: "alta" },
      { id: "plan_migration", text: "Criar migration 'subscription_plans'", completed: false, priority: "média" }
    ],
    "models_relationships": [
      { id: "org_model", text: "Criar model 'Organization' com relacionamentos", completed: false, priority: "alta" },
      { id: "chatbot_model", text: "Criar model 'Chatbot' com relacionamentos", completed: false, priority: "alta" },
      { id: "conversation_model", text: "Criar model 'Conversation' com relacionamentos", completed: false, priority: "alta" },
      { id: "message_model", text: "Criar model 'Message' com relacionamentos", completed: false, priority: "média" },
      { id: "plan_model", text: "Criar model 'SubscriptionPlan' com relacionamentos", completed: false, priority: "média" }
    ],
    "middleware_security": [
      { id: "tenant_middleware", text: "Criar TenantMiddleware para isolamento", completed: false, priority: "crítica" },
      { id: "org_policy", text: "Implementar OrganizationPolicy", completed: false, priority: "alta" },
      { id: "configure_middleware", text: "Configurar middleware nas rotas", completed: false, priority: "alta" },
      { id: "test_isolation", text: "Testar isolamento entre organizações", completed: false, priority: "alta" }
    ],

    // FASE 2: Interface Administrativa
    "admin_dashboard": [
      { id: "admin_dashboard_page", text: "Criar página /admin/dashboard", completed: false, priority: "alta" },
      { id: "admin_org_list", text: "Criar página /admin/organizations", completed: false, priority: "alta" },
      { id: "admin_org_create", text: "Criar página /admin/organizations/create", completed: false, priority: "alta" },
      { id: "admin_org_detail", text: "Criar página /admin/organizations/{id}", completed: false, priority: "média" },
      { id: "admin_search_filters", text: "Implementar busca e filtros", completed: false, priority: "baixa" }
    ],
    "analytics_basic": [
      { id: "chart_component", text: "Criar componente de gráficos", completed: false, priority: "média" },
      { id: "org_counter", text: "Contador de organizações ativas", completed: false, priority: "baixa" },
      { id: "chatbot_counter", text: "Contador de chatbots totais", completed: false, priority: "baixa" },
      { id: "conversation_counter", text: "Contador de conversas do mês", completed: false, priority: "baixa" },
      { id: "revenue_display", text: "Exibir receita mensal estimada", completed: false, priority: "baixa" }
    ],
    "crud_organizations": [
      { id: "org_controller", text: "Controller Admin/OrganizationsController", completed: false, priority: "alta" },
      { id: "org_validation", text: "Validação com VineJS", completed: false, priority: "alta" },
      { id: "org_logo_upload", text: "Upload de logo da organização", completed: false, priority: "média" },
      { id: "org_slug_generation", text: "Geração automática de slug", completed: false, priority: "média" },
      { id: "org_soft_delete", text: "Soft delete para organizações", completed: false, priority: "baixa" }
    ],

    // FASE 3: Dashboard do Cliente
    "client_dashboard": [
      { id: "client_dashboard_page", text: "Criar página /client/dashboard", completed: false, priority: "alta" },
      { id: "period_selector", text: "Seletor de período (7d, 30d, 90d)", completed: false, priority: "média" },
      { id: "conversation_stats", text: "Estatísticas de conversas", completed: false, priority: "média" },
      { id: "top_questions", text: "Top perguntas mais frequentes", completed: false, priority: "baixa" },
      { id: "plan_status", text: "Status do plano atual", completed: false, priority: "baixa" }
    ],
    "chatbot_management": [
      { id: "chatbot_list_page", text: "Página /client/chatbots", completed: false, priority: "alta" },
      { id: "chatbot_create_page", text: "Página /client/chatbots/create", completed: false, priority: "alta" },
      { id: "chatbot_edit_page", text: "Página /client/chatbots/{id}/edit", completed: false, priority: "alta" },
      { id: "chatbot_toggle", text: "Toggle ativo/inativo", completed: false, priority: "média" },
      { id: "chatbot_preview", text: "Preview em tempo real", completed: false, priority: "baixa" }
    ],
    "chatbot_config": [
      { id: "basic_config_form", text: "Formulário configuração básica", completed: false, priority: "alta" },
      { id: "personality_selector", text: "Seletor de personalidade", completed: false, priority: "média" },
      { id: "color_config", text: "Configuração de cor primária", completed: false, priority: "baixa" },
      { id: "avatar_upload", text: "Upload de avatar/logo", completed: false, priority: "baixa" },
      { id: "welcome_message", text: "Mensagem de boas-vindas", completed: false, priority: "média" }
    ],

    // FASE 4: Sistema de Conversas
    "websocket_setup": [
      { id: "websocket_config", text: "Configurar WebSocket no AdonisJS", completed: false, priority: "crítica" },
      { id: "websocket_namespace", text: "Namespace por organização/chatbot", completed: false, priority: "alta" },
      { id: "websocket_auth", text: "Autenticação para WebSocket", completed: false, priority: "alta" },
      { id: "websocket_test", text: "Testar conexão e desconexão", completed: false, priority: "alta" }
    ],
    "chat_engine": [
      { id: "conversation_service", text: "Criar ConversationService", completed: false, priority: "crítica" },
      { id: "new_conversation", text: "Início de nova conversa", completed: false, priority: "alta" },
      { id: "send_messages", text: "Envio de mensagens", completed: false, priority: "alta" },
      { id: "ai_integration", text: "Integrar com API de IA", completed: false, priority: "crítica" },
      { id: "fallback_system", text: "Sistema de fallback", completed: false, priority: "média" }
    ],
    "chat_widget": [
      { id: "react_widget", text: "Componente React para widget", completed: false, priority: "alta" },
      { id: "responsive_interface", text: "Interface responsiva", completed: false, priority: "alta" },
      { id: "typing_animations", text: "Animações de digitação", completed: false, priority: "baixa" },
      { id: "widget_positioning", text: "Configurar posicionamento", completed: false, priority: "média" },
      { id: "embed_code", text: "Gerar código de incorporação", completed: false, priority: "média" }
    ],

    // FASE 5: Features Essenciais
    "advanced_analytics": [
      { id: "chatbot_analytics", text: "Analytics para cada chatbot", completed: false, priority: "média" },
      { id: "conversation_charts", text: "Gráfico conversas por período", completed: false, priority: "média" },
      { id: "resolution_rate", text: "Taxa de resolução", completed: false, priority: "baixa" },
      { id: "response_time", text: "Tempo médio de resposta", completed: false, priority: "baixa" },
      { id: "export_reports", text: "Exportação de relatórios", completed: false, priority: "baixa" }
    ],
    "billing_system": [
      { id: "payment_integration", text: "Integração Stripe/Mercado Pago", completed: false, priority: "alta" },
      { id: "pricing_page", text: "Página de planos e preços", completed: false, priority: "alta" },
      { id: "subscription_checkout", text: "Checkout de assinatura", completed: false, priority: "alta" },
      { id: "billing_management", text: "Gerenciamento de cobrança", completed: false, priority: "média" },
      { id: "plan_limits", text: "Controle de limites por plano", completed: false, priority: "alta" }
    ],
    "basic_integrations": [
      { id: "webhook_receiver", text: "Webhook para mensagens externas", completed: false, priority: "média" },
      { id: "rest_api", text: "API REST para terceiros", completed: false, priority: "média" },
      { id: "whatsapp_integration", text: "Integração WhatsApp Business", completed: false, priority: "baixa" },
      { id: "api_documentation", text: "Documentação da API", completed: false, priority: "baixa" },
      { id: "rate_limiting", text: "Rate limiting nas APIs", completed: false, priority: "média" }
    ]
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPhase, setSelectedPhase] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  const phases = {
    database_migrations: { name: "Database & Migrations", icon: Database, color: "bg-blue-500" },
    models_relationships: { name: "Models & Relationships", icon: Database, color: "bg-blue-600" },
    middleware_security: { name: "Middleware & Security", icon: Zap, color: "bg-red-500" },
    admin_dashboard: { name: "Dashboard Admin", icon: Palette, color: "bg-purple-500" },
    analytics_basic: { name: "Analytics Básico", icon: Target, color: "bg-green-500" },
    crud_organizations: { name: "CRUD Organizações", icon: Palette, color: "bg-purple-600" },
    client_dashboard: { name: "Dashboard Cliente", icon: Palette, color: "bg-indigo-500" },
    chatbot_management: { name: "Gestão de Chatbots", icon: MessageSquare, color: "bg-cyan-500" },
    chatbot_config: { name: "Config. Chatbot", icon: MessageSquare, color: "bg-cyan-600" },
    websocket_setup: { name: "WebSocket Setup", icon: Zap, color: "bg-orange-500" },
    chat_engine: { name: "Chat Engine", icon: MessageSquare, color: "bg-teal-500" },
    chat_widget: { name: "Chat Widget", icon: MessageSquare, color: "bg-teal-600" },
    advanced_analytics: { name: "Analytics Avançado", icon: Target, color: "bg-emerald-500" },
    billing_system: { name: "Sistema de Billing", icon: Rocket, color: "bg-yellow-500" },
    basic_integrations: { name: "Integrações Básicas", icon: Gift, color: "bg-pink-500" }
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

  const getPhaseProgress = (phaseKey) => {
    const phaseTasks = tasks[phaseKey];
    const completed = phaseTasks.filter(task => task.completed).length;
    return { completed, total: phaseTasks.length, percentage: Math.round((completed / phaseTasks.length) * 100) };
  };

  const getOverallProgress = () => {
    const allTasks = Object.values(tasks).flat();
    const completed = allTasks.filter(task => task.completed).length;
    return { completed, total: allTasks.length, percentage: Math.round((completed / allTasks.length) * 100) };
  };

  const filteredPhases = Object.keys(phases).filter(phaseKey => {
    if (selectedPhase !== 'all' && phaseKey !== selectedPhase) return false;
    
    const phaseTasks = tasks[phaseKey];
    return phaseTasks.some(task => {
      const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
      return matchesSearch && matchesPriority;
    });
  });

  const getFilteredTasks = (phaseKey) => {
    return tasks[phaseKey].filter(task => {
      const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase());
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
              <h1 className="text-3xl font-bold text-slate-900">Plataforma de Chatbots SaaS</h1>
              <p className="text-slate-600">Acompanhe o progresso do desenvolvimento</p>
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
              {overallProgress.completed} de {overallProgress.total} tarefas concluídas
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
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

              {/* Phase Filter */}
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

              {/* Priority Filter */}
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
                        <p className="text-sm text-slate-600">{progress.completed}/{progress.total} concluídas</p>
                      </div>
                    </div>
                    <span className="text-lg font-semibold text-slate-700">{progress.percentage}%</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className={`${phase.color} h-2 rounded-full transition-all duration-500 ease-out`}
                      style={{ width: `${progress.percentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Tasks */}
                <div className="p-6">
                  <div className="space-y-3">
                    {filteredTasks.map(task => (
                      <div 
                        key={task.id}
                        className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 hover:shadow-sm cursor-pointer ${
                          task.completed 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                        }`}
                        onClick={() => toggleTask(phaseKey, task.id)}
                      >
                        <button className="flex-shrink-0">
                          {task.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : (
                            <Circle className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                          )}
                        </button>
                        
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium ${
                            task.completed ? 'text-green-800 line-through' : 'text-slate-900'
                          }`}>
                            {task.text}
                          </p>
                        </div>
                        
                        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
                          {task.priority}
                        </div>
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
            🚀 Vamos transformar essa ideia em realidade! Cada task concluída nos aproxima do lançamento.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskList;