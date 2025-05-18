// src/controllers/usuarioController.ts

import { Request, Response } from 'express';
import * as usuarioService from '../services/usuariosService';

export const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await usuarioService.getAllUsuarios();
  res.json(usuarios);
};

export const getUsuario = async (req: Request, res: Response) => {
  const usuario = await usuarioService.getUsuarioById(req.params.id);
  if (!usuario) {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
  res.json(usuario);
};

export const registerUsuario = async (req: Request, res: Response) => {
  try {
    const nuevoUsuario = await usuarioService.createUsuario(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUsuario = async (req: Request, res: Response) => {
  try {
    const usuarioActualizado = await usuarioService.updateUsuario(req.params.id, req.body);
    res.json(usuarioActualizado);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  try {
    await usuarioService.deleteUsuario(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
