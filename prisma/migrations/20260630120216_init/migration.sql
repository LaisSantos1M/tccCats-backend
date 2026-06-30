/*
  Warnings:

  - Added the required column `numeroDeTelefone` to the `Cats` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "_CatsToPessoa" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CatsToPessoa_A_fkey" FOREIGN KEY ("A") REFERENCES "Cats" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CatsToPessoa_B_fkey" FOREIGN KEY ("B") REFERENCES "Pessoa" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "vacina" TEXT NOT NULL,
    "cor_raca" TEXT NOT NULL,
    "data_nascimento" DATETIME NOT NULL,
    "numeroDeTelefone" INTEGER NOT NULL
);
INSERT INTO "new_Cats" ("cor_raca", "data_nascimento", "id", "nome", "vacina") SELECT "cor_raca", "data_nascimento", "id", "nome", "vacina" FROM "Cats";
DROP TABLE "Cats";
ALTER TABLE "new_Cats" RENAME TO "Cats";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_CatsToPessoa_AB_unique" ON "_CatsToPessoa"("A", "B");

-- CreateIndex
CREATE INDEX "_CatsToPessoa_B_index" ON "_CatsToPessoa"("B");
