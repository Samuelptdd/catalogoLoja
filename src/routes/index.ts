import { Router } from 'express';
import adminRoutes from "./adminRoutes";
import clothRoutes from "./clothRoutes";
import clockRoutes from "./clockRoutes";
import supplierRoutes from "./supplierRoutes";

const routes = Router();

routes.use('/admins', adminRoutes);
routes.use('/cloths', clothRoutes);
routes.use('/clocks', clockRoutes);
routes.use('/supplier', supplierRoutes);

export default routes;