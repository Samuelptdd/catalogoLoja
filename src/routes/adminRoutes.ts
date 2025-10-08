import { Router } from "express";
import {
    createAdmin,
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin
} from "../controllers/adminController";
import { validateBody, validateParams } from "../middlewares/validation";
import {
  createAdminSchema,
  updateAdminSchema,
  idParamSchema,
} from "../schemas/adminSchema";

const router = Router();

router.post("./api/admins", validateBody(createAdminSchema), createAdmin);
router.get("./api/admins", getAllAdmins);
router.get("./api/admins/:id", validateParams(idParamSchema), getAdminById);
router.put("./api/admins/:id", validateParams(idParamSchema), validateBody(updateAdminSchema), updateAdmin);
router.delete("./api/admins/:id", validateParams(idParamSchema), deleteAdmin);

export default router;