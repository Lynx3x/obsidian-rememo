"""Crop the raw captures in tools/screenshots/shoot.ps1 into README assets.

Run after shoot.ps1:  python tools/screenshots/crop.py [--raw DIR] [--out DIR]

Raw captures are full-window (1300x980, window-relative coordinates). Boxes below are
(x1, y1, x2, y2) in that space -- re-measure them if the window size or layout changes.
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


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--raw', default=os.path.join(os.environ.get('TEMP', '/tmp'), 'rememo-shots'))
    ap.add_argument('--out', default=os.path.join(REPO, 'assets', 'screenshots'))
    args = ap.parse_args()
    os.makedirs(args.out, exist_ok=True)

    for name, box in SPECS:
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
