import { z } from 'zod';

//Schema para criar um fornecedor
export const createSupplierSchema = z.object({
    name: z
    .string()
    .max(50, "Nome deve ter no maximo 50 caracteres!")
});

//Schema para atualizar um fornecedor
export const updateSupplierSchema = createSupplierSchema.partial();

//Schema para encontrar um fornecedor pelo Id
export const findSupplierById = z.object({
    id: z
    .coerce.number("Id deve ser um numero inteiro")
    .int()
});

//Schema para validação de ID's
export const idParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID deve ser um número válido")
    .transform(Number)
    .refine((num) => num > 0, "ID deve ser positivo"),
});

//exportando os Schemas
export type CreateSupplierData = z.infer<typeof createSupplierSchema>;
export type UpdateSupplierData = z.infer<typeof updateSupplierSchema>;
export type FindSupplierByIdData = z.infer<typeof findSupplierById>;
export type IdParam = z.infer<typeof idParamSchema>;