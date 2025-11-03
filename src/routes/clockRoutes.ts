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

router.post("/", validateBody(createClockSchema), createClock);
router.get("/", getAllClocks);
router.get("/:id", validateParams(idParamSchema), getClockById);
router.get("/", validateQuery(clockFilterSchema), listClocks)
router.put("/:id", validateParams(idParamSchema), validateBody(updateClockSchema), updateClock);
router.delete("/:id", validateParams(idParamSchema), deleteClock);

export default router;