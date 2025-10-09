import { Request, Response } from "express";
import * as adminService from '../services/adminService';
import bcrypt from 'bcryptjs'
import { prisma } from "../database/prisma"
import { loginAdminSchema, LoginAdminData } from '../schemas/adminSchema';

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

export const loginAdmin = async (req: Request, res: Response) => {
    try{
        const validation = loginAdminSchema.safeParse(req);
        if (!validation.success) 
        return res.status(400).json({ message: "Dados de login invalidos", errors: validation.error.issues});
        
        const { email, password } = validation.data as LoginAdminData //.body

        const admin = await prisma.admin.findUnique({ where: {email} });
        if (!admin) return res.status(401).json({message: "Email ou senha incorretos!"});

        const passwordMatch = await bcrypt.compare(password, admin.password);
        if(!passwordMatch) return res.status(401).json({message: "Email ou senha incorretos!"});

        return res.status(200).json({ 
            message: "Login realizado com sucesso!",
            admin: {
                id: admin.id,
                name: admin.name,
                email: admin.email,
            }
        });

    } catch(error: any) {
        console.error("Erro no login", error);
        return res.status(500).json({ message: error.message});
    }  
};