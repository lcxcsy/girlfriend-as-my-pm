import usersRouter from '../routes/users'
import recordRouter from '../routes/tripRecords'
import attendRecordRouter from '../routes/attendRecords'
import { PUBLIC_PREFIX } from '../config/constant'

export default [
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
