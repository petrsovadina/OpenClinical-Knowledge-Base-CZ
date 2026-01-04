# OpenClinical-Knowledge-Base-CZ-
Open-source strukturovaná znalostní báze pro AI v českém zdravotnictví.  Cílem tohoto projektu je transformovat nestrukturované lékařské texty (doporučené postupy, SPC, věstníky) do strojově čitelného formátu (JSON), který umožní vývoj bezpečných a fakticky přesných AI aplikací (RAG, Chatbots, Decision Support).
---
🏥 OpenClinical Knowledge Base (CZ)Open-source strukturovaná znalostní báze pro AI v českém zdravotnictví.Cílem tohoto projektu je transformovat nestrukturované lékařské texty (doporučené postupy, SPC, věstníky) do strojově čitelného formátu (JSON), který umožní vývoj bezpečných a fakticky přesných AI aplikací (RAG, Chatbots, Decision Support) v prostředí českého zdravotnictví.⚠️ DŮLEŽITÉ UPOZORNĚNÍ (MDR & Legal Disclaimer)Tento projekt, software a data v něm obsažená slouží VÝHRADNĚ pro informační, vzdělávací a výzkumné účely.❌ Nejedná se o zdravotnický prostředek ve smyslu Nařízení EU 2017/745 (MDR) ani zákona č. 268/2014 Sb.❌ Software a data neposkytují diagnózu ani terapeutická doporučení pro konkrétní pacienty.✅ Software slouží jako inteligentní vyhledávač v odborné literatuře (Information Retrieval System).Pro uživatele (lékaře): Jakékoliv použití dat v klinické praxi podléhá vaší výhradní odpovědnosti. Informace získané z tohoto zdroje je nutné ověřit v originálním dokumentu (SPC, Věstník MZ, Doporučený postup).🎯 Cíle projektuStrukturovat chaos: Převést tisíce PDF dokumentů (KDP, Věstníky, SPC) na sémantická data.Podpořit AI vývoj: Poskytnout čistý, citovatelný dataset pro trénink a grounding (RAG) českých LLM modelů.Farmakologická bezpečnost: Vytvořit mapu lékových interakcí na základě otevřených dat SÚKL.Otevřenost: Data jsou a zůstanou open-source.📚 Datové zdrojeProjekt integruje data výhradně z veřejných a důvěryhodných zdrojů:SÚKL (Opendata): Číselníky léčiv, SPC (Souhrny údajů o přípravku).KDP ÚZIS / NIKEZ: Národní klinické doporučené postupy a metodiky.Odborné společnosti ČLS JEP: Doporučené postupy (např. Kardiologická, Diabetologická spol.).WikiSkripta (1. LF UK): Klinické články (s důrazem na validaci a filtrování).🏗 Struktura repozitářeopen-clinical-kb-cz/
├── data/
│   ├── raw/                  # Surová data (PDF, HTML dump) - ignorováno v gitu
│   ├── processed/            # Finální JSONL soubory (Guidelines, Interactions)
│   └── synthetic/            # AI generované kazuistiky pro trénink
├── docs/
│   ├── PRD.md                # Produktová specifikace (Business & Scope)
│   └── TECHNICAL_SPEC.md     # Technická architektura scraperů a ETL
├── schemas/                  # JSON Schémata pro validaci dat
│   ├── guideline.schema.json
│   └── drug_interaction.schema.json
└── scripts/                  # ETL Pipeline (Scrapers, Parsers)
🚀 Getting StartedPrerekvizityPython 3.10+Poetry nebo pipAPI klíč k LLM (OpenAI/Anthropic) pro extrakční část pipelineInstalacegit clone [https://github.com/your-org/open-clinical-kb-cz.git](https://github.com/your-org/open-clinical-kb-cz.git)
cd open-clinical-kb-cz
pip install -r requirements.txt
Použití (Příklady)1. Stažení databáze léků ze SÚKL:python scripts/sukl_scraper.py --mode=dlp
2. Extrakce interakcí z PDF (vyžaduje stažená SPC):python scripts/extract_interactions.py --source=sukl_spc --limit=100
🤝 Jak přispětVítáme příspěvky od vývojářů, datových analytiků i lékařů!Lékaři: Validace extrahovaných dat, návrhy na chybějící zdroje, kontrola klinické relevance.Vývojáři: Tvorba scraperů pro nové weby, vylepšování JSON schémat, optimalizace RAG pipeline.Viz CONTRIBUTING.md pro detaily.📄 LicenceDistribuováno pod licencí MIT. Data třetích stran (SÚKL, ÚZIS) podléhají jejich vlastním licenčním podmínkám pro Opendata.
