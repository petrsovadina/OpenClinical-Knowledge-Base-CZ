# **Product Requirements Document (PRD)**

Název projektu: OpenClinical Knowledge Base (CZ)  
Verze: 1.0  
Status: In Development

## **1\. Exekutivní shrnutí**

České zdravotnictví disponuje obrovským množstvím kvalitních dat a metodik, které jsou však "uzamčeny" v nestrukturovaných formátech (PDF, naskenované obrázky, HTML tabulky). Lékaři v praxi nemají čas prohledávat desítky dokumentů a AI modely (jako GPT-4) bez kvalitního kontextu v českém medicínském prostředí často chybují.

**OpenClinical KB** je infrastrukturní projekt, který vytváří **otevřenou, strukturovanou databázi** českých klinických a farmakologických znalostí. Slouží jako spolehlivá "Middle-layer" pro jakoukoliv zdravotnickou AI aplikaci.

## **2\. Definice problému**

1. **Fragmentace:** Znalosti jsou roztříštěné mezi SÚKL, ÚZIS, weby odborných společností a věstníky MZ.  
2. **Formát:** 95 % klíčových dat (guidelines) je v PDF, což je pro RAG (Retrieval-Augmented Generation) bez pre-processingu nevhodné.  
3. **Absence interakcí:** V ČR neexistuje otevřená databáze lékových interakcí (pouze komerční, uzavřená řešení).  
4. **MDR Riziko:** Vývojáři se bojí vstoupit do zdravotnictví kvůli přísné regulaci (MDR).

## **3\. Řešení & Value Proposition**

Vytvoříme ETL (Extract-Transform-Load) pipeline, která:

1. **Najde** relevantní dokument (Smart Scraping).  
2. **Přečte** text a pochopí strukturu (LLM Extraction & OCR).  
3. **Uloží** data jako atomické "Znalostní jednotky" (Structured JSON).

**Hodnota:**

* **Pro lékaře:** Možnost vyhledat "postup léčby X" během vteřin s odkazem na konkrétní odstavec v doporučeném postupu.  
* **Pro vývojáře:** Odpadá nutnost budovat vlastní datový tým a řešit scraping 50 různých webů.  
* **Legální bezpečnost:** Nástroj je definován jako "Information Retrieval System" (vyhledávač), nikoliv diagnostický nástroj.

## **4\. Cílová skupina (Personas)**

### **A. MUDr. Tomáš (Sekundární lékař / Kmen)**

* **Situace:** Slouží noční na interně, přijímá polymorbidního pacienta.  
* **Pain:** Potřebuje ověřit interakci Warfarinu a nově nasazeného antibiotika, SÚKL web je pomalý a nepřehledný.  
* **Goal:** Rychle získat informaci: *"Kombinace zvyšuje INR, doporučeno snížit dávku Warfarinu o 30 %."*

### **B. AI Vývojář Petr**

* **Situace:** Chce postavit českého "Medical Co-pilota" pro mediky.  
* **Pain:** Nemá trénovací data. GPT-4 si vymýšlí neexistující české léky.  
* **Goal:** Stáhnout si soubor clinical\_guidelines\_v1.jsonl a použít ho pro grounding svého modelu.

## **5\. Scope (Rozsah) \- Fáze 1 (MVP)**

### **Modul A: Farmakologie (SÚKL) \- Priorita 1**

* **Vstup:** SÚKL Open Data (CSV) \+ SPC (PDF).  
* **Výstup:** Databáze interakcí, kontraindikací a dávkování.  
* **Metrika:** Zpracovat SPC pro top 500 nejčastěji předepisovaných účinných látek.

### **Modul B: Klinické standardy (KDP/ČLS JEP) \- Priorita 2**

* **Vstup:** Portál KDP (kdp.uzis.cz), weby odborných společností (kardio, diabetologie, VPL).  
* **Výstup:** Strukturované algoritmy (Symptom \-\> Vyšetření \-\> Terapie) \+ Citace.  
* **Metrika:** Pokrytí oborů VPL (Všeobecné praktické lékařství) a Kardiologie.

### **Modul C: Syntetické kazuistiky \- Priorita 3**

* **Vstup:** Guidelines (Modul B).  
* **Výstup:** Generované klinické scénáře pro trénink/testování AI ("Few-shot examples").  
* **Metrika:** 50 validovaných scénářů.

## **6\. Klíčová omezení (Constraints)**

* **Žádná osobní data:** Zpracováváme pouze veřejné dokumenty, žádná data pacientů (GDPR safe).  
* **Source Traceability:** Každý záznam v DB **musí** obsahovat URL na zdrojový PDF dokument. Bez zdroje je data invalidní.