-- Add acquisition_number column: assigned only when a page first publishes.
-- A sequence (not SERIAL / DEFAULT) is used so the number is allocated via
-- nextval() inside the togglePublish transaction, never on INSERT.

CREATE SEQUENCE IF NOT EXISTS acquisition_number_seq
  START 1 INCREMENT 1;

ALTER TABLE pages
  ADD COLUMN acquisition_number INT UNIQUE;
