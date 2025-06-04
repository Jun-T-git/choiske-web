/*
  Warnings:

  - A unique constraint covering the columns `[answer_id,slot_id]` on the table `SlotResponse` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Answer_edit_token_idx" ON "Answer"("edit_token");

-- CreateIndex
CREATE INDEX "Answer_schedule_id_idx" ON "Answer"("schedule_id");

-- CreateIndex
CREATE INDEX "Schedule_public_token_idx" ON "Schedule"("public_token");

-- CreateIndex
CREATE INDEX "Schedule_expires_at_idx" ON "Schedule"("expires_at");

-- CreateIndex
CREATE INDEX "SlotResponse_answer_id_slot_id_idx" ON "SlotResponse"("answer_id", "slot_id");

-- CreateIndex
CREATE INDEX "SlotResponse_slot_id_idx" ON "SlotResponse"("slot_id");

-- CreateIndex
CREATE INDEX "SlotResponse_answer_id_idx" ON "SlotResponse"("answer_id");

-- CreateIndex
CREATE UNIQUE INDEX "SlotResponse_answer_id_slot_id_key" ON "SlotResponse"("answer_id", "slot_id");

-- CreateIndex
CREATE INDEX "TimeSlot_schedule_id_slot_start_idx" ON "TimeSlot"("schedule_id", "slot_start");
