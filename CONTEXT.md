# Memos Plus — Domain Context

> Domain glossary for the Obsidian plugin **Memos Plus** (`obsidian-memos-plus`). Gives names to the domain concepts and to the good seams. Kept in sync as architecture work proceeds.

## The plugin in one line

Captures ideas ("memos") into Obsidian **daily notes**, lists them back, lets you tag / search / filter / share them, and (optionally) comment on them.

## Core domain terms

| Term | Meaning |
|---|---|
| **memo** | A single captured idea. Stored as a list item under a heading in a daily note (e.g. `- [ ] 12:34:56 内容`). Has `createdAt`, `memoType` (`JOURNAL` / `TASK-TODO` / `TASK-DONE` / custom), and an id. |
| **memo line** | The physical line in a note that holds one memo. Its textual grammar (timestamp + task mark + content + optional `^blockid` + optional comment markers) is the plugin's core data format. |
| **daily note** | A day file in the daily-notes folder (e.g. `diary/2026-08-28.md`). The **single source of truth** for memo data. Memos live under the `## Memo` heading (configurable). |
| **memo heading** | The heading under which memos are inserted and processed (`InsertAfter` / `ProcessEntriesBelow` settings). |
| **block id** | The `^xxxxxx` suffix that pins a memo line for linking/commenting. Currently not persisted reliably (id derives from line number) — a known friction. |
| **recycle bin** | The `delete.md` file in the daily-notes folder holding soft-deleted memos (format: `- {ts}{line} {content} deletedAt: {ts}{line}`). |
| **query** | A saved filter, stored in `query.md`. Not currently used by this vault. |
| **comment** | A reply to a memo, stored inline as an indented child item (or as a separate comment memo). Currently disabled in this vault's settings. |
| **tag** | `#tag` tokens extracted from memo content, hierarchical (`a/b`). |
| **setting** | A value from `plugin.settings` (35 of them). Currently re-exported as module-level `let`s from `memos.ts` — a known leak. |

## Subsystems (good seams)

- **Note IO** — everything that reads/writes note files (daily notes, recycle bin, query file). Lives in `src/obComponents/*`.
- **Memo list** — the in-memory list + filtering + heatmap + copy-as-text view of memos.
- **Memo rendering** — turning a memo line into HTML / images (share card, daily view, card dialog).
- **Editor** — the composer for new memos and comments.

## Architecture work notes

- The **Note IO** subsystem is a shallow pass-through today: `helpers/api.ts` forwards 1:1 to `obComponents/*`, which repeat regex grammar across ~5 modules. Deepening target.
- The **memo line** grammar is the single most repeated concept: regexes for it appear in `obGetMemos`, `obCreateMemo`, `obHideMemo`, `obUpdateMemo`, `obCopyMemos`, `obGetQueries`, `obUpdateQuery`, `obPinQuery`, `obDeleteMemo`. One parse/serialize module is the natural seam.
- The **image parsing** grammar repeats in `MemoImage`, `DailyMemo`, `ShareMemoImageDialog`. `MemoImage` is the emerging deep module.
- No tests exist today. Interfaces are the test surface; see [REFACTOR-2026.md](REFACTOR-2026.md) for the plan.

## Decisions (from 2026-08-28 grilling)

- **Date pick (specified date add):** editor date picker only (no batch-import panel). One memo per action; user moves phone memos in one-by-one. Writing time: user fills `HH:mm`; blank falls back to a default (exact default TBD).
- **Network images:** fix regex bugs (webp, query-string URLs) AND add adaptive width (single/large images fit card width; multi still grid). User notes current image preview is rough and buggy.
- **Comments:** user wants to see concrete data-structure options (flomo-style flat source + rendered hierarchy vs true tree) before choosing; rendering should show hierarchy even if the source stays flat. Multi-level support desired.
- **Memo reference display** and **xiaohongshu export**: accepted as new features (xiaohongshu lower priority).
- **Execution order (confirmed 2026-08-28):** user prioritises **refactor/cleanup over new features** (features not urgent). Clean old problems (REFACTOR-2026 dead code + data bugs) AND architecture-deepening candidates (per architecture-review HTML) first; features after. Also: confirm and delete obsolete old docs with user before removing.

## Current-state facts (verified 2026-08-28)

- **Date pick: partially built.** `waitForInsert` / `memoService.createMemo` already accept an `insertDate` param, but the editor's date picker only inserts a `[[date]]` text into content — it does **not** write the memo to that date. The seam exists; the UI wiring doesn't.
- **Network images: already supported in one path.** `MemoImage` parses `MARKDOWN_WEB_URL_REG` into external URLs and renders them (with a bug: `wepg` typo, missing `webp`/query strings). Local/wikilink images also work. The duplication is across `MemoImage` / `DailyMemo` / `ShareMemoImageDialog`.
- **Comments: dual-track + disabled.** Feature is off in this vault (`CommentOnMemos=false`). When on, it's two storages (inline child items vs separate comment memos) branched on `CommentsInOriginalNotes`, tied via `linkId` (string match). Not multi-level. `obCommentMemo` silently returns `undefined` when path is absent.
- **Memo reference: clickable but read-only.** `[@label](id)` in content renders as a clickable `.memo-link-text` that opens a `MemoCardDialog`; the card also lists "linked memos" (memos containing the ref). No backlink/multi-direction display in the memo list itself.
- **Share image: exists, not xiaohongshu-tuned.** `ShareMemoImageDialog` renders a memo to an image (`toImage`, pixelRatio 2) with footer/background options and copy/save. Aspect, max-width and text layout are not tuned to xiaohongshu (3:4, ~1242×1660) format.

_See also: [REFACTOR-2026.md](REFACTOR-2026.md) (the working refactor plan) — this file records vocabulary, that file records plan._
