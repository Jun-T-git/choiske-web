/*
  Warnings:

  - Made the column `name` on table `Answer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Answer" ALTER COLUMN "name" SET NOT NULL;
