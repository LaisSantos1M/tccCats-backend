import type { Request, Response } from "express";

import { prisma } from "../../config/prisma";
import { Prisma } from "../../generated/prisma/client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { handleErrors } from "../../helpers/prismaErrorCodes";


export default {
    login: async (request: Request, response: Response) => {
        try {
            const { email, senha } = request.body;

            const employees = await prisma.pessoa.findUnique({
                where: {
                    email,
                }
            });
            if (!employees || !bcrypt.compareSync(senha, employees.senha)) {
                return response.status(404).json("email e/ou senha invalidos");

            }

            const token = jwt.sign(employees, process.env.JWT_SECRET!, {
                expiresIn: "1d",
            });

            return response.status(200).json({ access_token: token });
        } catch (e) {
            return handleErrors(e, response);
        }
    },

 
      list: async (request: Request, response: Response) => {
        try {
            const users = await prisma.pessoa.findMany();
            return response.status(200).json(users);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(primaErrorCodes[e.code] || 500).json(e.message);
            }
            return response.status(500).json("Unknown error");
        }
    },



    create: async (request: Request, response: Response) => {
        try {
            const { nome, email, senha } = request.body;
            const user = await prisma.pessoa.create({
                data: {
                    nome,
                    email,
                    senha: bcrypt.hashSync(senha, +process.env.BCRYPT_ROUNDS!)
                },
            });
            return response.status(201).json(user);
        }
        catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(primaErrorCodes[e.code] || 500).json(e.message);
            }
            return response.status(500).json("Unkown error. Try again later");

        }

    },


    
    getById: async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        if (!request.params.id || Number.isNaN(id)) {
            return response.status(400).json("Invalid id");
        }

        try {
            const user = await prisma.pessoa.findUnique({
                where: { id },
            });
            return response.status(200).json(user);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(primaErrorCodes[e.code] || 500).json(e.message);
            }
            return response.status(500).json("Unkown error. Try again later");

        }

    },


    update: async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        if (!request.params.id || Number.isNaN(id)) {
            return response.status(400).json("Invalid id");
        }

        try {
            const { nome, email, senha } = request.body;
            const user = await prisma.pessoa.update({
                data: {
                    nome,
                    email,
                    senha,
                    
                },
                where: { id },
            });
            return response.status(200).json(user);
        }
        catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(primaErrorCodes[e.code] || 500).json(e.message);
            }
            return response.status(500).json("Unkown error. Try again later");

        }

    },

    delete: async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        if (!request.params.id || Number.isNaN(id)) {
            return response.status(400).json("Invalid id");
        }

        try {
            const user = await prisma.pessoa.delete({
                where: { id },
            });
            return response.status(200).json(user);
        }
        catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(primaErrorCodes[e.code] || 500).json(e.message);
            }
            return response.status(500).json("Unkown error. Try again later");

        }


    },

};