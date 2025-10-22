import { Request, Response } from "express";
import * as supplierService from '../services/supplierService';

//Controller para criar um fornecedor
export const createSupplier = async (req: Request, res: Response) => {
    try{
        const supplier = await supplierService.create(req.body);
        return res.status(201).json(supplier);
    } catch (error: any) {
        if(error.code == 'P2002') return res.status(409).json({ message: `Campo unico ja existe ${error.meta.target}`});
        return res.status(500).json({ message: error.message });
    }
}; 

//Controller para encontrar todas os fornecedores
export const getAllSuppliers = async (req: Request, res: Response) => {
    try{
        const supplier = await supplierService.getAll();
        return res.json(supplier);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

//Controller para encontrar um fornecedor pelo Id
export const getSupplierById = async (req: Request, res: Response) => {
    try{
        const supplier = await supplierService.getById(Number(req.params.id));
        if(!supplier) return res.status(404).json({ message: 'Fornecedor não encontrado'});
        return res.json(supplier);
    }catch(error: any){
        return res.status(500).json({ message: error.message });
    }
};

//Controller para atualizar um fornecedor
export const updateSupplier = async (req: Request, res: Response) => {
    try{
        const supplier = await supplierService.update(Number(req.params.id), req.body);
        return res.json(supplier);
    } catch (error: any) {
        if (error.code === 'P2025') return res.status(404).json({ message: 'Fornecedor não encontrado.' });
        if (error.code === 'P2002') return res.status(409).json({ message: `Campo único já existe: ${error.meta.target}` });
        return res.status(500).json({ message: error.message});
    }
};

//Controller para deletar uma roupa
export const deleteSupplier = async (req: Request, res: Response) => {
    try{
        await supplierService.remove(Number(req.params.id));
        return res.status(204).send();
    }catch (error: any) {
        if (error.code === 'P2025') return res.status(404).json({ message: 'Fornecedor não encontrado.' });
        return res.status(500).json({ message: error.message});
    }
};