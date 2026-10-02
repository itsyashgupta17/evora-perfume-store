// ---- EDIT THESE ----
var WHATSAPP="919110035658";
var IMG={gold:"assets/bottle-aurelia.jpg",ruby:"assets/bottle-rouge-imperial.jpg",tulip:"assets/bottle-tulipe-dor.jpg",noir:"assets/bottle-noir-facette.jpg",rose:"assets/bottle-rose-quartz.jpg",amber:"assets/bottle-ambre-nuit.jpg"};
var PRODUCTS=[
 {id:1,name:"Aurelia",type:"Amber Floral / Oriental",tags:["Amber","Floral","Oriental"],price:3499,img:"gold",top:"Saffron, Bergamot",heart:"Floral",base:"Amber, Vanilla",desc:"Aurelia is an elegant and captivating fragrance crafted for those who love warmth, sophistication, and timeless luxury. Its rich saffron opening melts into a delicate floral heart, while a smooth amber-vanilla base leaves a warm, sensual trail. Designed to feel luxurious yet effortlessly wearable, Aurelia is a signature scent for memorable moments."},
 {id:2,name:"Rouge Impérial",type:"Oriental Floral / Woody",tags:["Oriental","Floral","Woody"],price:2999,img:"ruby",top:"Rose",heart:"Oud",base:"Patchouli",desc:"Rouge Impérial is a rich and alluring fragrance that blends the elegance of rose with the deep character of oud and earthy patchouli. Sophisticated and intense, it creates a luxurious scent trail designed for confident evenings and special occasions."},
 {id:3,name:"Tulipe d'Or",type:"Floral / Fresh",tags:["Floral","Fresh"],price:2499,img:"tulip",top:"Tulip",heart:"Peony",base:"White Musk",desc:"Tulipe d'Or is a graceful floral fragrance inspired by the beauty of blooming flowers. A delicate blend of tulip and peony meets the clean softness of white musk, creating a fresh, feminine and effortlessly elegant aroma."},
 {id:4,name:"Noir Facette",type:"Woody Oriental / Smoky",tags:["Woody","Oriental"],price:3199,img:"noir",top:"Dark Woods",heart:"Leather",base:"Incense",desc:"Noir Facette is a bold and sophisticated fragrance built around dark woods and sensual leather. Warm incense adds a mysterious depth, creating a powerful composition with a refined, modern character."},
 {id:5,name:"Rose Quartz",type:"Floral Fruity",tags:["Floral","Fruity"],price:2299,img:"rose",top:"Pear",heart:"Pink Rose",base:"Cedar",desc:"Rose Quartz is a soft and radiant fragrance that combines the romantic sweetness of pink rose with juicy pear and the smooth warmth of cedar. Fresh yet elegant, it is perfect for everyday sophistication."},
 {id:6,name:"Ambre Nuit",type:"Amber / Woody",tags:["Amber","Woody"],price:2799,img:"amber",top:"Amber",heart:"Tonka",base:"Sandalwood",desc:"Ambre Nuit is a warm and seductive fragrance centered around glowing amber. Creamy tonka adds a touch of sweetness while sandalwood creates a smooth, sophisticated finish, making it ideal for intimate evenings and elegant occasions."}
];
var SIZES=[{ml:30,m:.6},{ml:50,m:1},{ml:100,m:1.7}]; // price multiplier per size
// --------------------
var cart={},wish={},cat="All",cur=null,tt;
try{cart=JSON.parse(localStorage.getItem("evora_cart")||"{}");wish=JSON.parse(localStorage.getItem("evora_wish")||"{}")}catch(e){}
Object.keys(cart).forEach(function(k){if(!PRODUCTS.some(function(p){return p.id==k.split("|")[0]}))delete cart[k]});
function save(){try{localStorage.setItem("evora_cart",JSON.stringify(cart));localStorage.setItem("evora_wish",JSON.stringify(wish))}catch(e){}}
function menu(){$("mnav").classList.toggle("on")}
var profile={},orders=[],tab="profile";
try{profile=JSON.parse(localStorage.getItem("evora_profile")||"{}");orders=JSON.parse(localStorage.getItem("evora_orders")||"[]")}catch(e){}
function saveAcc(){try{localStorage.setItem("evora_profile",JSON.stringify(profile));localStorage.setItem("evora_orders",JSON.stringify(orders))}catch(e){}}
function acct(){var a=$("acc"),o=!a.classList.contains("open");$("drawer").classList.remove("open");$("mnav").classList.remove("on");a.classList.toggle("open",o);$("ov").classList.toggle("on",o);if(o)renderAcc()}
function tabTo(t){tab=t;renderAcc()}
function renderAcc(){
 Array.prototype.forEach.call(document.querySelectorAll(".atabs .chip"),function(b){b.classList.toggle("on",b.dataset.t==tab)});
 $("ah").textContent=profile.nm?"Hello, "+profile.nm.split(" ")[0]:"My account";
 var b=$("accb");
 if(tab=="profile"){
  b.innerHTML='<p class="note">Save your details once and checkout fills itself in. They stay on this device only.</p><input id="a_nm" placeholder="Full name"><input id="a_ph" type="tel" placeholder="Phone number"><input id="a_ad" placeholder="Address"><div class="two"><input id="a_ct" placeholder="City"><input id="a_pn" inputmode="numeric" maxlength="6" placeholder="PIN code"></div><div class="okmsg" id="aok"></div><button class="go" onclick="saveProfile()">Save details</button><button class="mini danger" onclick="clearData()" style="margin-top:14px">Clear my data on this device</button>';
  [["a_nm","nm"],["a_ph","ph"],["a_ad","ad"],["a_ct","ct"],["a_pn","pn"]].forEach(function(r){$(r[0]).value=profile[r[1]]||""});
 }else if(tab=="orders"){
  b.innerHTML=orders.length?orders.map(function(o,i){var dt=new Date(o.d).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});
   return '<div class="aord"><b>#'+o.id+'</b> · '+dt+'<br>'+o.items.map(function(it){var p=P(it.id);return it.q+' x '+(p?p.name:'Perfume')+' '+it.ml+'ml'}).join('<br>')+'<br><b>Total ₹'+o.t+'</b><br><button class="mini" onclick="reorder('+i+')">Reorder</button></div>'}).join(""):'<p class="note" style="text-align:center;margin-top:30px">No orders yet.<br>Orders placed from this device will appear here.</p>';
 }else{
  var w=PRODUCTS.filter(function(p){return wish[p.id]});
  b.innerHTML=w.length?w.map(function(p){return '<div class="awl"><img src="'+IMG[p.img]+'" alt=""><div class="t"><b>'+p.name+'</b><br><small>'+p.type+'</small></div><div style="flex:none"><button class="mini" onclick="openQV('+p.id+')">View</button> <button class="mini" onclick="unwish('+p.id+')">Remove</button></div></div>'}).join(""):'<p class="note" style="text-align:center;margin-top:30px">Tap the ♡ on any perfume to save it here.</p>';
 }
}
function saveProfile(){profile={nm:$("a_nm").value.trim(),ph:$("a_ph").value.trim(),ad:$("a_ad").value.trim(),ct:$("a_ct").value.trim(),pn:$("a_pn").value.trim()};saveAcc();$("aok").textContent="Saved ✓";$("ah").textContent=profile.nm?"Hello, "+profile.nm.split(" ")[0]:"My account"}
function reorder(i){var o=orders[i];if(!o)return;o.items.forEach(function(it){if(!P(it.id))return;var k=it.id+"|"+it.ml;cart[k]=(cart[k]||0)+it.q});render();toggle()}
function unwish(id){wish[id]=false;save();$("grid").innerHTML="";render();renderAcc()}
function clearData(){if(!confirm("Remove your saved details, orders and wishlist from this device?"))return;profile={};orders=[];wish={};cart={};try{["evora_profile","evora_orders","evora_wish","evora_cart"].forEach(function(k){localStorage.removeItem(k)})}catch(e){}$("grid").innerHTML="";render();renderAcc()}
function fillCheckout(){[["nm","nm"],["ph","ph"],["ad","ad"],["ct","ct"],["pn","pn"]].forEach(function(r){if(profile[r[1]]&&!$(r[0]).value)$(r[0]).value=profile[r[1]]})}

function $(i){return document.getElementById(i)}
function P(id){return PRODUCTS.filter(function(x){return x.id==id})[0]}
function pr(p,ml){var z=SIZES.filter(function(x){return x.ml==ml})[0];return Math.round(p.price*z.m/10)*10}
setTimeout(function(){$("intro").classList.add("gone")},3300);

// filters + grid
function drawFilters(){
 var cats=["All"].concat(PRODUCTS.reduce(function(a,p){p.tags.forEach(function(t){if(a.indexOf(t)<0)a.push(t)});return a},[]));
 $("filters").innerHTML=cats.map(function(c){return '<button class="chip '+(c==cat?'on':'')+'" onclick="cat=\''+c+'\';$(\'grid\').innerHTML=\'\';render()">'+c+'</button>'}).join("");
}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12});
function render(){
 drawFilters();var g=$("grid");
 if(!g.children.length){
  g.innerHTML=PRODUCTS.filter(function(p){return cat=="All"||p.tags.indexOf(cat)>-1}).map(function(p,i){
   return '<div class="card" style="transition-delay:'+(i*90)+'ms"><div class="pic" onclick="openQV('+p.id+')"><img src="'+IMG[p.img]+'" alt="'+p.name+'"><button class="heart '+(wish[p.id]?'on':'')+'" onclick="event.stopPropagation();fav('+p.id+',this)" aria-label="Save">'+(wish[p.id]?'♥':'♡')+'</button><button class="quick" onclick="event.stopPropagation();openQV('+p.id+')">Quick view</button></div><div class="info"><h3>'+p.name+'</h3><div class="notes">'+p.type+'</div><div class="price">from ₹'+pr(p,30)+'</div></div></div>'}).join("");
  Array.prototype.forEach.call(g.children,function(c){io.observe(c)});
  tilt();
 }
 var ids=Object.keys(cart),n=0,t=0;
 $("items").innerHTML=ids.length?ids.map(function(k){var a=k.split("|"),p=P(a[0]),q=cart[k],u=pr(p,+a[1]);n+=q;t+=q*u;
  return '<div class="row"><img src="'+IMG[p.img]+'" alt=""><span>'+p.name+' <small>· '+a[1]+'ml</small><br><small>₹'+u+'</small></span><span class="qty"><button onclick="chg(\''+k+'\',-1)">−</button> '+q+' <button onclick="chg(\''+k+'\',1)">+</button></span></div>'}).join(""):'<p style="color:var(--mut);text-align:center;margin-top:40px">Your cart is empty.<br>Find a scent you love ✦</p>';
 $("cnt").textContent=n;$("tot").textContent="₹"+t;save();
}
function fav(id,b){wish[id]=!wish[id];save();b.classList.toggle("on",wish[id]);b.textContent=wish[id]?"♥":"♡";toast(wish[id]?"Saved to wishlist":"Removed from wishlist",P(id))}

// quick view modal
function openQV(id){var p=P(id);cur={id:id,ml:50};$("qi").src=IMG[p.img];$("qc").textContent=p.type;$("qd").textContent=p.desc;$("qn").textContent=p.name;
 $("qp").innerHTML=[["Top Notes",p.top],["Heart Notes",p.heart],["Base Notes",p.base]].map(function(r){return '<div><span>'+r[0]+'</span>'+r[1]+'</div>'}).join("");
 $("qs").innerHTML=SIZES.map(function(z){return '<button class="sz" data-ml="'+z.ml+'" onclick="pick('+z.ml+')">'+z.ml+' ml</button>'}).join("");
 pick(50);$("ov").classList.add("on");$("qv").classList.add("on")}
function pick(ml){cur.ml=ml;var p=P(cur.id);Array.prototype.forEach.call($("qs").children,function(b){b.classList.toggle("on",b.dataset.ml==ml)});
 $("qa").textContent="Add to cart · ₹"+pr(p,ml);$("qa").onclick=function(){add(cur.id,cur.ml);closeAll()}}
function add(id,ml){var k=id+"|"+ml;cart[k]=(cart[k]||0)+1;render();var b=$("cb");b.classList.remove("bump");void b.offsetWidth;b.classList.add("bump");toast("Added to cart · "+ml+"ml",P(id))}
function chg(k,d){cart[k]+=d;if(cart[k]<1)delete cart[k];render()}
function toggle(){var d=$("drawer");$("acc").classList.remove("open");d.classList.toggle("open");$("ov").classList.toggle("on",d.classList.contains("open"));if(d.classList.contains("open"))fillCheckout()}
function closeAll(){$("mnav").classList.remove("on");$("acc").classList.remove("open");$("drawer").classList.remove("open");$("qv").classList.remove("on");$("ov").classList.remove("on")}
document.addEventListener("keydown",function(e){if(e.key=="Escape")closeAll()});
function toast(m,p){$("ti").src=IMG[p.img];$("tm").textContent=m;$("toast").classList.add("on");clearTimeout(tt);tt=setTimeout(function(){$("toast").classList.remove("on")},2000)}
function order(){
 var ids=Object.keys(cart),e=$("err");e.textContent="";
 if(!ids.length){toast("Add a perfume first",PRODUCTS[0]);return}
 var nm=$("nm").value.trim(),ph=$("ph").value.replace(/[\s-]/g,""),ad=$("ad").value.trim(),ct=$("ct").value.trim(),pn=$("pn").value.trim(),nt=$("nt").value.trim();
 if(!nm||!ad||!ct){e.textContent="Please fill in your name, address and city.";return}
 if(!/^\+?\d{10,13}$/.test(ph)){e.textContent="Please enter a valid phone number.";return}
 if(!/^\d{6}$/.test(pn)){e.textContent="Please enter a 6-digit PIN code.";return}
 var t=0,l=ids.map(function(k){var a=k.split("|"),p=P(a[0]),u=pr(p,+a[1]);t+=cart[k]*u;return "• "+cart[k]+" x "+p.name+" "+a[1]+"ml - ₹"+(cart[k]*u)}).join("\n");
 var oid="EV"+Date.now().toString(36).toUpperCase().slice(-6),items=ids.map(function(k){var a=k.split("|");return {id:+a[0],ml:+a[1],q:cart[k],u:pr(P(a[0]),+a[1])}});
 orders.unshift({id:oid,d:new Date().toISOString(),t:t,items:items});orders=orders.slice(0,20);if($("sv").checked)profile={nm:nm,ph:ph,ad:ad,ct:ct,pn:pn};saveAcc();
 var msg="New ÉVORA order #"+oid+"\n\n"+l+"\n\nTotal: ₹"+t+"\n\nName: "+nm+"\nPhone: "+ph+"\nAddress: "+ad+", "+ct+" - "+pn+(nt?"\nNote: "+nt:"");
 window.open("https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent(msg),"_blank");
 $("done").classList.add("on");
}
function finish(){cart={};save();$("done").classList.remove("on");closeAll();render()}

// motion: tilt, cursor glow, progress, parallax, dust, theme
function tilt(){Array.prototype.forEach.call(document.querySelectorAll(".pic"),function(el){var im=el.querySelector("img");
 el.addEventListener("mousemove",function(e){var r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;im.style.transform="scale(1.03) rotateY("+x*10+"deg) rotateX("+(-y*10)+"deg)"});
 el.addEventListener("mouseleave",function(){im.style.transform=""})})}
var mx=0,my=0,cx=0,cy=0;
document.addEventListener("mousemove",function(e){mx=e.clientX;my=e.clientY});
(function loop(){cx+=(mx-cx)*.08;cy+=(my-cy)*.08;$("cur").style.transform="translate("+cx+"px,"+cy+"px)";requestAnimationFrame(loop)})();
window.addEventListener("scroll",function(){var h=document.documentElement,y=h.scrollTop;$("prog").style.width=(y/(h.scrollHeight-h.clientHeight)*100)+"%";
 document.querySelector(".stage").style.translate="0 "+(y*.12)+"px";var sp=$("sp");if(sp){var r=sp.parentNode.getBoundingClientRect();sp.style.transform="translateY("+((r.top-innerHeight/2)*-.06)+"px)"}},{passive:true});
for(var i=0;i<26;i++){var d=document.createElement("i"),z=2+Math.random()*4;d.style.cssText="left:"+Math.random()*100+"%;width:"+z+"px;height:"+z+"px;animation-duration:"+(7+Math.random()*9)+"s;animation-delay:"+(Math.random()*8+2)+"s";$("dust").appendChild(d)}
function theme(){var r=document.documentElement,t=r.dataset.theme=="light"?"dark":"light";r.dataset.theme=t;try{localStorage.setItem("evora_theme",t)}catch(e){}}
try{var th=localStorage.getItem("evora_theme");if(th)document.documentElement.dataset.theme=th}catch(e){}
Array.prototype.forEach.call(document.querySelectorAll(".rv"),function(e){io.observe(e)});
$("wa").href="https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent("Hi ÉVORA, I would like to order a perfume.");
render();


// ===== NEW: FAQ CHATBOT (start) =====
// Edit the answers below to match your real policies.
var WA_LINK='<a href="https://wa.me/'+WHATSAPP+'" target="_blank" rel="noopener">WhatsApp us</a>';
var FAQ=[
 {k:["ship","deliver","courier","dispatch","arrive","how long","when will"],
  a:"We offer <b>free shipping on all orders</b>. For delivery time to your PIN code, "+WA_LINK+" and we'll confirm."},
 {k:["return","refund","exchange","guarantee","satisf","money back"],
  a:"We have a <b>satisfaction guarantee</b>: love it or return it. "+WA_LINK+" with your order number and we'll guide you."},
 {k:["order","buy","purchase","checkout","how to"],
  a:"Pick a perfume, choose a size, add it to your cart, then fill in your details and tap <b>Place order on WhatsApp</b>. Send the pre-filled message to confirm."},
 {k:["pay","payment","cod","cash","upi","card"],
  a:"Orders are confirmed over WhatsApp, so payment options are shared with you there. "+WA_LINK+" to ask."},
 {k:["size","ml","bottle","volume"],
  a:"Every perfume comes in <b>30 ml, 50 ml and 100 ml</b>. Prices depend on the size, so open any perfume with Quick view to see them."},
 {k:["price","cost","how much","cheap","expensive","budget"],
  a:function(){return "Our prices start from: "+PRODUCTS.map(function(p){return "<br>• "+p.name+" – ₹"+pr(p,30)}).join("")+"<br>(30 ml; 50 ml and 100 ml cost more)."}},
 {k:["last","longevity","long lasting","strong","projection","concentration","edp","eau de parfum"],
  a:"Our fragrances are <b>Eau de Parfum</b>, handcrafted in small batches with rare ingredients and made to last."},
 {k:["gift","present","birthday","anniversary"],
  a:"Perfume makes a lovely gift! Add a note at checkout, or "+WA_LINK+" and tell us the occasion."},
 {k:["account","wishlist","save","history","my orders","reorder"],
  a:"Tap the 👤 icon at the top to save your details, see orders placed on this device, and view your wishlist (♡). It's all stored only on your device."},
   // NEW: owner / founder question
 {k:["owner","who owns","founder","who is the founder","who created","who runs","who started","ceo","yash","behind évora","behind evora"],
  a:"ÉVORA is owned by <b>Yash Gupta</b>, who is currently pursuing his B.Tech at <b>Parul University</b>."},
  {k:["about","story","made","handcraft","batch"],
  a:"ÉVORA is a small-batch fragrance house founded by a young dreamer and entrepreneur. Our belief: a fragrance should be more than a scent."},
 {k:["contact","phone","number","whatsapp","talk","human","support","help","agent"],
  a:"Happy to connect you with us directly: "+WA_LINK+"."},
 {k:["hi","hello","hey","namaste"],
  a:"Hello! 👋 Ask me about our perfumes, sizes, shipping or returns."}
];
var CHIPS=["Shipping","Returns","Sizes & prices","How to order","Help me choose"];

function chatAdd(html,who){var m=document.createElement("div");m.className="msg "+who;if(who=="me")m.textContent=html;else m.innerHTML=html;$("chm").appendChild(m);$("chm").scrollTop=$("chm").scrollHeight;return m}
function chatChips(list){$("chq").innerHTML="";list.forEach(function(c){var b=document.createElement("button");b.textContent=c;b.onclick=function(){chatAsk(c)};$("chq").appendChild(b)});$("chm").scrollTop=$("chm").scrollHeight}
function chatToggle(){var c=$("chat"),o=!c.classList.contains("on");c.classList.toggle("on",o);if(o){if(!$("chm").children.length){chatAdd("Welcome to ÉVORA ✦ How can I help you today?","bot");chatChips(CHIPS)}setTimeout(function(){$("chin").focus()},300)}}
function chatSend(){var v=$("chin").value.trim();if(!v)return;$("chin").value="";chatAsk(v)}
function chatAnswer(q){
 q=q.toLowerCase();
 if(/choose|recommend|suggest|which|best|find a scent/.test(q))return {a:"What kind of scent do you like?",chips:["Floral","Woody","Fresh","Amber","Fruity","Oriental"]};
 var prod=PRODUCTS.filter(function(p){return q.indexOf(p.name.toLowerCase().replace(/[éÉ]/g,"e"))>-1||q.indexOf(p.name.toLowerCase())>-1})[0];
 if(prod)return {a:"<b>"+prod.name+"</b> ("+prod.type+")<br>Top: "+prod.top+" · Heart: "+prod.heart+" · Base: "+prod.base+"<br>From ₹"+pr(prod,30)+'. <a href="#shop" onclick="openQV('+prod.id+')">View it</a>'};
 var tag=PRODUCTS.reduce(function(a,p){p.tags.forEach(function(t){if(a.indexOf(t)<0)a.push(t)});return a},[]).filter(function(t){return q.indexOf(t.toLowerCase())>-1})[0];
 if(tag){var m=PRODUCTS.filter(function(p){return p.tags.indexOf(tag)>-1});return {a:"Our <b>"+tag+"</b> picks:"+m.map(function(p){return '<br>• <a href="#shop" onclick="openQV('+p.id+')">'+p.name+"</a> – "+p.type}).join("")}}
 var best=null,bs=0;
 FAQ.forEach(function(f){var s=0;f.k.forEach(function(k){if(q.indexOf(k)>-1)s+=k.length});if(s>bs){bs=s;best=f}});
 if(best)return {a:typeof best.a=="function"?best.a():best.a};
 return {a:"I'm not sure about that one. 🤔 Please "+WA_LINK+" and our team will help, or try a topic below.",chips:CHIPS};
}
function chatAsk(q){
 chatAdd(q,"me");$("chq").innerHTML="";
 var t=chatAdd("• • •","bot typing");
 setTimeout(function(){var r=chatAnswer(q);t.className="msg bot";t.innerHTML=r.a;$("chm").scrollTop=$("chm").scrollHeight;chatChips(r.chips||CHIPS)},500);
}
$("chin").addEventListener("keydown",function(e){if(e.key=="Enter")chatSend()});
document.addEventListener("keydown",function(e){if(e.key=="Escape")$("chat").classList.remove("on")});
// ===== NEW: FAQ CHATBOT (end) =====