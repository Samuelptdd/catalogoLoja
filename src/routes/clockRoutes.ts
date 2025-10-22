import { Router } from "express";
import {
    createClock,
    getAllClocks,
    getClockById,
    updateClock,
    deleteClock,
    listClocks
} from "../controllers/clockController";
import { validateBody, validateParams, validateQuery } from "../middlewares/validation";
import {
  createClockSchema,
  updateClockSchema,
  idParamSchema,
  clockFilterSchema
} from "../schemas/clockSchema";

const router = Router();

router.post("./api/clocks", validateBody(createClockSchema), createClock);
router.get("./api/clothes", getAllClocks);
router.get("./api/clothes/:id", validateParams(idParamSchema), getClockById);
router.get("./api/clothes/", validateQuery(clockFilterSchema), listClocks)
router.put("./api/Clothes/:id", validateParams(idParamSchema), validateBody(updateClockSchema), updateClock);
router.delete("./api/clothes/:id", validateParams(idParamSchema), deleteClock);

export default router;