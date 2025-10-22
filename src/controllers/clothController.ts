import { Request, Response } from "express";
import * as clothService from '../services/clothService';
import { ClotheFilterData } from "../schemas/clothSchema";

//Controller para criar uma roupa
export const createCloth = async (req: Request, res: Response) => {
    try{
        const cloth = await clothService.create(req.body);
        return res.status(201).json(cloth);
    } catch (error: any) {
        if(error.code == 'P2002') return res.status(409).json({ message: `Campo unico ja existe ${error.meta.target}`});
        return res.status(500).json({ message: error.message });
    }
}; 

//Controller para encontrar todas as roupas
export const getAllClothes = async (req: Request, res: Response) => {
    try{
        const cloth = await clothService.getAll();
        return res.json(cloth);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

//Controller para encontrar uma roupa pelo Id
export const getClothById = async (req: Request, res: Response) => {
    try{
        const cloth = await clothService.getById(Number(req.params.id));
        if(!cloth) return res.status(404).json({ message: 'Roupa não encontrado'});
        return res.json(cloth);
    }catch(error: any){
        return res.status(500).json({ message: error.message });
    }
};

//Controller para atualizar uma roupa
export const updateCloth = async (req: Request, res: Response) => {
    try{
        const cloth = await clothService.update(Number(req.params.id), req.body);
        return res.json(cloth);
    } catch (error: any) {
        if (error.code === 'P2025') return res.status(404).json({ message: 'Roupa não encontrada.' });
        if (error.code === 'P2002') return res.status(409).json({ message: `Campo único já existe: ${error.meta.target}` });
        return res.status(500).json({ message: error.message});
    }
};

//Controller para deletar uma roupa
export const deleteCloth = async (req: Request, res: Response) => {
    try{
        await clothService.remove(Number(req.params.id));
        return res.status(204).send();
    }catch (error: any) {
        if (error.code === 'P2025') return res.status(404).json({ message: 'Roupa não encontrada.' });
        return res.status(500).json({ message: error.message});
    }
};

//Controller de listagem de roupas
export const listClothes = async (req: Request, res: Response) => {
    try{
        const filters = req.query as ClotheFilterData;
        const clothes = await clothService.listClothes(filters);

        return res.status(200).json(clothes);
    } catch(error: any){
        return res.status(500).json({message: error.message});
    }
};