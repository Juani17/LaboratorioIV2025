import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { IUsuario } from '../models/usuario';

const prisma = new PrismaClient();

export const getAllUsuarios = async () => {
  return await prisma.usuario.findMany();
};

export const getUsuarioById = async (id: string) => {
  return await prisma.usuario.findUnique({ where: { id } });
};

export const createUsuario = async (usuario: IUsuario) => {
  const hashedPassword = await bcrypt.hash(usuario.password, 10);
  return await prisma.usuario.create({
    data: {
      nombre: usuario.nombre,
      email: usuario.email,
      password: hashedPassword,
    },
  });
};

export const updateUsuario = async (id: string, usuario: Partial<IUsuario>) => {
  if (usuario.password) {
    usuario.password = await bcrypt.hash(usuario.password, 10);
  }
  return await prisma.usuario.update({
    where: { id },
    data: usuario,
  });
};

export const deleteUsuario = async (id: string) => {
  return await prisma.usuario.delete({ where: { id } });
};
