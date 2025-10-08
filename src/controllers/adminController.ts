import { Request, Response } from "express";
import * as adminService from '../services/adminService';

export const createAdmin = async (req: Request, res: Response) => {
    try{
        const admin = await adminService.create(req.body);
        return res.status(201).json(admin);
    } catch (error: any) {
        if(error.code == 'P2002') return res.status(409).json({ message: `Campo unico ja existe ${error.meta.target}`});
        return res.status(500).json({ message: error.message });
    }
};

export const getAllAdmins = async (req: Request, res: Response) => {
    try{
        const admin = await adminService.getAll();
        return res.json(admin);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAdminById = async (req: Request, res: Response) => {
    try{
        const admin = await adminService.getById(Number(req.params.id));
        if(!admin) return res.status(404).json({ message: 'Admin(a) não encontrado(a)'});
        return res.json(admin);
    }catch(error: any){
        return res.status(500).json({ message: error.message});
    }
};

export const updateAdmin = async (req: Request, res: Response) => {
    try{
        const admin = await adminService.update(Number(req.params.id), req.body);
        return res.json(admin);
    } catch (error: any) {
        if (error.code === 'P2025') return res.status(404).json({ message: 'Admin(a) não encontrado(a).' });
        if (error.code === 'P2002') return res.status(409).json({ message: `Campo único já existe: ${error.meta.target}` });
        return res.status(500).json({ message: error.message});
    }
};

export const deleteAdmin = async (req: Request, res: Response) => {
    try{
        await adminService.remove(Number(req.params.id));
        return res.status(204).send();
    }catch (error: any) {
        if (error.code === 'P2025') return res.status(404).json({ message: 'Admin(a) não encontrado(a).' });
        return res.status(500).json({ message: error.message});
    }
};