# Architektura OpenClinical Knowledge Base CZ

## 1. Přehled systému

OpenClinical Knowledge Base je distribuovaný systém pro agregaci, validaci a strukturování medicínských dat z českých veřejných zdrojů. Systém je navržen jako moderní full-stack aplikace s následující architekturou:

```
┌─────────────────────────────────────────────────────────────────┐
│                     Frontend (React 19)                          │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  │ Admin Dashboard  │  │ Search Interface │  │ Data Explorer    │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                 Backend API (Express + tRPC)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ Public API   │  │ Admin API    │  │ ETL Manager  │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    ETL Pipeline Layer                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ Scrapers     │  │ Parsers      │  │ Validators   │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      Database Layer                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ Documents    │  │ Knowledge    │  │ Interactions │           │
│  │ (Metadata)   │  │ Units        │  │ (Drugs)      │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
└─────────────────────────────────────────────────────────────────┘
```

## 2. Datové modely

### 2.1 Dokument (Document)

Metadata o zdrojovém dokumentu slouží pro audit trail a citace.

```typescript
{
  id: string;                    // UUID
  sourceId: string;              // Identifikátor zdroje (SÚKL, NIKEZ, WikiSkripta)
  sourceType: 'SUKL' | 'NIKEZ' | 'WIKISKRIPTA' | 'OTHER';
  title: string;                 // Název dokumentu
  description: string;           // Popis obsahu
  url: string;                   // Odkaz na originální dokument
  downloadUrl?: string;          // Odkaz pro stažení (PDF, HTML)
  documentType: 'GUIDELINE' | 'SPC' | 'PIL' | 'PROCEDURE' | 'ARTICLE' | 'OTHER';
  language: 'cs' | 'en';
  publishedDate: Date;           // Datum publikace
  lastModified: Date;            // Poslední aktualizace
  version: string;               // Verze dokumentu
  authors?: string[];            // Autoři/instituce
  categories: string[];          // Kategorie (např. kardiologie, diabetologie)
  tags: string[];                // Tagy pro filtrování
  contentHash: string;           // SHA256 hash obsahu pro detekci změn
  status: 'ACTIVE' | 'ARCHIVED' | 'DEPRECATED';
  createdAt: Date;
  updatedAt: Date;
}
```

### 2.2 Znalostní jednotka (KnowledgeUnit)

Atomická, citovatelná jednotka informace.

```typescript
{
  id: string;                    // UUID
  documentId: string;            // Odkaz na zdrojový dokument
  type: 'GUIDELINE' | 'RECOMMENDATION' | 'PROCEDURE' | 'DEFINITION' | 'INTERACTION' | 'CONTRAINDICATION';
  title: string;                 // Krátký název
  content: string;               // Strukturovaný obsah (Markdown)
  summary: string;               // Shrnutí pro vyhledávání
  keywords: string[];            // Klíčová slova
  category: string;              // Medicínská kategorie
  severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  evidence?: {
    level: 'A' | 'B' | 'C' | 'D';  // Úroveň důkazu
    source: string;                // Zdroj důkazu
  };
  references: {
    documentId: string;
    section?: string;
    pageNumber?: number;
  }[];
  relatedUnits: string[];        // IDs související jednotky
  metadata: Record<string, any>; // Dodatečná metadata
  validatedAt?: Date;            // Poslední validace
  validatedBy?: string;          // Kdo validoval
  createdAt: Date;
  updatedAt: Date;
}
```

### 2.3 Lékový přípravek (DrugProduct)

Informace o léčivém přípravku z SÚKL.

```typescript
{
  id: string;                    // UUID
  sukl_id: string;               // Identifikátor v SÚKL
  name: string;                  // Obchodní název
  genericName: string;           // Generické jméno
  activeIngredients: {
    name: string;
    strength: string;
    unit: string;
  }[];
  dosageForm: string;            // Forma podání (tableta, injekce, atd.)
  strength: string;              // Síla přípravku
  route: string;                 // Cesta podání
  atcCode: string;               // ATC kód
  manufacturer: string;          // Výrobce
  registrationNumber: string;    // Registrační číslo
  registrationDate: Date;        // Datum registrace
  status: 'ACTIVE' | 'SUSPENDED' | 'WITHDRAWN';
  spc?: string;                  // Souhrn údajů o přípravku (odkaz)
  pil?: string;                  // Příbalová informace (odkaz)
  createdAt: Date;
  updatedAt: Date;
}
```

### 2.4 Lékové interakce (DrugInteraction)

Interakce mezi léčivými přípravky.

```typescript
{
  id: string;                    // UUID
  drug1Id: string;               // ID prvního léčiva
  drug2Id: string;               // ID druhého léčiva
  interactionType: 'CONTRAINDICATION' | 'CAUTION' | 'INTERACTION' | 'MONITORING';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  mechanism: string;             // Mechanismus interakce
  clinicalEffect: string;        // Klinický efekt
  management: string;            // Doporučené řešení
  evidence: {
    level: 'A' | 'B' | 'C' | 'D';
    source: string;
  };
  references: {
    documentId: string;
    url?: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
```

### 2.5 Audit log (AuditLog)

Sledování všech změn v systému.

```typescript
{
  id: string;                    // UUID
  entityType: string;            // Typ entity (Document, KnowledgeUnit, atd.)
  entityId: string;              // ID entity
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'VALIDATE' | 'PUBLISH';
  userId?: string;               // Kdo provedl akci
  changes: Record<string, any>;  // Co se změnilo
  ipAddress?: string;            // IP adresa
  userAgent?: string;            // User agent
  timestamp: Date;
}
```

## 3. ETL Pipeline

### 3.1 Architektura

```
Data Source → Scraper → Parser → Validator → Transformer → Database
     ↓           ↓        ↓         ↓           ↓
  SÚKL API    Fetch     Extract   JSON Schema  Normalize
  NIKEZ Web   HTML/PDF  Text      Pydantic     Store
  WikiSkripta Selenium  Tables    Custom Rules Audit
```

### 3.2 Komponenty

**Scraper** - Stahování dat z veřejných zdrojů
- Rate limiting (max 1 request/sec na doménu)
- Retry logika s exponenciálním backoff
- Caching stažených souborů
- Respektování robots.txt
- Error handling a logging

**Parser** - Extrakce strukturovaných dat
- PDF parsing s OCR (Tesseract)
- HTML parsing (Cheerio)
- CSV parsing
- Tabulky a seznamy
- Metadata extrakce

**Validator** - Validace dat
- JSON Schema validace
- Pydantic modely
- Business rule validace
- Detekce duplikátů
- Kontrola referenční integrity

**Transformer** - Transformace do jednotného formátu
- Normalizace textů
- Mapování kategorií
- Vytváření znalostních jednotek
- Generování citací
- Linking s existujícími daty

## 4. Databázové schéma

Primární tabulky:

- **documents** - Metadata o zdrojových dokumentech
- **knowledge_units** - Atomické znalostní jednotky
- **drug_products** - Léčivé přípravky z SÚKL
- **drug_interactions** - Interakce mezi léčivy
- **audit_logs** - Audit trail všech změn
- **search_index** - Fulltextový index pro vyhledávání
- **data_sources** - Konfigurace datových zdrojů
- **etl_jobs** - Historie ETL procesů
- **etl_job_logs** - Detailní logy ETL procesů

## 5. API Design

### 5.1 Veřejné API

```
GET /api/v1/knowledge-units          - Hledání znalostních jednotek
GET /api/v1/knowledge-units/:id      - Detail znalostní jednotky
GET /api/v1/drugs                    - Hledání léčiv
GET /api/v1/drugs/:id                - Detail léčiva
GET /api/v1/interactions             - Hledání interakcí
GET /api/v1/documents                - Hledání dokumentů
GET /api/v1/export/jsonl             - Export do JSONL
```

### 5.2 Admin API

```
POST /api/admin/sources              - Přidání datového zdroje
PUT /api/admin/sources/:id           - Úprava zdroje
DELETE /api/admin/sources/:id        - Smazání zdroje
POST /api/admin/etl/run              - Spuštění ETL
GET /api/admin/etl/jobs              - Historie ETL
GET /api/admin/etl/jobs/:id/logs     - Logy ETL
GET /api/admin/monitoring/health     - Stav systému
GET /api/admin/monitoring/metrics    - Metriky
```

## 6. Frontend

### 6.1 Administrační dashboard

- Správa datových zdrojů
- Monitoring ETL procesů
- Validace dat
- Reporting a statistiky
- Audit log viewer

### 6.2 Vyhledávací rozhraní

- Fulltextové vyhledávání
- Filtrování podle zdrojů, kategorií, typů
- Faceted search
- Zobrazení citací a odkazů

### 6.3 Data Explorer

- Prohlížení znalostních jednotek
- Vizualizace vztahů
- Export dat

## 7. Bezpečnost a compliance

### 7.1 Autentizace a autorizace

- OAuth 2.0 (Manus Auth)
- Role-based access control (RBAC)
- Admin, Editor, Viewer role

### 7.2 Audit a compliance

- Kompletní audit trail
- Citace na originální dokumenty
- Metadata o zdrojích
- Compliance s MDR (nejedná se o zdravotnický prostředek)

### 7.3 Data protection

- HTTPS pro veškerou komunikaci
- Šifrování citlivých dat
- GDPR compliance
- Backup a disaster recovery

## 8. Monitoring a alerting

### 8.1 Metriky

- ETL success rate
- Data quality metrics
- API response times
- Database performance
- Scraper health

### 8.2 Alerting

- ETL failure notifications
- Data quality issues
- API errors
- Scraper failures
- Resource utilization

## 9. Scalability

### 9.1 Horizontální škálování

- Stateless API servery
- Load balancing
- Database replication
- Cache layer (Redis)

### 9.2 Vertikální optimizace

- Database indexing
- Query optimization
- Caching strategies
- Batch processing

## 10. Deployment

### 10.1 Prostředí

- Development
- Staging
- Production

### 10.2 CI/CD

- Automated testing
- Code quality checks
- Database migrations
- Deployment automation
