# Screenshots — how they are made

The README images are shot from a **demo vault** (the dev vault with `tools/demo/en/`
applied), so they can be re-shot whenever the UI changes. Everything here is scripted;
the only manual part is looking at the result.

## 0. What exists

| File | Shows |
|---|---|
| `assets/screenshots/00-overview.png` | the composed promo image used at the top of the README (hero + four tilted feature cards) |
| `assets/screenshots/01-main.png` | hero: the whole view — stats, heat map, nav, tag list, editor, newest cards |
| `assets/screenshots/02-editor.png` | editor in task mode (slider on the task half, task placeholder) |
| `assets/screenshots/03-tags.png` | `FILTER: 🏷 reading` chip + the filtered feed |
| `assets/screenshots/04-recycle.png` | recycle-bin header + soft-deleted cards |
| `assets/screenshots/05-references.png` | memo dialog: a card and its `2 REFERENCES` |
| `assets/screenshots/06-feed.png` | the raw crop of the feed below the hero: quote, inline formatting, finished task, tags, wikilinks, list, pagination |
| `assets/screenshots/06-rich-text.png` | that crop framed like the overview (gradient + rounded card + label pill) — what the README shows |

## 1. Prerequisites

- Obsidian open on the **dev vault** (`L:\Files\ObsidianDevVault`) with the current build
  (`pnpm build`) and Rememo enabled.
- **UI language = English** — Settings → About → Language. The plugin reads `moment.locale()`
  once at load; `.obsidian/app.json` `{"locale": "en"}` works too but needs a reload.
- **Light theme**, default accent. The current set was shot with the interface font
  *思源黑体 CN* — keep it, or re-shoot the whole set after changing fonts.
- Demo notes applied: `powershell -File tools/demo/apply.ps1` (backs up `daily\*.md` first),
  then reload the view — click the **Rememo** list title.
- Window: the scripts resize it to **1300×980 at (200, 50)**. The plugin view centres its
  content, so a much wider window only adds dead space.

## 2. Shoot

```powershell
powershell -File tools/screenshots/shoot.ps1                  # all six -> %TEMP%\rememo-shots\*-raw.png
powershell -File tools/screenshots/shoot.ps1 -Only 03-tags    # one step, for iterating
```

| Script | Role |
|---|---|
| `_win.ps1` | finds the window: enumerates top-level windows of `obsidian.exe` (`.NET`'s `MainWindowTitle` goes empty while a popout is open) and matches on the `ObsidianDevVault` title |
| `resize.ps1` / `click.ps1` / `scroll.ps1` / `shot.ps1` | move / click / wheel / capture one action |
| `shoot.ps1` | the step table: what to click, when to capture |

Every action re-reads the window rect, so a *moved* window is fine. A **re-laid-out** UI is not:
re-measure the coordinates in the `$C` table at the top of `shoot.ps1` (each is commented with
what it targets). Iterate one shot at a time with `-Only` and look at the PNG before moving on.

Traps learned the hard way:

- clicking the list title re-reads the notes, and the re-read **keeps the old scroll offset** —
  scroll to the top *after* it;
- the cursor parks itself on empty background right before every capture, otherwise hover
  tooltips (e.g. the slider's "Task") end up in the image;
- `SendKeys` is blocked in this environment — drive the UI with mouse events only;
- the task/plain slider **toggles whichever half you click** — clicking the left half is the way
  back to plain mode.

## 3. Crop

```bash
python tools/screenshots/crop.py            # %TEMP%\rememo-shots\*-raw.png -> assets/screenshots/*.png
```

Boxes live in `SPECS` (window-relative `x1, y1, x2, y2` at 1300×980) — re-measure if the window
size changes. `01-main` keeps the Obsidian tab bar but drops the OS title bar and the empty band
to the right of the centred view.

`06` covers the whole tail of the feed, which does not fit the 1300×980 viewport: its step in
`shoot.ps1` grows the window to **1300×1400** (the screen is 1440 tall), scrolls to the page
footer, shoots, and restores the window. Its crop box therefore lives in `SPECS_1400`, and it
takes the list column only (the sidebar is mostly empty at that height, and the box stops before
the list scrollbar). The crop lands in `06-feed.png`; `feed.html` then frames it into
`06-rich-text.png`, the one the READMEs embed:

## 3b. Compose the overview

```powershell
powershell -File tools/screenshots/render-overview.ps1   # overview.html -> assets/screenshots/00-overview.png
```

```powershell
powershell -File tools/screenshots/render-overview.ps1 -Html tools/screenshots/feed.html `
  -Out assets/screenshots/06-rich-text.png -Width 700 -Height 1010
```

`tools/screenshots/overview.html` lays the hero and the four feature cards out with CSS
(`position: absolute` + `transform: rotate()` + `box-shadow`) and headless Edge screenshots it at
2x, downscaled to 1500px wide. **Edit the CSS, not a script** — layout, tilt, shadows and the
label pills all live in that file; it uses a throw-away Edge profile so nobody's browser session
is touched.

## 4. Check before committing

Open each PNG and confirm: English UI, no OS title bar, no cursor/tooltip, no Chinese text and
no personal content from the vault, and that the image still matches its README caption.

## 5. Other languages

`tools/demo/<lang>/` holds one set per language — same dates, ids, tags, card types and
`[@](file#^id)` links, translated bodies only, so layout, heat map and reference counts are
identical. Root-level link targets live in `tools/demo/vault/<lang>/`.

Switch Obsidian's UI language first (Settings → About → Language) — the plugin reads the locale
once at load — then run the same pipeline with a suffix, which keeps every language's images side
by side:

```powershell
powershell -File tools/demo/apply.ps1 -Lang zh
powershell -File tools/screenshots/shoot.ps1 -Suffix .zh -Lang zh
python tools/screenshots/crop.py --suffix .zh                     # -> 01-main.zh.png ... 06-feed.zh.png
powershell -File tools/screenshots/render-overview.ps1 -Suffix .zh
powershell -File tools/screenshots/render-overview.ps1 -Html tools/screenshots/feed.html `
  -Suffix .zh -Out assets/screenshots/06-rich-text.zh.png -Width 745 -Height 1055
```

The two HTML layouts carry `{SUFFIX}` in their image paths, so one file serves every language.
Point each README at its own files (`README.zh.md` → `*-zh.png`).
