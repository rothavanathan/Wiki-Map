-- Maps table seeds
INSERT INTO maps (owner_id, title, thumbnail_photo_url, isPublic)
VALUES (1, 'Hikes in Newfoundland', 'https://www.pexels.com/photo/man-walking-on-stone-pathway-2629320/', true);

INSERT INTO maps (owner_id, title, thumbnail_photo_url, isPublic)
VALUES (1, 'Restaurants in St. Johns', 'https://www.pexels.com/photo/assorted-variety-of-foods-on-plates-on-dining-table-1528013/', true);

INSERT INTO maps (owner_id, title, thumbnail_photo_url, isPublic)
VALUES (2, 'Views of the Stars', 'https://www.pexels.com/photo/scenic-view-of-rocky-mountain-during-evening-1624438/', true);

INSERT INTO maps (owner_id, title, thumbnail_photo_url, isPublic)
VALUES (3, 'Drizzys Clubs', 'https://www.pexels.com/photo/glasses-of-wine-in-a-table-3394221/', true);


-- maps_permissions table seeds

--user:tiny_emp map:"views of the stars" tinyemp has this favorited, is authenticated
INSERT INTO map_permissions (user_id, map_id, isFavorite, isAuthenticated, isContributor)
VALUES (1, 3, true, true, false);

--user:tiny_emp map:"drizzy's club" tinyemp has this favorited, is NOT authenticated
INSERT INTO map_permissions (user_id, map_id, isFavorite, isAuthenticated, isContributor)
VALUES (1, 4, true, false, false);