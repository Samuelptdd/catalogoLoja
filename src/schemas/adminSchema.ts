import { z } from 'zod';

//Schema para Admin
export const createAdminSchema = z.object({
    name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres!')
    .max(100, 'nome deve ter no maximo 100 caracteres!'),
    email: z
    .string()
    .email({message: 'Email deve ter um formato válido!'})
    .max(100, 'Email deve ter no maximo 100 caracteres'),
    password: z
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres!')
    .max(50, 'Senha deve ter no maximo 50 caracteres'),
});

export const updateAdminSchema = createAdminSchema.partial();

//Schema para validação de ID's
export const idParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID deve ser um número válido")
    .transform(Number)
    .refine((num) => num > 0, "ID deve ser positivo"),
});

export type CreateAdminData = z.infer<typeof createAdminSchema>;
export type updateAdminData = z.infer<typeof updateAdminSchema>;
export type IdParam = z.infer<typeof idParamSchema>;