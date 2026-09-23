async function loadInventory(){
 const status=document.getElementById("inventory-status");
 const grid=document.getElementById("inventory-grid");
 try{
  const response=await fetch("./inventory.json",{cache:"no-store"});
  if(!response.ok) throw new Error("Inventory unavailable");
  const data=await response.json();
  const items=(data.items||[]).filter(i=>i.status==="available");
  if(!items.length){
   status.textContent="Raquel and Richard are selecting the first real Sell It Again items now. Nothing is published until the item is physically verified with current photos and details.";
   return;
  }
  status.textContent=items.length===1?"1 verified item currently available.":items.length+" verified items currently available.";
  grid.innerHTML=items.map(item=>{
   const subject=encodeURIComponent("Sell It Again inquiry — "+item.id+" — "+item.title);
   const photo=item.image?'<img src="'+esc(item.image)+'" alt="'+esc(item.title)+'">':'<span>Verified item photo coming soon</span>';
   return '<article class="item-card"><div class="item-photo">'+photo+'</div><div class="item-body"><div class="item-top"><div><h3>'+esc(item.title)+'</h3><div class="item-id">'+esc(item.id)+'</div></div><div class="item-price">$'+Number(item.price).toFixed(2)+'</div></div><div><span class="tag">'+esc(item.condition)+'</span><span class="tag">'+esc(item.delivery)+'</span></div><p>'+esc(item.description)+'</p><a class="btn primary" href="mailto:macetopiallc@gmail.com?subject='+subject+'">Ask about this item</a></div></article>';
  }).join("");
 }catch(e){status.textContent="Inventory is temporarily unavailable. Email macetopiallc@gmail.com for help."}
}
function esc(v){return String(v??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}
loadInventory();
