# Demo note sets

Daily notes used for the screenshots in `README.md` (and the screenshots for the
docs). They are ordinary Rememo data — card blocks under `## Memo` — so they can be
copied into any vault's daily-notes folder and read as-is.

```
tools/demo/
├── apply.ps1      # copies a set into a vault's daily folder (backs up first)
└── en/            # English set (dates 2022-10 → 2026-09)
```

## What the set is built for

- **Page 1 is the whole story.** The first ten memos (newest first) each demonstrate
  one feature: text + `==highlight==`, tag chips, task card (open / done), image card,
  quote, inline formatting, `[[wikilink]]`, list + paragraphs, and a card with
  `N REFERENCES` (replies are reference cards — hidden from the list, aggregated on
  the parent).
- **Everything older only exists to give the heat map a believable shape** — a mostly
  quiet June/July, a busier August, a dense September.
- **Deleted cards** (2026-09-07, 09-08, 09-10) are what the recycle-bin screenshot shows.
- Two very old notes (2022-10-19, 2024-12-03) exist so the stats row shows a long
  history; 2022-10-19 also sets the "day" counter.

## Usage

```powershell
powershell -File tools/demo/apply.ps1                 # en set into the dev vault
powershell -File tools/demo/apply.ps1 -Clean          # pristine run (wipes daily/*.md after backup)
```

Then reload the view in Obsidian — click the **Rememo** list title (or reopen it).

## Adding a language

Copy `en/` to `<lang>/` and translate the memo **bodies** — keep the dates, ids,
card types, tags and `[@](file#^id)` links identical so both languages reproduce the
same layout, heat map and reference counts.
