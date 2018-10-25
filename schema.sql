CREATE TABLE `users` (
	`userId` INT(10) NOT NULL AUTO_INCREMENT,
	`forename` varchar(100) NOT NULL,
	`surname` varchar(100) NOT NULL,
	`kentId` varchar(20),
	`email` varchar(255) NOT NULL,
	`password` varchar(1024) NOT NULL,
	`salt` varchar(1024) NOT NULL,
	`stripeCustomerId` varchar(100),
	PRIMARY KEY (`userId`)
);

CREATE TABLE `participants`
(
 `participantId`         INT NOT NULL AUTO_INCREMENT ,
 `forename`              VARCHAR(100) NOT NULL ,
 `surname`               VARCHAR(100) NOT NULL ,
 `dateOfBirth`           VARCHAR(20) NOT NULL ,
 `termTimeAddress`       VARCHAR(1000) NOT NULL ,
 `mobileNumber`          VARCHAR(20) NOT NULL ,
 `studentNumber`         VARCHAR(45) ,
 `email`                 VARCHAR(255) NOT NULL ,
 `canDrive`              TINYINT NOT NULL DEFAULT 0 ,
 `earliestDeparture`     DATETIME ,
 `nokForename`           VARCHAR(100) NOT NULL ,
 `nokSurname`            VARCHAR(100) NOT NULL ,
 `nokRelationship`       VARCHAR(100) NOT NULL ,
 `nokMobileNumber`       VARCHAR(20) NOT NULL ,
 `nokEmail`              VARCHAR(255) NOT NULL ,
 `homeAddress`           VARCHAR(1000) NOT NULL ,
 `medicalDeclaration`    VARCHAR(2000) NOT NULL ,
 `medicationDeclaration` VARCHAR(2000) NOT NULL ,
 `hasPaidDeposit`        TINYINT NOT NULL ,
PRIMARY KEY (`participantId`)
);

CREATE TABLE `fixtures`
(
 `fixtureId`       INT NOT NULL AUTO_INCREMENT ,
 `name`            VARCHAR(255) NOT NULL ,
 `description`     VARCHAR(2000) NOT NULL ,
 `startDate`       DATETIME ,
 `endDate`         DATETIME NULL,
 `recurring`       TINYINT NOT NULL DEFAULT 0 ,
 `recurringText`   VARCHAR(255) NULL,
 `costType`        VARCHAR(20) NOT NULL COMMENT 'can be either be simple or deposit, extensible' ,
 `costDescription` VARCHAR(1000) NULL,
 `costTotal`       INT NOT NULL DEFAULT 0 ,
 `costDeposit`     INT NULL,
 `type`            VARCHAR(30) NOT NULL COMMENT 'trip or social, could be expanded',
 `link`            VARCHAR(1000) NULL,
 `signupsOpenAt`   DATETIME NULL,
PRIMARY KEY (`fixtureId`)
);

INSERT INTO fixtures (
	`name`,
	`description`,
	startDate,
	endDate,
	costType,
	costDescription,
	costTotal,
	costDeposit,
	`type`,
	link
) VALUES (
	'Freshers Trip: South Wales',
	'Open to all abilities',
	'1538758800',
	'1538953200',
	'deposit',
	'£10 Deposit up-front + £20 Trip cost',
	3000,
	1000,
	'trip',
	'fb.com/...'
);

CREATE TABLE `fixtureApplications`
(
 `fixtureId`     INT NOT NULL ,
 `participantId` INT NOT NULL ,
PRIMARY KEY (`fixtureId`, `participantId`)
);

CREATE TABLE `resetTokens` (
	`tokenId` varchar(100) NOT NULL,
	`email` varchar(255) NOT NULL,
	`expirationDate` DATETIME NOT NULL,
	`state` varchar(20) NOT NULL DEFAULT 'unused',
	PRIMARY KEY (`tokenId`,`email`)
);

ALTER TABLE `users` ADD UNIQUE(`email`);

-- ALTER TABLE `fixtureApplications` ADD CONSTRAINT `fixtureApplications_fk0` FOREIGN KEY (`fixtureId`) REFERENCES `fixtures`(`fixtureId`) ON DELETE CASCADE;

-- ALTER TABLE `fixtureApplications` ADD CONSTRAINT `fixtureApplications_fk1` FOREIGN KEY (`participantId`) REFERENCES `participants`(`participantId`) ON DELETE CASCADE;
