export const demoIds = ['wukong', 'modelshare', 'answerplayer', 'reading', 'tank'];

// A deterministic illustration of fair scheduling, not the platform's live router.
export function distributeRequests(requests: number, enabled: boolean[]) {
  const capacity = [6, 4, 5];
  const assigned = [0, 0, 0];
  let remaining = requests;
  while (remaining > 0) {
    let progressed = false;
    for (let i = 0; i < capacity.length && remaining > 0; i++) {
      if (enabled[i] && assigned[i] < capacity[i]) {
        assigned[i]++;
        remaining--;
        progressed = true;
      }
    }
    if (!progressed) break;
  }
  return { assigned, remaining, capacity, totalCapacity: capacity.reduce((sum, c, i) => sum + (enabled[i] ? c : 0), 0) };
}

export const interviewCases = [
  { label: '项目介绍', question: '介绍一个你做过的 AI 项目，你解决了什么问题？', background: '示例背景：做过公众号文章摘要工具，希望解决收藏后不再阅读的问题。', answer: ['问题：关注的公众号很多，收藏的文章却常常没空读。', '行动：把文章存入笔记库，结合个人兴趣生成摘要、要点和阅读理由。', '结果：先通过摘要和推荐索引选择文章，再精读感兴趣的内容；实际效果还需要持续验证。'] },
  { label: '技术取舍', question: '为什么将投研流程拆成多个角色，而不是只用一个模型？', background: '示例背景：投研项目区分研究、组合判断和交易执行职责。', answer: ['目标：让研究、组合判断和执行各自处理明确的问题。', '取舍：专业分工让依据更清楚，但也增加了消息调度与状态管理的复杂度。', '实现：用结构化消息连接岗位，保留策略版本和执行反馈，追踪判断变化。'] },
  { label: '遇到困难', question: '当不同分析结论互相矛盾时，你会怎么处理？', background: '示例背景：基本面判断积极，但短期价格偏热，需要保留分歧。', answer: ['识别：先确认结论的时间范围和依据，区分事实与推断。', '处理：保留分歧，补充调查，并写清楚需要继续验证的条件。', '复盘：结合后续反馈修正判断，把变化原因记录下来。'] },
];

export const readingProfiles = ['AI 开发', '产品设计', '知识管理'];
export const readingArticles = [
  { title: '让多个 Agent 真正协作', length: '工程实践', text: '把一个复杂任务交给多个智能体，并不意味着协作自然发生。每个角色需要明确的输入、输出和权限边界。研究节点整理证据，决策节点处理分歧，执行节点反馈结果。共享所有上下文虽然简单，却可能带来重复推理与信息干扰。保留消息来源、策略版本与关键事件，有助于定位一次判断是如何形成的。', summary: '多 Agent 协作的重点是职责、消息和反馈，而不只是增加模型数量。', bullets: ['为每个角色定义输入、输出与权限。', '保留来源和版本，让判断过程可追溯。', '控制共享上下文，减少重复信息。'], scores: [96, 78, 72], reasons: ['直接关联角色编排和执行反馈，适合研究 Agent 系统时精读。', '能帮助理解协作产品背后的限制，但交互设计案例较少。', '有来源与事件记录思路，不过主要讨论工程协作。'] },
  { title: '一个好用的 AI 功能，从反馈开始', length: '产品观察', text: '当用户点击生成按钮后，等待也成为体验的一部分。与其只展示一个转圈图标，不如告诉用户当前正在处理什么，并允许取消和重新开始。生成结束后，用户还需要理解结果的依据和局限。好的反馈能让一个复杂的 AI 功能变得可理解，也让失败成为可以修正的步骤。', summary: '将等待、取消、解释和重试设计成完整流程，让 AI 功能更容易理解。', bullets: ['等待时呈现明确的处理状态。', '给用户取消和重试的选择。', '结果附带依据，让用户判断是否采用。'], scores: [82, 97, 68], reasons: ['适合补充 AI 应用的状态处理设计，但没有深入实现代码。', '覆盖生成前后与失败状态，适合设计 AI 交互流程时精读。', '关注交互反馈，和知识沉淀的直接关联较少，可先看摘要。'] },
  { title: '收藏之后，如何真正读进去', length: '阅读方法', text: '收藏是一种低成本动作，阅读却需要明确的时间与目的。给文章写下简短摘要和推荐理由，可以让再次打开笔记库时的选择更容易。围绕同一主题整理不同观点，比堆积链接更有帮助。每周回看真正读过和用过的内容，逐步形成个人知识索引，而不是不断扩大的待读列表。', summary: '用摘要、阅读理由和主题回顾，把收藏转成有目的的阅读。', bullets: ['收藏时留下摘要与阅读理由。', '围绕主题对比观点，而不是堆积链接。', '每周回顾读过和用过的内容。'], scores: [65, 76, 98], reasons: ['适合整理技术阅读习惯，但不涉及具体 AI 工程实现。', '提供阅读产品的需求线索，可以重点关注收藏后的行为。', '直接覆盖筛选、索引和回顾，适合搭建个人知识库时精读。'] },
];

export function rankedArticles(profile: number) {
  return readingArticles.map((article, index) => ({ ...article, index, score: article.scores[profile], reason: article.reasons[profile] })).sort((a, b) => b.score - a.score);
}
