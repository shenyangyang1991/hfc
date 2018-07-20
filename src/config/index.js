import EnvConfig from './env.config'
import ImageConfig from './image.config'
import ApiConfig from './api.config'

import { disposeSrc, disposeUrl } from '@/utils/config-tools'

const env = 'prod' // 'dev' or 'prod'
const image = disposeSrc(ImageConfig, EnvConfig[env].image)
const api = disposeUrl(ApiConfig, EnvConfig[env].api)
export default {
  env,
  image,
  api
}
