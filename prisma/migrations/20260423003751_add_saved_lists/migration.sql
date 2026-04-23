-- CreateTable
CREATE TABLE "SavedList" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedListItem" (
    "id" TEXT NOT NULL,
    "savedListId" TEXT NOT NULL,
    "itemKey" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,

    CONSTRAINT "SavedListItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SavedListItem" ADD CONSTRAINT "SavedListItem_savedListId_fkey" FOREIGN KEY ("savedListId") REFERENCES "SavedList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
