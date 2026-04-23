export type Lang = 'en' | 'pt-br'

/** Case study fallback content keyed by project slug and language */
export const caseStudyContent: Record<string, Record<Lang, {
  subtitle: string
  overview: string[]
  problem: string[]
  approach: string[]
  solution: string[]
  finalReflection: string[]
  uxDecisions: { title: string; body: string }[]
  impact: { stat: string; label: string }[]
}>> = {
  slicecom: {
    en: {
      subtitle: 'ENTERPRISE-GRADE COMMISSION ENGINE OPTIMIZING COMPLEX FINANCIAL LOGIC.',
      overview: [
        'Slicecom is a commission management platform built for sales-driven organizations operating at scale. The core challenge was replacing brittle spreadsheet workflows with a structured, auditable engine that could handle multi-tier payout logic without custom engineering per client.',
        'The system needed to support thousands of agents, real-time recalculation on rule changes, and complete financial auditability — all while remaining legible to non-technical operations teams.',
      ],
      problem: [
        'Commission calculation was being handled in Excel files passed between operations analysts and finance. Each client had unique deal structures — tiered percentages, retroactive adjustments, split commissions across multiple agents — none of which Excel handled reliably.',
        'Errors were caught at payout time, creating disputes, delayed payments, and significant trust erosion between agents and management. The cost of a single miscalculation could affect dozens of agent payouts.',
      ],
      approach: [
        'I mapped every commission structure across existing clients to identify the minimal rule set that could express all variations. The goal was to design a rule engine flexible enough to handle edge cases without requiring code changes for new clients.',
        'Rather than building a flexible-but-opaque system, I prioritized legibility over configurability. Operators needed to trust the numbers before they would trust the system. Every calculation step was exposed as a readable audit trail.',
      ],
      solution: [
        'A centralized dashboard replaced the analyst workflow: rules are configured once, applied automatically each cycle, and flagged exceptions are surfaced for human review rather than buried in raw data.',
        'The payout engine supports complex tier structures, multi-product splits, and retroactive recalculation. All commission states are versioned — changes are non-destructive and fully reversible.',
      ],
      finalReflection: [
        'The most important architectural decision was separating rule definition from rule execution. This allowed the operations team to safely iterate on commission structures without requiring engineering involvement.',
        'If I were to revisit this system, I would invest more in the onboarding experience for new rule configurations — the initial setup is powerful but still requires training to navigate confidently.',
      ],
      uxDecisions: [
        { title: 'Rule Transparency Over Flexibility', body: 'Rather than exposing raw formula inputs, every rule is expressed in plain language summaries. Operators can see exactly what a rule does before activating it — reducing configuration errors by design.' },
        { title: 'Audit Trail as Core Feature', body: 'Every calculation step is recorded and traceable. This wasn\'t an add-on — it was the primary trust mechanism. Agents can see exactly how their commission was derived, eliminating disputes at source.' },
        { title: 'Versioned States, Not Overrides', body: 'Commission rules are versioned, not overridden. Retroactive adjustments create new versions rather than modifying history, preserving full financial auditability across periods.' },
      ],
      impact: [
        { stat: '94%', label: 'Reduction in manual reconciliation time' },
        { stat: '12×', label: 'Increase in agents managed per analyst' },
        { stat: '0', label: 'Finance disputes in first 6 months post-launch' },
      ],
    },
    'pt-br': {
      subtitle: 'MOTOR DE COMISSÕES CORPORATIVO OTIMIZANDO LÓGICA FINANCEIRA COMPLEXA.',
      overview: [
        'O Slicecom é uma plataforma de gestão de comissões desenvolvida para organizações orientadas a vendas que operam em escala. O desafio central era substituir fluxos de trabalho frágeis em planilhas por um motor estruturado e auditável capaz de lidar com lógica de pagamento em múltiplos níveis sem necessidade de engenharia customizada por cliente.',
        'O sistema precisava suportar milhares de agentes, recalcular em tempo real com mudanças de regras e garantir auditabilidade financeira completa — tudo isso permanecendo legível para equipes operacionais não técnicas.',
      ],
      problem: [
        'O cálculo de comissões era gerenciado em arquivos Excel trocados entre analistas de operações e o financeiro. Cada cliente tinha estruturas de negócios únicas — porcentagens por tier, ajustes retroativos, comissões divididas entre múltiplos agentes — nenhuma das quais o Excel tratava de forma confiável.',
        'Os erros eram descobertos no momento do pagamento, gerando disputas, atrasos e séria erosão de confiança entre agentes e gestão. O custo de um único erro de cálculo poderia afetar dezenas de pagamentos.',
      ],
      approach: [
        'Mapeei todas as estruturas de comissão dos clientes existentes para identificar o conjunto mínimo de regras que poderia expressar todas as variações. O objetivo era projetar um motor de regras flexível o suficiente para lidar com casos extremos sem exigir mudanças de código para novos clientes.',
        'Em vez de construir um sistema flexível mas opaco, priorizei a legibilidade sobre a configurabilidade. Os operadores precisavam confiar nos números antes de confiar no sistema. Cada etapa de cálculo foi exposta como uma trilha de auditoria legível.',
      ],
      solution: [
        'Um painel centralizado substituiu o fluxo de trabalho do analista: as regras são configuradas uma vez, aplicadas automaticamente a cada ciclo, e as exceções sinalizadas são apresentadas para revisão humana em vez de ficarem enterradas em dados brutos.',
        'O motor de pagamentos suporta estruturas complexas de tier, divisões de múltiplos produtos e recalculação retroativa. Todos os estados de comissão são versionados — as alterações são não destrutivas e totalmente reversíveis.',
      ],
      finalReflection: [
        'A decisão arquitetural mais importante foi separar a definição de regras de sua execução. Isso permitiu que a equipe de operações iterasse com segurança nas estruturas de comissão sem exigir envolvimento de engenharia.',
        'Se eu revisitasse este sistema, investiria mais na experiência de onboarding para novas configurações de regras — a configuração inicial é poderosa, mas ainda requer treinamento para ser navegada com confiança.',
      ],
      uxDecisions: [
        { title: 'Transparência de Regras Acima da Flexibilidade', body: 'Em vez de expor entradas de fórmulas brutas, cada regra é expressa em resumos em linguagem natural. Os operadores podem ver exatamente o que uma regra faz antes de ativá-la — reduzindo erros de configuração por design.' },
        { title: 'Trilha de Auditoria como Recurso Central', body: 'Cada etapa de cálculo é registrada e rastreável. Isso não foi um complemento — foi o principal mecanismo de confiança. Os agentes podem ver exatamente como sua comissão foi derivada, eliminando disputas na origem.' },
        { title: 'Estados Versionados, Não Substituições', body: 'As regras de comissão são versionadas, não substituídas. Os ajustes retroativos criam novas versões em vez de modificar o histórico, preservando a auditabilidade financeira completa entre períodos.' },
      ],
      impact: [
        { stat: '94%', label: 'Redução no tempo de reconciliação manual' },
        { stat: '12×', label: 'Aumento de agentes gerenciados por analista' },
        { stat: '0', label: 'Disputas financeiras nos primeiros 6 meses pós-lançamento' },
      ],
    },
  },

  'soficom-cloud': {
    en: {
      subtitle: 'INFRASTRUCTURE MANAGEMENT PLATFORM WITH SYSTEMATIC OPERATIONAL TRANSPARENCY.',
      overview: [
        'Soficom Cloud is a managed infrastructure platform targeting mid-market businesses that lack dedicated DevOps teams. The product needed to present real-time infrastructure health in a way that remained legible to non-technical decision-makers while providing sufficient depth for technical operations.',
        'The core tension was between information density and cognitive accessibility — two requirements that often conflict when designing infrastructure monitoring tools.',
      ],
      problem: [
        'Infrastructure visibility was siloed across multiple tools — uptime monitors, cloud cost dashboards, deployment logs — none of which were integrated or presented in a way accessible to business stakeholders.',
        'Operations teams spent significant time translating technical metrics into business terms for management reports. Incidents were discovered reactively rather than prevented proactively.',
      ],
      approach: [
        'I defined a layered information architecture: a top-level health summary for executives, a mid-layer operational view for team leads, and a deep technical layer for engineers. Each layer exposed progressively more detail without forcing simpler personas to navigate complex data.',
        'Service health was abstracted into composite scores — calculated from response times, error rates, and resource utilization — replacing raw metrics with contextual indicators that non-engineers could act upon.',
      ],
      solution: [
        'A unified infrastructure dashboard provides role-based views of system health. Critical incidents surface a single-action escalation path, reducing mean time to response by eliminating the need to context-switch between tools.',
        'Automated cost anomaly detection compares current spend against historical baselines and project trajectories, surfacing unexpected variances before they compound into significant overruns.',
      ],
      finalReflection: [
        'The layered architecture was the right call — but the transition between layers needed more deliberate design. Users frequently felt "lost" when drilling down through layers without clear breadcrumb context.',
        'The composite health score was well-received but also created complacency. Some teams stopped reviewing underlying metrics entirely. A future iteration should surface underlying signals more proactively.',
      ],
      uxDecisions: [
        { title: 'Abstraction Without Loss', body: 'Composite health scores hide complexity but preserve drilldown access. Every score is a link — clicking reveals the exact metrics and weights that produced it, keeping experts fully informed.' },
        { title: 'Role-Based Default Views', body: 'The system remembers your last context and presents your role\'s default view on login. Executives see aggregate health; engineers see service-level detail. Neither needs to configure anything.' },
        { title: 'Incident Severity Calibration', body: 'Alerts are tiered into Warning / Degraded / Critical with distinct visual treatments. This prevents alert fatigue from treating every anomaly as an emergency.' },
      ],
      impact: [
        { stat: '60%', label: 'Reduction in alert noise for operators' },
        { stat: '3×', label: 'Increase in stakeholder dashboard adoption' },
        { stat: '8min', label: 'Average incident detection to triage time' },
      ],
    },
    'pt-br': {
      subtitle: 'PLATAFORMA DE GERENCIAMENTO DE INFRAESTRUTURA COM TRANSPARÊNCIA OPERACIONAL SISTEMÁTICA.',
      overview: [
        'O Soficom Cloud é uma plataforma de infraestrutura gerenciada voltada para empresas de médio porte que não possuem equipes de DevOps dedicadas. O produto precisava apresentar a saúde da infraestrutura em tempo real de forma legível para tomadores de decisão não técnicos, ao mesmo tempo que oferecia profundidade suficiente para operações técnicas.',
        'A tensão central era entre a densidade de informações e a acessibilidade cognitiva — dois requisitos que frequentemente entram em conflito no design de ferramentas de monitoramento de infraestrutura.',
      ],
      problem: [
        'A visibilidade de infraestrutura estava fragmentada em múltiplas ferramentas — monitores de uptime, painéis de custo em nuvem, logs de deploy — nenhuma das quais integrada ou apresentada de forma acessível às partes interessadas do negócio.',
        'As equipes de operações gastavam tempo significativo traduzindo métricas técnicas em termos de negócios para relatórios gerenciais. Incidentes eram descobertos de forma reativa em vez de prevenidos proativamente.',
      ],
      approach: [
        'Defini uma arquitetura de informação em camadas: um resumo de saúde de nível superior para executivos, uma visão operacional intermediária para líderes de equipe e uma camada técnica profunda para engenheiros. Cada camada expunha progressivamente mais detalhes sem forçar personas mais simples a navegar por dados complexos.',
        'A saúde do serviço foi abstraída em pontuações compostas — calculadas a partir de tempos de resposta, taxas de erro e utilização de recursos — substituindo métricas brutas por indicadores contextuais sobre os quais não-engenheiros podiam agir.',
      ],
      solution: [
        'Um painel de infraestrutura unificado fornece visualizações baseadas em função da saúde do sistema. Incidentes críticos surfam um caminho de escalada de ação única, reduzindo o tempo médio de resposta ao eliminar a necessidade de alternar entre ferramentas.',
        'A detecção automatizada de anomalias de custo compara os gastos atuais com baselines históricas e trajetórias de projeto, surfando variâncias inesperadas antes que se acumulem em excessos significativos.',
      ],
      finalReflection: [
        'A arquitetura em camadas foi a decisão certa — mas a transição entre camadas precisava de um design mais cuidadoso. Usuários frequentemente se sentiam "perdidos" ao aprofundar nas camadas sem um contexto claro de navegação.',
        'A pontuação de saúde composta foi bem recebida, mas também criou complacência. Algumas equipes pararam de revisar as métricas subjacentes inteiramente. Uma iteração futura deve surfar os sinais subjacentes de forma mais proativa.',
      ],
      uxDecisions: [
        { title: 'Abstração Sem Perda', body: 'As pontuações de saúde compostas ocultam a complexidade, mas preservam o acesso ao drill-down. Cada pontuação é um link — clicar revela as métricas exatas e os pesos que a produziram, mantendo os especialistas totalmente informados.' },
        { title: 'Visualizações Padrão Baseadas em Função', body: 'O sistema lembra seu último contexto e apresenta a visualização padrão da sua função no login. Executivos veem a saúde agregada; engenheiros veem detalhes no nível de serviço. Nenhum precisa configurar nada.' },
        { title: 'Calibração de Severidade de Incidentes', body: 'Os alertas são divididos em Aviso / Degradado / Crítico com tratamentos visuais distintos. Isso previne a fadiga de alertas ao tratar cada anomalia como uma emergência.' },
      ],
      impact: [
        { stat: '60%', label: 'Redução no ruído de alertas para operadores' },
        { stat: '3×', label: 'Aumento na adoção do painel por stakeholders' },
        { stat: '8min', label: 'Tempo médio de detecção a triagem de incidentes' },
      ],
    },
  },

  invoicecon: {
    en: {
      subtitle: 'REDESIGNED B2B PAYMENT FLOWS PRIORITIZING DATA DENSITY AND TRANSACTIONAL PRECISION.',
      overview: [
        'Invoicecon is a B2B invoicing and payment platform serving SMEs with complex billing cycles — recurring subscriptions, milestone-based billing, partial payments, and multi-currency transactions. The platform required a complete redesign to handle growing transaction volume without sacrificing the clarity that finance teams depend on.',
        'As CTO and co-founder, I led both the technical architecture and the product design decisions, working closely with operations and finance users to identify workflow friction points.',
      ],
      problem: [
        'The original platform had grown organically, with features added reactively to address individual client requests. Payment status tracking was fragmented, reconciliation required manual exports, and the invoice generation flow had 12+ steps for common billing scenarios.',
        'Finance users reported spending 30–40% of their working time on tasks the system should handle automatically — chasing overdue payments, manually matching bank transfers to invoices, and generating recurring invoices on fixed schedules.',
      ],
      approach: [
        'I conducted structured workflow interviews with 8 finance operators across 4 client organizations, mapping their daily task sequences and identifying the recurring pain points that no existing feature addressed.',
        'The redesign was anchored on two principles: reduce the cognitive load of payment status awareness, and collapse multi-step workflows into single-action confirmations wherever business logic allowed it.',
      ],
      solution: [
        'A redesigned invoice dashboard provides at-a-glance payment health across the entire receivables portfolio. Outstanding, overdue, and disputed invoices are surfaced with clear aging indicators and one-click follow-up actions.',
        'Automated recurring invoice generation handles complex billing rules — pro-rata calculations, tiered pricing adjustments, and multi-currency conversions — removing the manual monthly workload entirely for standard billing cycles.',
      ],
      finalReflection: [
        'The biggest lesson was that "one-click" actions require significantly more backend trust infrastructure than the UI suggests. Every automated action needed comprehensive rollback capabilities before users would trust one-click confirmation for high-value transactions.',
        'The platform\'s success hinged on reconciliation accuracy. Users forgave slow loading times and occasional UX rough edges — they would not forgive a single mismatched payment. Data integrity had to be the non-negotiable foundation.',
      ],
      uxDecisions: [
        { title: 'Status as Primary Information', body: 'Invoice status is not a field — it\'s the organizing principle of the entire interface. Every view is filtered through a payment health lens, ensuring operators always know what requires attention without hunting for it.' },
        { title: 'Reducing Confirmation Friction', body: 'Standard recurring actions (generate invoice, send reminder, mark paid) require a single confirmation. Destructive or high-value actions require explicit confirmation with impact previews.' },
        { title: 'Reconciliation as First-Class Workflow', body: 'Bank transfer matching is a dedicated workflow, not buried in settings. Smart matching suggestions are presented with confidence scores, letting operators review and confirm in seconds rather than minutes.' },
      ],
      impact: [
        { stat: '64%', label: 'Reduction in invoice creation time' },
        { stat: '89%', label: 'Decrease in billing error rate' },
        { stat: '3.5h', label: 'Average weekly time saved per finance team' },
      ],
    },
    'pt-br': {
      subtitle: 'REDESIGN DE FLUXOS DE PAGAMENTO B2B PRIORIZANDO DENSIDADE DE DADOS E PRECISÃO TRANSACIONAL.',
      overview: [
        'O Invoicecon é uma plataforma de faturamento e pagamentos B2B que atende PMEs com ciclos de cobrança complexos — assinaturas recorrentes, cobrança baseada em marcos, pagamentos parciais e transações em múltiplas moedas. A plataforma exigiu um redesign completo para lidar com o crescente volume de transações sem sacrificar a clareza da qual as equipes financeiras dependem.',
        'Como CTO e co-fundador, liderei tanto a arquitetura técnica quanto as decisões de design de produto, trabalhando em estreita colaboração com usuários de operações e finanças para identificar pontos de atrito nos fluxos de trabalho.',
      ],
      problem: [
        'A plataforma original havia crescido organicamente, com recursos adicionados reativamente em resposta a solicitações individuais de clientes. O rastreamento do status de pagamento era fragmentado, a conciliação exigia exportações manuais e o fluxo de geração de faturas tinha mais de 12 etapas para cenários de cobrança comuns.',
        'Usuários de finanças relataram gastar 30 a 40% do tempo de trabalho em tarefas que o sistema deveria tratar automaticamente — cobrar pagamentos atrasados, corresponder manualmente transferências bancárias a faturas e gerar faturas recorrentes em cronogramas fixos.',
      ],
      approach: [
        'Conduzi entrevistas estruturadas de fluxo de trabalho com 8 operadores financeiros em 4 organizações clientes, mapeando suas sequências de tarefas diárias e identificando os pontos problemáticos recorrentes que nenhum recurso existente abordava.',
        'O redesign foi ancorado em dois princípios: reduzir a carga cognitiva da percepção do status de pagamento e colapsar fluxos de trabalho de múltiplas etapas em confirmações de ação única sempre que a lógica de negócios permitisse.',
      ],
      solution: [
        'Um painel de faturas redesenhado fornece uma visão instantânea da saúde dos pagamentos em todo o portfólio de recebíveis. Faturas pendentes, vencidas e contestadas são apresentadas com indicadores de envelhecimento claros e ações de acompanhamento de um clique.',
        'A geração automatizada de faturas recorrentes lida com regras de cobrança complexas — cálculos pro-rata, ajustes de preços em tier e conversões de múltiplas moedas — eliminando completamente a carga de trabalho manual mensal para ciclos de cobrança padrão.',
      ],
      finalReflection: [
        'A maior lição foi que ações de "um clique" exigem uma infraestrutura de confiança backend significativamente maior do que a UI sugere. Cada ação automatizada precisava de capacidades abrangentes de rollback antes que os usuários confiassem na confirmação de um clique para transações de alto valor.',
        'O sucesso da plataforma dependia da precisão da conciliação. Os usuários toleravam tempos de carregamento lentos e arestas de UX ocasionais — eles não tolerariam um único pagamento incorreto. A integridade dos dados tinha que ser a fundação inegociável.',
      ],
      uxDecisions: [
        { title: 'Status como Informação Primária', body: 'O status da fatura não é um campo — é o princípio organizador de toda a interface. Cada visualização é filtrada por uma lente de saúde de pagamento, garantindo que os operadores sempre saibam o que requer atenção sem precisar procurar.' },
        { title: 'Reduzindo o Atrito de Confirmação', body: 'Ações recorrentes padrão (gerar fatura, enviar lembrete, marcar como pago) requerem uma única confirmação. Ações destrutivas ou de alto valor requerem confirmação explícita com prévias de impacto.' },
        { title: 'Conciliação como Fluxo de Trabalho Principal', body: 'A correspondência de transferências bancárias é um fluxo de trabalho dedicado, não enterrado nas configurações. As sugestões de correspondência inteligente são apresentadas com pontuações de confiança, permitindo que os operadores revisem e confirmem em segundos.' },
      ],
      impact: [
        { stat: '64%', label: 'Redução no tempo de criação de faturas' },
        { stat: '89%', label: 'Queda na taxa de erros de faturamento' },
        { stat: '3.5h', label: 'Tempo médio economizado por semana, por equipe financeira' },
      ],
    },
  },

  'cartao-sim': {
    en: {
      subtitle: 'USER-CENTRIC HEALTHCARE ECOSYSTEM MANAGING THOUSANDS OF ENDPOINTS.',
      overview: [
        'Cartão SiM is a healthcare benefits platform serving employers, HR administrators, and end employees across Brazil. As Head of Product, I led the end-to-end redesign of the member-facing experience and the administrative portal used by HR teams to manage benefit plans.',
        'The platform handled complex eligibility logic, multi-provider integrations, and regulatory compliance requirements — all while needing to present a simple, trustworthy experience to employees unfamiliar with healthcare navigation.',
      ],
      problem: [
        'The existing platform had evolved through years of regulatory requirements and client customizations, resulting in an inconsistent experience across web and mobile touchpoints. Employees frequently contacted support for tasks the platform should have enabled self-service.',
        'HR administrators spent significant time on manual eligibility management — adding dependents, processing plan changes, and handling exceptions that the system flagged but couldn\'t resolve automatically.',
      ],
      approach: [
        'I mapped the full employee journey from onboarding through annual plan enrollment, claims submission, and provider lookup — identifying the high-frequency, high-friction interactions that were driving support contacts.',
        'The administrative portal was redesigned around batch operations rather than individual record management. HR teams manage hundreds of employees; the interface needed to reflect that scale rather than optimizing for single-record edits.',
      ],
      solution: [
        'A unified member portal consolidated benefit card management, claims status, provider network lookup, and plan documentation into a single authenticated experience. Progressive disclosure kept the interface approachable for low-frequency users while exposing depth for power users.',
        'The administrative portal introduced bulk eligibility operations, automated change validation against plan rules, and a structured exceptions workflow that surfaced unresolvable edge cases for human review without blocking standard operations.',
      ],
      finalReflection: [
        'The most challenging aspect was designing for mandatory regulatory disclosures without degrading usability. Legal requirements often push toward information overload — finding the minimal disclosure that satisfied compliance while preserving user comprehension was an ongoing negotiation.',
        'Employee adoption improved significantly when we shifted from feature announcements to task-oriented onboarding. Users didn\'t need to know what the platform could do — they needed to complete their specific task on the first try.',
      ],
      uxDecisions: [
        { title: 'Progressive Disclosure for Mixed Literacy', body: 'Benefit documents and plan details are disclosed progressively — summary first, full detail on demand. This respects users with different health literacy levels without creating separate interfaces.' },
        { title: 'Batch Operations as Primary Admin Pattern', body: 'Every administrative action that affects more than one employee was designed as a batch operation. Individual edits exist but are secondary — the primary workflow assumes scale.' },
        { title: 'Trust Through Confirmation', body: 'Healthcare decisions carry high stakes. Every consequential action — plan enrollment, dependent changes, claims submission — shows a full impact summary before confirmation, reducing post-action regret.' },
      ],
      impact: [
        { stat: '40%', label: 'Reduction in inbound support call volume' },
        { stat: '4,200+', label: 'Clinical endpoints managed proactively' },
        { stat: '98.7%', label: 'Network uptime SLA maintained' },
      ],
    },
    'pt-br': {
      subtitle: 'ECOSSISTEMA DE SAÚDE CENTRADO NO USUÁRIO GERENCIANDO MILHARES DE ENDPOINTS.',
      overview: [
        'O Cartão SiM é uma plataforma de benefícios de saúde que atende empregadores, administradores de RH e funcionários em toda o Brasil. Como Head de Produto, liderei o redesign completo da experiência voltada ao beneficiário e do portal administrativo usado pelas equipes de RH para gerenciar planos de benefícios.',
        'A plataforma lidava com lógica de elegibilidade complexa, integrações com múltiplos prestadores e requisitos de conformidade regulatória — tudo isso precisando apresentar uma experiência simples e confiável para funcionários não familiarizados com a navegação em saúde.',
      ],
      problem: [
        'A plataforma existente havia evoluído através de anos de requisitos regulatórios e customizações de clientes, resultando em uma experiência inconsistente em pontos de contato web e mobile. Os funcionários frequentemente contatavam o suporte para tarefas que a plataforma deveria ter habilitado como autoatendimento.',
        'Os administradores de RH gastavam tempo significativo no gerenciamento manual de elegibilidade — adicionando dependentes, processando alterações de planos e tratando exceções que o sistema sinalizava mas não conseguia resolver automaticamente.',
      ],
      approach: [
        'Mapeei a jornada completa do funcionário desde o onboarding até a inscrição anual no plano, envio de sinistros e pesquisa de prestadores — identificando as interações de alta frequência e alto atrito que estavam gerando contatos de suporte.',
        'O portal administrativo foi redesenhado em torno de operações em lote em vez do gerenciamento de registros individuais. As equipes de RH gerenciam centenas de funcionários; a interface precisava refletir essa escala em vez de otimizar para edições de registro único.',
      ],
      solution: [
        'Um portal de beneficiários unificado consolidou o gerenciamento do cartão de benefícios, status de sinistros, pesquisa de rede de prestadores e documentação do plano em uma única experiência autenticada. A divulgação progressiva manteve a interface acessível para usuários de baixa frequência enquanto expunha profundidade para usuários avançados.',
        'O portal administrativo introduziu operações de elegibilidade em lote, validação automatizada de alterações em relação às regras do plano e um fluxo de trabalho de exceções estruturado que apresentava casos extremos irresolvíveis para revisão humana sem bloquear operações padrão.',
      ],
      finalReflection: [
        'O aspecto mais desafiador foi projetar divulgações regulatórias obrigatórias sem degradar a usabilidade. Os requisitos legais frequentemente empurram para a sobrecarga de informações — encontrar a divulgação mínima que satisfazia a conformidade enquanto preservava a compreensão do usuário foi uma negociação contínua.',
        'A adoção pelos funcionários melhorou significativamente quando mudamos de anúncios de recursos para onboarding orientado a tarefas. Os usuários não precisavam saber o que a plataforma poderia fazer — eles precisavam concluir sua tarefa específica na primeira tentativa.',
      ],
      uxDecisions: [
        { title: 'Divulgação Progressiva para Literacia Mista', body: 'Documentos de benefícios e detalhes do plano são divulgados progressivamente — resumo primeiro, detalhes completos sob demanda. Isso respeita usuários com diferentes níveis de literacia em saúde sem criar interfaces separadas.' },
        { title: 'Operações em Lote como Padrão Admin Principal', body: 'Toda ação administrativa que afeta mais de um funcionário foi projetada como uma operação em lote. Edições individuais existem, mas são secundárias — o fluxo de trabalho principal assume escala.' },
        { title: 'Confiança Através da Confirmação', body: 'Decisões de saúde têm alto impacto. Toda ação consequente — inscrição no plano, alterações de dependentes, envio de sinistros — mostra um resumo completo do impacto antes da confirmação, reduzindo o arrependimento pós-ação.' },
      ],
      impact: [
        { stat: '40%', label: 'Redução no volume de chamadas de suporte' },
        { stat: '4.200+', label: 'Endpoints clínicos gerenciados proativamente' },
        { stat: '98,7%', label: 'SLA de disponibilidade de rede mantido' },
      ],
    },
  },
  sabesp: {
    en: {
      subtitle: 'INTEGRATED ACCESS MANAGEMENT SYSTEM (SIGA) FOR THE LARGEST SANITATION COMPANY IN THE AMERICAS.',
      overview: [
        'SIGA is the Integrated Access Management System for Sabesp, developed to centralize and automate permission control across hundreds of corporate modules and systems. The challenge was to create a secure, auditable, and accessible interface for thousands of employees.',
        'The system handles complex hierarchical approval flows, regulatory compliance, and real-time synchronization with legacy infrastructure.',
      ],
      problem: [
        'Access management was decentralized, relying on manual requests via email and spreadsheets. This led to delays in granting permissions, security vulnerabilities, and significant compliance risks.',
        'Managers had no clear visibility into which permissions their teams held, making periodic audits a labor-intensive manual process prone to human error.',
      ],
      approach: [
        'We mapped the end-to-end approval hierarchy and designed a Role-Based Access Control (RBAC) experience. The focus was on creating a "single source of truth" for identity and permissions.',
        'I prioritized a clean, functional UI that could bridge the gap between technical system administrators and non-technical department managers.',
      ],
      solution: [
        'A robust platform with clear management dashboards, integrated confidentiality terms, and a periodic lock management module. The system provides instant visibility and one-click revocation of unnecessary accesses.',
        'Integrated multi-factor authentication and automated audit logging ensure that every permission change is tracked and compliant with data protection regulations (LGPD).',
      ],
      finalReflection: [
        'The complexity of Sabesp\'s legacy ecosystem required a highly adaptable UI. The biggest win was reducing the access request lifecycle from weeks to hours through automated routing.',
        'If evolving this further, I would implement predictive access suggestions based on peer roles to further streamline the onboarding of new employees.',
      ],
      uxDecisions: [
        { title: 'Hierarchical Approval Visualization', body: 'Approval paths are visualized as clear progress steps. Users and managers can see exactly where a request is stuck, reducing follow-up emails by 70%.' },
        { title: 'Integrated Compliance Terms', body: 'Digital confidentiality terms are integrated into the access flow. Users must acknowledge responsibilities before receiving access to sensitive modules, ensuring legal compliance by design.' },
        { title: 'Periodic Access Reviews', body: 'A dedicated module reminds managers to review team permissions every 90 days. Non-reviewed secondary accesses are automatically flagged for suspension, maintaining a "least privilege" security posture.' },
      ],
      impact: [
        { stat: '85%', label: 'Reduction in average access grant time' },
        { stat: '100%', label: 'Auditable permissions in compliance with LGPD' },
        { stat: '50k+', label: 'Employees managed centrally' },
      ],
    },
    'pt-br': {
      subtitle: 'SISTEMA INTEGRADO DE GESTÃO DE ACESSOS (SIGA) PARA A MAIOR COMPANHIA DE SANEAMENTO DAS AMÉRICAS.',
      overview: [
        'O SIGA é o Sistema Integrado de Gestão de Acessos da Sabesp, desenvolvido para centralizar e automatizar o controle de permissões em centenas de módulos e sistemas corporativos. O desafio foi criar uma interface segura, auditável e acessível para milhares de colaboradores.',
        'O sistema lida com fluxos complexos de aprovação hierárquica, conformidade regulatória e sincronização em tempo real com infraestruturas legadas.',
      ],
      problem: [
        'A gestão de acessos era descentralizada, dependendo de solicitações manuais via e-mail e planilhas. Isso gerava lentidão na concessão de permissões, vulnerabilidades de segurança e riscos significativos de conformidade.',
        'Os gestores não tinham visibilidade clara de quais permissões suas equipes possuíam, tornando as auditorias periódicas um processo manual trabalhoso e propenso a erros humanos.',
      ],
      approach: [
        'Mapeamos a hierarquia de aprovação de ponta a ponta e desenhamos uma experiência de Controle de Acesso Baseado em Papéis (RBAC). O foco foi criar uma "única fonte da verdade" para identidade e permissões.',
        'Priorizei uma interface limpa e funcional que pudesse unir a lacuna entre administradores técnicos de sistemas e gestores de departamento não técnicos.',
      ],
      solution: [
        'Uma plataforma robusta com dashboards de gestão claros, termos de confidencialidade integrados e um módulo de gestão de bloqueios periódicos. O sistema fornece visibilidade instantânea e revogação de acessos desnecessários com um clique.',
        'A autenticação de múltiplos fatores integrada e o registro automatizado de auditoria garantem que cada alteração de permissão seja rastreada e esteja em conformidade com a LGPD.',
      ],
      finalReflection: [
        'A complexidade do ecossistema legado da Sabesp exigiu uma interface altamente adaptável. A maior vitória foi reduzir o ciclo de vida da solicitação de acesso de semanas para horas através do roteamento automatizado.',
        'Evoluindo este sistema, eu implementaria sugestões de acesso preditivas baseadas em cargos semelhantes para agilizar ainda mais a integração de novos colaboradores.',
      ],
      uxDecisions: [
        { title: 'Visualização de Aprovação Hierárquica', body: 'Os caminhos de aprovação são visualizados como etapas de progresso claras. Usuários e gestores podem ver exatamente onde uma solicitação está travada, reduzindo e-mails de acompanhamento em 70%.' },
        { title: 'Termos de Conformidade Integrados', body: 'Termos digitais de confidencialidade são integrados ao fluxo de acesso. Os usuários devem reconhecer as responsabilidades antes de receber acesso a módulos sensíveis, garantindo conformidade legal por design.' },
        { title: 'Revisões Periódicas de Acesso', body: 'Um módulo dedicado lembra os gestores de revisar as permissões da equipe a cada 90 dias. Acessos secundários não revisados são automaticamente sinalizados para suspensão, mantendo uma postura de segurança de "privilégio mínimo".' },
      ],
      impact: [
        { stat: '85%', label: 'Redução no tempo médio de concessão de acessos' },
        { stat: '100%', label: 'Permissões auditáveis em conformidade com a LGPD' },
        { stat: '50k+', label: 'Colaboradores gerenciados centralizadamente' },
      ],
    },
  },
  sigaf: {
    en: {
      subtitle: 'INTEGRATED ADMINISTRATIVE AND FINANCIAL MANAGEMENT SYSTEM.',
      overview: [
        'SIGAF is a comprehensive platform designed to streamline complex administrative and financial workflows for public and enterprise institutions. The core objective was to unify disparate accounting, payment, and coordination tools into a single, cohesive interface.',
        'The system handles massive data density—budgets, payment scheduling, and administrative approvals—while ensuring strict compliance and real-time operational transparency.',
      ],
      problem: [
        'Before SIGAF, financial coordination (COPAG) and accounting tasks (CTB) were isolated across fragmented legacy systems. Teams had to manually cross-reference data to clear payments or audit financial records.',
        'This fragmentation led to significant operational bottlenecks, delayed payment cycles, and a high risk of manual entry errors when reconciling cross-departmental financial data.',
      ],
      approach: [
        'I led the UI architecture focusing on high data density without cognitive overload. I mapped the primary workflows of the Copag (Payment) and Cgesc (Administrative) units to define a unified navigation structure.',
        'The design prioritized tabular efficiency, robust filtering, and clear visual hierarchies to help users process large volumes of financial data accurately and autonomously.',
      ],
      solution: [
        'The new SIGAF platform features a modular dashboard that adapts to the user\'s role (e.g., Coordinator vs. Auditor). It centralizes critical path actions like file visualization, batch approvals, and budget tracking.',
        'We implemented consistent data tables, standardized typography for financial figures, and streamlined the multi-step approval workflows into intuitive, one-click confirmation screens.',
      ],
      finalReflection: [
        'Designing for financial and administrative systems requires a delicate balance between providing maximum information and preventing visual fatigue. The structured, grid-based approach proved highly successful in maintaining legibility.',
        'Looking forward, incorporating machine-learning driven anomaly detection on the payment workflows (COPAG) could further reduce manual audit times.',
      ],
      uxDecisions: [
        { title: 'High-Density Datagrids', body: 'Financial systems require seeing the full picture. I utilized condensed typography and optimized padding to maximize the number of records visible above the fold without sacrificing readability.' },
        { title: 'Role-Contextual Dashboards', body: 'The home screens for CGESC and COPAG immediately surface the exact KPIs and pending tasks relevant to that specific department, eliminating hunting for actionable items.' },
        { title: 'Inline Document Preview', body: 'Accounting files (CTB) can be viewed in a dedicated minimal interface without downloading them, accelerating the verification and approval process.' },
      ],
      impact: [
        { stat: '45%', label: 'Reduction in payment processing time' },
        { stat: '100%', label: 'Auditable transaction logs' },
        { stat: '3x', label: 'Faster document retrieval' },
      ],
    },
    'pt-br': {
      subtitle: 'SISTEMA INTEGRADO DE GESTÃO ADMINISTRATIVA E FINANCEIRA.',
      overview: [
        'O SIGAF é uma plataforma abrangente projetada para simplificar fluxos de trabalho administrativos e financeiros complexos para instituições públicas e corporativas. O objetivo central era unificar ferramentas de contabilidade, pagamento e coordenação em uma interface única e coesa.',
        'O sistema lida com grande densidade de dados — orçamentos, agendamento de pagamentos e aprovações administrativas — garantindo conformidade rigorosa e transparência operacional em tempo real.',
      ],
      problem: [
        'Antes do SIGAF, a coordenação financeira (COPAG) e as tarefas contábeis (CTB) eram isoladas em sistemas legados fragmentados. As equipes precisavam cruzar dados manualmente para liberar pagamentos ou auditar registros financeiros.',
        'Essa fragmentação levava a gargalos operacionais significativos, atrasos nos ciclos de pagamento e um alto risco de erros de entrada manual ao reconciliar dados financeiros entre departamentos.',
      ],
      approach: [
        'Liderei a arquitetura de UI focado na alta densidade de dados sem sobrecarga cognitiva. Mapeei os fluxos principais das coordenações de pagamento (COPAG) e administração (CGESC) para definir uma estrutura de navegação unificada.',
        'O design priorizou eficiência tabular, filtros robustos e hierarquias visuais claras para ajudar os usuários a processar grandes volumes de dados financeiros com precisão e autonomia.',
      ],
      solution: [
        'A nova plataforma SIGAF conta com um dashboard modular que se adapta ao perfil do usuário. Ela centraliza ações críticas como visualização de arquivos contábeis, aprovações em lote e acompanhamento de orçamento.',
        'Implementamos tabelas de dados consistentes, tipografia padronizada para valores financeiros e simplificamos as aprovações de múltiplas etapas em telas de confirmação intuitivas.',
      ],
      finalReflection: [
        'Projetar para sistemas financeiros e administrativos exige um equilíbrio delicado entre fornecer o máximo de informação e evitar fadiga visual. A abordagem estruturada baseada em grids se provou altamente eficaz para manter a legibilidade.',
        'No futuro, incorporar detecção de anomalias por machine-learning nos fluxos de pagamento poderia reduzir ainda mais o tempo gasto em auditorias manuais.',
      ],
      uxDecisions: [
        { title: 'Grids de Alta Densidade', body: 'Sistemas financeiros exigem visão do todo. Utilizei tipografia condensada e espaçamentos otimizados para maximizar o número de registros visíveis sem sacrificar a legibilidade.' },
        { title: 'Dashboards Contextuais', body: 'As telas iniciais da CGESC e COPAG trazem à tona imediatamente os KPIs e as pendências daquele departamento, eliminando a busca por itens acionáveis.' },
        { title: 'Visualização de Documentos Inline', body: 'Os arquivos contábeis (CTB) podem ser visualizados em uma interface dedicada sem a necessidade de download, acelerando o processo de verificação.' },
      ],
      impact: [
        { stat: '45%', label: 'Redução no tempo de processamento de pagamentos' },
        { stat: '100%', label: 'Registros de transações auditáveis' },
        { stat: '3x', label: 'Recuperação de documentos mais rápida' },
      ],
    },
  },
  metro: {
    en: {
      subtitle: 'INTERNAL ATTENDANCE AND USER MANAGEMENT PORTAL FOR TRANSIT INFRASTRUCTURE.',
      overview: [
        'The Metrô Admin Portal is an internal management system serving transit sector employees. It standardizes the processes of tracking professional registrations, starting attendance cases, and managing external user access.',
        'Given the high stakes of public transit operations, the portal needed to offer uncompromising reliability, speed of data entry, and a crystal-clear audit trail for accountability.',
      ],
      problem: [
        'Before the new system, managing internal attendances and external contractor interactions relied on outdated intranet tools. Information was siloed, causing delays in resolving operational tickets.',
        'Moreover, tracking changes to professional profiles or external user access was difficult, often leading to security and compliance audit failures due to the lack of a proper "History of Changes".',
      ],
      approach: [
        'I designed a unified interface with a focus on quick searchability and distinct task separation. Core actions such as "Register Professional" and "Consult External User" were prioritized at the top level.',
        'The design aesthetic utilizes high-contrast dark themes for the login to project a secure, institutional feel, transitioning to clean, information-dense daylight modes for internal operations to reduce eye strain over long shifts.',
      ],
      solution: [
        'A comprehensive portal that handles the full lifecycle of employee support. The "Start Attendance" module links directly to user profiles, ensuring that operators always have full context before interacting.',
        'Every structural change is recorded automatically into a searchable "History of Changes", satisfying audit requirements and improving system-wide accountability.',
      ],
      finalReflection: [
        'The biggest hurdle in internal corporate tools is user adoption. By simplifying the UI drastically and reducing required form fields by 30%, user satisfaction scores from internal operators improved significantly.',
        'In future iterations, adding an integrated chat module for real-time external user support could further decrease attendance resolution times.',
      ],
      uxDecisions: [
        { title: 'Secure-First Login Structure', body: 'The login screen is distinctly decoupled from the internal application\'s visual style, using high contrast and minimal distractions to emphasize security and focus.' },
        { title: 'Contextual Action Grouping', body: 'Primary administrative tasks like consulting users or registering professionals are grouped logically in a sidebar, eliminating nested menus and flattening the learning curve.' },
        { title: 'Immutable Audit Trails', body: 'The "History of Changes" screen uses a strict, chronological tabular layout that prevents data manipulation, providing total transparency for internal audits.' },
      ],
      impact: [
        { stat: '30%', label: 'Decrease in form submission errors' },
        { stat: '100%', label: 'Traceability via automated change history logs' },
        { stat: '2.5x', label: 'Faster average attendance resolution' },
      ],
    },
    'pt-br': {
      subtitle: 'PORTAL INTERNO DE ATENDIMENTO E GESTÃO DE USUÁRIOS PARA INFRAESTRUTURA DE TRÂNSITO.',
      overview: [
        'O Portal Admin do Metrô é um sistema de gestão interno que atende funcionários do setor de trânsito. Ele padroniza os processos de rastreamento de registros de profissionais, inicialização de atendimentos e gerenciamento do acesso de usuários externos.',
        'Dadas as altas exigências das operações de trânsito público, o portal precisava oferecer confiabilidade inabalável, velocidade na inserção de dados e uma trilha de auditoria cristalina.',
      ],
      problem: [
        'Antes do novo sistema, o gerenciamento de atendimentos internos e as interações com prestadores externos dependiam de ferramentas de intranet obsoletas. As informações ficavam isoladas, causando atrasos na resolução de chamados.',
        'Além disso, rastrear alterações em perfis de profissionais ou no acesso de usuários externos era difícil, frequentemente resultando em falhas em auditorias de conformidade pela falta de um "Histórico de Alterações" adequado.',
      ],
      approach: [
        'Projetei uma interface unificada focada em buscas rápidas e separação clara de tarefas. Ações centrais como "Cadastrar Profissional" e "Consultar Usuário Externo" foram priorizadas no nível superior.',
        'A estética do design utiliza temas escuros de alto contraste no login para projetar uma sensação segura e institucional, transicionando para modos claros e com alta densidade de informação nas operações internas para reduzir a fadiga visual em turnos longos.',
      ],
      solution: [
        'Um portal robusto que lida com o ciclo completo de suporte ao funcionário. O módulo "Iniciar Atendimento" conecta-se diretamente aos perfis dos usuários, garantindo que os operadores sempre tenham contexto completo antes de interagir.',
        'Cada alteração estrutural é registrada automaticamente em um "Histórico de Alterações" pesquisável, satisfazendo os requisitos de auditoria e melhorando a transparência em todo o sistema.',
      ],
      finalReflection: [
        'O maior obstáculo em ferramentas corporativas internas é a adoção pelo usuário. Reduzindo drasticamente os campos de formulário e simplificando a interface, as pontuações de satisfação dos operadores melhoraram significativamente.',
        'Em iterações futuras, adicionar um módulo de chat integrado para suporte em tempo real a usuários externos poderia diminuir ainda mais os tempos de resolução de atendimento.',
      ],
      uxDecisions: [
        { title: 'Estrutura de Login Orientada à Segurança', body: 'A tela de login é visualmente dissociada do estilo da aplicação interna, utilizando alto contraste e sem distrações para enfatizar o foco e a segurança corporativa.' },
        { title: 'Agrupamento Contextual de Ações', body: 'Tarefas administrativas como consulta de usuários e cadastro de profissionais são agrupadas logicamente em barras laterais, eliminando submenus aninhados e achatando a curva de aprendizado.' },
        { title: 'Trilhas de Auditoria Imutáveis', body: 'A tela de "Histórico de Alterações" usa um layout tabular cronológico rigoroso que previne manipulação de dados, fornecendo transparência total para auditorias.' },
      ],
      impact: [
        { stat: '30%', label: 'Queda nos erros de preenchimento de formulários' },
        { stat: '100%', label: 'Rastreabilidade via logs automáticos de histórico' },
        { stat: '2.5x', label: 'Resolução média de atendimento mais rápida' },
      ],
    },
  },
  myphone: {
    en: {
      subtitle: 'DIGITAL WALLET AND FINANCIAL HUB FOR A TELECOM ECOSYSTEM.',
      overview: [
        'MyPhone Finance is a robust digital wallet integrated directly into a major telecommunications app. It centralizes electronic purchases, card limits, income tax reporting, and Open Finance features.',
        'The primary goal was to drastically reduce the friction telecom users face when managing their finances, keeping them engaged within a single authenticated ecosystem without needing a separate banking app.',
      ],
      problem: [
        'Telecom customers with linked credit cards previously had to navigate clunky web views or call support just to check limits or download an income report. This caused high drop-off rates and overloaded call centers.',
        'Additionally, the introduction of Open Finance meant that users needed an intuitive and trustworthy interface to connect external bank accounts to their telecom profile.',
      ],
      approach: [
        'I designed a modular, card-based interface focusing heavily on visual hierarchy. Deep indigo (`#4F46E5`) was chosen as the primary accent to invoke financial security, distinguishing the wallet section from the rest of the app.',
        'Complex flows—like authorizing Open Finance data sharing or editing electronic purchases—were broken down into simple, step-by-step bottom sheet modals to keep the user anchored to their current context.',
      ],
      solution: [
        'A comprehensive, native-feeling financial hub. The Home screen immediately surfaces available limits and recent transactions, while dedicated modules handle tax reports and Open Finance data safely and transparently.',
      ],
      finalReflection: [
        'Designing for finances requires an explicit focus on trust. Clean typography, transparent state messages, and immediate visual feedback on limit adjustments were crucial to making the telecom user feel like they were holding a premium banking application.',
      ],
      uxDecisions: [
        { title: 'Card-Based Architecture', body: 'Information is segmented into distinct cards, allowing users to scan limits, statements, and Open Finance connections without feeling overwhelmed by data density.' },
        { title: 'Anchored Navigation', body: 'Deep financial operations use bottom sheets rather than full-page navigations, maintaining the user\'s spatial awareness within the app.' },
        { title: 'Trust-Oriented Aesthetics', body: 'The deep purple backdrop and high-contrast typography evoke a sense of institutional security, critical for driving adoption of the Open Finance module.' },
      ],
      impact: [
        { stat: '45%', label: 'Increase in Open Finance connections' },
        { stat: '3x', label: 'Faster rendering of income tax reports' },
        { stat: '60%', label: 'Reduction in support calls regarding limits' },
      ],
    },
    'pt-br': {
      subtitle: 'CARTEIRA DIGITAL E HUB FINANCEIRO PARA UM ECOSSISTEMA DE TELECOM.',
      overview: [
        'O MyPhone Finance é uma carteira digital robusta integrada diretamente a um aplicativo de telecomunicações móveis. Ele centraliza compras eletrônicas, limites de cartões, informes de rendimentos e recursos de Open Finance.',
        'O principal objetivo era reduzir drasticamente o atrito que os clientes enfrentavam ao gerenciar suas finanças, mantendo-os engajados dentro de um único ecossistema autenticado, sem a necessidade de um app bancário separado.',
      ],
      problem: [
        'Anteriormente, clientes com cartões de crédito vinculados precisavam navegar por webviews lentos ou ligar para o suporte apenas para verificar limites ou baixar relatórios de renda. Isso causava altas taxas de abandono e sobrecarga nos call centers.',
        'Além disso, a introdução do Open Finance exigia uma interface intuitiva e confiável para que os usuários conectassem contas bancárias externas ao seu perfil de telecom.',
      ],
      approach: [
        'Projetei uma interface modular baseada em cartões (cards) focando fortemente na hierarquia visual. Um índigo escuro (`#4F46E5`) foi escolhido como detalhe primário para invocar segurança financeira, separando visualmente a carteira do restante do aplicativo.',
        'Fluxos complexos — como autorizar o compartilhamento de dados no Open Finance ou editar compras eletrônicas — foram divididos em modais (bottom sheets) simples passo a passo para manter o usuário ancorado em seu contexto.',
      ],
      solution: [
        'Um hub financeiro completo com sensação visual nativa. A tela inicial expõe imediatamente os limites disponíveis e as transações recentes, enquanto módulos dedicados cuidam das declarações de impostos e dos dados de Open Finance de forma segura.',
      ],
      finalReflection: [
        'Projetar para finanças requer foco explícito em confiança. Tipografia limpa, mensagens de estado transparentes e feedback visual imediato nos ajustes de limite foram cruciais para fazer o usuário sentir que segurava um aplicativo bancário premium.',
      ],
      uxDecisions: [
        { title: 'Arquitetura Baseada em Cartões', body: 'A informação é segmentada em cartões distintos, permitindo aos usuários visualizar limites e conexões do Open Finance sem se sentirem sobrecarregados pela densidade de dados.' },
        { title: 'Navegação Ancorada', body: 'Operações financeiras profundas utilizam \'bottom sheets\' em vez de telas inteiras, mantendo a percepção espacial do usuário dentro do aplicativo.' },
        { title: 'Estética Focada em Confiança', body: 'O fundo roxo e a tipografia de alto contraste evocam um senso de segurança institucional, fundamental para impulsionar a adoção do módulo de Open Finance.' },
      ],
      impact: [
        { stat: '45%', label: 'Aumento em conexões do Open Finance' },
        { stat: '3x', label: 'Carregamento mais rápido dos informes de rendimento' },
        { stat: '60%', label: 'Redução em chamadas de suporte sobre limites' },
      ],
    },
  },
  castforme: {
    en: {
      subtitle: 'HOLISTIC CORPORATE ERP FOR CONTRACTS AND ACCESS MANAGEMENT.',
      overview: [
        'CastForMe is the internal management portal for Cast Group, built to centralize complex employee lifecycle operations ranging from access permissions to critical contract modifications.',
        'With a massive active workforce, the system needed to be strictly organized, minimizing the clicks required to handle bureaucratic updates while providing an iron-clad layer of administrative security.',
      ],
      problem: [
        'Corporate tools often grow organically, resulting in confusing nested menus and siloed dashboards. Administrators were struggling with slow workflows when assigning permissions or adjusting contractual clauses.',
        'There was no unified visual system. Contract editing and system settings felt like completely separate applications, heightening the risk of compliance errors during data entry.',
      ],
      approach: [
        'I established a highly structured "Information First" layout. Using a sleek dark sidebar combined with vivid Emerald Green (`#10B981`) primary actions, I created immediate visual predictability.',
        'The workspace is split clearly: global navigation is anchored on the left, while dense, full-page tabular data structures take up the right pane, optimizing the use of widescreen corporate monitors.',
      ],
      solution: [
        'An organized, high-density ERP system. The "Access Profiles" and "Edit Contracts" panels utilize clean datagrids with inline editing capabilities, completely removing the need to navigate away from the primary data context.',
      ],
      finalReflection: [
        'Redesigning internal corporate software is often about removing friction rather than adding features. Providing administrators with a clean, high-contrast environment directly translates to fewer errors and lower operational costs.',
      ],
      uxDecisions: [
        { title: 'Wide-Screen Optimization', body: 'The layout embraces full-width tabular designs, recognizing that internal administrators almost exclusively use desktop environments with dense data needs.' },
        { title: 'Inline Editing Context', body: 'Instead of deep modal flows, contract modifications and profile toggles are handled contextually, keeping the primary list visible at all times.' },
        { title: 'Predictable Action Color', body: 'Emerald Green is used exclusively for constructive/save actions throughout the entire portal, instantly guiding the user\'s eye to the primary goal on any given screen.' },
      ],
      impact: [
        { stat: '40%', label: 'Reduction in time spent updating contracts' },
        { stat: '100%', label: 'Unified design system adoption across internal tools' },
        { stat: '0', label: 'Compliance errors reported post-launch' },
      ],
    },
    'pt-br': {
      subtitle: 'ERP CORPORATIVO HOLÍSTICO PARA GESTÃO DE CONTRATOS E ACESSOS.',
      overview: [
        'CastForMe é o portal interno de gestão do Cast Group, construído para centralizar operações complexas do ciclo de vida dos colaboradores, desde permissões de acesso até modificações críticas de contratos.',
        'Com uma enorme força de trabalho ativa, o sistema precisava ser rigorosamente organizado, minimizando os cliques necessários para atualizações burocráticas enquanto fornecia uma camada impenetrável de segurança administrativa.',
      ],
      problem: [
        'Ferramentas corporativas geralmente crescem organicamente, resultando em menus confusos e painéis isolados. Os administradores lidavam com fluxos de trabalho lentos ao atribuir permissões ou ajustar cláusulas.',
        'Não havia um sistema visual unificado. A edição de contratos e as configurações do sistema pareciam aplicativos completamente diferentes, aumentando o risco de erros de conformidade durante a inserção de dados.',
      ],
      approach: [
        'Estabeleci um layout altamente estruturado focado em "Informação em Primeiro Lugar". Usando uma barra lateral escura e elegante combinada com ações primárias num intenso Verde Esmeralda (`#10B981`), criei previsibilidade visual imediata.',
        'O espaço de trabalho é claramente dividido: a navegação global fica ancorada à esquerda, enquanto densas planilhas de dados em tela cheia ocupam o painel direito, otimizando o uso de monitores corporativos widescreen.',
      ],
      solution: [
        'Um sistema ERP organizado e de alta densidade. Os painéis de "Perfis de Acesso" e "Editar Contratos" utilizam grids limpos com capacidades de edição inline, removendo a necessidade de navegar para fora do contexto principal.',
      ],
      finalReflection: [
        'Redesenhar softwares corporativos internos é mais sobre remover atritos do que adicionar novos recursos. Fornecer aos administradores um ambiente limpo e de alto contraste se traduz diretamente em menos erros operacionais.',
      ],
      uxDecisions: [
        { title: 'Otimização Widescreen', body: 'O layout abraça o design tabular full-width, reconhecendo que administradores internos usam quase exclusivamente ambientes desktop para lidar com dados densos.' },
        { title: 'Contexto de Edição Inline', body: 'Em vez de fluxos modais profundos, modificações contratuais e ajustes de perfil são tratados contextualmente, mantendo a lista principal visível o tempo todo.' },
        { title: 'Cor de Ação Previsível', body: 'Verde Esmeralda é usado exclusivamente para ações construtivas/salvar em todo o portal, guiando instantaneamente o olhar do usuário para o objetivo principal de qualquer tela.' },
      ],
      impact: [
        { stat: '40%', label: 'Redução no tempo gasto atualizando contratos' },
        { stat: '100%', label: 'Adoção de design system unificado nas ferramentas internas' },
        { stat: '0', label: 'Erros de conformidade reportados após o lançamento' },
      ],
    },
  },
}
