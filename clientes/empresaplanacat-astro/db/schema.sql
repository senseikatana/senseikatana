CREATE TABLE IF NOT EXISTS lines (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  pdf_url TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS schedules (
  id INTEGER PRIMARY KEY,
  line_id INTEGER NOT NULL REFERENCES lines(id),
  origin_town TEXT NOT NULL,
  destination_town TEXT NOT NULL,
  departure_time TEXT NOT NULL,
  arrival_time TEXT NOT NULL,
  duration TEXT NOT NULL,
  stops_json TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_schedules_line ON schedules(line_id);

CREATE TABLE IF NOT EXISTS line_connections (
  id INTEGER PRIMARY KEY,
  from_line_id INTEGER NOT NULL REFERENCES lines(id),
  at_stop TEXT NOT NULL,
  to_line_id INTEGER NOT NULL REFERENCES lines(id),
  wait_min INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_line_connections_from ON line_connections(from_line_id);
