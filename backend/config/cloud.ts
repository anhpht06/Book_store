import { v2 as cloudinary } from 'cloudinary'
import env from '#start/env'

cloudinary.config({
  cloud_name: env.get('CLOUD_NAME'),
  api_key: env.get('API_KEY'),
  api_secret: env.get('API_SECRET'),
})
export default cloudinary
