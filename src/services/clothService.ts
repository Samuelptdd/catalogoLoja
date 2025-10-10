import { prisma } from "../database/prisma"
import { Clothe } from "../generated/prisma"
import { ClotheFilterData } from "../schemas/clothSchema";

type ClotheCreateData = Omit<Clothe, 'id' | 'createdAt' | 'updatedAt'>;
type ClotheUpdateData = Partial<ClotheCreateData>;

//Cria uma roupa
export const create = async (data: ClotheCreateData): Promise<Clothe> => {
    return prisma.clothe.create({ data });
}

//Mostrar todas as roupas
export const getAll = async (): Promise<Clothe[]> =>{
    return prisma.clothe.findMany();
}

//Encontrar uma roupa pelo id
export const getById = async (id: number) => {
    return prisma.clothe.findUnique({ where: {id}});
}

//atualizar uma roupa
export const update = async (id: number, data: ClotheUpdateData): Promise<Clothe> => {
    return prisma.clothe.update({where: { id }, data });
}

//deletar uma roupa
export const remove = async (id: number): Promise<Clothe> => {
    return prisma.clothe.delete({where: { id } });
}

//filtro de roupas
export const listClothes = async (filters: ClotheFilterData) => {
    const whereClause: any = {};
    for (const key in filters) {
        const value = filters[key as keyof ClotheFilterData];   
        if (value) { 
            whereClause[key] = {
                contains: value,
                mode: 'insensitive', 
            };
        }
    }
    return prisma.clothe.findMany({ 
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