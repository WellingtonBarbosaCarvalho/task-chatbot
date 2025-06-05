import React, { useState } from 'react';
import { CheckCircle2, Circle, Search, Filter, Rocket, Database, Palette, MessageSquare, Target, Zap, Gift } from 'lucide-react';

const TaskList = () => {
  const [tasks, setTasks] = useState({
    // ✅ JÁ FEITO - Base do Sistema
    "system_foundation": [
      { id: "auth_system", text: "Sistema de autenticação", completed: true, priority: "crítica" },
      { id: "company_model", text: "Model Company", completed: true, priority: "alta" },
      { id: "plan_model", text: "Model Plan", completed: true, priority: "alta" },
      { id: "user_model", text: "Model User", completed: true, priority: "alta" },
      { id: "company_plan_relation", text: "Relacionamento Company ↔ Plan", completed: true, priority: "alta" },
      { id: "plans_crud", text: "CRUD Plans completo", completed: true, priority: "alta" },
      { id: "admin_dashboard", text: "Dashboard admin estruturado", completed: true, priority: "alta" }
    ],

    // 🚧 EM ANDAMENTO - Completar Base
    "complete_foundation": [
      { id: "companies_crud_complete", text: "Completar CRUD Companies (show, edit, delete)", completed: false, priority: "alta" },
      { id: "user_company_relation", text: "Relacionar User → Company (multi-tenancy)", completed: false, priority: "crítica" },
      { id: "tenant_middleware", text: "Middleware para isolamento de dados", completed: false, priority: "crítica" },
      { id: "company_users_management", text: "Gerenciar usuários por company", completed: false, priority: "alta" },
      { id: "company_dashboard", text: "Dashboard específico da company", completed: false, priority: "alta" }
    ],

    // 🤖 CHATBOT CORE - Models & Database
    "chatbot_models": [
      { id: "chatbot_model", text: "Model Chatbot (company_id, name, config, status)", completed: false, priority: "crítica" },
      { id: "conversation_model", text: "Model Conversation (chatbot_id, user_session, status)", completed: false, priority: "crítica" },
      { id: "message_model", text: "Model Message (conversation_id, content, sender_type)", completed: false, priority: "crítica" },
      { id: "chatbot_migration", text: "Migration chatbots table", completed: false, priority: "alta" },
      { id: "conversation_migration", text: "Migration conversations table", completed: false, priority: "alta" },
      { id: "message_migration", text: "Migration messages table", completed: false, priority: "alta" }
    ],

    // 🎨 CHATBOT MANAGEMENT - Dashboard Cliente
    "chatbot_management": [
      { id: "chatbots_list_page", text: "Página /chatbots - listar por company", completed: false, priority: "alta" },
      { id: "chatbot_create_form", text: "Formulário criar novo chatbot", completed: false, priority: "alta" },
      { id: "chatbot_edit_form", text: "Formulário editar chatbot", completed: false, priority: "alta" },
      { id: "chatbot_config_basic", text: "Configurações básicas (nome, descrição)", completed: false, priority: "alta" },
      { id: "chatbot_toggle_status", text: "Ativar/desativar chatbot", completed: false, priority: "média" },
      { id: "chatbot_preview", text: "Preview do chatbot", completed: false, priority: "baixa" }
    ],

    // 💬 CHAT SYSTEM - Core do Produto
    "chat_system": [
      { id: "websocket_setup", text: "Configurar WebSocket/Socket.io", completed: false, priority: "crítica" },
      { id: "conversation_service", text: "Service para gerenciar conversas", completed: false, priority: "crítica" },
      { id: "message_service", text: "Service para enviar/receber mensagens", completed: false, priority: "crítica" },
      { id: "ai_integration", text: "Integração com OpenAI/Claude API", completed: false, priority: "crítica" },
      { id: "chat_widget_component", text: "Componente React do chat widget", completed: false, priority: "alta" },
      { id: "embed_code_generator", text: "Gerador de código embed", completed: false, priority: "média" }
    ],

    // 📊 ANALYTICS & REPORTS
    "analytics_reports": [
      { id: "conversation_analytics", text: "Analytics de conversas por chatbot", completed: false, priority: "média" },
      { id: "message_statistics", text: "Estatísticas de mensagens", completed: false, priority: "média" },
      { id: "chatbot_performance", text: "Performance dos chatbots", completed: false, priority: "baixa" },
      { id: "export_conversations", text: "Exportar histórico de conversas", completed: false, priority: "baixa" },
      { id: "real_time_dashboard", text: "Dashboard tempo real", completed: false, priority: "baixa" }
    ],

    // 🔧 ADVANCED FEATURES
    "advanced_features": [
      { id: "chatbot_personality", text: "Configurar personalidade do chatbot", completed: false, priority: "baixa" },
      { id: "custom_prompts", text: "Prompts customizados por chatbot", completed: false, priority: "baixa" },
      { id: "fallback_to_human", text: "Fallback para atendimento humano", completed: false, priority: "média" },
      { id: "conversation_context", text: "Manter contexto da conversa", completed: false, priority: "média" },
      { id: "multiple_languages", text: "Suporte múltiplos idiomas", completed: false, priority: "baixa" }
    ],

    // 🔗 INTEGRATIONS
    "integrations": [
      { id: "whatsapp_webhook", text: "Webhook WhatsApp Business", completed: false, priority: "baixa" },
      { id: "telegram_integration", text: "Integração Telegram", completed: false, priority: "baixa" },
      { id: "api_endpoints", text: "API REST para integrações", completed: false, priority: "média" },
      { id: "webhook_system", text: "Sistema de webhooks customizados", completed: false, priority: "baixa" },
      { id: "api_documentation", text: "Documentação da API", completed: false, priority: "baixa" }
    ],

    // 💳 BILLING & LIMITS
    "billing_limits": [
      { id: "plan_limits_enforcement", text: "Enforçar limites dos planos", completed: false, priority: "alta" },
      { id: "usage_tracking", text: "Tracking de uso (mensagens/mês)", completed: false, priority: "alta" },
      { id: "billing_integration", text: "Integração Stripe/Mercado Pago", completed: false, priority: "média" },
      { id: "subscription_management", text: "Gerenciar assinaturas", completed: false, priority: "média" },
      { id: "usage_alerts", text: "Alertas de limite de uso", completed: false, priority: "baixa" }
    ],

    // 🚀 DEPLOYMENT & PERFORMANCE
    "deployment_performance": [
      { id: "environment_config", text: "Configurar envs para produção", completed: false, priority: "alta" },
      { id: "database_optimization", text: "Otimizar queries e indexes", completed: false, priority: "média" },
      { id: "caching_strategy", text: "Implementar cache (Redis)", completed: false, priority: "baixa" },
      { id: "error_monitoring", text: "Monitoramento de erros", completed: false, priority: "baixa" },
      { id: "performance_monitoring", text: "Monitoramento de performance", completed: false, priority: "baixa" }
    ]
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPhase, setSelectedPhase] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  const phases = {
    system_foundation: { name: "✅ Base do Sistema (PRONTO)", icon: CheckCircle2, color: "bg-green-500" },
    complete_foundation: { name: "🚧 Completar Fundação", icon: Database, color: "bg-orange-500" },
    chatbot_models: { name: "🤖 Models Chatbot", icon: Database, color: "bg-blue-500" },
    chatbot_management: { name: "🎨 Gestão de Chatbots", icon: Palette, color: "bg-purple-500" },
    chat_system: { name: "💬 Sistema de Chat", icon: MessageSquare, color: "bg-teal-500" },
    analytics_reports: { name: "📊 Analytics & Reports", icon: Target, color: "bg-emerald-500" },
    advanced_features: { name: "🔧 Features Avançadas", icon: Zap, color: "bg-indigo-500" },
    integrations: { name: "🔗 Integrações", icon: Gift, color: "bg-pink-500" },
    billing_limits: { name: "💳 Billing & Limites", icon: Rocket, color: "bg-yellow-500" },
    deployment_performance: { name: "🚀 Deploy & Performance", icon: Rocket, color: "bg-red-500" }
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
  const nextPriorityTasks = Object.values(tasks).flat()
    .filter(task => !task.completed && (task.priority === 'crítica' || task.priority === 'alta'))
    .slice(0, 5);

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
              <p className="text-slate-600">Progresso baseado no código atual</p>
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

          {/* Next Priority Tasks */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">🎯 Próximas Tarefas Prioritárias</h3>
            <div className="space-y-2">
              {nextPriorityTasks.map((task, index) => (
                <div key={task.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="text-slate-900 font-medium">{task.text}</span>
                  <span className={`ml-auto px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
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
            🎯 Baseado no código atual - foque nas tarefas críticas para ter o MVP funcionando!
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskList;