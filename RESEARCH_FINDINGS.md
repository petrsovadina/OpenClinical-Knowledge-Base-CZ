# Výzkumné nálezy - OpenClinical Knowledge Base CZ

## 1. Datové zdroje

### SÚKL (Státní ústav pro kontrolu léčiv)
- **Portál:** https://opendata.sukl.cz/
- **Dostupné datové sady:**
  - Databáze léčivých přípravků (DLP) - CSV formát
  - SPC (Souhrn údajů o léčivém přípravku) - týdenní změny
  - PIL (Příbalová informace)
  - Obaly - texty na obalu léčivého přípravku
  - Seznam schválených lékáren
  - Registr zdravotnických prostředků
  - Hlášení o uvedení, přerušení, ukončení a obnovení dodávek
  - Měsíční souhrnné informace o výdejích léčiv
  - Dodávky léčivých přípravků
- **Formáty:** CSV (kódování win-1250 nebo UTF-8)
- **Periodicita:** Denní, týdenní, měsíční aktualizace
- **API:** Dostupné datové rozhraní
- **Kontakt:** opendata@sukl.gov.cz

### ÚZIS / NIKEZ (Národní institut kvality a excelence zdravotnictví)
- **Portál:** http://nikez.mzcr.cz/
- **Obsah:** Národní klinické doporučené postupy (DP) a operativní doporučení (OD)
- **Publikace:** Věstník MZD
- **Stav:** Projekt KDP ukončen v roce 2022, tvorba pokračuje pod NIKEZ
- **Formát:** HTML, PDF dokumenty

### WikiSkripta (1. LF UK)
- **Portál:** https://www.wikiskripta.eu/
- **Obsah:** Validované klinické články, studijní materiály
- **Návštěvnost:** Až 55 000 lidí za den
- **Pokrytí:** Články pro studenty českých a slovenských lékařských fakult
- **Struktura:** Wiki formát s kategoriemi podle ročníků a oborů

## 2. Regulační rámec

### MDR (Nařízení EU 2017/745)
- Nařízení Evropského parlamentu a Rady (EU) 2017/745 ze dne 5. dubna 2017
- Reguluje zdravotnické prostředky
- Vyžaduje compliance pro AI aplikace v medicíně
- **Klíčový bod:** Projekt NENÍ zdravotnický prostředek, ale infrastruktura pro AI

### AI Regulace v ČR
- Ministerstvo zdravotnictví zavádí pracovní skupinu pro AI
- Transparentnost a ochrana zdravotních údajů jsou klíčové
- Compliance strategie musí propojovat MDR/IVDR a AI nařízení

## 3. Technologické trendy

### RAG (Retrieval-Augmented Generation)
- Technika pro zlepšení LLM výstupů integrací externích znalostí
- Zvyšuje faktickou přesnost a relevanci odpovědí
- Ideální pro zdravotnické aplikace
- Vyžaduje strukturované, citovatelné datové zdroje

### AI v českém zdravotnictví
- Více než polovina českých nemocnic používá AI
- Nejčastěji v radiologii a administrativě
- Rostoucí zájem o decision support systémy

## 4. Technické požadavky

### Parsování PDF
- Potřeba OCR pro naskenované dokumenty
- Extrakce strukturovaných informací z nestrukturovaných textů
- Zpracování tabulek a seznamů

### Scraping
- Rate limiting pro veřejné zdroje
- Error handling a retry logika
- Respektování robots.txt a podmínek užití

### Validace dat
- JSON Schema validace
- Pydantic modely pro type-safe zpracování
- Audit trail pro sledování změn

## 5. Architekturní úvahy

### Databáze
- Potřeba fulltextového vyhledávání
- Metadata dokumentů (zdroj, datum, verze)
- Znalostní jednotky (atomické, citovatelné)
- Lékové interakce
- Audit trail

### API
- Rate limiting
- Verzování
- Dokumentace
- Autentizace/autorizace

### Export
- JSONL formát pro AI trénování
- Citace a odkazy na originální dokumenty
- Metadata pro traceability

### Monitoring
- Kvalita dat
- Chybovost scraperů
- Dostupnost zdrojů
- Performance metriky
