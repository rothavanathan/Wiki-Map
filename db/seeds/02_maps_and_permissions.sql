-- Maps table seeds
INSERT INTO maps (owner_id, title, description, thumbnail_photo_url, thumbnail_alt_text, isPublic)
VALUES (1, 'Hikes in Newfoundland', 'The most scenic hikes I know of from around the province' ,'https://images.pexels.com/photos/2629320/pexels-photo-2629320.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260', 'A scenic photo of Gros Morne National park', true);

INSERT INTO maps (owner_id, title, description, thumbnail_photo_url, thumbnail_alt_text, isPublic)
VALUES (1, 'Restaurants in St. Johns', 'The best places to grab a bite.', 'https://images.pexels.com/photos/1528013/pexels-photo-1528013.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260', 'Gorgeous brunch at Mallard Cottage', true);

INSERT INTO maps (owner_id, title, description, thumbnail_photo_url, thumbnail_alt_text, isPublic)
VALUES (2, 'Views of the Stars', 'Remote places in Ontario for crystal clear star gazing', 'https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260', 'Clear view of the celestial night sky', true);

INSERT INTO maps (owner_id, title, description, thumbnail_photo_url, thumbnail_alt_text, isPublic)
VALUES (3, 'Drizzys Clubs', 'Drakes personal hot spots for a night out in the 6', 'https://images.pexels.com/photos/3394221/pexels-photo-3394221.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260', 'Inside peek at a VIP club', true);


-- maps_permissions table seeds

  --user.id 1: TINY_EMPEROR's favorite maps (3, 4)
INSERT INTO map_permissions (user_id, map_id, isFavorite, isAuthenticated, isContributor)
VALUES (1, 1, false, true, false);
INSERT INTO map_permissions (user_id, map_id, isFavorite, isAuthenticated, isContributor)
VALUES (1, 2, false, true, false);

INSERT INTO map_permissions (user_id, map_id, isFavorite, isAuthenticated, isContributor)
VALUES (1, 3, true, true, false);

INSERT INTO map_permissions (user_id, map_id, isFavorite, isAuthenticated, isContributor)
VALUES (1, 4, true, false, false);

  --user.id 2: Ground Control's favorite maps (1, 4)

INSERT INTO map_permissions (user_id, map_id, isFavorite, isAuthenticated, isContributor)
VALUES (2, 1, true, true, true);

INSERT INTO map_permissions (user_id, map_id, isFavorite, isAuthenticated, isContributor)
VALUES (2, 2, false, true, true);

INSERT INTO map_permissions (user_id, map_id, isFavorite, isAuthenticated, isContributor)
VALUES (2, 3, false, true, true);

INSERT INTO map_permissions (user_id, map_id, isFavorite, isAuthenticated, isContributor)
VALUES (2, 4, true, false, false);

--user.id 2: Ground Control's favorite maps (1, 4)

INSERT INTO map_permissions (user_id, map_id, isFavorite, isAuthenticated, isContributor)
VALUES (3, 1, false, true, true);

INSERT INTO map_permissions (user_id, map_id, isFavorite, isAuthenticated, isContributor)
VALUES (3, 2, false, true, true);

INSERT INTO map_permissions (user_id, map_id, isFavorite, isAuthenticated, isContributor)
VALUES (3, 3, false, true, true);

INSERT INTO map_permissions (user_id, map_id, isFavorite, isAuthenticated, isContributor)
VALUES (3, 4, false, false, false);
