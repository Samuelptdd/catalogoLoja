import { prisma } from "../database/prisma"
import { Clock } from "../generated/prisma"
import { ClockFilterData } from "../schemas/clockSchema"

type ClockCreateData = Omit<Clock, 'id' | 'createdAt' | 'updatedAt'>;
type ClockUpdateData = Partial<ClockCreateData>;

//Cria um relogio
export const create = async (data: ClockCreateData): Promise<Clock> => {
    return prisma.clock.create({ data });
}

//Mostrar todos os relogios
export const getAll = async (): Promise<Clock[]> =>{
    return prisma.clock.findMany();
}

//Encontrar um reologio pelo Id
export const getById = async (id: number) => {
    return prisma.clock.findUnique({ where: {id}});
}

//atualizar um relogio
export const update = async (id: number, data: ClockUpdateData): Promise<Clock> => {
    return prisma.clock.update({where: { id }, data });
}

//deletar um relogio
export const remove = async (id: number): Promise<Clock> => {
    return prisma.clock.delete({where: { id } });
}

//filtro de relogios
export const listClocks = async (filters: ClockFilterData) => {
    const whereClause: any = {};
    for (const key in filters) {
        const value = filters[key as keyof ClockFilterData];   
        if (value) { 
            whereClause[key] = {
                contains: value,
                mode: 'insensitive', 
            };
        }
    }
    return prisma.clock.findMany({ 
        where: whereClause,
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            suppliers: {
                include: {
                    supplier: true, 
                }
            }
        }
    });
};