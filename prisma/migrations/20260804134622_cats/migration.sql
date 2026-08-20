/*
  Warnings:

  - You are about to alter the column `vacina` on the `Cats` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "vacina" INTEGER NOT NULL,
    "cor_raca" TEXT NOT NULL,
    "data_nascimento" DATETIME NOT NULL,
    "numeroDeTelefone" INTEGER NOT NULL
);
INSERT INTO "new_Cats" ("cor_raca", "data_nascimento", "id", "nome", "numeroDeTelefone", "vacina") SELECT "cor_raca", "data_nascimento", "id", "nome", "numeroDeTelefone", "vacina" FROM "Cats";
DROP TABLE "Cats";
ALTER TABLE "new_Cats" RENAME TO "Cats";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
