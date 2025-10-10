import { z } from 'zod';

//Schema para criar uma roupa
export const createClothSchema = z.object({
    mark: z
    .string()
    .max(50, "Marca deve ter no maximo 50 caracteres!"),
    type: z
    .string()
    .max(50, "Tipo deve ter no maximo 50 caracteres!"),
    material: z
    .string()
    .max(100, "Material deve ter no maximo 50 caracteres!"),
    sex: z
    .string()
    .max(10, "Sexo deve ter no maximo 10 caracteres!"),
    style: z
    .string()
    .max(50, "Estilo deve ter no maximo 50 caracteres!")
    .optional(),
    description: z
    .string()
    .max(150, "Descrição deve ter no maximo 200 caracteres!")
    .optional()
})

//Schema para atualizar uma roupa
export const updateClothSchema = createClothSchema.partial();

//Schema para encontrar uma roupa pelo id
export const findClothById = z.object({
    id: z
    .coerce.number("Id deve ser um numero inteiro")
    .int()
})

//Schema de filtro
//--------------------------
export type ClotheFilterData = {
    mark?: string;
    type?: string;
    material?: string;
    sex?: string;
    style?: string;
};

//Schema para validação de ID's
export const idParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID deve ser um número válido")
    .transform(Number)
    .refine((num) => num > 0, "ID deve ser positivo"),
});

export const clotheFilterSchema: z.ZodType<ClotheFilterData> = z.object({
    mark: z.string().optional(),
    type: z.string().optional(),
    material: z.string().optional(),
    sex: z.string().optional(),
    style: z.string().optional(),
});
//--------------------------

//exportando os Schemas
export type CreateClotheData = z.infer<typeof createClothSchema>;
export type UpdateClotheData = z.infer<typeof updateClothSchema>;
export type IdParam = z.infer<typeof idParamSchema>;
export type FindClothByIdData = z.infer<typeof findClothById>;