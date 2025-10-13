import { z } from 'zod'

const searchUserFormSchema = z.object({
  username: z.string()
    .min(3, { message: 'Username must be at least 3 characters' }),
})

export { searchUserFormSchema }