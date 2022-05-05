export default [
  {
    path: '/',
    redirect: '/login'
  }, {
    path: '/error/:type',
    name: 'Error',
    component: 'Error', // 注意提供ErrorPage组件内的多语言翻译
  }, {
    name: 'LoginPage',
    path: '/login',
    component: 'login/index',
    meta: {
      requireAuth: false
    }
  }, {
    name: 'ChangePsd',
    path: '/change-psd',
    component: 'login/changePsd',
    meta: {
      requireAuth: true
    }
  }, {
    name: 'HomePage',
    path: '/home',
    component: 'home/index',
    meta: {
      requireAuth: true
    }
  }, {
    name: 'BusinessTripApply',
    path: '/trip-apply',
    component: 'businessTrip/apply',
    meta: {
      requireAuth: true
    }
  }, {
    name: 'BusinessTripApproval',
    path: '/trip-approval',
    component: 'businessTrip/approval',
    meta: {
      requireAuth: true
    }
  }, {
    name: 'Attendance',
    path: '/attendance',
    component: 'attendance/index',
    meta: {
      requireAuth: true
    }
  }, {
    name: 'AttendanceRecords',
    path: '/attendance-records',
    component: 'attendance/records',
    meta: {
      requireAuth: true
    }
  }, {
    name: 'PersonManage',
    path: '/person-manage',
    component: 'personManage/index',
    meta: {
      requireAuth: true
    }
  }, {
    name: 'ActivatedFiles',
    path: '/activated-files',
    component: 'home/activatedFiles',
    meta: {
      requireAuth: true
    }
  }
]
