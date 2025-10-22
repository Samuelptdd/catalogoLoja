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

router.post("./api/suppliers", validateBody(createSupplierSchema), createSupplier);
router.get("./api/suppliers", getAllSuppliers);
router.get("./api/suppliers/:id", validateParams(idParamSchema), getSupplierById);
router.put("./api/supplierss/:id", validateParams(idParamSchema), validateBody(updateSupplierSchema), updateSupplier);
router.delete("./api/suppliers/:id", validateParams(idParamSchema), deleteSupplier);

export default router;