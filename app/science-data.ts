// A deterministic UI simulation of durable execution, not the actual Provider SDK.
export const experiment = {
  requestKey: 'calibration-series-01', operationId: 'OP-001', resultId: 'ART-001',
  provider: 'simulated-instrument', input: { reference: 1, samples: 3, unit: '相对读数' },
  readings: [0.98, 1.02, 1.00], reservedBudget: 30,
};
export type OperationStatus = 'idle' | 'registered' | 'running' | 'unknown' | 'completed';
export type ScienceLog = { sequence: number; title: string; detail: string; kind: 'normal' | 'warning' | 'success' };
export type ScienceState = {
  status: OperationStatus; connected: boolean; submissions: number; starts: number;
  readings: number[]; reserved: boolean; result: { id: string; mean: number } | null;
  logs: ScienceLog[]; sequence: number;
};
export const initialScience: ScienceState = { status: 'idle', connected: true, submissions: 0, starts: 0, readings: [], reserved: false, result: null, logs: [], sequence: 0 };
export type ScienceAction = { type: 'submit' | 'advance' | 'interrupt' | 'reset' } | { type: 'reconcile'; available: boolean };
function record(state: ScienceState, title: string, detail: string, kind: ScienceLog['kind'] = 'normal'): ScienceState {
  const sequence = state.sequence + 1;
  return { ...state, sequence, logs: [...state.logs.slice(-39), { sequence, title, detail, kind }] };
}
function complete(state: ScienceState): ScienceState {
  const mean = state.readings.reduce((a, b) => a + b, 0) / state.readings.length;
  return record({ ...state, status: 'completed', reserved: false, result: { id: experiment.resultId, mean } }, '结果已核验并登记', 'ART-001 关联 OP-001、原始输入与三次观察。释放仪器占用；已登记的预算不自动退回。', 'success');
}
export function scienceReducer(state: ScienceState, action: ScienceAction): ScienceState {
  switch (action.type) {
    case 'reset': return initialScience;
    case 'submit': {
      if (!state.connected) return state;
      const submitted = { ...state, submissions: state.submissions + 1 };
      if (state.status !== 'idle') return record(submitted, '重复请求已识别', `请求键 ${experiment.requestKey} 已存在，返回原操作 OP-001；不创建新操作，不再次占用预算，不重新执行。`, 'success');
      return record({ ...submitted, status: 'registered', reserved: true }, '实验已登记', '创建 OP-001，锁定模拟仪器，登记 30 单位演示预算。输入为参考值 1、采样 3 次；设备尚未启动。');
    }
    case 'advance': {
      if (!state.connected || !['registered', 'running'].includes(state.status)) return state;
      if (state.readings.length === experiment.readings.length) return complete(state);
      const count = state.readings.length;
      return record({ ...state, status: 'running', starts: Math.max(1, state.starts), readings: [...state.readings, experiment.readings[count]] }, count === 0 ? '仪器开始执行' : '追加原始观察', `OP-001 · 观察 ${count + 1}/3：${experiment.readings[count].toFixed(2)}。写入设备记录，结果尚未正式登记。`);
    }
    case 'interrupt': {
      if (!state.connected || !['registered', 'running'].includes(state.status)) return state;
      return record({ ...state, connected: false, status: 'unknown' }, '模拟进程中断', '控制端断开。保留操作身份、已有观察、仪器占用与预算；执行结果暂记未知，不自动重放。', 'warning');
    }
    case 'reconcile': {
      if (state.status !== 'unknown') return state;
      if (!action.available) return record({ ...state, connected: true }, '设备暂时无法核对', '控制端已重连，但没有拿到可确认的设备状态。继续保留 unknown、仪器占用与预算；禁止盲目重试。', 'warning');
      const verified = record({ ...state, connected: true }, '已核对设备记录', `找到原操作 OP-001，已保留 ${state.readings.length}/3 次观察；仪器实际启动 ${state.starts} 次。`, 'success');
      if (state.readings.length === experiment.readings.length) return complete(verified);
      return record({ ...verified, status: state.readings.length ? 'running' : 'registered' }, '恢复管理原操作', '从设备确认的进度继续，不重复已有观察，不创建第二次实验。', 'success');
    }
  }
}

export const statusLabels: Record<OperationStatus, string> = { idle: '等待提交', registered: '已登记', running: '执行中', unknown: '结果待核对', completed: '结果已登记' };
export const layerDetails = {
  brain: { name: '大脑 · 科研思考', input: '研究问题、已有证据和可用能力', duty: '按研究任务配置 Agent 职责与协作关系。主 Agent 可以委托不同分支，获准分支交换有来源的结果。', output: '实验需求、假设与下一步研究方向', boundary: '本演示采用预设校准问题；自主科学发现与论文质量属于长期目标。' },
  midbrain: { name: '中脑 · 编排与监督', input: '实验需求、约束和已有操作记录', duty: '协调执行步骤，登记请求身份与操作状态，管理共享资源、预算和恢复核对。', output: '可执行请求、进度、异常与结果引用', boundary: '图中是组织示例，科研角色和工作流可配置，不是固定模板。' },
  provider: { name: '小脑 · 执行能力', input: '带操作身份的具体执行请求', duty: '通过 Provider 接口接入模拟仪器、计算任务或领域工具，返回实际观察与执行状态。', output: '设备记录、原始观察和可追溯产物', boundary: 'v0.1 有模拟仪器与长计算参考实现；真实设备和机器人接入是后续方向。' },
  request: { name: '实验需求 → 编排', input: '参考值 1，采样 3 次', duty: '将预设问题转成带输入与请求键的实验需求，交给执行管理层。', output: '请求键 calibration-series-01', boundary: '重复提交同一个请求键，仍对应同一个操作。' },
  execution: { name: '执行请求 → Provider', input: 'OP-001、采样参数与资源占用', duty: '只有已登记且状态可确认的操作才能继续执行；未知状态先核对。', output: '原始观察逐条追加至操作记录', boundary: '断开控制端不等于实验成功，也不意味着可以重新执行。' },
  feedback: { name: '执行反馈 → 科研决策', input: '状态回执、原始观察与产物引用', duty: '先核对执行事实，再将可确认的结果交回研究层。研究结论应能追溯至输入和记录。', output: 'ART-001 → OP-001 → 原始输入与三次观察', boundary: '示例平均值只用于演示结果来源，不代表已完成科学验证。' },
};
export type ScienceSelection = keyof typeof layerDetails;
