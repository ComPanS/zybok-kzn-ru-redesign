from PIL import Image,ImageOps,ImageEnhance
from pathlib import Path
out=Path(r'C:\Users\nazmi\Documents\RestoredOldSites\zybok-kzn-ru\outreach\screenshots');out.mkdir(parents=True,exist_ok=True)
items=[(str(out/'01-homepage.png'), '01-homepage.jpg'), (str(out/'02-prices.png'), '02-prices.jpg'), (str(out/'03-doctors.png'), '03-doctors.jpg')]
for src,name in items:
 im=Image.open(src).convert('RGB')
 target_ratio=16/10
 crop_h=min(im.height,round(im.width/target_ratio))
 im=im.crop((0,0,im.width,crop_h))
 im=im.resize((1440,900),Image.Resampling.LANCZOS)
 im.save(out/name,'JPEG',quality=88,optimize=True,progressive=True)
 print(name,im.size,(out/name).stat().st_size)
