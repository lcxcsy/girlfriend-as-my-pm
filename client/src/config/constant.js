export const SUCCESS_CODE = '0'
export const TOKEN_NAME = 'great_life_token'
export const STORE_USER_INFO = 'great_life_user_info'

export const STATUS_OPTION = [
  { text: '全部', value: '1;2;3' },
  { text: '未审批', value: '1' },
  { text: '已审批', value: '2;3' }
]

export const APPROVAL_STATUS = {
  1: '未审批',
  2: '已拒绝',
  3: '审批完成'
}

export const MENU_PERMISSIONS = [
  {
    menuName: '出差申请',
    menuIcon: 'apply',
    router: '/trip-apply',
    permissions: [1, 2, 3]
  },
  {
    menuName: '考勤打卡',
    menuIcon: 'location',
    router: '/attendance',
    permissions: [1, 2, 3]
  },
  {
    menuName: '考勤记录',
    menuIcon: 'records',
    router: '/attendance-records',
    permissions: [1, 2, 3]
  },
  {
    menuName: '出差审批',
    menuIcon: 'approval',
    router: '/trip-approval',
    permissions: [2, 3]
  }, {
    menuName: '人员管理',
    menuIcon: 'user',
    router: '/person-manage',
    permissions: [2, 3]
  }
]

export const PLAN_BOOKS = [
  {
    planName: '山海关虎啸版',
    menuIcon: 'huxiao',
    router: 'https://wx.greatlife.cn/wx/pages/wx/proposals/shanhaiguanHX/index',
    permissions: [1, 2, 3]
  }, {
    planName: '吉康挚爱',
    menuIcon: 'zhiai',
    router: 'https://wx.greatlife.cn/wx/pages/wx/proposals/jikangzhiai/index',
    permissions: [1, 2, 3]
  }, {
    planName: '娘子关',
    menuIcon: 'niangzi',
    router: 'https://wx.greatlife.cn/wx/pages/wx/proposals/niangziguan/index',
    permissions: [1, 2, 3]
  }, {
    planName: '明爱金彩',
    menuIcon: 'jincai',
    router: 'https://wx.greatlife.cn/wx/pages/wx/proposals/mingAiJinCai/index',
    permissions: [1, 2, 3]
  }, {
    planName: '明爱传承',
    menuIcon: 'chuancheng',
    router: 'https://wx.greatlife.cn/wx/pages/wx/proposals/mingAiChuanCheng/index',
    permissions: [1, 2, 3]
  }, {
    planName: '八达岭B款',
    menuIcon: 'badaling-b',
    router: 'https://wx.greatlife.cn/wx/pages/wx/proposals/badaling/index',
    permissions: [1, 2, 3]
  }, {
    planName: '明城永随',
    menuIcon: 'yongsui',
    router: 'https://wx.greatlife.cn/wx/pages/wx/proposals/mingChengYongSui/index',
    permissions: [1, 2, 3]
  }, {
    planName: '童城传世',
    menuIcon: 'tongcheng',
    router: 'https://wx.greatlife.cn/wx/pages/wx/proposals/tongcheng/index',
    permissions: [1, 2, 3]
  },
]


export const BUSINESS_DATA = 'http://workwx.greatlife.cn/workwechat/performanceNews.do?action=agencyRT&date=null&code=WxpW5w9543aYMB-bPdAQEVPxfuiHxwMTTt7WEylbMDw&state=STATE'
// 日常工作
export const DAILY_WORKS = [
  {
    workName: '业务数据',
    menuIcon: 'data',
    router: 'http://workwx.greatlife.cn/workwechat/performanceNews.do?action=agencyRT&date=null&code=WxpW5w9543aYMB-bPdAQEVPxfuiHxwMTTt7WEylbMDw&state=STATE',
    permissions: [1, 2, 3]
  },
  // 
  {
    workName: '常用文档',
    menuIcon: 'docs',
    router: '/activated-files',
    routerMode: true,
    permissions: [1, 2, 3]
  }, {
    workName: '投保小管家',
    menuIcon: 'help',
    router: 'https://online2.greatlife.cn/robot/assessment?session_id=5031510971490564878GJ&empNo=6179000015&sourceFlag=GWOL&isShare=true&evning=1',
    permissions: [1, 2, 3]
  }
]

// 常用文档
export const ACTIVATED_DOCS = [
  {
    docsName: '投保规则2021',
    menuIcon: '',
    router: 'https://docs.qq.com/pdf/DV2d2UnppQU9TUmZU',
    permissions: [1, 2, 3]
  }, {
    docsName: '扣款银行',
    menuIcon: '',
    router: 'https://docs.qq.com/document/DV0JKeVRrY2dMTGdP',
    permissions: [1, 2, 3]
  }, {
    docsName: '个性化保单',
    menuIcon: '',
    router: 'https://docs.qq.com/document/DV2FEd0pXSkNzQWxu',
    permissions: [1, 2, 3]
  }, {
    docsName: '保全规则',
    menuIcon: '',
    router: 'https://docs.qq.com/pdf/DV21hSGVmWElzZE9m',
    permissions: [1, 2, 3]
  }
]

