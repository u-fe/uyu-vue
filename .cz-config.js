module.exports = {
  types: [
    {
      value: 'feat',
      name: '✨  feat:      新增一个功能(:sparkles:)',
    },
    {
      value: 'fix',
      name: '🐛  fix:       修复一个Bug(:bug:)',
    },
    {
      value: 'docs',
      name: '📝  docs:      文档变更(:memo:)',
    },
    {
      value: 'refactor',
      name: '♻️   refactor:  代码重构(:recycle:)',
    },
    {
      value: 'perf',
      name: '⚡️  perf:      改善性能(:zap:)',
    },
    {
      value: 'test',
      name: '✅  test:      测试(:white_check_mark:)',
    },
    {
      value: 'revert',
      name: '⏪  revert:    代码回退(:rewind:)',
    },
    {
      value: 'WIP',
      name: '🚧  WIP:       开发中(:construction:)',
    },
  ],

  scopes: [{ name: 'global' }, { name: 'cli' }],

  messages: {
    type: '选择提交类型:',
    scope: '选择修改涉及范围 (可选):',
    customScope: '请输入本次改动的范围（如：功能、模块等）:',
    subject: '简要说明（100字内）: \n',
    body: '详细说明，使用"|"换行(可选)：\n',
    breaking: '非兼容性说明 (可选):\n',
    footer: '关联关闭的issue，例如：#31, #34(可选):\n',
    confirmCommit: '确定提交说明?',
  },

  allowCustomScopes: true,

  allowBreakingChanges: ['feat', 'fix'],
}
