# OpenClinical Knowledge Base CZ - Project TODO

## Fáze 1: Základní infrastruktura

### Datové schéma a databáze
- [ ] Návrh tabulky `documents` v Drizzle ORM
- [ ] Návrh tabulky `knowledge_units` v Drizzle ORM
- [ ] Návrh tabulky `drug_products` v Drizzle ORM
- [ ] Návrh tabulky `drug_interactions` v Drizzle ORM
- [ ] Návrh tabulky `audit_logs` v Drizzle ORM
- [ ] Návrh tabulky `data_sources` v Drizzle ORM
- [ ] Návrh tabulky `etl_jobs` v Drizzle ORM
- [ ] Návrh tabulky `etl_job_logs` v Drizzle ORM
- [ ] Vytvoření indexů pro performance
- [ ] Setup fulltextového vyhledávání (MySQL FULLTEXT)
- [ ] Migrace databáze (`pnpm db:push`)
- [ ] Seed data pro testování

### Základní API
- [ ] Setup tRPC routerů pro documents
- [ ] Setup tRPC routerů pro knowledge_units
- [ ] Setup tRPC routerů pro drug_products
- [ ] Setup tRPC routerů pro drug_interactions
- [ ] Implementace autentizace (Admin, Editor, Viewer role)
- [ ] CRUD operace pro documents
- [ ] CRUD operace pro knowledge_units
- [ ] CRUD operace pro drug_products
- [ ] CRUD operace pro drug_interactions
- [ ] Error handling a validace
- [ ] API dokumentace

### Testování
- [ ] Unit testy pro DB queries (documents)
- [ ] Unit testy pro DB queries (knowledge_units)
- [ ] Unit testy pro DB queries (drug_products)
- [ ] Integration testy pro API (documents)
- [ ] Integration testy pro API (knowledge_units)
- [ ] Vitest setup a best practices

## Fáze 2: ETL Pipeline

### Scraper framework
- [ ] Abstraktní scraper base class
- [ ] Rate limiting implementace
- [ ] Retry logika s exponenciálním backoff
- [ ] Caching mechanismus
- [ ] Error handling a logging
- [ ] Monitoring a alerting

### SÚKL scraper
- [ ] Implementace scraperu pro SÚKL API
- [ ] Parsování CSV dat
- [ ] Extrakce drug products
- [ ] Validace dat
- [ ] Testy

### NIKEZ scraper
- [ ] Web scraper pro NIKEZ guidelines
- [ ] PDF parsování
- [ ] Extrakce klíčových informací
- [ ] Mapování kategorií
- [ ] Testy

### WikiSkripta scraper
- [ ] Web scraper pro WikiSkripta
- [ ] Extrakce článků
- [ ] Kategorizace obsahu
- [ ] Validace obsahu
- [ ] Testy

### Parser a validator
- [ ] PDF parser s OCR (Tesseract)
- [ ] HTML parser (Cheerio)
- [ ] CSV parser
- [ ] JSON Schema validace
- [ ] Pydantic modely
- [ ] Business rule validace
- [ ] Detekce duplikátů
- [ ] Testy

## Fáze 3: Administrační dashboard

### Layout a navigace
- [ ] DashboardLayout komponenta
- [ ] Sidebar navigace
- [ ] User menu a logout
- [ ] Responsive design
- [ ] Testy

### Správa datových zdrojů
- [ ] CRUD UI pro datové zdroje
- [ ] Konfigurace scraperu
- [ ] Scheduling ETL procesů
- [ ] Monitoring stavu
- [ ] Testy

### Monitoring ETL
- [ ] Dashboard s metrikami
- [ ] Historii ETL jobů
- [ ] Detailní logy
- [ ] Error reporting
- [ ] Performance metriky
- [ ] Testy

### Validace dat
- [ ] Zobrazení validačních chyb
- [ ] Manuální opravy
- [ ] Schválení dat
- [ ] Publikování
- [ ] Testy

### Reporting
- [ ] Statistiky o datech
- [ ] Pokrytí kategorií
- [ ] Kvalita dat
- [ ] Export reportů
- [ ] Testy

## Fáze 4: Vyhledávání a API

### Fulltextové vyhledávání
- [ ] Implementace search API
- [ ] Faceted search
- [ ] Filtrování
- [ ] Sorting a pagination
- [ ] Relevance ranking
- [ ] Testy

### Veřejné API
- [ ] REST API endpoints
- [ ] Rate limiting
- [ ] API versioning
- [ ] API dokumentace (OpenAPI/Swagger)
- [ ] API keys a autentizace
- [ ] Testy

### Vyhledávací UI
- [ ] Search interface
- [ ] Filtrování
- [ ] Zobrazení výsledků
- [ ] Detail znalostní jednotky
- [ ] Citace a odkazy
- [ ] Testy

## Fáze 5: Export a citace

### Export funkcionalita
- [ ] JSONL export
- [ ] CSV export
- [ ] Batch export
- [ ] Scheduling exportů
- [ ] Versioning exportů
- [ ] Testy

### Citace a odkazy
- [ ] Generování citací
- [ ] Tracking zdrojů
- [ ] Compliance s MDR
- [ ] Audit trail
- [ ] Testy

### Data integrity
- [ ] Checksums
- [ ] Validation na export
- [ ] Consistency checks
- [ ] Testy

## Fáze 6: Monitoring a alerting

### Monitoring systém
- [ ] Health checks
- [ ] Performance monitoring
- [ ] Database monitoring
- [ ] API monitoring
- [ ] Scraper monitoring

### Alerting
- [ ] Email notifications
- [ ] Slack integration
- [ ] Alert rules
- [ ] Escalation policies

### Logging a tracing
- [ ] Centralized logging
- [ ] Structured logging
- [ ] Distributed tracing
- [ ] Log retention

## Fáze 7: Optimizace a hardening

### Performance optimization
- [ ] Database query optimization
- [ ] Caching strategies
- [ ] API response optimization
- [ ] Frontend optimization

### Security hardening
- [ ] Input validation
- [ ] SQL injection prevention
- [ ] CSRF protection
- [ ] Rate limiting
- [ ] DDoS protection

### Scalability
- [ ] Load testing
- [ ] Horizontal scaling
- [ ] Database replication
- [ ] Cache layer

## Fáze 8: Dokumentace a deployment

### Dokumentace
- [ ] API dokumentace
- [ ] User guide
- [ ] Admin guide
- [ ] Developer guide
- [ ] Architecture documentation

### Deployment
- [ ] CI/CD pipeline
- [ ] Docker containerization
- [ ] Kubernetes deployment
- [ ] Database migrations
- [ ] Backup strategies

### Training
- [ ] Admin training
- [ ] Editor training
- [ ] API consumer training

## Poznámky

- Projekt je rozdělen do 8 fází s jasným cílem každé fáze
- Každá fáze má specifické deliverables a testy
- Celkový čas: ~20 týdnů (5 měsíců)
- Priorita: Fáze 1-4 jsou kritické pro MVP
- Fáze 5-8 jsou pro produkční nasazení
