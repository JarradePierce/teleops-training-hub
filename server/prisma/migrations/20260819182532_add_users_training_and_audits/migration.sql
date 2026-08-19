-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('INSTRUCTOR', 'STUDENT', 'LEAD');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'STUDENT',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Audit" (
    "id" SERIAL NOT NULL,
    "referenceNumber" TEXT NOT NULL,
    "geofence" TEXT NOT NULL,
    "riderService" TEXT NOT NULL,
    "priorityLevel" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,
    "engagementType" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Audit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Training" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTraining" (
    "id" SERIAL NOT NULL,
    "trainingId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserTraining_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingAudit" (
    "id" SERIAL NOT NULL,
    "auditId" INTEGER NOT NULL,
    "trainingId" INTEGER NOT NULL,

    CONSTRAINT "TrainingAudit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingLink" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "trainingId" INTEGER NOT NULL,

    CONSTRAINT "TrainingLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingVideoLink" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "trainingId" INTEGER NOT NULL,

    CONSTRAINT "TrainingVideoLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Audit_referenceNumber_key" ON "Audit"("referenceNumber");

-- CreateIndex
CREATE UNIQUE INDEX "UserTraining_userId_trainingId_key" ON "UserTraining"("userId", "trainingId");

-- CreateIndex
CREATE UNIQUE INDEX "TrainingAudit_auditId_trainingId_key" ON "TrainingAudit"("auditId", "trainingId");

-- AddForeignKey
ALTER TABLE "Audit" ADD CONSTRAINT "Audit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTraining" ADD CONSTRAINT "UserTraining_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTraining" ADD CONSTRAINT "UserTraining_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingAudit" ADD CONSTRAINT "TrainingAudit_auditId_fkey" FOREIGN KEY ("auditId") REFERENCES "Audit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingAudit" ADD CONSTRAINT "TrainingAudit_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingLink" ADD CONSTRAINT "TrainingLink_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingVideoLink" ADD CONSTRAINT "TrainingVideoLink_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
