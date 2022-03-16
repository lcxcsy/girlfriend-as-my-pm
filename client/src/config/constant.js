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
    menuIcon: 'icon-apply',
    router: '/trip-apply',
    permissions: [1, 2, 3]
  },
  {
    menuName: '考勤打卡',
    menuIcon: 'icon-location',
    router: '/attendance',
    permissions: [1, 2, 3]
  },
  {
    menuName: '考勤记录',
    menuIcon: 'icon-records',
    router: '/attendance-records',
    permissions: [1, 2, 3]
  },
  {
    menuName: '出差审批',
    menuIcon: 'icon-approval',
    router: '/trip-approval',
    permissions: [2, 3]
  }, {
    menuName: '人员管理',
    menuIcon: 'icon-user',
    router: '/person-manage',
    permissions: [2, 3]
  }
]

export const PLAN_BOOKS = [
  {
    planName: '吉康挚爱',
    menuIcon: '',
    router: 'https://wx.greatlife.cn/wx/pages/wx/proposals/jikangzhiai/index',
    permissions: [1, 2, 3]
  }, {
    planName: '山海关',
    menuIcon: '',
    router: 'https://wx.greatlife.cn/wx/pages/wx/proposals/shanhaiguan/shanhaiguan',
    permissions: [1, 2, 3]
  }, {
    planName: '金彩一生',
    menuIcon: '',
    router: 'http://wx.greatlife.cn/eservice/static/goldlife/html/index.html',
    permissions: [1, 2, 3]
  }
]