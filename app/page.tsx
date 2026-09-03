const skills = ['AI Agent', 'Prompt Engineering', 'Context Engineering', 'Harness Engineering', 'Loop Engineering', 'Graph Engineering'];

const projects = [
  {
    no: '01', label: 'AI AGENT SYSTEM', title: '盯盘手 Agent 系统',
    summary: '从原理理解到系统落地，我独立完成了一个面向证券市场的多 Agent 系统，让行情、持仓、策略与交易工具在同一套运行周期中协作。',
    points: ['8 个 LangChain 工具', '30+ 数据模块', '46 个技术指标', '实时 SSE 推送'],
    images: [{ src: '/trading-agent.png', alt: '盯盘手 Agent 的对话与执行界面' }, { src: '/trading-architecture.png', alt: '盯盘手系统后端核心模块列表' }],
  },
  {
    no: '02', label: 'FULL-STACK PRODUCT', title: 'ModelShare 额度共享平台',
    summary: '从购买阿里云服务器到网站正式上线，我独立走完了产品设计、开发与部署流程，把闲置 API 额度连接成可使用的模型资源。',
    points: ['独立产品设计', '完整上线部署', '账号额度共享', '持续迭代中'], link: 'https://modelshare.cn',
    images: [{ src: '/modelshare-home.png', alt: 'ModelShare 产品首页' }, { src: '/modelshare-dashboard.png', alt: 'ModelShare 资源共享控制台' }],
  },
  {
    no: '03', label: 'OBSIDIAN PLUGIN', title: '微信公众号文章整理插件',
    summary: '为了解决日常阅读中的信息过载，我开发了这款 Obsidian 插件：整理文章、生成摘要，再结合用户画像评分排序，筛出真正值得读的内容。',
    points: ['文章自动整理', 'AI 摘要', '用户画像评分', '高价值内容排序'],
    images: [{ src: '/article-settings.png', alt: '微信公众号文章整理插件设置界面' }, { src: '/article-index.png', alt: '插件生成的高分文章索引' }],
  },
];

export default function Home() {
  return (
    <main>
      <nav className="nav shell" aria-label="主要导航">
        <a className="brand" href="#top" aria-label="返回首页">CYZ<span>●</span></a>
        <div className="navLinks"><a href="#about">关于</a><a href="#projects">项目</a><a href="#thinking">思考</a></div>
      </nav>

      <section className="hero shell" id="top">
        <div className="heroCopy">
          <p className="eyebrow"><span /> AI 创造者 · 学生开发者</p>
          <h1>你好，我是<br /><em>陈炎志。</em></h1>
          <p className="heroLead">我正在学习如何让 AI 从对话工具，变成真正能理解任务、使用工具并持续行动的智能系统。</p>
          <div className="heroActions">
            <a className="primaryButton" href="#projects">看看我的项目 <b>↘</b></a>
            <a className="textLink" href="https://modelshare.cn" target="_blank" rel="noreferrer">访问 ModelShare ↗</a>
          </div>
        </div>
        <div className="heroVisual" aria-hidden="true">
          <div className="orbit orbitOne"><span>Agent</span></div><div className="orbit orbitTwo"><span>Idea</span></div>
          <div className="core"><span>AI</span><small>BUILDING</small></div>
          <div className="codeNote">think → build<br />→ test → loop</div>
        </div>
        <div className="scrollMark"><span>SCROLL</span><i /></div>
      </section>

      <section className="about shell" id="about">
        <p className="sectionIndex">01 / ABOUT</p>
        <div className="aboutGrid">
          <h2>用创意提出问题，<br />用 AI 把答案做出来。</h2>
          <div className="aboutText"><p>虽然刚刚迈入大学，我已经把大量时间投入 AI Agent 的学习与实践。我能熟练运用 Codex、ChatGPT、OpenCode、OpenClaw 等工具，并把工程方法融入真实产品。</p><p>这些项目借助 AI 完成，但每个需求、创意和产品判断都来自我自己。对我来说，技术不是终点——解决人的真实需求才是。</p></div>
        </div>
        <div className="skillRail" aria-label="技能列表">{skills.map((skill, index) => <span key={skill}><i>{String(index + 1).padStart(2, '0')}</i>{skill}</span>)}</div>
      </section>

      <section className="projects shell" id="projects">
        <div className="sectionHead"><div><p className="sectionIndex">02 / SELECTED WORK</p><h2>做过的事，<br /><em>比标签更重要。</em></h2></div><p>从 Agent 系统、全栈平台到个人效率插件，<br />每一个项目都起源于我真实遇到的问题。</p></div>
        <div className="projectList">
          {projects.map((project) => (
            <article className="project" key={project.no}>
              <header className="projectHeader"><div className="projectNumber">{project.no}</div><div className="projectTitle"><p>{project.label}</p><h3>{project.title}</h3></div><p className="projectSummary">{project.summary}</p></header>
              <div className="projectImages">{project.images.map((img, index) => <a className={`imageFrame ${index === 0 ? 'primaryImage' : 'secondaryImage'}`} href={img.src} target="_blank" key={img.src}><img src={img.src} alt={img.alt} /><span>点击查看大图 ↗</span></a>)}</div>
              <footer className="projectFooter"><div className="tags">{project.points.map(point => <span key={point}>{point}</span>)}</div>{project.link && <a href={project.link} target="_blank" rel="noreferrer">访问项目 <b>↗</b></a>}</footer>
            </article>
          ))}
        </div>
      </section>

      <section className="proof shell" aria-label="学习投入"><p className="sectionIndex">03 / KEEP EXPLORING</p><div className="proofGrid"><div className="bigNumber"><strong>3</strong><span>亿</span><small>单日最高 Codex Token 使用量</small></div><blockquote>“真正的熟练，来自持续不断地<br />尝试、犯错、理解和再创造。”</blockquote></div></section>

      <section className="thinking" id="thinking"><div className="shell thinkingInner"><p className="sectionIndex">04 / WHAT I BELIEVE</p><p className="quoteMark">“</p><h2>机器人终有一天会像人一样<br />理解世界，并面对多变的环境。</h2><p>我一直关注具身智能的发展。就像 ChatGPT 带来的飞跃一样，我相信机器人智慧的突破也终将到来——而它需要我们的想象、智慧与努力。</p><span className="signature">陈炎志 · 2026</span></div></section>
      <footer className="footer shell"><a className="brand" href="#top">CYZ<span>●</span></a><p>保持好奇，持续创造。</p><a href="#top">回到顶部 ↑</a></footer>
    </main>
  );
}
