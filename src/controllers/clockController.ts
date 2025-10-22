import { Request, Response } from "express";
import * as clockService from '../services/clockService';
import { ClockFilterData } from "../schemas/clockSchema";

//Controller para criar um relogio
export const createClock = async (req: Request, res: Response) => {
    try{
        const clock = await clockService.create(req.body);
        return res.status(201).json(clock);
    } catch (error: any) {
        if(error.code == 'P2002') return res.status(409).json({ message: `Campo unico ja existe ${error.meta.target}`});
        return res.status(500).json({ message: error.message });
    }
}; 

//Controller para encontrar todos os relogios
export const getAllClocks = async (req: Request, res: Response) => {
    try{
        const clock = await clockService.getAll();
        return res.json(clock);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

//Controller para encontrar relogio pelo Id
export const getClockById = async (req: Request, res: Response) => {
    try{
        const clock = await clockService.getById(Number(req.params.id));
        if(!clock) return res.status(404).json({ message: 'Relogio não encontrado'});
        return res.json(clock);
    }catch(error: any){
        return res.status(500).json({ message: error.message });
    }
};

//Controller para atualizar um relogio
export const updateClock = async (req: Request, res: Response) => {
    try{
        const clock = await clockService.update(Number(req.params.id), req.body);
        return res.json(clock);
    } catch (error: any) {
        if (error.code === 'P2025') return res.status(404).json({ message: 'Relogio não encontrado.' });
        if (error.code === 'P2002') return res.status(409).json({ message: `Campo único já existe: ${error.meta.target}` });
        return res.status(500).json({ message: error.message});
    }
};

//Controller para deletar um relogio
export const deleteClock = async (req: Request, res: Response) => {
    try{
        await clockService.remove(Number(req.params.id));
        return res.status(204).send();
    }catch (error: any) {
        if (error.code === 'P2025') return res.status(404).json({ message: 'Relogio não encontrado.' });
        return res.status(500).json({ message: error.message});
    }
};

//Controller de listagem de relogios
export const listClocks = async (req: Request, res: Response) => {
    try{
        const filters = req.query as ClockFilterData;
        const clocks = await clockService.listClocks(filters);

        return res.status(200).json(clocks);
    } catch(error: any){
        return res.status(500).json({message: error.message});
    }
};