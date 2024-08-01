import { v2 as cloudinary } from 'cloudinary'
import env from '#start/env'

cloudinary.config({
  cloud_name: env.get('CLOUDINARY_CLOUD_NAME') || process.env.CLOUD_NAME,
  api_key: env.get('CLOUDINARY_API_KEY') || process.env.API_KEY,
  api_secret: env.get('CLOUDINARY_API_SECRET') || process.env.API_SECRET,
})
export default cloudinary
