import { Request, Response } from "express";

import { prisma } from "../../config/prisma";
import { Prisma } from "../../generated/prisma/client";

export default {
    list: async (request: Request, response: Response) => {
        try {
            const users = await prisma.cats.findMany();
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
            const { nome, vacina, cor_raca, data_nascimento, numeroDeTelefone} = request.body;
            const user = await prisma.cats.create({
                data: {
                    nome,
                    vacina,
                    cor_raca,
                    data_nascimento: new Date(data_nascimento),
                    numeroDeTelefone,
                },
            });
            return response.status(201).json(user);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(primaErrorCodes[e.code] || 500).json(e.message);
            }
            return response.status(500).json("Unknown error. Try again later");
        }
    },
    getById: async (request: Request, response: Response) => {
        try {
            const cat = await prisma.cats.findUnique({
                where: { id: +request.params.id },
            });
            return response.status(200).json(cat);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(primaErrorCodes[e.code] || 500).json(e.message);
            }
            return response.status(500).json("Unknown error. Try again later");
        }
    },
    update: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const { nome, vacina, cor_raca, data_nascimento, numeroDeTelefone} = request.body;
            const user = await prisma.cats.update({
                where: { id: +id },
                data: {
                    nome,
                    vacina,
                    cor_raca,
                    data_nascimento: new Date(data_nascimento),
                    numeroDeTelefone,
                },
            });
            return response.status(200).json(user);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(primaErrorCodes[e.code] || 500).json(e.message);
            }
            return response.status(500).json("Unknown error. Try again later");
        }
    },
    delete: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const user = await prisma.cats.delete({
                where: { id: +id },
            });
            return response.status(200).json(user);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(primaErrorCodes[e.code] || 500).json(e.message);
            }
            return response.status(500).json("Unknown error. Try again later");
        }
    },
};