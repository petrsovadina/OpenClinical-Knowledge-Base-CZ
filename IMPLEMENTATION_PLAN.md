# Implementační plán - OpenClinical Knowledge Base CZ

## Fáze 1: Základní infrastruktura (2-3 týdny)

### 1.1 Datové schéma a databáze
- Návrh a implementace tabulek v Drizzle ORM
- Vytvoření indexů pro vyhledávání a performance
- Setup fulltextového vyhledávání (MySQL FULLTEXT)
- Migrace a seed data pro testování
- Audit logging infrastruktura

### 1.2 Základní API
- Setup tRPC routerů
- Implementace autentizace (Admin, Editor, Viewer role)
- CRUD operace pro základní entity
- Error handling a validace
- API dokumentace

### 1.3 Testování
- Unit testy pro DB queries
- Integration testy pro API
- Vitest setup a best practices

## Fáze 2: ETL Pipeline (3-4 týdny)

### 2.1 Scraper framework
- Abstraktní scraper base class
- Rate limiting a retry logika
- Caching mechanismus
- Error handling a logging
- Monitoring a alerting

### 2.2 SÚKL scraper
- Implementace scraperu pro SÚKL API
- Parsování CSV dat
- Extrakce drug products
- Validace dat

### 2.3 NIKEZ scraper
- Web scraper pro NIKEZ guidelines
- PDF parsování
- Extrakce klíčových informací
- Mapování kategorií

### 2.4 WikiSkripta scraper
- Web scraper pro WikiSkripta
- Extrakce článků
- Kategorizace obsahu
- Validace obsahu

### 2.5 Parser a validator
- PDF parser s OCR (Tesseract)
- HTML parser (Cheerio)
- CSV parser
- JSON Schema validace
- Pydantic modely
- Business rule validace

## Fáze 3: Administrační dashboard (2-3 týdny)

### 3.1 Layout a navigace
- DashboardLayout komponenta
- Sidebar navigace
- User menu a logout
- Responsive design

### 3.2 Správa datových zdrojů
- CRUD pro datové zdroje
- Konfigurace scraperu
- Scheduling ETL procesů
- Monitoring stavu

### 3.3 Monitoring ETL
- Dashboard s metrikami
- Historii ETL jobů
- Detailní logy
- Error reporting
- Performance metriky

### 3.4 Validace dat
- Zobrazení validačních chyb
- Manuální opravy
- Schválení dat
- Publikování

### 3.5 Reporting
- Statistiky o datech
- Pokrytí kategorií
- Kvalita dat
- Export reportů

## Fáze 4: Vyhledávání a API (2-3 týdny)

### 4.1 Fulltextové vyhledávání
- Implementace search API
- Faceted search
- Filtrování
- Sorting a pagination
- Relevance ranking

### 4.2 Veřejné API
- REST API endpoints
- Rate limiting
- API versioning
- API dokumentace (OpenAPI/Swagger)
- API keys a autentizace

### 4.3 Vyhledávací UI
- Search interface
- Filtrování
- Zobrazení výsledků
- Detail znalostní jednotky
- Citace a odkazy

## Fáze 5: Export a citace (1-2 týdny)

### 5.1 Export funkcionalita
- JSONL export
- CSV export
- Batch export
- Scheduling exportů
- Versioning exportů

### 5.2 Citace a odkazy
- Generování citací
- Tracking zdrojů
- Compliance s MDR
- Audit trail

### 5.3 Data integrity
- Checksums
- Validation na export
- Consistency checks

## Fáze 6: Monitoring a alerting (1-2 týdny)

### 6.1 Monitoring systém
- Health checks
- Performance monitoring
- Database monitoring
- API monitoring
- Scraper monitoring

### 6.2 Alerting
- Email notifications
- Slack integration
- Alert rules
- Escalation policies

### 6.3 Logging a tracing
- Centralized logging
- Structured logging
- Distributed tracing
- Log retention

## Fáze 7: Optimizace a hardening (1-2 týdny)

### 7.1 Performance optimization
- Database query optimization
- Caching strategies
- API response optimization
- Frontend optimization

### 7.2 Security hardening
- Input validation
- SQL injection prevention
- CSRF protection
- Rate limiting
- DDoS protection

### 7.3 Scalability
- Load testing
- Horizontal scaling
- Database replication
- Cache layer

## Fáze 8: Dokumentace a deployment (1 týden)

### 8.1 Dokumentace
- API dokumentace
- User guide
- Admin guide
- Developer guide
- Architecture documentation

### 8.2 Deployment
- CI/CD pipeline
- Docker containerization
- Kubernetes deployment
- Database migrations
- Backup strategies

### 8.3 Training
- Admin training
- Editor training
- API consumer training

## Časový plán

| Fáze | Trvání | Start | Konec |
|------|--------|-------|-------|
| 1. Základní infrastruktura | 2-3 týdny | Týden 1 | Týden 3 |
| 2. ETL Pipeline | 3-4 týdny | Týden 3 | Týden 7 |
| 3. Admin dashboard | 2-3 týdny | Týden 7 | Týden 10 |
| 4. Vyhledávání a API | 2-3 týdny | Týden 10 | Týden 13 |
| 5. Export a citace | 1-2 týdny | Týden 13 | Týden 15 |
| 6. Monitoring | 1-2 týdny | Týden 15 | Týden 17 |
| 7. Optimizace | 1-2 týdny | Týden 17 | Týden 19 |
| 8. Dokumentace | 1 týden | Týden 19 | Týden 20 |

**Celkový čas: ~20 týdnů (5 měsíců)**

## Rizika a mitigation

| Riziko | Pravděpodobnost | Impact | Mitigation |
|--------|-----------------|--------|-----------|
| Komplexnost PDF parsování | Vysoká | Vysoký | Ověřit OCR knihovny, mít fallback |
| Dostupnost zdrojů | Střední | Střední | Rate limiting, retry logika, monitoring |
| Data quality issues | Vysoká | Vysoký | Robustní validace, manuální review |
| Performance problémy | Střední | Střední | Load testing, optimizace, caching |
| Security vulnerabilities | Střední | Vysoký | Security audit, penetration testing |

## Metriky úspěchu

- Pokrytí datových zdrojů: >90% dostupných dat
- Data quality: >95% validních záznamů
- API uptime: >99.5%
- Search performance: <500ms response time
- ETL reliability: >99% success rate
- User satisfaction: >4.0/5.0 rating
