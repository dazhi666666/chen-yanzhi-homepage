// Fictional, deterministic scenes. No market feed, model call or trading endpoint.
export type Scene = 'breakout' | 'news' | 'reversal';
export type NodeId = 'user' | 'data' | 'research' | 'fundamental' | 'technical' | 'sentiment' | 'summary' | 'market' | 'boss' | 'sub' | 'watcher' | 'execution' | 'memory';
export type EdgeId = 'mandate' | 'sources' | 'macro-data' | 'fundamental-report' | 'technical-report' | 'sentiment-report' | 'report' | 'brief' | 'delegate' | 'evidence' | 'strategy' | 'quotes' | 'intent' | 'receipt' | 'order-status' | 'deviation' | 'save' | 'restore';

export const roles: Record<NodeId, { title: string; kind: string; input: string; duty: string; output: string }> = {
  user: { title: '用户约束', kind: '授权边界', input: '标的池、偏好与风险范围', duty: '确定团队可以研究什么、可以使用多少资金。', output: '演示约束：单股仓位上限 10%，触发条件满足后才允许执行。' },
  data: { title: '数据输入', kind: '事实来源', input: '行情、财务、新闻与账户快照', duty: '整理数据并保留来源与时点，区分事实和观点。', output: '分发给研究团队、市场态势分析师和盯盘手。' },
  research: { title: '个股研究团队', kind: '固定工作流 · 可展开', input: '对应标的的数据与上次研究摘要', duty: '基本面、技术面和舆情并行研究，再综合汇总；保留判断分歧。', output: '研究摘要、风险和需要继续验证的条件。' },
  fundamental: { title: '基本面', kind: 'LLM 分析节点', input: '框架准备的财务与经营资料', duty: '评估经营质量，不自行调用工具或规划任务。', output: '经营判断、支持证据与风险。' },
  technical: { title: '技术面', kind: 'LLM 分析节点', input: '框架准备的量价与趋势资料', duty: '分析价格行为和关键位置，不直接下达交易指令。', output: '趋势判断、确认条件与失效条件。' },
  sentiment: { title: '舆情', kind: 'LLM 分析节点', input: '框架准备的公告与新闻摘要', duty: '区分已确认信息与市场预期。', output: '催化因素、可信度和待核实问题。' },
  summary: { title: '综合汇总', kind: 'LLM 分析节点', input: '三个研究节点的分析结果', duty: '保留一致与分歧，明确判断适用的时间范围。', output: '提交给超级 Agent 的结构化研究摘要。' },
  market: { title: '市场态势分析师', kind: 'Agent · 可调用工具', input: '宏观新闻、市场宽度与板块变化', duty: '主动调查市场环境，向决策中心发送有意义的变化。', output: '市场快报；不直接发出交易指令。' },
  boss: { title: '超级 Agent', kind: '组合决策中心', input: '研究报告、市场快报、账户状态与回执', duty: '处理证据和分歧，统筹组合风险，委托调查并制定策略。', output: '有版本的完整策略，以及发给其他角色的任务。' },
  sub: { title: 'Sub-Agent', kind: 'Agent · 委托调查', input: '明确的调查任务与相关上下文', duty: '在授权工具范围内核实材料，回传证据与未解决问题。', output: '专项调查摘要；不自行制定组合策略。' },
  watcher: { title: '盯盘手', kind: 'Agent · 有限执行权限', input: '当前生效策略、实时行情与订单状态', duty: '等待条件、提出交易意图，并在盘面偏离策略时报告。', output: '交易意图或偏差报告；意图不等于成交。' },
  execution: { title: '执行框架', kind: '确定性规则校验', input: '结构化交易意图与账户可执行状态', duty: '检查资金、仓位与订单冲突，并跟踪订单生命周期。', output: '接受、拒绝、部分成交或全部成交等执行回执。' },
  memory: { title: '跨日记忆', kind: '上下文 / 日总结 / 事件', input: '当日判断、策略变化与执行结果', duty: '记录修正原因和待验证事项，为次日恢复提供依据。', output: '日级总结、活跃事件与下一交易日的观察任务。' },
};

export const connections: { id: EdgeId; from: NodeId; to: NodeId; label: string }[] = [
  { id: 'mandate', from: 'user', to: 'boss', label: '授权约束' },
  { id: 'sources', from: 'data', to: 'research', label: '研究资料' },
  { id: 'macro-data', from: 'data', to: 'market', label: '宏观数据' },
  { id: 'fundamental-report', from: 'fundamental', to: 'summary', label: '经营证据' },
  { id: 'technical-report', from: 'technical', to: 'summary', label: '量价判断' },
  { id: 'sentiment-report', from: 'sentiment', to: 'summary', label: '消息核验' },
  { id: 'report', from: 'research', to: 'boss', label: '研究报告' },
  { id: 'brief', from: 'market', to: 'boss', label: '市场快报' },
  { id: 'delegate', from: 'boss', to: 'sub', label: '委托调查' },
  { id: 'evidence', from: 'sub', to: 'boss', label: '补充证据' },
  { id: 'strategy', from: 'boss', to: 'watcher', label: '版本策略' },
  { id: 'quotes', from: 'data', to: 'watcher', label: '实时行情' },
  { id: 'intent', from: 'watcher', to: 'execution', label: '交易意图' },
  { id: 'receipt', from: 'execution', to: 'boss', label: '执行回执' },
  { id: 'order-status', from: 'execution', to: 'watcher', label: '订单状态' },
  { id: 'deviation', from: 'watcher', to: 'boss', label: '偏差报告' },
  { id: 'save', from: 'boss', to: 'memory', label: '日终沉淀' },
  { id: 'restore', from: 'memory', to: 'boss', label: '次日恢复' },
];

export const scenes: { id: Scene; title: string; description: string }[] = [
  { id: 'breakout', title: '放量突破', description: '观察条件确认与成交回执' },
  { id: 'news', title: '突发利空', description: '观察调查、重评与策略更新' },
  { id: 'reversal', title: '冲高回落', description: '观察偏差报告与执行约束' },
];

export type Decision = { version: number; title: string; condition: string; reason: string; execution: string };
export type Frame = {
  title: string; time: string; description: string; active: NodeId[]; warning: NodeId[]; edges: EdgeId[];
  outputs: Partial<Record<NodeId, string>>; messages: Partial<Record<EdgeId, string>>;
  decision: Decision | null; previous: Decision | null; prices: number[]; memory: string[];
};
type Patch = Pick<Frame, 'title' | 'time' | 'description' | 'active' | 'edges'> & Partial<Omit<Frame, 'title' | 'time' | 'description' | 'active' | 'edges'>>;
const v1: Decision = { version: 1, title: '关注机会，等待确认', condition: '放量突破并回踩站稳后，最多建立 5% 仓位；未满足条件则等待。', reason: '经营改善与短期过热同时存在，研究积极不等于立即买入。', execution: '尚未产生订单' };
const basePrices = [42, 43, 42, 45, 44, 46, 48, 47, 49, 50, 49, 50];
const base: Patch[] = [
  { title: '设定边界', time: '09:20', description: '虚构标的「星云科技」进入研究池。单股上限 10%，当前空仓。', active: ['user'], edges: [], outputs: { user: roles.user.output, data: '示例财务：经营现金流改善；示例行情：短期走高；示例新闻：行业订单预期升温。' } },
  { title: '并行研究', time: '09:25', description: '资料分发给研究团队，三个分析节点并行处理；市场态势分析师观察外部环境。', active: ['research', 'fundamental', 'technical', 'sentiment', 'market'], edges: ['mandate', 'sources', 'macro-data'], messages: { mandate: '星云科技纳入研究范围；单股仓位不得超过 10%；当前无持仓、无未完成订单。', sources: '示例资料包：经营现金流改善、价格短期走高、行业订单预期升温。均为预设演示资料。', 'macro-data': '示例市场快照：板块活跃，风险偏好平稳，尚无新的重大外部冲击。' }, outputs: { research: '基本面、技术面、舆情节点并行分析中。', fundamental: '正在整理经营与现金流资料。', technical: '正在比较量价与短期趋势。', sentiment: '正在区分行业预期与已确认公告。', market: '正在观察板块环境与市场宽度。' } },
  { title: '保留分歧', time: '09:28', description: '经营改善支持持续关注，但短期偏热、订单预期仍待核实。综合汇总保留这些差异。', active: ['summary', 'research'], warning: ['technical', 'summary', 'research'], edges: ['fundamental-report', 'technical-report', 'sentiment-report'], outputs: { fundamental: '经营现金流改善，支持持续关注；后续仍需检验订单兑现。', technical: '价格短期走高，追入的确认条件不足；需要放量与回踩验证。', sentiment: '行业订单预期积极，但尚不能视为公司已确认收入。', summary: '中期经营判断积极，短期交易条件不足。保留分歧，提交等待确认的研究建议。', research: '研究完成：经营改善、短期偏热、预期未完全证实。', market: '市场环境平稳，当前没有新增系统性风险提示。' }, messages: { 'fundamental-report': '经营判断：现金流改善。边界：订单兑现仍待确认。', 'technical-report': '量价判断：短期偏热。条件：等待放量突破后回踩站稳。', 'sentiment-report': '消息判断：行业预期积极；公司订单尚待核验。' } },
  { title: '形成策略', time: '09:30', description: '超级 Agent 结合研究、市场与账户状态，形成第一版策略。', active: ['boss'], edges: ['report', 'brief'], decision: v1, outputs: { boss: '采纳持续关注判断，保留短期风险。下发 V1：条件满足后最多建立 5% 仓位，否则等待。' }, messages: { report: '综合研究：经营向好；短期偏热；订单预期未完全确认。建议等待量价确认，不能把单一积极维度视为买入信号。', brief: '市场态势：外部环境平稳。仍需检查标的自身风险与组合约束。' } },
  { title: '等待信号', time: '09:35', description: '盯盘手收到 V1，保持待命。选择下方一个事件，改变接下来的市场。', active: ['watcher'], edges: ['strategy', 'quotes'], outputs: { watcher: 'V1 已接收：确认条件尚未满足，继续等待，无交易意图。' }, messages: { strategy: '策略 V1：放量突破并回踩站稳后，最多建立 5% 仓位；未确认不追入。单股硬上限仍为 10%。', quotes: '示例行情：价格仍在观察区间，尚未完成突破与回踩确认。' } },
];

const branches: Record<Scene, Patch[]> = {
  breakout: [
    { title: '放量突破', time: '10:10', description: '新行情进入盯盘手：出现放量突破，等待回踩确认。', active: ['data', 'watcher'], edges: ['quotes'], prices: [...basePrices, 54, 57, 55], outputs: { watcher: '突破信号出现，仍需回踩站稳；暂不提交意图。' }, messages: { quotes: '示例行情更新：放量突破后回踩，确认过程尚未结束。' } },
    { title: '条件确认', time: '10:15', description: '回踩站稳，盯盘手提出 5% 仓位的模拟交易意图。', active: ['watcher', 'execution'], edges: ['intent'], prices: [...basePrices, 54, 57, 55, 57], decision: { ...v1, execution: '意图已提交，等待规则校验' }, outputs: { watcher: '入场条件确认。提交目标仓位 5% 的模拟买入意图，等待执行框架校验。', execution: '收到意图，检查仓位上限、可用资金和未完成订单。' }, messages: { intent: '模拟买入意图：目标仓位 5%；依据 V1 的量价确认条件；尚未成交。' } },
    { title: '部分成交', time: '10:16', description: '规则校验通过。回执确认部分成交，组合仓位为 3%，剩余订单继续等待。', active: ['execution', 'boss'], edges: ['receipt'], decision: { ...v1, execution: '部分成交：3% 已确认，2% 待成交' }, outputs: { execution: '资金和仓位校验通过。订单部分成交，已确认仓位 3%；剩余 2% 尚未成交。', boss: '收到部分成交回执。按实际 3% 仓位记录，已有未完成订单，不重复下单。', watcher: '收到部分成交状态，继续跟踪剩余订单，不重复提交买入。' }, messages: { receipt: '订单已接受并部分成交：3% 已确认、2% 待成交。存在未完成订单，禁止重复提交同向主动订单。' } },
    { title: '成交确认', time: '10:18', description: '剩余订单成交后，组合仓位更新为 5%。策略仍为 V1，执行状态发生变化。', active: ['execution', 'boss'], edges: ['receipt'], prices: [...basePrices, 54, 57, 55, 57, 58], decision: { ...v1, execution: '全部成交：5% 仓位，无未完成订单' }, outputs: { execution: '全部成交回执：目标 5% 仓位已确认，未完成订单归零。', boss: '按成交回执确认 5% 仓位，继续沿用 V1 的风险纪律。', watcher: '订单已全部成交，继续按当前策略观察价格和风险。' }, messages: { receipt: '订单全部成交：累计仓位 5%，未完成数量为零。仅在收到本回执后更新全部成交状态。' } },
  ],
  news: [
    { title: '突发利空', time: '10:10', description: '行业订单可能延后的消息进入市场态势分析师，快报送达决策中心。', active: ['market', 'boss'], warning: ['market'], edges: ['macro-data', 'brief'], prices: [...basePrices, 48, 44, 42], outputs: { market: '发现订单延后的行业消息。影响范围尚不明确，发送风险快报。', boss: '收到新风险信息。保留当前空仓状态，准备委托核验。' }, messages: { 'macro-data': '示例新消息：部分行业订单可能延期，公司具体敞口尚不明确。', brief: '风险快报：订单预期可能改变；需要核实标的是否直接受到影响。当前信息不足以判断影响规模。' } },
    { title: '委托核验', time: '10:12', description: '超级 Agent 向 Sub-Agent 委托专项调查，检查消息来源与影响对象。', active: ['boss', 'sub'], edges: ['delegate'], outputs: { sub: '正在核验公告范围、影响对象与未确认事项。', boss: '委托调查：核实行业订单消息，区分已确认事实与外部推测。' }, messages: { delegate: '调查任务：核验订单延期消息来源、是否涉及星云科技、仍有哪些信息缺口。只回传证据和边界。' } },
    { title: '策略更新', time: '10:15', description: '调查确认行业风险，具体敞口仍不清楚。超级 Agent 将策略更新为 V2。', active: ['sub', 'boss'], warning: ['boss'], edges: ['evidence'], decision: { version: 2, title: '暂停开仓，等待核验', condition: '撤销 V1 的入场授权；公司影响范围澄清并重新研究前，不允许开仓。', reason: '订单兑现是原判断的关键前提。行业风险已确认，公司影响范围仍不明确。', execution: '空仓，等待 V2 下发' }, outputs: { sub: '预设核验结果：行业延期信息已确认；公司影响金额未知，仍需后续公告验证。', boss: '关键前提发生变化。V2 暂停开仓，要求补充公司影响证据。' }, messages: { evidence: '核验摘要：行业订单延期有依据；公司直接敞口和持续时间仍未确认。原订单预期不能继续按确定事实使用。' } },
    { title: '暂停开仓', time: '10:16', description: '盯盘手收到完整 V2，停止使用旧入场条件，保持空仓。', active: ['watcher'], edges: ['strategy'], decision: { version: 2, title: '暂停开仓，等待核验', condition: '撤销 V1 的入场授权；公司影响范围澄清并重新研究前，不允许开仓。', reason: '订单兑现是原判断的关键前提。行业风险已确认，公司影响范围仍不明确。', execution: 'V2 已接收，保持空仓，无订单' }, outputs: { watcher: 'V2 已生效。即使旧的技术条件满足，也不再按 V1 开仓。当前空仓，无需撤单。' }, messages: { strategy: '完整策略 V2：暂停所有新开仓，撤销 V1 的入场授权；待公司影响范围核实并重新研究后再评估。当前无挂单、无持仓。' } },
  ],
  reversal: [
    { title: '冲高回落', time: '10:10', description: '突破没有延续，价格回落。盯盘手发现盘面与原观察假设偏离。', active: ['watcher'], warning: ['watcher'], edges: ['quotes'], prices: [...basePrices, 56, 53, 47, 44], outputs: { watcher: '未出现有效回踩确认，价格已回到突破区间下方。不提交买入，准备报告偏差。' }, messages: { quotes: '示例行情更新：短暂冲高后回落，放量突破的持续性不足，原确认条件未满足。' } },
    { title: '报告偏差', time: '10:12', description: '盯盘手主动报告失效信号，超级 Agent 重新评估当前策略。', active: ['watcher', 'boss'], warning: ['watcher'], edges: ['deviation'], outputs: { boss: '收到偏差报告。经营判断尚未改变，但短期交易依据需要修正。' }, messages: { deviation: '执行偏差报告：突破失败，未建立持仓，无挂单。已停止寻找本轮入场机会，请重新评估策略。' } },
    { title: '重新设限', time: '10:15', description: 'V2 将本轮策略调整为观察，不再沿用刚才的突破信号。', active: ['boss', 'watcher'], edges: ['strategy'], decision: { version: 2, title: '本轮观察，重新研究', condition: '取消本轮开仓授权；形成新的价格结构并重新完成研究后再评估。', reason: '突破失败使短期交易依据失效，经营改善不足以单独支持立即买入。', execution: '保持空仓；演示下一步检查旧版本意图' }, outputs: { boss: 'V2：取消本轮开仓授权，等待新的价格结构与研究结论。', watcher: '收到 V2，维持观察；本轮没有新买入授权。' }, messages: { strategy: '完整策略 V2：取消本轮开仓授权，旧突破信号失效；当前无持仓、无订单，等待重新研究。' } },
    { title: '拦截旧意图', time: '10:16', description: '注入一条延迟到达的旧版本意图，演示执行框架如何拒绝不符合当前授权的动作。', active: ['execution', 'boss'], warning: ['execution'], edges: ['intent', 'receipt'], decision: { version: 2, title: '本轮观察，重新研究', condition: '取消本轮开仓授权；形成新的价格结构并重新完成研究后再评估。', reason: '突破失败使短期交易依据失效，经营改善不足以单独支持立即买入。', execution: '旧版本意图被拒绝，未产生订单，仓位 0%' }, outputs: { execution: '演示异常校验：延迟的旧版本买入意图不符合当前开仓授权，拒绝执行。未产生订单。', boss: '收到拒绝回执，确认仍为空仓。将突破失败与旧意图拦截写入复盘。' }, messages: { intent: '异常演示：一条引用 V1 的买入意图延迟到达；当前生效的是不允许本轮开仓的 V2。', receipt: '拒绝回执：意图不符合当前开仓授权。没有提交订单，没有成交，实际仓位保持 0%。' } },
  ],
};

export function buildFrames(scene: Scene | null): Frame[] {
  const patches = [...base];
  if (scene) {
    const memory = scene === 'breakout'
      ? ['研究：经营改善与短期偏热的分歧保留。', '执行：条件确认后分批成交，最终仓位 5%。', '次日：继续检查订单兑现与当前持仓风险。']
      : scene === 'news'
        ? ['修正：原订单预期受到行业延期信息挑战。', '策略：V2 暂停开仓，当前保持空仓。', '次日：核实公司影响敞口，再决定是否恢复研究与授权。']
        : ['修正：本次突破失败，旧入场信号失效。', '执行：V2 取消本轮授权，旧版本意图被拦截。', '次日：等待新价格结构并重新研究，当前保持空仓。'];
    patches.push(...branches[scene],
      { title: '日终沉淀', time: '15:30', description: '记录判断变化、执行结果和未解决事项，为次日保留连续性。', active: ['boss', 'memory'], edges: ['save'], memory, outputs: { memory: memory.join('\n') }, messages: { save: memory.join('\n') } },
      { title: '次日恢复', time: '次日 09:20', description: '超级 Agent 读取日总结与活跃事件，带着昨天的未完成问题继续研究。', active: ['memory', 'boss'], edges: ['restore'], outputs: { boss: `恢复昨日策略与实际执行状态。${memory[2]} 不把昨日信号自动视为今日有效信号。` }, messages: { restore: `恢复上下文：${memory.join(' ')} 新交易日仍需核对最新资料。` } },
    );
  }
  let previous: Frame = { title: '', time: '', description: '', active: [], warning: [], edges: [], outputs: {}, messages: {}, decision: null, previous: null, prices: basePrices, memory: [] };
  return patches.map(patch => {
    const next: Frame = {
      ...previous, ...patch, warning: patch.warning ?? [],
      outputs: { ...previous.outputs, ...patch.outputs }, messages: { ...previous.messages, ...patch.messages },
      previous: patch.decision && previous.decision && patch.decision.version !== previous.decision.version ? previous.decision : previous.previous,
    };
    if (patch.messages?.receipt) {
      next.edges = [...next.edges, 'order-status'];
      next.messages['order-status'] = patch.messages.receipt;
    }
    previous = next;
    return next;
  });
}

export type Playback = { scene: Scene | null; step: number; reached: number; playing: boolean };
export const initialPlayback: Playback = { scene: null, step: 0, reached: 0, playing: false };
export type Action = { type: 'play' | 'pause' | 'tick' | 'next' | 'reset' } | { type: 'seek'; step: number } | { type: 'event'; scene: Scene };
export function playbackReducer(state: Playback, action: Action): Playback {
  const end = state.scene ? 10 : 4;
  switch (action.type) {
    case 'reset': return initialPlayback;
    case 'pause': return { ...state, playing: false };
    case 'play': return { ...state, playing: state.step < end };
    case 'seek': return { ...state, step: Math.max(0, Math.min(state.reached, Math.trunc(action.step))), playing: false };
    case 'event': return state.step < 4 ? state : { scene: action.scene, step: 5, reached: 5, playing: true };
    case 'tick': if (!state.playing) return state;
    // A manual step also pauses the clock, so it cannot race with the next frame.
    case 'next': {
      const step = Math.min(end, state.step + 1);
      return { ...state, step, reached: Math.max(step, state.reached), playing: action.type === 'tick' && step < end };
    }
  }
}
