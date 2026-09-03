/*
  Warnings:

  - You are about to drop the column `attempts` on the `OtpVerification` table. All the data in the column will be lost.
  - You are about to drop the column `otpHash` on the `OtpVerification` table. All the data in the column will be lost.
  - Added the required column `sessionId` to the `OtpVerification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OtpVerification" DROP COLUMN "attempts",
DROP COLUMN "otpHash",
ADD COLUMN     "sessionId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "OtpVerification_sessionId_idx" ON "OtpVerification"("sessionId");
