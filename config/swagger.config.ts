
const initialRoute = {
    get: {
        summary: "Rota inicial",
        responses: {
            200: {
                description: "sucesso",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                success: {
                                    type: "boolean",
                                },
                            }
                        },
                        example: {
                            success: true,
                        },
                    },
                },
            },

        },
    },
};

const gatosRoutes = {
    get: {
        tags: ["Gatos"],
        summary: " lista de gatos",
        reposnses: {
            200: {
                description: " Lista receda",
                content: {
                    "Application/json": {
                        schema: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    id: { type: "integer" },
                                    nome: { type: "string" },
                                    data_nascimento: { type: "integer" },
                                    numeroDeTelefone: { type: "integer" },
                                    email: { type: "string" },
                                    createdAt: {
                                        type: "string",
                                        format: "date",
                                    },
                                    updatedAt: {
                                        type: "string",
                                        format: "date",
                                    },

                                },
                            },
                        },
                        example: [
                            {
                                id: 1,
                                nome: "Pretin",
                                data_nascimento: "19/07/2026",
                                numeroDeTelefone: 4199542200,
                                createdAt: "2026-05-04T11:29:00.588Z",
                                updatedAt: "2026-05-04T11:29:00.588Z",
                               
                            },
                        ],
                    },
                },
            },
        },
    },
};

export default {
    initialRoute,
    gatosRoutesNoId: gatosRoutes,
};