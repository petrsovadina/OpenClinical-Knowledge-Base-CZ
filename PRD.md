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
