export const SIGN_KEY = 'express_jwt_key' // 签名的秘钥
export const APP_CONTENT = 'great-life'
export const PUBLIC_PREFIX = '/great-life/api'

export const JWT_WHITE_LIST = [
  `/${APP_CONTENT}/`,
  `/${APP_CONTENT}/home`,
  `/${APP_CONTENT}/login`,
  `/${APP_CONTENT}/activated-files`,
  `/${APP_CONTENT}/favicon.ico`,
  `/${APP_CONTENT}/api/users/login`,
  `/${APP_CONTENT}/api/trip/records/export`,
  { url: /^\/great-life\/attend_images\/.*/, methods: ['GET'] },
  { url: /^\/great-life\/static\/.*/, methods: ['GET'] }
]