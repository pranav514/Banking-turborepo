-- AlterTable
ALTER TABLE "Balance" ALTER COLUMN "locked" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OnRampTransaction" ALTER COLUMN "provider" DROP NOT NULL;
