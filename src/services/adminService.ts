import { prisma } from '../database/prisma';
import { Admin } from '../generated/prisma';

type AdminCreateData = Omit<Admin, 'id' | 'createdAt' | 'updatedAt'>;
type AdminUpdateData = Partial<AdminCreateData>;

export const create = async (data: AdminCreateData): Promise<Admin> => {
    return prisma.admin.create({ data });
}

export const getAll = async (): Promise<Admin[]> =>{
    return prisma.admin.findMany();
}

export const getById = async (id: number) => {
    return prisma.admin.findUnique({ where: {id}});
}

export const update = async (id: number, data: AdminUpdateData): Promise<Admin> => {
    return prisma.admin.update({where: { id }, data });
}

export const remove = async (id: number): Promise<Admin> => {
    return prisma.admin.delete({where: { id } });
}
