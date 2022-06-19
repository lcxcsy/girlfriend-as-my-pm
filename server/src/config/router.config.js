import usersRouter from '../routes/users'
import commonRouter from '../routes/common'
import recordRouter from '../routes/bushinessTrip'
import attendRecordRouter from '../routes/attendance'
import { PUBLIC_PREFIX } from '../config/constant'

export default [
  // 通用接口
  {
    prefix: PUBLIC_PREFIX + '/common',
    router: commonRouter
  },
  {
    prefix: PUBLIC_PREFIX + '/users',
    router: usersRouter
  }, {
    prefix: PUBLIC_PREFIX + '/trip/records',
    router: recordRouter
  }, {
    prefix: PUBLIC_PREFIX + '/attend',
    router: attendRecordRouter
  }
]
