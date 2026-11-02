import json, re, math, sys
import pymupdf as fitz
from PIL import Image, ImageDraw
from generate import SCALE
D = json.load(open('sp_floorplans.json'))
pages = {lv: fitz.open(f'{lv}.pdf')[0] for lv in ('ground', 'upper')}
renders = {}
Z = 6
for lv, p in pages.items():
    pix = p.get_pixmap(matrix=fitz.Matrix(Z, Z)); renders[lv] = Image.frombytes('RGB', (pix.width, pix.height), pix.samples).convert('L').convert('RGB')
tiles = []
for key, v in D.items():
    u, lv = key.split('-'); m = SCALE[lv]; ang = math.radians(v['angle']); x0, y0 = v['origin']
    def back(cx, cy):
        X = cx / 100 / m + x0; Y = cy / 100 / m + y0
        return (X * math.cos(ang) - Y * math.sin(ang), X * math.sin(ang) + Y * math.cos(ang))
    corners = [back(0, 0), back(v['width'], 0), back(v['width'], v['height']), back(0, v['height'])]
    bx0 = min(c[0] for c in corners) - 8; by0 = min(c[1] for c in corners) - 8
    bx1 = max(c[0] for c in corners) + 8; by1 = max(c[1] for c in corners) + 8
    im = renders[lv].crop((int(bx0 * Z), int(by0 * Z), int(bx1 * Z), int(by1 * Z))).copy()
    dr = ImageDraw.Draw(im, 'RGBA')
    for sub in re.findall(r'M[^M]*', v['walls']):
        pts = [tuple(map(float, q.split())) for q in re.split('[MLZ]', sub) if q.strip()]
        if len(pts) > 2:
            dr.polygon([((back(*q)[0] - bx0) * Z, (back(*q)[1] - by0) * Z) for q in pts], fill=(220, 0, 0, 90), outline=(220, 0, 0, 255))
    for l in v['labels']:
        x, y = back(l['x'], l['y']); dr.ellipse([(x - bx0) * Z - 5, (y - by0) * Z - 5, (x - bx0) * Z + 5, (y - by0) * Z + 5], fill=(0, 90, 255, 230))
    im.thumbnail((620, 620)); tiles.append((key, im))
W = Image.new('RGB', (620 * 4, 640 * 3), 'white'); dr = ImageDraw.Draw(W)
for i, (k, im) in enumerate(tiles):
    W.paste(im, ((i % 4) * 620, (i // 4) * 640 + 18)); dr.text(((i % 4) * 620 + 4, (i // 4) * 640 + 2), k, fill='black')
W.save('overlay-all.png'); print('ok')
