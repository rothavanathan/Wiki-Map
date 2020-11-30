DROP TABLE IF EXISTS maps CASCADE;
DROP TABLE IF EXISTS map_permissions CASCADE;

CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  thumbnail_photo_url VARCHAR(255),
  thumbnail_alt_text VARCHAR(255),
  isPublic BOOLEAN DEFAULT TRUE
);

CREATE TABLE map_permissions (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  isFavorite BOOLEAN,
  isAuthenticated BOOLEAN,
  isContributor BOOLEAN
);
