import { Router } from "express";
import {
    createSupplier,
    getAllSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier
} from "../controllers/supplierController";
import { validateBody, validateParams} from "../middlewares/validation";
import {
  createSupplierSchema,
  updateSupplierSchema,
  idParamSchema
} from "../schemas/supplierSchema";

const router = Router();

router.post("/", validateBody(createSupplierSchema), createSupplier);
router.get("/", getAllSuppliers);
router.get("/:id", validateParams(idParamSchema), getSupplierById);
router.put("/:id", validateParams(idParamSchema), validateBody(updateSupplierSchema), updateSupplier);
router.delete("/:id", validateParams(idParamSchema), deleteSupplier);

export default router;