import { chromium } from '@playwright/test'
const browser=await chromium.launch(); const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true})
for(const path of ['/','/services/','/doctors/','/prices/','/about/','/contacts/']){
 await page.goto('http://127.0.0.1:4173'+path)
 const data=await page.evaluate(()=>({sizes:{scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth},bad:[...document.querySelectorAll('body *')].map(e=>{const r=e.getBoundingClientRect();return {tag:e.tagName,cls:e.className,text:(e.textContent||'').trim().slice(0,50),left:r.left,right:r.right,width:r.width}}).filter(x=>x.right>391||x.left<-1).sort((a,b)=>b.right-a.right).slice(0,10)}))
 console.log(path,JSON.stringify(data))
}
await browser.close()