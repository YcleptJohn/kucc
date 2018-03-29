CREATE TABLE `users` (
	`userId` INT(10) NOT NULL AUTO_INCREMENT,
	`firstName` varchar(100) NOT NULL,
	`surname` varchar(100) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(1024) NOT NULL,
	`salt` varchar(1024) NOT NULL,
	`stripeCustomerId` varchar(100),
	PRIMARY KEY (`userId`)
);

CREATE TABLE `trips` (
	`tripId` INT(10) NOT NULL AUTO_INCREMENT,
	`tripName` varchar(255) NOT NULL,
	`tripDesc` varchar(1024),
	`stripeProductId` varchar(100) UNIQUE,
	PRIMARY KEY (`tripId`)
);

CREATE TABLE `tripApplicants` (
	`tripId` INT(10) NOT NULL,
	`userId` INT(10) NOT NULL,
	`status` varchar(100) NOT NULL DEFAULT 'applied',
	`paid` FLOAT(10),
	PRIMARY KEY (`tripId`,`userId`)
);

ALTER TABLE `tripApplicants` ADD CONSTRAINT `tripApplicants_fk0` FOREIGN KEY (`tripId`) REFERENCES `trips`(`tripId`);

ALTER TABLE `tripApplicants` ADD CONSTRAINT `tripApplicants_fk1` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`);
