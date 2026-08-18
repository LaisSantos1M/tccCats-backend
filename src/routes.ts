import { Router } from "express";
import pessoasController from "./controllers/people.js";
import gatosController from "./controllers/cats.js";
import authentication from "./middlewares/authentication.ts";

const routes = Router();
routes.get("/", (req, res) => 
    res.status(200).json({success: true})
);

routes.post("/pessoas/login", pessoasController.login);
routes.get("/pessoas",authentication, pessoasController.list) ;
routes.get("/pessoas/:id", authentication, pessoasController.getById);
routes.post("/pessoas/create",pessoasController.create);
routes.put("/pessoas/:id",authentication, pessoasController.update);
routes.delete("/pessoas/:id", authentication,pessoasController.delete);

routes.get("/gatos",authentication, gatosController.list) ;
routes.get("/gatos/:id", authentication, gatosController.getById);
routes.post("/gatos",gatosController.upload.single("foto"),gatosController.create);
routes.put("/gatos/:id",authentication,gatosController.upload.single("foto"),gatosController.update);
routes.delete("/gatos/:id", authentication,gatosController.delete);

export default routes;