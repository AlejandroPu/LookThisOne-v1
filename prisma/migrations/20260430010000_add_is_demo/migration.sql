-- Mark demo profiles so they can be filtered out or removed when real users
-- fill the catalog in v2, without touching analytics data.
ALTER TABLE pages
  ADD COLUMN is_demo BOOLEAN NOT NULL DEFAULT false;
