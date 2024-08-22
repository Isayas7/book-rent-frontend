import { z } from "zod";
import { createBookSchema, LoginSchema, registerSchema, updateBookSchema } from "./schema";

export type RegisterFormTypes = z.infer<typeof registerSchema>
export type LoginFormTypes = z.infer<typeof LoginSchema>
export type CreateBookFormTypes = z.infer<typeof createBookSchema>
export type UpdateBookFormTypes = z.infer<typeof updateBookSchema>





