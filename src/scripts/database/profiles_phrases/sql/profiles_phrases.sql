
CREATE TABLE `profiles_phrases`
(
	`identifier` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`profile`    INTEGER NOT NULL REFERENCES `profiles` (`identifier`),
	`phrase`     INTEGER NOT NULL REFERENCES `phrases` (`identifier`),
	`survey`     BOOLEAN NOT NULL DEFAULT FALSE
);
