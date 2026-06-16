const storageKeys = {
  theme: "nanstar-workstation-theme",
  language: "nanstar-workstation-language",
  favorites: "nanstar-workstation-favorites",
  customCards: "nanstar-workstation-custom-cards",
  recentCards: "nanstar-workstation-recent",
  cardFrequency: "nanstar-workstation-frequency"
};

const categoryMeta = {
  all: { label: "全部", labelEn: "All", sub: "全部卡片", subEn: "All cards", eyebrow: "All Orbits / Command Atlas", title: "NanStar Workstation", titleEn: "NanStar Workstation" },
  config: { label: "配置", labelEn: "Config", sub: "环境设置", subEn: "Identity setup", eyebrow: "Venus Orbit / Environment", title: "配置与身份", titleEn: "Config & Identity" },
  daily: { label: "日常", labelEn: "Daily", sub: "日常提交", subEn: "Daily commits", eyebrow: "Mercury Orbit / Daily Flow", title: "日常 Git 工作流", titleEn: "Daily Git Flow" },
  undo: { label: "撤销", labelEn: "Undo", sub: "撤销恢复", subEn: "Undo & restore", eyebrow: "Mars Orbit / Recovery", title: "撤销与恢复", titleEn: "Undo & Recovery" },
  remote: { label: "远程", labelEn: "Remote", sub: "远程同步", subEn: "Remote sync", eyebrow: "Earth Orbit / Sync", title: "远程与同步", titleEn: "Remote & Sync" },
  stash: { label: "暂存", labelEn: "Stash", sub: "暂存现场", subEn: "Save context", eyebrow: "Saturn Orbit / Context", title: "暂存现场", titleEn: "Stash Context" },
  danger: { label: "危险", labelEn: "Danger", sub: "危险操作", subEn: "Careful ops", eyebrow: "Neptune Orbit / Confirm First", title: "危险操作", titleEn: "Careful Operations" }
};

const cardClassByCategory = {
  config: "venus-card",
  daily: "mercury-card",
  undo: "mars-card",
  remote: "earth-card",
  stash: "saturn-card",
  danger: "neptune-card"
};

const uiText = {
  zh: {
    htmlLang: "zh-CN",
    brandSub: "Workstation · Command Atlas",
    themeLight: "浅色",
    themeDark: "深色",
    themeToLight: "切换浅色主题",
    themeToDark: "切换深色主题",
    langLabel: "切换英文",
    langButton: "EN",
    focusEyebrow: "Command Locate",
    focusTitle: "快速定位命令",
    searchPlaceholder: "搜：撤销 / 邮箱 / rebase / index.lock",
    searchAria: "快速搜索命令卡片",
    clear: "清空",
    favorites: "收藏",
    exitFavorites: "退出收藏",
    newCard: "新建卡片",
    resultEyebrow: "Command Cards / 命令卡片",
    favoriteCards: "收藏卡片",
    favoritedCommands: "已收藏命令",
    frequentGit: "高频 Git 场景",
    cardsUnit: "cards",
    custom: "Custom",
    git: "Git",
    copy: "复制",
    copyAll: "复制全部",
    copyLine: "复制此行",
    favoriteAction: "收藏",
    noMatchTitle: "没有匹配的卡片",
    noMatchBody: "换个关键词，或点击“新建卡片”把这条命令收进你的工作站。",
    selectedEyebrow: "Selected Card / 当前卡片",
    pickCardTitle: "先选一张卡片",
    pickCardBody: "点击卡片查看备注；复制优先在命令行内完成。",
    category: "分类",
    scenario: "场景",
    copyGroup: "复制整组命令",
    solarEyebrow: "Solar Field / 星图",
    solarTitle: "八轨行星",
    solarFullLabel: "全屏查看八轨行星",
    solarFullTitle: "全屏查看",
    solarOverlayEyebrow: "Solar Field / 全屏星图",
    solarOverlayTitle: "八轨行星观测",
    close: "关闭",
    closeSolar: "关闭八轨行星观测",
    selectedBody: "Selected Body / 星体",
    clickPlanet: "点击一颗行星",
    clickBody: "点击太阳或行星",
    planetHint: "全屏模式会保持转动。点击太阳或行星后，轨道暂停并显示简介；点击空白区域后继续转动。",
    formCustomEyebrow: "Custom Card / 自定义",
    formCustomTitle: "添加自定义卡片",
    formClose: "关闭",
    formTitle: "标题",
    formCategory: "分类",
    formScenario: "场景",
    formCommand: "命令",
    formNote: "备注",
    formTags: "标签",
    saveCard: "保存卡片",
    titlePlaceholder: "例如：撤销最近一次 commit",
    scenarioPlaceholder: "什么时候用这张卡",
    notePlaceholder: "执行前要注意什么",
    tagsPlaceholder: "用逗号分隔，例如 git,撤销,commit",
    customScenario: "自定义场景",
    titleRequired: "标题和命令不能为空",
    savedCard: "卡片已保存",
    favoriteAdded: "已加入收藏",
    favoriteRemoved: "已取消收藏",
    copied: "命令已复制",
    copyUnavailable: "复制不可用",
    storageFull: "本地存储空间不足，请清理浏览器数据"
  },
  en: {
    htmlLang: "en",
    brandSub: "Workstation · Command Atlas",
    themeLight: "Light",
    themeDark: "Dark",
    themeToLight: "Switch to light theme",
    themeToDark: "Switch to dark theme",
    langLabel: "Switch to Chinese",
    langButton: "中",
    focusEyebrow: "Command Locate",
    focusTitle: "Find Commands Fast",
    searchPlaceholder: "Search: undo / email / rebase / index.lock",
    searchAria: "Search command cards",
    clear: "Clear",
    favorites: "Favorites",
    exitFavorites: "Exit Favorites",
    newCard: "New Card",
    resultEyebrow: "Command Cards",
    favoriteCards: "Favorite Cards",
    favoritedCommands: "Favorited Commands",
    frequentGit: "Frequent Git Scenarios",
    cardsUnit: "cards",
    custom: "Custom",
    git: "Git",
    copy: "Copy",
    copyAll: "Copy All",
    copyLine: "Copy this line",
    favoriteAction: "Favorite",
    noMatchTitle: "No matching cards",
    noMatchBody: "Try another keyword, or add this command with New Card.",
    selectedEyebrow: "Selected Card",
    pickCardTitle: "Select a card first",
    pickCardBody: "Click a card to view notes. Copy actions are available inside each command line.",
    category: "Category",
    scenario: "Scenario",
    copyGroup: "Copy command group",
    solarEyebrow: "Solar Field",
    solarTitle: "Eight-Orbit System",
    solarFullLabel: "Open solar field fullscreen",
    solarFullTitle: "Fullscreen",
    solarOverlayEyebrow: "Solar Field / Fullscreen",
    solarOverlayTitle: "Eight-Orbit View",
    close: "Close",
    closeSolar: "Close solar field view",
    selectedBody: "Selected Body",
    clickPlanet: "Click a planet",
    clickBody: "Click the Sun or a planet",
    planetHint: "Fullscreen mode keeps orbiting. Click the Sun or a planet to pause and show a short note; click empty space to resume.",
    formCustomEyebrow: "Custom Card",
    formCustomTitle: "Add Custom Card",
    formClose: "Close",
    formTitle: "Title",
    formCategory: "Category",
    formScenario: "Scenario",
    formCommand: "Command",
    formNote: "Note",
    formTags: "Tags",
    saveCard: "Save Card",
    titlePlaceholder: "Example: undo last commit",
    scenarioPlaceholder: "When to use this card",
    notePlaceholder: "What to check before running it",
    tagsPlaceholder: "Comma-separated, e.g. git,undo,commit",
    customScenario: "Custom scenario",
    titleRequired: "Title and command are required",
    savedCard: "Card saved",
    favoriteAdded: "Added to favorites",
    favoriteRemoved: "Removed from favorites",
    copied: "Command copied",
    copyUnavailable: "Copy unavailable",
    storageFull: "Local storage is full. Clear browser data and try again."
  }
};

const seedCards = [
  {
    id: "git-config-user",
    title: "配置提交用户名和邮箱",
    titleEn: "Configure Git username and email",
    category: "config",
    risk: "Safe",
    scenario: "新电脑、临时环境或 GitHub 提交身份不对时先检查这张。",
    scenarioEn: "Use this first on a new machine, temporary environment, or when GitHub commit identity looks wrong.",
    command: 'git config --global user.name "你的名字"\ngit config --global user.email "你的邮箱@example.com"\ngit config --global --list',
    note: "--global 会写入当前系统用户配置。项目内单独配置时去掉 --global。",
    noteEn: "--global writes to the current system user config. Remove --global when configuring only one repository.",
    tags: ["git", "配置", "邮箱", "user"]
  },
  {
    id: "git-config-default-branch",
    title: "设置默认分支名为 main",
    titleEn: "Set default branch name to main",
    category: "config",
    risk: "Safe",
    scenario: "初始化新仓库时，避免默认分支名和 GitHub Pages / Cloudflare Pages 习惯不一致。",
    scenarioEn: "Use when initializing new repositories to avoid branch-name mismatches with GitHub Pages or Cloudflare Pages habits.",
    command: "git config --global init.defaultBranch main\ngit init",
    note: "只影响之后新建的仓库，不会自动改已有仓库分支名。",
    noteEn: "Only affects repositories created later. Existing branch names will not change automatically.",
    tags: ["git", "配置", "main", "init"]
  },
  {
    id: "git-daily-commit-push",
    title: "日常提交上传",
    titleEn: "Daily commit and push",
    category: "daily",
    risk: "Safe",
    scenario: "最常规的一次保存、提交、推送流程。",
    scenarioEn: "The normal save, commit, and push flow.",
    command: 'git status\ngit pull\ngit add .\ngit commit -m "提交说明"\ngit push',
    note: "提交前先看 status，确认没有把临时文件、密钥、构建产物一起加进去。",
    noteEn: "Check status before committing to avoid adding temp files, secrets, or build artifacts.",
    tags: ["git", "提交", "push", "daily"]
  },
  {
    id: "git-check-diff",
    title: "提交前查看改了什么",
    titleEn: "Review changes before committing",
    category: "daily",
    risk: "Safe",
    scenario: "准备 commit 前快速扫一遍改动，避免把无关内容提交进去。",
    scenarioEn: "Quickly scan changes before committing so unrelated content does not get included.",
    command: "git status\ngit diff\ngit diff --staged",
    note: "git diff 看工作区未暂存改动；git diff --staged 看已经 add 的改动。",
    noteEn: "git diff shows unstaged working-tree changes; git diff --staged shows changes already added.",
    tags: ["git", "diff", "检查", "提交前"]
  },
  {
    id: "git-log-graph",
    title: "漂亮日志图",
    titleEn: "Compact commit graph",
    category: "daily",
    risk: "Safe",
    scenario: "需要看分支、合并、提交关系时，用一行图快速判断仓库状态。",
    scenarioEn: "Use this to inspect branches, merges, and commit relationships at a glance.",
    command: "git log --oneline --graph --decorate --all",
    note: "适合 pull/rebase/merge 前看一眼，尤其是多分支时。",
    noteEn: "Useful before pull, rebase, or merge, especially in multi-branch repositories.",
    tags: ["git", "log", "graph", "分支"]
  },
  {
    id: "git-pull-rebase",
    title: "更稳的提交前同步",
    titleEn: "Safer sync before pushing",
    category: "remote",
    risk: "Low Risk",
    scenario: "本地准备提交或推送前，先同步远程并保持历史更干净。",
    scenarioEn: "Sync remote changes before local commit or push while keeping history cleaner.",
    command: "git fetch\ngit log --oneline --graph --decorate --all\ngit pull --rebase origin main",
    note: "如果 rebase 冲突，先解决冲突，再 git rebase --continue。",
    noteEn: "If rebase conflicts occur, resolve them and then run git rebase --continue.",
    tags: ["git", "pull", "rebase", "同步"]
  },
  {
    id: "git-remote-url",
    title: "查看和切换远程地址",
    titleEn: "View and switch remote URLs",
    category: "remote",
    risk: "Safe",
    scenario: "换 GitHub 仓库、HTTPS/SSH 切换、推送到新远程时使用。",
    scenarioEn: "Use when switching GitHub repositories, changing HTTPS/SSH, or pushing to a new remote.",
    command: "git remote -v\ngit remote set-url origin git@github.com:用户名/仓库名.git\ngit remote set-url origin https://github.com/用户名/仓库名.git",
    note: "SSH 需要本机配置 SSH key；HTTPS 通常走浏览器或 token 认证。",
    noteEn: "SSH requires a local SSH key. HTTPS usually uses browser or token authentication.",
    tags: ["git", "remote", "ssh", "https"]
  },
  {
    id: "git-undo-last-commit-soft",
    title: "撤销最近一次 commit，保留改动",
    titleEn: "Undo last commit, keep changes",
    category: "undo",
    risk: "Low Risk",
    scenario: "刚 commit 完发现提交说明写错、漏改文件，想退回到提交前继续改。",
    scenarioEn: "Use right after a commit when the message is wrong or files were missed, and you want to keep editing.",
    command: "git reset --soft HEAD^",
    note: "只撤销 commit，本地文件和暂存区改动还在。已经 push 的提交不要直接这么处理。",
    noteEn: "Only removes the commit. Local files and staged changes remain. Avoid this directly for commits already pushed.",
    tags: ["git", "撤销", "commit", "reset"]
  },
  {
    id: "git-unstage-all",
    title: "取消暂存全部文件",
    titleEn: "Unstage all files",
    category: "undo",
    risk: "Safe",
    scenario: "git add . 后发现加多了，想把文件从暂存区拿回来。",
    scenarioEn: "Use after git add . when too many files were staged.",
    command: "git restore --staged .",
    note: "不会丢失工作区文件内容，只是取消 add。",
    noteEn: "Does not delete working-tree content. It only unstages files.",
    tags: ["git", "撤销", "staged", "restore"]
  },
  {
    id: "git-discard-file",
    title: "丢弃某个文件的工作区修改",
    titleEn: "Discard working-tree changes in one file",
    category: "undo",
    risk: "Check First",
    scenario: "某个文件改坏了，想恢复到最近一次提交的状态。",
    scenarioEn: "Use when one file is broken and should return to the last committed state.",
    command: "git restore <文件路径>",
    note: "这会丢掉该文件未提交的修改。执行前最好先 git diff <文件路径>。",
    noteEn: "This discards uncommitted changes in that file. Run git diff <path> first if unsure.",
    tags: ["git", "丢弃", "restore", "文件"]
  },
  {
    id: "git-revert-pushed",
    title: "安全撤销已经 push 的提交",
    titleEn: "Safely undo a pushed commit",
    category: "undo",
    risk: "Safe",
    scenario: "提交已经推到远程或被别人拉取，想撤销影响但保留公共历史。",
    scenarioEn: "Use when a commit is already pushed or pulled by others and public history should stay intact.",
    command: "git revert <commit-id>\ngit push",
    note: "revert 会生成一个新的反向提交，比 reset --hard 再强推更适合公共分支。",
    noteEn: "revert creates a new inverse commit and is safer than reset --hard plus force push on shared branches.",
    tags: ["git", "revert", "push", "安全"]
  },
  {
    id: "git-stash-context",
    title: "临时保存现场",
    titleEn: "Temporarily save current work",
    category: "stash",
    risk: "Safe",
    scenario: "做到一半需要切分支、拉代码、修紧急问题，但当前改动还不能提交。",
    scenarioEn: "Use when switching branches or handling urgent work while current changes are not ready to commit.",
    command: 'git stash push -m "做到一半"\ngit switch <其他分支>\n# 回来后\ngit switch <原分支>\ngit stash pop',
    note: "pop 会尝试恢复并删除 stash；不确定时先用 git stash apply。",
    noteEn: "pop restores and removes the stash. Use git stash apply first when unsure.",
    tags: ["git", "stash", "切分支", "现场"]
  },
  {
    id: "git-index-lock-windows",
    title: "Windows 下处理 Git 锁文件",
    titleEn: "Handle Git lock files on Windows",
    category: "danger",
    risk: "Check First",
    scenario: "Git 提示 index.lock 已存在，通常是上次 Git 进程异常退出或仍在运行。",
    scenarioEn: "Use when Git reports index.lock already exists, usually after an abnormal exit or a still-running Git process.",
    command: 'Get-Process | Where-Object { $_.ProcessName -like "*git*" }\nTest-Path .git\\index.lock\nRemove-Item -Force .git\\index.lock',
    note: "先确认没有 Git 进程正在执行，再删除锁文件。不要在 IDE/Git 操作进行中硬删。",
    noteEn: "Confirm no Git process is running before deleting the lock. Do not remove it while IDE or Git operations are active.",
    tags: ["git", "index.lock", "Windows", "修复"]
  },
  {
    id: "git-reset-hard-origin",
    title: "重置本地到远程 main",
    titleEn: "Reset local branch to remote main",
    category: "danger",
    risk: "Danger",
    scenario: "本地分支乱了，确定本地改动不要了，要完全回到远程 main。",
    scenarioEn: "Use only when the local branch is messy and local changes can be discarded completely.",
    command: "git fetch origin\ngit reset --hard origin/main\ngit clean -fd",
    note: "会丢弃本地提交、工作区修改和未跟踪文件。执行前必须确认没有要保留的内容。",
    noteEn: "This discards local commits, working-tree changes, and untracked files. Confirm nothing needs to be kept.",
    tags: ["git", "reset", "hard", "危险"]
  },
  {
    id: "git-cherry-pick",
    title: "只拿某个提交",
    titleEn: "Pick one specific commit",
    category: "remote",
    risk: "Check First",
    scenario: "只想把另一个分支上的某个提交拿到当前分支。",
    scenarioEn: "Use when only one commit from another branch should be applied to the current branch.",
    command: "git cherry-pick <commit-id>",
    note: "如果出现冲突，解决后 git cherry-pick --continue；放弃则 git cherry-pick --abort。",
    noteEn: "If conflicts occur, resolve them and run git cherry-pick --continue. Abort with git cherry-pick --abort.",
    tags: ["git", "cherry-pick", "分支", "提交"]
  }
];

const celestialCopy = {
  Sun: {
    cn: "太阳",
    desc: "太阳是太阳系中心，提供光与能量。这个模块里它代表整个工作站的核心入口。",
    descEn: "The Sun anchors the system. Here it represents the core entry of the workstation."
  },
  Mercury: {
    cn: "水星",
    desc: "水星离太阳最近、节奏最快，适合代表高频、轻量、随手就用的命令。",
    descEn: "Mercury is fast and close to the Sun, fitting quick commands used often."
  },
  Venus: {
    cn: "金星",
    desc: "金星明亮、稳定，适合承载配置、身份、模板这类基础设置。",
    descEn: "Venus feels bright and steady, fitting identity, config, and setup cards."
  },
  Earth: {
    cn: "地球",
    desc: "地球代表当前工作坐标，对应远程同步、项目环境和日常协作。",
    descEn: "Earth marks the current working coordinate: remotes, sync, and collaboration."
  },
  Mars: {
    cn: "火星",
    desc: "火星带有警示感，适合撤销、恢复、修复这些需要谨慎处理的操作。",
    descEn: "Mars carries a warning tone, fitting undo, recovery, and repair actions."
  },
  Jupiter: {
    cn: "木星",
    desc: "木星体量最大，可以代表大型工具、主项目和承载力最强的模块。",
    descEn: "Jupiter is the largest planet, fitting major tools and heavy modules."
  },
  Saturn: {
    cn: "土星",
    desc: "土星有清晰的环，适合归档、边界、规则和暂存现场。",
    descEn: "Saturn's rings fit boundaries, rules, archives, and stash context."
  },
  Uranus: {
    cn: "天王星",
    desc: "天王星冷静疏离，适合外部入口、链接地图和低频但重要的路径。",
    descEn: "Uranus feels quiet and distant, fitting external links and low-frequency paths."
  },
  Neptune: {
    cn: "海王星",
    desc: "海王星深远安静，适合高风险操作、长期项目和系统外层边界。",
    descEn: "Neptune feels deep and remote, fitting careful operations and outer boundaries."
  }
};

const elements = {
  toast: document.getElementById("toast"),
  pageEyebrow: document.getElementById("pageEyebrow"),
  pageTitle: document.getElementById("pageTitle"),
  starscape: document.querySelector(".starscape"),
  main: document.getElementById("mainScroll"),
  themeToggle: document.getElementById("themeToggle"),
  languageToggle: document.getElementById("languageToggle"),
  themeMeta: document.querySelector('meta[name="theme-color"]'),
  brandSub: document.querySelector(".brand p"),
  navItems: Array.from(document.querySelectorAll(".nav-item")),
  quickSearch: document.getElementById("quickSearch"),
  clearSearch: document.getElementById("clearSearch"),
  quickFilters: document.getElementById("quickFilters"),
  totalCount: document.getElementById("totalCount"),
  favoriteCount: document.getElementById("favoriteCount"),
  customCount: document.getElementById("customCount"),
  visibleCount: document.getElementById("visibleCount"),
  resultEyebrow: document.getElementById("resultEyebrow"),
  resultTitle: document.getElementById("resultTitle"),
  resultCount: document.getElementById("resultCount"),
  cardGrid: document.getElementById("cardGrid"),
  detailPanel: document.getElementById("detailPanel"),
  showFavorites: document.getElementById("showFavorites"),
  addCardButton: document.getElementById("addCardButton"),
  cardDialog: document.getElementById("cardDialog"),
  cardForm: document.getElementById("cardForm"),
  solarExpand: document.getElementById("solarExpand"),
  solarClose: document.getElementById("solarClose"),
  solarOverlay: document.getElementById("solarOverlay"),
  solarSystemLarge: document.getElementById("solarSystemLarge"),
  celestialInfo: document.getElementById("celestialInfo"),
  detailContent: document.getElementById("detailContent")
};

const state = {
  category: "all",
  search: "",
  favoritesOnly: false,
  selectedId: null,
  language: localStorage.getItem(storageKeys.language) === "en" ? "en" : "zh"
};

let favorites = new Set(readJson(storageKeys.favorites, []));
let customCards = readJson(storageKeys.customCards, []).filter(isValidCustomCard);
let recentCards = readJson(storageKeys.recentCards, []);
let cardFrequency = readJson(storageKeys.cardFrequency, {});

const systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
applyTheme(localStorage.getItem(storageKeys.theme) || systemTheme);
applyLanguage(state.language);
bindEvents();
render();

function bindEvents() {
  elements.navItems.forEach((button) => {
    button.addEventListener("click", () => {
      state.category = button.dataset.category || "all";
      state.favoritesOnly = false;
      syncCategoryUi();
      render();
      scrollMainTop();
    });
  });

  elements.quickSearch?.addEventListener("input", debounce((event) => {
    state.search = event.target.value.trim();
    render();
  }, 180));

  elements.clearSearch?.addEventListener("click", () => {
    state.search = "";
    elements.quickSearch.value = "";
    render();
  });

  elements.quickFilters?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    const nextCategory = button.dataset.filter || "all";
    state.category = state.category === nextCategory ? "all" : nextCategory;
    state.favoritesOnly = false;
    syncCategoryUi();
    render();
    scrollMainTop();
  });

  elements.showFavorites?.addEventListener("click", () => {
    state.favoritesOnly = !state.favoritesOnly;
    render();
    scrollMainTop();
  });

  elements.addCardButton?.addEventListener("click", () => {
    elements.cardDialog?.showModal();
    elements.cardForm?.elements.title?.focus();
  });

  elements.cardDialog?.addEventListener("close", () => {
    if (elements.cardDialog.returnValue !== "default") {
      elements.cardForm?.reset();
    }
  });

  elements.cardForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitter = event.submitter;
    if (submitter?.value === "cancel") {
      elements.cardDialog.close("cancel");
      return;
    }
    saveCustomCard(new FormData(elements.cardForm));
  });

  elements.themeToggle?.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("theme-light") ? "dark" : "light";
    applyTheme(nextTheme);
    localStorage.setItem(storageKeys.theme, nextTheme);
  });

  elements.languageToggle?.addEventListener("click", () => {
    state.language = state.language === "zh" ? "en" : "zh";
    localStorage.setItem(storageKeys.language, state.language);
    applyLanguage(state.language);
    render();
  });

  elements.cardGrid?.addEventListener("click", async (event) => {
    const copyLineButton = event.target.closest("[data-action='copy-line']");
    const copyButton = event.target.closest("[data-action='copy']");
    const favoriteButton = event.target.closest("[data-action='favorite']");
    const card = event.target.closest(".command-card");

    if (copyLineButton) {
      event.stopPropagation();
      const cardId = copyLineButton.closest(".command-card")?.dataset.id;
      const copied = await copyText(copyLineButton.dataset.command || "");
      if (copied && cardId) recordCardUsage(cardId);
      return;
    }

    if (copyButton) {
      event.stopPropagation();
      const cardId = copyButton.dataset.id;
      const copied = await copyText(copyButton.dataset.command || "");
      if (copied && cardId) recordCardUsage(cardId);
      return;
    }

    if (favoriteButton) {
      event.stopPropagation();
      toggleFavorite(favoriteButton.dataset.id || "");
      return;
    }

    if (card?.dataset.id) {
      state.selectedId = card.dataset.id;
      render();
    }
  });

  elements.detailPanel?.addEventListener("click", async (event) => {
    const copyButton = event.target.closest("[data-action='copy']");

    if (copyButton) {
      event.stopPropagation();
      const copied = await copyText(copyButton.dataset.command || "");
      if (copied && state.selectedId) recordCardUsage(state.selectedId);
    }
  });

  elements.cardGrid?.addEventListener("keydown", (event) => {
    const card = event.target.closest(".command-card");
    if (!card) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      state.selectedId = card.dataset.id || null;
      render();
    }
  });

  elements.solarExpand?.addEventListener("click", openSolarOverlay);
  elements.solarClose?.addEventListener("click", closeSolarOverlay);

  elements.solarOverlay?.addEventListener("click", (event) => {
    const clickedControl = event.target.closest("button");
    const clickedInfo = event.target.closest(".celestial-info");
    const clickedSolarSystem = event.target.closest("#solarSystemLarge");
    if (clickedControl || clickedInfo || clickedSolarSystem) return;
    clearCelestialSelection();
  });

  elements.solarSystemLarge?.addEventListener("click", (event) => {
    const target = findClosestCelestial(event, Array.from(elements.solarSystemLarge.querySelectorAll("[data-celestial-en]")));
    if (!target) {
      clearCelestialSelection();
      return;
    }
    selectCelestial(target);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("solar-open")) {
      closeSolarOverlay();
    }
  });

  window.addEventListener("mousemove", (event) => {
    if (!elements.starscape) return;
    const x = (event.clientX / window.innerWidth - 0.5) * 10;
    const y = (event.clientY / window.innerHeight - 0.5) * 8;
    elements.starscape.style.transform = `translate(${x * -0.35}px, ${y * -0.28}px) scale(1.025)`;
  });

  window.addEventListener("mouseleave", () => {
    if (elements.starscape) elements.starscape.style.transform = "translate(0, 0) scale(1)";
  });
}

function render() {
  const cards = getAllCards();
  const visibleCards = filterCards(cards);
  if (state.selectedId && !visibleCards.some((card) => card.id === state.selectedId)) {
    state.selectedId = visibleCards[0]?.id || null;
  }
  if (state.selectedId && !cards.some((card) => card.id === state.selectedId)) {
    state.selectedId = null;
  }
  if (!state.selectedId && visibleCards.length) {
    state.selectedId = visibleCards[0].id;
  }

  renderHeader(visibleCards.length, cards.length);
  renderCards(visibleCards);
  renderDetail(cards.find((card) => card.id === state.selectedId));
}

function renderHeader(visibleCount, totalCount) {
  const meta = categoryMeta[state.category] || categoryMeta.all;
  const t = getText();
  const modeLabel = state.favoritesOnly ? t.favorites : null;
  elements.pageEyebrow.textContent = modeLabel ? `${modeLabel} / Favorites` : meta.eyebrow;
  elements.pageTitle.textContent = modeLabel ? t.favoriteCards : localizeMeta(meta, "title");
  elements.resultEyebrow.textContent = modeLabel ? t.favoriteCards : t.resultEyebrow;
  elements.resultTitle.textContent = modeLabel ? t.favoritedCommands : state.category === "all" ? t.frequentGit : `${localizeMeta(meta, "label")}${state.language === "zh" ? "卡片" : " Cards"}`;
  elements.resultCount.textContent = `${visibleCount} ${t.cardsUnit}`;
  if (elements.totalCount) elements.totalCount.textContent = String(totalCount);
  if (elements.favoriteCount) elements.favoriteCount.textContent = String(favorites.size);
  if (elements.customCount) elements.customCount.textContent = String(customCards.length);
  if (elements.visibleCount) elements.visibleCount.textContent = String(visibleCount);
  elements.showFavorites?.classList.toggle("active", state.favoritesOnly);
  if (elements.showFavorites) elements.showFavorites.textContent = state.favoritesOnly ? t.exitFavorites : t.favorites;
  syncCategoryUi();
}

function renderCards(cards) {
  const t = getText();
  if (!cards.length) {
    elements.cardGrid.innerHTML = `
      <div class="empty-state">
        <strong>${escapeHtml(t.noMatchTitle)}</strong>
        <p>${escapeHtml(t.noMatchBody)}</p>
      </div>
    `;
    return;
  }

  elements.cardGrid.innerHTML = cards.map((card) => {
    const isFavorite = favorites.has(card.id);
    const categoryLabel = localizeMeta(categoryMeta[card.category], "label") || card.category;
    const commandLines = card.command.split("\n");
    const isMultiLine = commandLines.length > 1;
    const commandHtml = commandLines.map((line) =>
      `<div class="command-line"><span class="line-text">${escapeHtml(line)}</span><button class="copy-line-button" type="button" data-action="copy-line" data-command="${escapeAttr(line)}" title="${escapeAttr(t.copyLine)}">${escapeHtml(t.copy)}</button></div>`
    ).join("");
    const title = localizeCard(card, "title");
    const scenario = localizeCard(card, "scenario");
    const titleHtml = state.search ? highlightText(title, state.search) : escapeHtml(title);
    const noteHtml = state.search ? highlightText(scenario, state.search) : escapeHtml(scenario);
    return `
      <article class="command-card ${cardClassByCategory[card.category] || "mercury-card"} ${state.selectedId === card.id ? "selected" : ""}" data-id="${escapeAttr(card.id)}" tabindex="0">
        <header>
          <div class="card-head">
            <span class="card-type">${escapeHtml(categoryLabel)} / ${card.custom ? t.custom : t.git}</span>
            <h4>${titleHtml}</h4>
          </div>
        </header>
        <div class="card-body">
          <p class="card-note">${noteHtml}</p>
          <pre class="command-block">${commandHtml}</pre>
        </div>
        <footer class="card-meta">
          <div class="actions">
            <button class="copy-button favorite-button ${isFavorite ? "is-favorite" : ""}" type="button" data-action="favorite" data-id="${escapeAttr(card.id)}" aria-label="${escapeAttr(t.favoriteAction)} ${escapeAttr(title)}">${isFavorite ? "★" : "☆"}</button>
            <button class="copy-button" type="button" data-action="copy" data-command="${escapeAttr(card.command)}" data-id="${escapeAttr(card.id)}">${isMultiLine ? t.copyAll : t.copy}</button>
          </div>
        </footer>
      </article>
    `;
  }).join("");
}

function renderDetail(card) {
  const t = getText();
  if (!card) {
    const detailContent = elements.detailPanel?.querySelector(".detail-content");
    if (detailContent) {
      detailContent.innerHTML = `
        <h3>${escapeHtml(t.pickCardTitle)}</h3>
        <p>${escapeHtml(t.pickCardBody)}</p>
      `;
    }
    return;
  }

  const categoryLabel = localizeMeta(categoryMeta[card.category], "label") || card.category;
  const title = localizeCard(card, "title");
  const note = localizeCard(card, "note");
  const scenario = localizeCard(card, "scenario");

  const detailContent = elements.detailPanel?.querySelector(".detail-content");
  if (detailContent) {
    detailContent.innerHTML = `
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(note || scenario)}</p>
      <div class="detail-summary">
        <div><span>${escapeHtml(t.category)}</span><strong>${escapeHtml(categoryLabel)}</strong></div>
      </div>
      <div class="detail-note">
        <span>${escapeHtml(t.scenario)}</span>
        <strong>${escapeHtml(scenario)}</strong>
      </div>
      <button class="copy-button copy-all-button" type="button" data-action="copy" data-command="${escapeAttr(card.command)}">${escapeHtml(t.copyGroup)}</button>
    `;
  }
}

function getAllCards() {
  return [...seedCards, ...customCards];
}

function getText() {
  return uiText[state.language] || uiText.zh;
}

function localizeMeta(meta, key) {
  if (!meta) return "";
  if (state.language === "en") return meta[`${key}En`] || meta[key] || "";
  return meta[key] || "";
}

function localizeCard(card, key) {
  if (!card) return "";
  if (state.language === "en" && !card.custom) return card[`${key}En`] || card[key] || "";
  return card[key] || "";
}

function filterCards(cards) {
  const query = state.search.toLowerCase();
  const filtered = cards.filter((card) => {
    const matchesCategory = state.category === "all" || card.category === state.category;
    const matchesFavorite = !state.favoritesOnly || favorites.has(card.id);
    const haystack = [
      card.title,
      card.titleEn,
      card.category,
      card.scenario,
      card.scenarioEn,
      card.command,
      card.note,
      card.noteEn,
      card.tags.join(" ")
    ].join(" ").toLowerCase();
    const matchesSearch = !query || haystack.includes(query);
    return matchesCategory && matchesFavorite && matchesSearch;
  });

  if (query) {
    filtered.sort((a, b) => relevanceScore(b, query) - relevanceScore(a, query));
  }

  return filtered;
}

function relevanceScore(card, query) {
  const title = `${card.title || ""} ${card.titleEn || ""}`.toLowerCase();
  const command = card.command.toLowerCase();
  const tags = card.tags.join(" ").toLowerCase();
  const scenario = `${card.scenario || ""} ${card.scenarioEn || ""}`.toLowerCase();
  const note = `${card.note || ""} ${card.noteEn || ""}`.toLowerCase();
  let score = 0;
  if (title.includes(query)) score += 90;
  if (command.includes(query)) score += 80;
  if (tags.includes(query)) score += 30;
  if (scenario.includes(query)) score += 18;
  if (note.includes(query)) score += 6;
  return score;
}

function syncCategoryUi() {
  elements.navItems.forEach((button) => {
    button.classList.toggle("active", (button.dataset.category || "all") === state.category);
  });
  elements.quickFilters?.querySelectorAll("[data-filter]").forEach((button) => {
    button.classList.toggle("active", (button.dataset.filter || "") === state.category);
  });
}

function applyLanguage(language) {
  state.language = language === "en" ? "en" : "zh";
  const t = getText();
  document.documentElement.lang = t.htmlLang;

  if (elements.brandSub) elements.brandSub.textContent = t.brandSub;
  if (elements.languageToggle) {
    elements.languageToggle.setAttribute("aria-label", t.langLabel);
    elements.languageToggle.querySelector(".language-text").textContent = t.langButton;
    elements.languageToggle.querySelector(".language-icon").textContent = state.language === "zh" ? "文" : "A";
  }

  document.querySelector(".focus-copy .eyebrow").textContent = t.focusEyebrow;
  document.querySelector(".focus-copy h3").textContent = t.focusTitle;
  elements.quickSearch.placeholder = t.searchPlaceholder;
  elements.quickSearch.setAttribute("aria-label", t.searchAria);
  elements.clearSearch.textContent = t.clear;
  elements.addCardButton.textContent = t.newCard;

  elements.navItems.forEach((button) => {
    const meta = categoryMeta[button.dataset.category] || categoryMeta.all;
    button.querySelector("span").textContent = localizeMeta(meta, "label");
    button.querySelector("small").textContent = localizeMeta(meta, "sub");
  });

  elements.quickFilters?.querySelectorAll("[data-filter]").forEach((button) => {
    const meta = categoryMeta[button.dataset.filter] || categoryMeta.all;
    button.textContent = localizeMeta(meta, "label");
  });

  document.querySelector("#detailPanel .panel-head .eyebrow").textContent = t.selectedEyebrow;
  document.querySelector(".solar-panel .eyebrow").textContent = t.solarEyebrow;
  document.querySelector(".solar-panel h3").textContent = t.solarTitle;
  elements.solarExpand?.setAttribute("aria-label", t.solarFullLabel);
  elements.solarExpand?.setAttribute("title", t.solarFullTitle);
  document.querySelector(".solar-overlay-top .eyebrow").textContent = t.solarOverlayEyebrow;
  document.querySelector(".solar-overlay-top h2").textContent = t.solarOverlayTitle;
  elements.solarClose.textContent = t.close;
  elements.solarClose.setAttribute("aria-label", t.closeSolar);

  document.querySelector(".card-form .eyebrow").textContent = t.formCustomEyebrow;
  document.querySelector(".card-form .section-head h3").textContent = t.formCustomTitle;
  document.querySelector(".card-form button[value='cancel']").textContent = t.formClose;
  document.querySelector(".card-form .primary-button").textContent = t.saveCard;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (t[key]) node.textContent = t[key];
  });

  const form = elements.cardForm;
  form.elements.title.placeholder = t.titlePlaceholder;
  form.elements.scenario.placeholder = t.scenarioPlaceholder;
  form.elements.note.placeholder = t.notePlaceholder;
  form.elements.tags.placeholder = t.tagsPlaceholder;
  Array.from(form.elements.category.options).forEach((option) => {
    const meta = categoryMeta[option.value] || categoryMeta.daily;
    option.textContent = localizeMeta(meta, "label");
  });

  clearCelestialSelection();
  applyTheme(document.body.classList.contains("theme-light") ? "light" : "dark");
}

function saveCustomCard(formData) {
  const t = getText();
  const title = clean(formData.get("title"));
  const command = clean(formData.get("command"));
  if (!title || !command) {
    showToast(t.titleRequired);
    return;
  }

  const category = clean(formData.get("category")) || "daily";
  const tags = clean(formData.get("tags"))
    .split(/[,\uFF0C]/)
    .map((tag) => tag.trim())
    .filter(Boolean);

  const card = {
    id: `custom-${Date.now()}`,
    title,
    category: categoryMeta[category] ? category : "daily",
    risk: "Safe",
    scenario: clean(formData.get("scenario")) || t.customScenario,
    command,
    note: clean(formData.get("note")),
    tags: tags.length ? tags : ["custom"],
    custom: true
  };

  customCards = [card, ...customCards];
  writeJson(storageKeys.customCards, customCards);
  state.selectedId = card.id;
  state.category = card.category;
  state.favoritesOnly = false;
  elements.cardForm.reset();
  elements.cardDialog.close("saved");
  showToast(t.savedCard);
  render();
}

function toggleFavorite(id) {
  const t = getText();
  if (!id) return;
  if (favorites.has(id)) {
    favorites.delete(id);
    showToast(t.favoriteRemoved);
  } else {
    favorites.add(id);
    showToast(t.favoriteAdded);
  }
  writeJson(storageKeys.favorites, Array.from(favorites));
  render();
}

function recordCardUsage(id) {
  if (!id) return;
  cardFrequency[id] = (cardFrequency[id] || 0) + 1;
  writeJson(storageKeys.cardFrequency, cardFrequency);

  recentCards = recentCards.filter((cid) => cid !== id);
  recentCards.unshift(id);
  if (recentCards.length > 20) recentCards = recentCards.slice(0, 20);
  writeJson(storageKeys.recentCards, recentCards);
}

async function copyText(text) {
  const t = getText();
  try {
    await navigator.clipboard.writeText(text);
    showToast(t.copied);
    return true;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    textarea.remove();
    showToast(ok ? t.copied : t.copyUnavailable);
    return ok;
  }
}

function openSolarOverlay() {
  document.body.classList.add("solar-open");
  elements.solarOverlay?.setAttribute("aria-hidden", "false");
  clearCelestialSelection();
}

function closeSolarOverlay() {
  document.body.classList.remove("solar-open");
  elements.solarOverlay?.setAttribute("aria-hidden", "true");
  clearCelestialSelection();
}

function selectCelestial(target) {
  const t = getText();
  const en = target.dataset.celestialEn || "";
  const cn = target.dataset.celestialCn || celestialCopy[en]?.cn || en;
  const copy = celestialCopy[en] || {};
  const desc = state.language === "en"
    ? copy.descEn || copy.desc || "This body adds a stronger spatial identity to the workstation."
    : copy.desc || "这个星体用于增强工作站的空间识别感。";
  const title = state.language === "en" ? en : cn;
  const subtitle = state.language === "en" ? cn : en;

  elements.solarSystemLarge?.classList.add("is-paused");
  elements.solarSystemLarge?.querySelectorAll("[data-celestial-en]").forEach((body) => {
    body.classList.toggle("is-hovered", body === target);
  });

  elements.celestialInfo?.classList.add("is-active");
  elements.celestialInfo.innerHTML = `
    <p class="eyebrow">${escapeHtml(t.selectedBody)}</p>
    <h3>${escapeHtml(title)}</h3>
    <strong>${escapeHtml(subtitle)}</strong>
    <p>${escapeHtml(desc)}</p>
  `;
}

function clearCelestialSelection() {
  elements.solarSystemLarge?.classList.remove("is-paused");
  elements.solarSystemLarge?.querySelectorAll("[data-celestial-en]").forEach((body) => {
    body.classList.remove("is-hovered");
  });

  elements.celestialInfo?.classList.remove("is-active");
  if (elements.celestialInfo) {
    const t = getText();
    elements.celestialInfo.innerHTML = `
      <p class="eyebrow">${escapeHtml(t.selectedBody)}</p>
      <h3>${escapeHtml(t.clickPlanet)}</h3>
      <strong>${escapeHtml(t.clickBody)}</strong>
      <p>${escapeHtml(t.planetHint)}</p>
    `;
  }
}

function findClosestCelestial(event, celestialBodies) {
  let closest = null;
  let closestDistance = Infinity;

  celestialBodies.forEach((body) => {
    const rect = body.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);
    const hitRadius = Math.max(rect.width, rect.height) / 2 + 12;
    if (distance <= hitRadius && distance < closestDistance) {
      closest = body;
      closestDistance = distance;
    }
  });

  return closest;
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    elements.toast.classList.remove("show");
  }, 2500);
}

function applyTheme(theme) {
  const isLight = theme === "light";
  const t = getText();
  document.body.classList.toggle("theme-light", isLight);
  elements.themeToggle?.setAttribute("aria-pressed", String(isLight));
  elements.themeToggle?.setAttribute("aria-label", isLight ? t.themeToDark : t.themeToLight);
  const icon = elements.themeToggle?.querySelector(".theme-icon");
  const text = elements.themeToggle?.querySelector(".theme-text");
  if (icon) icon.textContent = isLight ? "☾" : "☀";
  if (text) text.textContent = isLight ? t.themeDark : t.themeLight;
  elements.themeMeta?.setAttribute("content", isLight ? "#e8f7ff" : "#10131f");
}

function clean(value) {
  return String(value || "").trim();
}

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    showToast(getText().storageFull);
  }
}

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function scrollMainTop() {
  if (elements.main) {
    elements.main.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function isValidCustomCard(card) {
  return Boolean(card && typeof card.id === "string" && typeof card.title === "string" && typeof card.command === "string");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("\n", "&#10;");
}

function highlightText(text, query) {
  if (!query) return escapeHtml(text);
  const escaped = escapeHtml(text);
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  return escaped.replace(regex, '<mark class="search-highlight">$1</mark>');
}
