"""Crop the raw captures in tools/screenshots/shoot.ps1 into README assets.

Run after shoot.ps1:  python tools/screenshots/crop.py [--raw DIR] [--out DIR]

SPECS boxes are (x1, y1, x2, y2) in the *normal* window (1300x980); SPECS_1400 boxes are for
the one shot taken in a temporarily taller window (1300x1400 — see the 06 step in shoot.ps1).
Both are window-relative, so re-measure if the window size or the layout changes.
"""
import argparse
import os
from PIL import Image

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

SPECS = [
    # name              box (window-relative)        notes
    ('01-main',        (0, 28, 1165, 978)),   # hero: full app minus the OS title bar / dead right band
    ('02-editor',      (470, 172, 1145, 622)),  # editor in task mode + the cards behind it (3:2)
    ('03-tags',        (470, 172, 1145, 622)),  # FILTER chip + filtered cards (3:2)
    ('04-recycle',     (470, 150, 1145, 600)),  # recycle-bin header + soft-deleted cards (3:2)
    ('05-references',  (390, 140, 905, 483)),   # dialog: card + its 2 references (3:2)
]

# The tail of the feed (quote → finished task → tags → wikilinks → list → pagination) does
# not fit the normal viewport, so that one shot is taken in a 1300x1400 window and cropped
# here — the list column only (the sidebar would show a tall empty area below its content).
SPECS_1400 = [
    ('06-feed', (470, 372, 1105, 1325)),   # keep the card's right edge and the list scrollbar in frame
]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--raw', default=os.path.join(os.environ.get('TEMP', '/tmp'), 'rememo-shots'))
    ap.add_argument('--out', default=os.path.join(REPO, 'assets', 'screenshots'))
    args = ap.parse_args()
    os.makedirs(args.out, exist_ok=True)

    for specs in (SPECS, SPECS_1400):
        for name, box in specs:
            src = os.path.join(args.raw, f'{name}-raw.png')
            if not os.path.exists(src):
                print(f'skip {name}: no {src}')
                continue
            img = Image.open(src).crop(box)
            dst = os.path.join(args.out, f'{name}.png')
            img.save(dst, 'PNG', optimize=True)
            print(f'{name}.png  {img.width}x{img.height}  {os.path.getsize(dst) // 1024} KiB')


if __name__ == '__main__':
    main()
