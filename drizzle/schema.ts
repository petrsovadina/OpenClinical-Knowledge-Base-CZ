import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json, boolean, index, uniqueIndex } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extended with additional tables for OpenClinical Knowledge Base.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "editor", "viewer"]).default("viewer").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Data sources configuration
 * Stores metadata about external data sources (SÚKL, NIKEZ, WikiSkripta, etc.)
 */
export const dataSources = mysqlTable("data_sources", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  sourceType: mysqlEnum("sourceType", ["SUKL", "NIKEZ", "WIKISKRIPTA", "OTHER"]).notNull(),
  url: varchar("url", { length: 512 }),
  apiEndpoint: varchar("apiEndpoint", { length: 512 }),
  scrapingConfig: json("scrapingConfig"), // JSON config for scraper
  isActive: boolean("isActive").default(true).notNull(),
  lastScrapedAt: timestamp("lastScrapedAt"),
  nextScheduledAt: timestamp("nextScheduledAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DataSource = typeof dataSources.$inferSelect;
export type InsertDataSource = typeof dataSources.$inferInsert;

/**
 * Documents table
 * Stores metadata about source documents (guidelines, SPCs, articles, etc.)
 */
export const documents = mysqlTable("documents", {
  id: varchar("id", { length: 36 }).primaryKey(), // UUID
  dataSourceId: int("dataSourceId").notNull(),
  sourceId: varchar("sourceId", { length: 255 }), // External ID from source
  title: varchar("title", { length: 512 }).notNull(),
  description: text("description"),
  url: varchar("url", { length: 512 }).notNull(),
  downloadUrl: varchar("downloadUrl", { length: 512 }),
  documentType: mysqlEnum("documentType", ["GUIDELINE", "SPC", "PIL", "PROCEDURE", "ARTICLE", "OTHER"]).notNull(),
  language: mysqlEnum("language", ["cs", "en"]).default("cs").notNull(),
  publishedDate: timestamp("publishedDate"),
  version: varchar("version", { length: 50 }),
  authors: json("authors"), // Array of author names
  categories: json("categories"), // Array of category names
  tags: json("tags"), // Array of tags
  contentHash: varchar("contentHash", { length: 64 }), // SHA256 hash for change detection
  status: mysqlEnum("status", ["ACTIVE", "ARCHIVED", "DEPRECATED"]).default("ACTIVE").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  dataSourceIdIdx: index("idx_documents_dataSourceId").on(table.dataSourceId),
  sourceIdIdx: index("idx_documents_sourceId").on(table.sourceId),
  documentTypeIdx: index("idx_documents_documentType").on(table.documentType),
  statusIdx: index("idx_documents_status").on(table.status),
}));

export type Document = typeof documents.$inferSelect;
export type InsertDocument = typeof documents.$inferInsert;

/**
 * Knowledge units table
 * Stores atomic, citable units of medical knowledge
 */
export const knowledgeUnits = mysqlTable("knowledge_units", {
  id: varchar("id", { length: 36 }).primaryKey(), // UUID
  documentId: varchar("documentId", { length: 36 }).notNull(),
  type: mysqlEnum("type", ["GUIDELINE", "RECOMMENDATION", "PROCEDURE", "DEFINITION", "INTERACTION", "CONTRAINDICATION"]).notNull(),
  title: varchar("title", { length: 512 }).notNull(),
  content: text("content").notNull(), // Markdown format
  summary: text("summary"), // Short summary for search
  keywords: json("keywords"), // Array of keywords
  category: varchar("category", { length: 255 }),
  severity: mysqlEnum("severity", ["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  evidence: json("evidence"), // { level: 'A'|'B'|'C'|'D', source: string }
  references: json("references"), // Array of { documentId, section, pageNumber }
  relatedUnits: json("relatedUnits"), // Array of related unit IDs
  metadata: json("metadata"), // Additional metadata
  validatedAt: timestamp("validatedAt"),
  validatedBy: varchar("validatedBy", { length: 36 }), // User ID
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  documentIdIdx: index("idx_knowledge_units_documentId").on(table.documentId),
  typeIdx: index("idx_knowledge_units_type").on(table.type),
  categoryIdx: index("idx_knowledge_units_category").on(table.category),
}));

export type KnowledgeUnit = typeof knowledgeUnits.$inferSelect;
export type InsertKnowledgeUnit = typeof knowledgeUnits.$inferInsert;

/**
 * Drug products table
 * Stores information about medicinal products from SÚKL
 */
export const drugProducts = mysqlTable("drug_products", {
  id: varchar("id", { length: 36 }).primaryKey(), // UUID
  suklId: varchar("suklId", { length: 50 }).notNull().unique(),
  name: varchar("name", { length: 512 }).notNull(),
  genericName: varchar("genericName", { length: 512 }),
  activeIngredients: json("activeIngredients"), // Array of { name, strength, unit }
  dosageForm: varchar("dosageForm", { length: 255 }),
  strength: varchar("strength", { length: 255 }),
  route: varchar("route", { length: 255 }), // Route of administration
  atcCode: varchar("atcCode", { length: 50 }),
  manufacturer: varchar("manufacturer", { length: 512 }),
  registrationNumber: varchar("registrationNumber", { length: 50 }),
  registrationDate: timestamp("registrationDate"),
  status: mysqlEnum("status", ["ACTIVE", "SUSPENDED", "WITHDRAWN"]).default("ACTIVE").notNull(),
  spcUrl: varchar("spcUrl", { length: 512 }), // SPC URL
  pilUrl: varchar("pilUrl", { length: 512 }), // PIL URL
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  suklIdIdx: uniqueIndex("idx_drug_products_suklId").on(table.suklId),
  nameIdx: index("idx_drug_products_name").on(table.name),
  atcCodeIdx: index("idx_drug_products_atcCode").on(table.atcCode),
  statusIdx: index("idx_drug_products_status").on(table.status),
}));

export type DrugProduct = typeof drugProducts.$inferSelect;
export type InsertDrugProduct = typeof drugProducts.$inferInsert;

/**
 * Drug interactions table
 * Stores information about interactions between medicinal products
 */
export const drugInteractions = mysqlTable("drug_interactions", {
  id: varchar("id", { length: 36 }).primaryKey(), // UUID
  drug1Id: varchar("drug1Id", { length: 36 }).notNull(),
  drug2Id: varchar("drug2Id", { length: 36 }).notNull(),
  interactionType: mysqlEnum("interactionType", ["CONTRAINDICATION", "CAUTION", "INTERACTION", "MONITORING"]).notNull(),
  severity: mysqlEnum("severity", ["LOW", "MEDIUM", "HIGH", "CRITICAL"]).notNull(),
  mechanism: text("mechanism"), // How the interaction works
  clinicalEffect: text("clinicalEffect"), // Clinical effect of interaction
  management: text("management"), // Recommended management
  evidence: json("evidence"), // { level: 'A'|'B'|'C'|'D', source: string }
  references: json("references"), // Array of { documentId, url }
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  drug1IdIdx: index("idx_drug_interactions_drug1Id").on(table.drug1Id),
  drug2IdIdx: index("idx_drug_interactions_drug2Id").on(table.drug2Id),
  severityIdx: index("idx_drug_interactions_severity").on(table.severity),
}));

export type DrugInteraction = typeof drugInteractions.$inferSelect;
export type InsertDrugInteraction = typeof drugInteractions.$inferInsert;

/**
 * ETL jobs table
 * Tracks execution of ETL processes
 */
export const etlJobs = mysqlTable("etl_jobs", {
  id: varchar("id", { length: 36 }).primaryKey(), // UUID
  dataSourceId: int("dataSourceId").notNull(),
  jobType: mysqlEnum("jobType", ["SCRAPE", "PARSE", "VALIDATE", "TRANSFORM", "FULL_PIPELINE"]).notNull(),
  status: mysqlEnum("status", ["PENDING", "RUNNING", "SUCCESS", "FAILED", "PARTIAL"]).default("PENDING").notNull(),
  startedAt: timestamp("startedAt"),
  completedAt: timestamp("completedAt"),
  recordsProcessed: int("recordsProcessed").default(0),
  recordsSucceeded: int("recordsSucceeded").default(0),
  recordsFailed: int("recordsFailed").default(0),
  errorMessage: text("errorMessage"),
  metadata: json("metadata"), // Additional job metadata
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  dataSourceIdIdx: index("idx_etl_jobs_dataSourceId").on(table.dataSourceId),
  statusIdx: index("idx_etl_jobs_status").on(table.status),
  createdAtIdx: index("idx_etl_jobs_createdAt").on(table.createdAt),
}));

export type EtlJob = typeof etlJobs.$inferSelect;
export type InsertEtlJob = typeof etlJobs.$inferInsert;

/**
 * ETL job logs table
 * Detailed logs for each ETL job
 */
export const etlJobLogs = mysqlTable("etl_job_logs", {
  id: varchar("id", { length: 36 }).primaryKey(), // UUID
  jobId: varchar("jobId", { length: 36 }).notNull(),
  level: mysqlEnum("level", ["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]).notNull(),
  message: text("message").notNull(),
  context: json("context"), // Additional context
  timestamp: timestamp("timestamp").defaultNow().notNull(),
}, (table) => ({
  jobIdIdx: index("idx_etl_job_logs_jobId").on(table.jobId),
  levelIdx: index("idx_etl_job_logs_level").on(table.level),
}));

export type EtlJobLog = typeof etlJobLogs.$inferSelect;
export type InsertEtlJobLog = typeof etlJobLogs.$inferInsert;

/**
 * Audit logs table
 * Tracks all changes to the system
 */
export const auditLogs = mysqlTable("audit_logs", {
  id: varchar("id", { length: 36 }).primaryKey(), // UUID
  entityType: varchar("entityType", { length: 50 }).notNull(),
  entityId: varchar("entityId", { length: 36 }).notNull(),
  action: mysqlEnum("action", ["CREATE", "UPDATE", "DELETE", "VALIDATE", "PUBLISH", "ARCHIVE"]).notNull(),
  userId: varchar("userId", { length: 36 }),
  changes: json("changes"), // What changed
  ipAddress: varchar("ipAddress", { length: 45 }),
  userAgent: text("userAgent"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
}, (table) => ({
  entityTypeIdx: index("idx_audit_logs_entityType").on(table.entityType),
  entityIdIdx: index("idx_audit_logs_entityId").on(table.entityId),
  userIdIdx: index("idx_audit_logs_userId").on(table.userId),
  timestampIdx: index("idx_audit_logs_timestamp").on(table.timestamp),
}));

export type AuditLog = typeof auditLogs.$inferSelect;
export type InsertAuditLog = typeof auditLogs.$inferInsert;
