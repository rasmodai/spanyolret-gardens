import pymupdf as fitz, re, collections
from shapely.geometry import Polygon, Point, LineString, box
from shapely.ops import unary_union, polygonize
import numpy as np
M = 0.1094  # metres per pt, from 124 dimension lines (refined below)
def load(path):
    doc=fitz.open(path); p=doc[0]; d=p.get_drawings()
    names={k:v['name'] for k,v in doc.get_ocgs().items()}
    return p,d,names
def lyr(g): return g.get('layer') or ''
def subpaths(g):
    """closed polygons of a drawing (lines/curves/rects)."""
    out=[];pts=[]
    def flush():
        nonlocal pts
        if len(pts)>=3: out.append(Polygon(pts))
        pts=[]
    for it in g['items']:
        if it[0]=='re':
            flush(); r=it[1]; out.append(box(r.x0,r.y0,r.x1,r.y1)); continue
        if it[0]=='qu':
            flush(); q=it[1]; out.append(Polygon([q.ul,q.ur,q.lr,q.ll])); continue
        a=it[1]; b=it[-1]
        if pts and (abs(pts[-1][0]-a.x)>1e-3 or abs(pts[-1][1]-a.y)>1e-3): flush()
        if not pts: pts=[(a.x,a.y)]
        if it[0]=='c':
            P=np.array([(q.x,q.y) for q in it[1:5]]); t=np.linspace(0,1,8)[1:,None]
            B=((1-t)**3)*P[0]+3*((1-t)**2)*t*P[1]+3*(1-t)*t*t*P[2]+t**3*P[3]
            pts+= [tuple(x) for x in B]
        else: pts.append((b.x,b.y))
    flush()
    return [q.buffer(0) for q in out if q.is_valid or q.buffer(0).area>0]
def labels(p):
    lines=[]
    for b in p.get_text('dict')['blocks']:
        for l in b.get('lines',[]):
            t=' '.join(s['text'] for s in l['spans']).strip()
            if t: lines.append((fitz.Rect(l['bbox']),t))
    out={}
    for r,t in lines:
        if not re.fullmatch(r'(T\.)?[AB]\d\.\d\d',t): continue
        cx=(r.x0+r.x1)/2
        below=sorted([(r2.y0,t2) for r2,t2 in lines if abs((r2.x0+r2.x1)/2-cx)<12 and 0<r2.y0-r.y0<24],key=lambda x:x[0])
        txt=' '.join(x[1] for x in below)
        m=re.search(r'([\d]+,\d\d) m ?2(?! ?\))',txt)
        areas=re.findall(r'([\d]+,\d\d) m ?2',txt)
        out[t]={'x':cx,'y':(r.y0+r.y1)/2,'name':below[0][1] if below else '','m2':float(areas[0].replace(',','.')) if areas else None,'raw':txt}
    return out
