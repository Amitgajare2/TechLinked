-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "education" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "githubUrl" TEXT,
ADD COLUMN     "linkedinUrl" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "portfolioUrl" TEXT,
ADD COLUMN     "profilePhoto" TEXT,
ADD COLUMN     "resumeUrl" TEXT,
ADD COLUMN     "skills" TEXT;
