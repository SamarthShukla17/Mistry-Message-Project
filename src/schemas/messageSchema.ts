import { z } from 'zod'


export const messagesSchema = z.object ({
    content: z
    .string()
    .min(10, 'Content must be atleast 10 characters')
    .max(300, 'Content must be at max 300 characters')
})