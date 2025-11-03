import { Router } from "express";
import {
    createAdmin,
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    loginAdmin
} from "../controllers/adminController";
import { validateBody, validateParams } from "../middlewares/validation";
import {
  createAdminSchema,
  updateAdminSchema,
  idParamSchema,
  loginAdminSchema
} from "../schemas/adminSchema";

const router = Router();

router.post("/login", validateBody(loginAdminSchema), loginAdmin);
router.post("/", validateBody(createAdminSchema), createAdmin);
router.get("/", getAllAdmins);
router.get("/:id", validateParams(idParamSchema), getAdminById);
router.put("/:id", validateParams(idParamSchema), validateBody(updateAdminSchema), updateAdmin);
router.delete("/:id", validateParams(idParamSchema), deleteAdmin);

export default router;