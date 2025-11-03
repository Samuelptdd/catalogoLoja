import { Router } from "express";
import {
    createCloth,
    getAllClothes,
    getClothById,
    updateCloth,
    deleteCloth,
    listClothes
} from "../controllers/clothController";
import { validateBody, validateParams, validateQuery } from "../middlewares/validation";
import {
  createClothSchema,
  updateClothSchema,
  idParamSchema,
  clotheFilterSchema
} from "../schemas/clothSchema";


const router = Router();

router.post("/", validateBody(createClothSchema), createCloth);
router.get("/", getAllClothes);
router.get("/:id", validateParams(idParamSchema), getClothById);
router.get("/", validateQuery(clotheFilterSchema), listClothes)
router.put("/:id", validateParams(idParamSchema), validateBody(updateClothSchema), updateCloth);
router.delete("/:id", validateParams(idParamSchema), deleteCloth);

export default router;