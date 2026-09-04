import json, re, pathlib
root=pathlib.Path(r'C:\Users\nazmi\Documents\RestoredOldSites\zybok-kzn-ru')
data=json.loads((root/'source-prices.json').read_text(encoding='utf-8'))
meta=[
 ('Терапия и профилактика','terapiya',data[3]),
 ('Хирургия и имплантация','hirurgiya',data[2]),
 ('Ортопедические услуги','ortopediya',data[1]),
]
def price(s):
 s=s.strip()
 if not s:return ''
 m=re.search(r'(\d+)[,.](\d{2})\s*руб',s)
 if not m:return s
 return f"{int(m.group(1)):,}".replace(',',' ')+' ₽' if m.group(2)=='00' else f"{int(m.group(1)):,}".replace(',',' ')+','+m.group(2)+' ₽'
out=[]
for title,slug,page in meta:
 rows=[]
 for row in page['tables'][0]['rows']:
  if len(row)==1:
   rows.append({'type':'group','title':row[0]})
  elif len(row)>=3 and not row[2]:
   rows.append({'type':'group','title':row[1],'code':row[0]})
  else:
   rows.append({'type':'item','code':row[0] if len(row)>2 else '', 'name':row[-2], 'price':price(row[-1]), 'sourcePrice':row[-1]})
 out.append({'title':title,'slug':slug,'sourceUrl':page['url'],'note':'Цены, приведённые на сайте, не окончательные и носят информативный характер. Администрация оставляет за собой право изменять цены.','rows':rows})
(root/'src/content/prices.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8')
items=sum(sum(1 for r in c['rows'] if r['type']=='item') for c in out)
groups=sum(sum(1 for r in c['rows'] if r['type']=='group') for c in out)
print(json.dumps({'categories':len(out),'priced_services':items,'group_headers':groups,'rows_total':items+groups,'per_category':{c['slug']:sum(1 for r in c['rows'] if r['type']=='item') for c in out}},ensure_ascii=False))