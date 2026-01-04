CREATE TABLE `audit_logs` (
	`id` varchar(36) NOT NULL,
	`entityType` varchar(50) NOT NULL,
	`entityId` varchar(36) NOT NULL,
	`action` enum('CREATE','UPDATE','DELETE','VALIDATE','PUBLISH','ARCHIVE') NOT NULL,
	`userId` varchar(36),
	`changes` json,
	`ipAddress` varchar(45),
	`userAgent` text,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `audit_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `data_sources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`sourceType` enum('SUKL','NIKEZ','WIKISKRIPTA','OTHER') NOT NULL,
	`url` varchar(512),
	`apiEndpoint` varchar(512),
	`scrapingConfig` json,
	`isActive` boolean NOT NULL DEFAULT true,
	`lastScrapedAt` timestamp,
	`nextScheduledAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `data_sources_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `documents` (
	`id` varchar(36) NOT NULL,
	`dataSourceId` int NOT NULL,
	`sourceId` varchar(255),
	`title` varchar(512) NOT NULL,
	`description` text,
	`url` varchar(512) NOT NULL,
	`downloadUrl` varchar(512),
	`documentType` enum('GUIDELINE','SPC','PIL','PROCEDURE','ARTICLE','OTHER') NOT NULL,
	`language` enum('cs','en') NOT NULL DEFAULT 'cs',
	`publishedDate` timestamp,
	`version` varchar(50),
	`authors` json,
	`categories` json,
	`tags` json,
	`contentHash` varchar(64),
	`status` enum('ACTIVE','ARCHIVED','DEPRECATED') NOT NULL DEFAULT 'ACTIVE',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `documents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `drug_interactions` (
	`id` varchar(36) NOT NULL,
	`drug1Id` varchar(36) NOT NULL,
	`drug2Id` varchar(36) NOT NULL,
	`interactionType` enum('CONTRAINDICATION','CAUTION','INTERACTION','MONITORING') NOT NULL,
	`severity` enum('LOW','MEDIUM','HIGH','CRITICAL') NOT NULL,
	`mechanism` text,
	`clinicalEffect` text,
	`management` text,
	`evidence` json,
	`references` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `drug_interactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `drug_products` (
	`id` varchar(36) NOT NULL,
	`suklId` varchar(50) NOT NULL,
	`name` varchar(512) NOT NULL,
	`genericName` varchar(512),
	`activeIngredients` json,
	`dosageForm` varchar(255),
	`strength` varchar(255),
	`route` varchar(255),
	`atcCode` varchar(50),
	`manufacturer` varchar(512),
	`registrationNumber` varchar(50),
	`registrationDate` timestamp,
	`status` enum('ACTIVE','SUSPENDED','WITHDRAWN') NOT NULL DEFAULT 'ACTIVE',
	`spcUrl` varchar(512),
	`pilUrl` varchar(512),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `drug_products_id` PRIMARY KEY(`id`),
	CONSTRAINT `drug_products_suklId_unique` UNIQUE(`suklId`),
	CONSTRAINT `idx_drug_products_suklId` UNIQUE(`suklId`)
);
--> statement-breakpoint
CREATE TABLE `etl_job_logs` (
	`id` varchar(36) NOT NULL,
	`jobId` varchar(36) NOT NULL,
	`level` enum('DEBUG','INFO','WARNING','ERROR','CRITICAL') NOT NULL,
	`message` text NOT NULL,
	`context` json,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `etl_job_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `etl_jobs` (
	`id` varchar(36) NOT NULL,
	`dataSourceId` int NOT NULL,
	`jobType` enum('SCRAPE','PARSE','VALIDATE','TRANSFORM','FULL_PIPELINE') NOT NULL,
	`status` enum('PENDING','RUNNING','SUCCESS','FAILED','PARTIAL') NOT NULL DEFAULT 'PENDING',
	`startedAt` timestamp,
	`completedAt` timestamp,
	`recordsProcessed` int DEFAULT 0,
	`recordsSucceeded` int DEFAULT 0,
	`recordsFailed` int DEFAULT 0,
	`errorMessage` text,
	`metadata` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `etl_jobs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `knowledge_units` (
	`id` varchar(36) NOT NULL,
	`documentId` varchar(36) NOT NULL,
	`type` enum('GUIDELINE','RECOMMENDATION','PROCEDURE','DEFINITION','INTERACTION','CONTRAINDICATION') NOT NULL,
	`title` varchar(512) NOT NULL,
	`content` text NOT NULL,
	`summary` text,
	`keywords` json,
	`category` varchar(255),
	`severity` enum('LOW','MEDIUM','HIGH','CRITICAL'),
	`evidence` json,
	`references` json,
	`relatedUnits` json,
	`metadata` json,
	`validatedAt` timestamp,
	`validatedBy` varchar(36),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `knowledge_units_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','admin','editor','viewer') NOT NULL DEFAULT 'viewer';--> statement-breakpoint
CREATE INDEX `idx_audit_logs_entityType` ON `audit_logs` (`entityType`);--> statement-breakpoint
CREATE INDEX `idx_audit_logs_entityId` ON `audit_logs` (`entityId`);--> statement-breakpoint
CREATE INDEX `idx_audit_logs_userId` ON `audit_logs` (`userId`);--> statement-breakpoint
CREATE INDEX `idx_audit_logs_timestamp` ON `audit_logs` (`timestamp`);--> statement-breakpoint
CREATE INDEX `idx_documents_dataSourceId` ON `documents` (`dataSourceId`);--> statement-breakpoint
CREATE INDEX `idx_documents_sourceId` ON `documents` (`sourceId`);--> statement-breakpoint
CREATE INDEX `idx_documents_documentType` ON `documents` (`documentType`);--> statement-breakpoint
CREATE INDEX `idx_documents_status` ON `documents` (`status`);--> statement-breakpoint
CREATE INDEX `idx_drug_interactions_drug1Id` ON `drug_interactions` (`drug1Id`);--> statement-breakpoint
CREATE INDEX `idx_drug_interactions_drug2Id` ON `drug_interactions` (`drug2Id`);--> statement-breakpoint
CREATE INDEX `idx_drug_interactions_severity` ON `drug_interactions` (`severity`);--> statement-breakpoint
CREATE INDEX `idx_drug_products_name` ON `drug_products` (`name`);--> statement-breakpoint
CREATE INDEX `idx_drug_products_atcCode` ON `drug_products` (`atcCode`);--> statement-breakpoint
CREATE INDEX `idx_drug_products_status` ON `drug_products` (`status`);--> statement-breakpoint
CREATE INDEX `idx_etl_job_logs_jobId` ON `etl_job_logs` (`jobId`);--> statement-breakpoint
CREATE INDEX `idx_etl_job_logs_level` ON `etl_job_logs` (`level`);--> statement-breakpoint
CREATE INDEX `idx_etl_jobs_dataSourceId` ON `etl_jobs` (`dataSourceId`);--> statement-breakpoint
CREATE INDEX `idx_etl_jobs_status` ON `etl_jobs` (`status`);--> statement-breakpoint
CREATE INDEX `idx_etl_jobs_createdAt` ON `etl_jobs` (`createdAt`);--> statement-breakpoint
CREATE INDEX `idx_knowledge_units_documentId` ON `knowledge_units` (`documentId`);--> statement-breakpoint
CREATE INDEX `idx_knowledge_units_type` ON `knowledge_units` (`type`);--> statement-breakpoint
CREATE INDEX `idx_knowledge_units_category` ON `knowledge_units` (`category`);