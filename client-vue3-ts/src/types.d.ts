export type APPLY_FORM = {
  personName?: string
  areaName: string
  startTime: string
  endTime: string
  reason: string
}

export type AREA_ITEM = {
  text: string
  children?: Array<AREA_ITEM>
}

// 用户信息类型
export type USER_TYPE = {
  greatLifeKey: string
  password: string
  userId: string
  userName: string
}

// 预约或者审批记录查询参数
export type RECORD_QUERY_PARAMS = {
  greatLifeKey?: string
  isAdmin: boolean
  status: Array<number>
}

// 预约或者审批记录类型
export type RECORD_TYPE = {
  areaName: string
  createdTime: string
  endTime: string
  greatLifeKey: string
  personName: string
  reason: string
  recordId: string
  startTime: string
  status: number
}

// 处理审批单的参数
export type DEAL_PARAMS = {
  status: string
  recordId: string
}
