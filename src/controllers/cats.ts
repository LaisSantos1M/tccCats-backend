import { Request, Response } from "express";

import { prisma } from "../../config/prisma";
import { handleErrors } from "../../helpers/prismaErrorCodes";
import multer from "multer";

const upload = multer({
    storage: multer.diskStorage({
        destination: "./uploads",
        filename: (request, file, callback) => {
            callback(null, `${Date.now()}-${file.originalname}`);
        },
    })
})


export default {
    upload,

    list: async (request: Request, response: Response) => {
        try {
            const cats = await prisma.cats.findMany();

            return response.status(200).json(cats);
        } catch (e) {
            return handleErrors(e, response);
        }
    },

    create: async (request: Request, response: Response) => {
        try {
            const {
                nome,
                vacina,
                cor_raca,
                data_nascimento,
                numeroDeTelefone,
            } = request.body;

            const foto = request.file?.filename;

            const cat = await prisma.cats.create({
                data: {
                    nome,
                    vacina: Number(vacina),
                    cor_raca,
                    data_nascimento: new Date(data_nascimento),
                    numeroDeTelefone,
                    foto: foto ? `http://localhost:8080/uploads/${foto}`: undefined,
                },
            });

            return response.status(201).json(cat);
        } catch (e) {
            return handleErrors(e, response);
        }
    },

    getById: async (request: Request, response: Response) => {
        try {
            const cat = await prisma.cats.findUnique({
                where: {
                    id: Number(request.params.id),
                },
            });

            return response.status(200).json(cat);
        } catch (e) {
            return handleErrors(e, response);
        }
    },

    update: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            const {
                nome,
                vacina,
                cor_raca,
                data_nascimento,
                numeroDeTelefone,
            } = request.body;

            const foto = request.file?.filename;


            const cat = await prisma.cats.update({
                where: {
                    id: Number(id),
                },
                data: {
                    nome,
                    vacina: Number(vacina),
                    cor_raca,
                    data_nascimento: new Date(data_nascimento),
                    numeroDeTelefone,
                    foto: foto ? `http://localhost:8080/uploads/${foto}`: undefined,
                },
            });

            return response.status(200).json(cat);
        } catch (e) {
            return handleErrors(e, response);
        }
    },

    delete: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            const cat = await prisma.cats.delete({
                where: {
                    id: Number(id),
                },
            });

            return response.status(200).json(cat);
        } catch (e) {
            return handleErrors(e, response);
        }
    },
};