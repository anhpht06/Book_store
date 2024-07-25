import vine from '@vinejs/vine'

export const createUserValidators = vine.compile(
  vine.object({
    role: vine.string().trim(),
    email: vine.string().email().trim(),
    password: vine.string().trim(),
  })
)
