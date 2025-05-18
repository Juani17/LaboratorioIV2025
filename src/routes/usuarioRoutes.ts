import { Router } from 'express';
import * as usuarioController from '../controllers/usuarioController';

const router = Router();

router.get('/usuarios', usuarioController.getUsuarios);
router.get('/usuarios/:id', usuarioController.getUsuario);
router.post('/usuarios/register', usuarioController.registerUsuario);
router.put('/usuarios/:id', usuarioController.updateUsuario);
router.delete('/usuarios/:id', usuarioController.deleteUsuario);

export default router;
