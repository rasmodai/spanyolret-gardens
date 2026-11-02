"""Generate lib/floorplans.ts for Spanyolrét Gardens from the permit drawings
(E24037 v2.0, vector PDFs: ground floor and upper floor). Each PDF was printed
to fit the page: the scale is read from its own dimension lines."""
import json, math, re, sys, os
import numpy as np
from shapely.geometry import Polygon, Point, LineString, box, MultiPolygon
from shapely.ops import unary_union, polygonize
from shapely import affinity
from sp_common import load, labels, subpaths

SCALE = {'ground': 0.109361, 'upper': 0.076905}  # metres per pt (dimension lines, see README)
WALL_LAYERS = {'B-Fal-külső.STR', 'B-Fal-belső.STR', 'C-Belső határolószerkezet.ARC'}
OPEN_LAYERS = WALL_LAYERS | {'C-Függönyfal.ARC'}
KIND = {'ELŐSZOBA': 'entrance', 'ZUHANYZÓ': 'shower', 'NAPPALI': 'living', 'SZOBA': 'bedroom',
        'KONYHA': 'kitchenDining', 'KAMRA': 'pantry', 'LÉPCSŐ': 'stairs', 'KÖZLEKEDŐ': 'hallway',
        'WC': 'wc', 'GARDRÓB': 'wardrobe', 'HÁZT.': 'utility', 'FÜRDŐSZOBA': 'bathroom', 'TERASZ': 'terrace'}
UNITS = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3']

def polys(g):
    if g.is_empty: return []
    return [q for q in (g.geoms if hasattr(g, 'geoms') else [g]) if q.geom_type == 'Polygon' and q.area > 1e-4]

def segs(d, layers, kinds=('s',), colors=None):
    out = []
    for g in d:
        if g.get('layer') not in layers or g['type'] not in kinds: continue
        if colors is not None and g.get('layer') != 'C-Függönyfal.ARC' and round((g.get('color') or (9,))[0], 2) not in colors: continue
        for it in g['items']:
            if it[0] == 'l': out.append(('l', [(it[1].x, it[1].y), (it[2].x, it[2].y)]))
            elif it[0] == 'c': out.append(('c', [(q.x, q.y) for q in it[1:5]]))
            elif it[0] == 're': r = it[1]; out.append(('l', [(r.x0, r.y0), (r.x1, r.y0), (r.x1, r.y1), (r.x0, r.y1), (r.x0, r.y0)]))
            elif it[0] == 'qu': q = it[1]; out.append(('l', [(q.ul.x, q.ul.y), (q.ur.x, q.ur.y), (q.lr.x, q.lr.y), (q.ll.x, q.ll.y), (q.ul.x, q.ul.y)]))
    return out

def bez(P):
    P = np.array(P); t = np.linspace(0, 1, 10)[:, None]
    return [tuple(x) for x in ((1-t)**3)*P[0] + 3*((1-t)**2)*t*P[1] + 3*(1-t)*t*t*P[2] + t**3*P[3]]

def floor_faces(d):
    lines = [LineString(p) for k, p in segs(d, {'C-Padlóburkolat.ARC'}) if k == 'l']
    return list(polygonize(unary_union(lines)))

def build(level, path, angles=None):
    p, d, _ = load(path); L = labels(p); m = SCALE[level]
    faces = floor_faces(d)
    walls_all = [q for g in d if g.get('layer') in WALL_LAYERS and g['type'] == 'f' for q in subpaths(g)]
    walls_all = [w for w in walls_all if w.area > 0.02]
    wall_union = unary_union(walls_all)
    out = {}
    for u in UNITS:
        mine = {k: v for k, v in L.items() if re.match(rf'(T\.)?{u}\.', k)}
        rooms = {k: v for k, v in mine.items() if not k.startswith('T.')}
        pts = [Point(v['x'], v['y']) for v in rooms.values()]
        face = [f for f in faces if sum(f.contains(q) for q in pts) >= len(pts) * 0.6]
        assert len(face) == 1, (level, u, len(face))
        core = face[0]
        # transform: rotate the unit square to the page, origin top-left, units cm
        if angles is not None and u in angles: ang = angles[u]
        else:
            mrr = core.minimum_rotated_rectangle
            c = list(mrr.exterior.coords)
            e = max([(c[i], c[i+1]) for i in range(4)], key=lambda e: math.dist(*e))
            ang = math.degrees(math.atan2(e[1][1] - e[0][1], e[1][0] - e[0][0]))
            ang = ((ang + 45) % 90) - 45
        # terrace: the paving drawn around its label
        ter = None
        for k, v in mine.items():
            if not k.startswith('T.'): continue
            tp = Point(v['x'], v['y'])
            near = [LineString(s) for kind, s in segs(d, {'C-Terasz.ARC'}) if kind == 'l' and LineString(s).distance(tp) < 2.6 / m]
            u_near = affinity.rotate(unary_union(near), -ang, origin=(0, 0))
            ter = affinity.rotate(box(*u_near.bounds), ang, origin=(0, 0)).difference(core.buffer(0.05 / m))
            ter = max(polys(ter), key=lambda q: q.area)
        region = unary_union([core] + ([ter] if ter is not None else []))
        walls = []
        for w in walls_all:
            t = 2 * w.area / w.length
            if t * m > 0.6: continue
            gap = w.distance(core)
            if gap > 0.12 / m: continue
            walls.append(w.intersection(core.buffer(gap + min(t, 0.55 / m) + 0.02 / m, join_style=2)))
        walls = unary_union([q for q in polys(unary_union(walls)) if q.area * m * m > 0.004])
        env = unary_union([region, walls]).buffer(0.08 / m)
        def T(g):
            return affinity.rotate(g, -ang, origin=(0, 0), use_radians=False)
        R = lambda x, y: T(Point(x, y)).coords[0]
        allg = T(unary_union([region, walls]))
        x0, y0, x1, y1 = allg.bounds
        tx = lambda x, y: (round((R(x, y)[0] - x0) * m * 100), round((R(x, y)[1] - y0) * m * 100))
        def ring(cs):
            P = [tx(x, y) for x, y in list(cs)[:-1]]
            P = [q for i, q in enumerate(P) if q != P[i-1]]
            return 'M' + 'L'.join('%d %d' % q for q in P) + 'Z'
        res = {'walls': ''.join(ring(q.exterior.coords) + ''.join(ring(h.coords) for h in q.interiors) for q in polys(walls))}
        res['terrace'] = ring(ter.exterior.coords) if ter is not None else ''
        wall_shrink = wall_union.buffer(-0.01 / m)
        def layer(layers, keep_inside_walls=False, inside=env, colors=None):
            parts = []; last = None
            for kind, s in segs(d, layers, colors=colors):
                ls = LineString(bez(s) if kind == 'c' else s)
                if not inside.contains(ls): continue
                if not keep_inside_walls and wall_shrink.contains(ls.interpolate(0.5, normalized=True)): continue
                P = [tx(x, y) for x, y in s]
                if kind == 'l' and len(P) == 2 and P[0] == P[1]: continue
                start = '' if P[0] == last else 'M%d %d' % P[0]
                parts.append(start + ('C' + ' '.join('%d %d' % q for q in P[1:]) if kind == 'c' else ''.join('L%d %d' % q for q in P[1:])))
                last = P[-1]
            return ''.join(parts)
        # 0.53: doors and windows; 0.69 is wall hatching, 0.0 the wall outline (as on City Gate).
        res['openings'] = layer(OPEN_LAYERS, colors={0.53, 0.41, 0.57})
        res['stairs'] = layer({'B-Lépcső-szerkezetek.STR'}, inside=core.buffer(0.05 / m))
        res['sanitary'] = layer({'D-Szaniterek.INT'}, inside=core)
        res['kitchen'] = layer({'D-Bútor.INT'}, inside=core)
        res['railing'] = layer({'C-Korlátok.ARC'}, inside=env)
        labs = []
        for k, v in sorted(mine.items()):
            found = [(v['raw'].find(n), kd) for n, kd in KIND.items() if re.search(rf'(^|\s){re.escape(n)}(\s|$)', v['raw'])]
            kind = min(found)[1] if found else None
            assert kind, (k, v['name'])
            x, y = tx(v['x'], v['y'])
            labs.append({'id': k, 'kind': kind, 'm2': v['m2'], 'x': x, 'y': y})
        res.update(width=round((x1 - x0) * m * 100), height=round((y1 - y0) * m * 100), labels=labs, angle=round(ang, 3),
                   origin=[x0, y0])
        out[u] = res
    return out

if __name__ == '__main__':
    # Usage: PERMIT_PDF_DIR=/path python3 generate.py ../../lib/floorplans.ts
    # PDFs: Foldszinti_alaprajz_E_E24037_2.0.pdf (ground), Emeleti_alaprajz_E_E24037_2.0.pdf (upper),
    # in Rémi's Drive, « Spanyolrét Gardens / Plans permis ». Not in the repo.
    base = os.environ.get('PERMIT_PDF_DIR', '.').rstrip('/') + '/'
    g = build('ground', base + 'ground.pdf')
    angles = {u: g[u]['angle'] for u in g}
    up = build('upper', base + 'upper.pdf', angles)
    res = {}
    for u in UNITS:
        res[f'{u}-ground'] = g[u]; res[f'{u}-upper'] = up[u]
    json.dump(res, open('sp_floorplans.json', 'w'), ensure_ascii=False)  # for overlay.py
    # Every room label read from the PDF must be one of the expected kinds, with an area.
    for k, v in res.items():
        for l in v['labels']:
            assert l['m2'] and l['m2'] > 0, (k, l)
    if len(sys.argv) > 1:
        keys = ('width', 'height', 'walls', 'openings', 'stairs', 'sanitary', 'kitchen', 'railing', 'terrace')
        out = {k: {**{f: v[f] for f in keys}, 'labels': [{f: l[f] for f in ('kind', 'm2', 'x', 'y')} for l in v['labels']]} for k, v in res.items()}
        with open(sys.argv[1], 'w') as f:
            f.write("""/* Floor plans of the six townhouses, redrawn from the building-permit drawings
 * (E24037 v2.0, vector PDFs: ground floor and upper floor, Rémi's Drive,
 * « Spanyolrét Gardens / Plans permis »). GENERATED by
 * scripts/floorplans/generate.py: do not edit by hand.
 *
 * Units are centimetres. Walls are the architect's own wall shapes, kept where
 * they bound the house; labels are the architect's room labels with their net
 * areas. A3, drawn at an angle on the site, is turned square. The scale of
 * each PDF comes from its dimension lines; scripts/floorplans/overlay.py lays
 * every drawing back onto the permit to check it. */

export type RoomKind =
    | 'entrance' | 'shower' | 'living' | 'bedroom' | 'kitchenDining' | 'pantry' | 'stairs'
    | 'hallway' | 'wc' | 'wardrobe' | 'utility' | 'bathroom' | 'terrace';

export interface FloorPlanLabel { kind: RoomKind; m2: number; x: number; y: number }
export interface FloorPlan {
    width: number;
    height: number;
    walls: string;
    openings: string;
    stairs: string;
    sanitary: string;
    kitchen: string;
    railing: string;
    terrace: string;
    labels: FloorPlanLabel[];
}

export const floorPlans: Record<string, FloorPlan> = """)
            f.write(json.dumps(out, ensure_ascii=False, indent=1))
            f.write(';\n')
        print('written', sys.argv[1], sum(len(json.dumps(v)) for v in out.values()), 'chars')
    for k, v in res.items():
        print(k, v['width'], v['height'], 'angle', v['angle'], 'walls', len(v['walls']), [(l['kind'], l['m2']) for l in v['labels']])
