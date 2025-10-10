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

router.post("./api/clothes", validateBody(createClothSchema), createCloth);
router.get("./api/clothes", getAllClothes);
router.get("./api/clothes/:id", validateParams(idParamSchema), getClothById);
router.get("./api/clothes/", validateQuery(clotheFilterSchema), listClothes)
router.put("./api/Clothes/:id", validateParams(idParamSchema), validateBody(updateClothSchema), updateCloth);
router.delete("./api/clothes/:id", validateParams(idParamSchema), deleteCloth);

export default router;