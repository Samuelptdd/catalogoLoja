import { z } from 'zod';

//Schema para criar um relogio
export const createClockSchema = z.object({
    mark: z
    .string()
    .max(50, "Marca deve ter no maximo 50 caracteres!"),
    type: z
    .string()
    .max(50, "Tipo deve ter no maximo 50 caracteres!"),
    sex: z
    .string()
    .max(10, "Sexo deve ter no maximo 10 caracteres!"),
    description: z
    .string()
    .max(150, "Descrição deve ter no maximo 200 caracteres!")
    .optional()

});

//Schema para atualizar um relogio
export const updateClockSchema = createClockSchema.partial();

//Schema para encontrar um relogio pelo Id
export const findClockById = z.object({
    id: z
    .coerce.number("Id deve ser um numero")
    .int()
});

//Schema de filtro
//--------------------------
export type ClockFilterData = {
    mark?: string;
    type?: string;
    sex?: string;
};

//Schema para validação de ID's
export const idParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID deve ser um número válido")
    .transform(Number)
    .refine((num) => num > 0, "ID deve ser positivo"),
});

export const clockFilterSchema: z.ZodType<ClockFilterData> = z.object({
    mark: z.string().optional(),
    type: z.string().optional(),
    sex: z.string().optional(),
});
//--------------------------

//exportando os Schemas
export type CreateClockData = z.infer<typeof createClockSchema>;
export type UpdateClockData = z.infer<typeof updateClockSchema>;
export type IdParam = z.infer<typeof idParamSchema>;
export type FindClockByIdData = z.infer<typeof findClockById>;