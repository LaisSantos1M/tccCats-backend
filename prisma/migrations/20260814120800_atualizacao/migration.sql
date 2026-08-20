-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "vacina" INTEGER NOT NULL,
    "cor_raca" TEXT NOT NULL,
    "data_nascimento" DATETIME NOT NULL,
    "numeroDeTelefone" TEXT NOT NULL,
    "foto" TEXT
);
INSERT INTO "new_Cats" ("cor_raca", "data_nascimento", "foto", "id", "nome", "numeroDeTelefone", "vacina") SELECT "cor_raca", "data_nascimento", "foto", "id", "nome", "numeroDeTelefone", "vacina" FROM "Cats";
DROP TABLE "Cats";
ALTER TABLE "new_Cats" RENAME TO "Cats";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
