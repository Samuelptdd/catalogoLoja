import { prisma } from "../database/prisma"
import { Supplier } from "../generated/prisma"

type SupplierCreateData = Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>;
type SupplierUpdateData = Partial<SupplierCreateData>;

//Cria um fornecedor
export const create = async (data: SupplierCreateData): Promise<Supplier> => {
    return prisma.supplier.create({ data });
}

//Mostrar todos os fornecedores
export const getAll = async (): Promise<Supplier[]> =>{
    return prisma.supplier.findMany();
}

//Encontrar um fornecedor pelo Id
export const getById = async (id: number) => {
    return prisma.supplier.findUnique({ where: {id}});
}

//atualizar um fornecedor
export const update = async (id: number, data: SupplierUpdateData): Promise<Supplier> => {
    return prisma.supplier.update({where: { id }, data });
}

//deletar um fornecedor
export const remove = async (id: number): Promise<Supplier> => {
    return prisma.supplier.delete({where: { id } });
}