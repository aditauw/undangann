var $=function(s){return document.querySelector(s)};
var q=encodeURIComponent(CFG.mapQuery);
/* tamu: gunakan #Nama-Tamu pada link */
(function(){var h=decodeURIComponent(location.hash.slice(1)).replace(/[-_+]/g,' ').trim();var u=new URLSearchParams(location.search).get('to');var n=u||h;if(n)$('#guest').textContent=n.slice(0,60)})();
document.querySelectorAll('[data-date]').forEach(function(e){e.textContent=CFG.date?new Date(CFG.date).toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric'}):CFG.dateLabel});
/* foto */
[['#p1',CFG.photoGroom],['#p2',CFG.photoBride]].forEach(function(a){if(a[1])$(a[0]).innerHTML='<img src="'+a[1]+'" alt="">'});
/* maps */
$('#addr').textContent=CFG.address;
$('#map').src='https://www.google.com/maps?q='+q+'&output=embed';
var mapUrl='https://www.google.com/maps/search/?api=1&query='+q;
$('#mapBtn').href=mapUrl;
$('#dirBtn').href='https://www.google.com/maps/dir/?api=1&destination='+q+'&travelmode=driving';
try{new QRCode($('#qr'),{text:mapUrl,width:160,height:160,colorDark:'#243B64',colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.L})}catch(e){$('#qr').innerHTML='<a href="'+mapUrl+'" target="_blank" rel="noopener">Buka lokasi</a>'}
/* kalender */
(function(){var f=function(d){return d.toISOString().replace(/[-:]|\.\d{3}/g,'')};var p='';
if(CFG.date){var s=new Date(CFG.date);p='&dates='+f(s)+'/'+f(new Date(+s+3*36e5))}
$('#calBtn').href='https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent('Pernikahan Septian & Kayla')+p+'&location='+q+'&details='+encodeURIComponent('Akad Nikah & Resepsi Mohammad Septian Al Bilal & Kayla Fadya Nurul Aulia')})();
/* countdown */
(function(){if(!CFG.date)return;var t=new Date(CFG.date).getTime(),b=document.querySelectorAll('#cd b');
function tick(){var d=t-Date.now();if(d<=0){b.forEach(function(x){x.textContent='0'});$('#cdmsg').textContent='Hari bahagia telah tiba';return}
var v=[Math.floor(d/864e5),Math.floor(d/36e5)%24,Math.floor(d/6e4)%60,Math.floor(d/1e3)%60];b.forEach(function(x,i){x.textContent=String(v[i]).padStart(2,'0')});setTimeout(tick,1000)}tick()})();
/* galeri */
(function(){var g=$('#gal'),cols=['#7E9BB9','#B9CDDF','#243B64','#9fb6cf','#D9DEE5','#6f8cb0'],hs=[220,160,260,180,240,200];
for(var i=0;i<6;i++){var b=document.createElement('button');b.className='g';b.setAttribute('aria-label','Foto '+(i+1));var src=CFG.gallery[i];
if(src)b.innerHTML='<img src="'+src+'" alt="Foto prewedding '+(i+1)+'" loading="lazy">';else{b.style.height=hs[i]+'px';b.style.background='linear-gradient(150deg,'+cols[i]+','+cols[(i+2)%6]+')';b.textContent='Foto '+(i+1)}
b.classList.add('rv');(function(btn,s,c){btn.onclick=function(){var l=$('#lbc');l.innerHTML=s?'<img src="'+s+'" alt="">':'';l.style.background=s?'none':c;if(!s)l.textContent='Foto';$('#lb').classList.add('on')}})(b,src,'linear-gradient(150deg,'+cols[i]+','+cols[(i+2)%6]+')');g.appendChild(b)}
$('#lb').onclick=function(e){if(e.target.id==='lb'||e.target.tagName==='BUTTON')this.classList.remove('on')};
document.addEventListener('keydown',function(e){if(e.key==='Escape')$('#lb').classList.remove('on')})})();
/* penyimpanan lokal (demo; ganti dengan backend bila ada) */
function ld(k){try{return JSON.parse(localStorage.getItem(k)||'[]')}catch(e){return[]}}
function sv(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
var SB=function(){return CFG.sb&&CFG.sb.url&&CFG.sb.key};var BE=function(){return SB()||CFG.api};
function sbh(){return{apikey:CFG.sb.key,'Content-Type':'application/json',Prefer:'return=minimal'}}
function post(o){if(SB()){var r=o.type==='rsvp';return fetch(CFG.sb.url+'/rest/v1/'+(r?'rsvp':'ucapan'),{method:'POST',headers:sbh(),body:JSON.stringify(r?{nama:o.n,jumlah:+o.j,kehadiran:o.k,pesan:o.p}:{nama:o.n,pesan:o.m})}).then(function(x){if(!x.ok)throw 0;return x})}return CFG.api?fetch(CFG.api,{method:'POST',body:JSON.stringify(o)}).then(function(r){if(!r.ok)throw 0;return r}):Promise.resolve()}
$('#rf').onsubmit=function(e){e.preventDefault();var f=this,o={type:'rsvp',n:$('#rn').value,j:$('#rj').value,k:$('#rk').value,p:$('#rp').value},m=$('#rok');m.textContent='Mengirim...';
if(!BE()){var a=ld('rsvp');a.push(o);sv('rsvp',a)}
post(o).then(function(){m.textContent='Terima kasih, konfirmasi Anda sudah terkirim.';f.reset()}).catch(function(){m.textContent='Gagal mengirim, coba lagi.'})};
function draw(a,loc){var l=$('#wl');l.innerHTML='';var s=!a.length;if(s)a=[{n:'Keluarga & Sahabat',m:'Barakallahu lakuma wa baraka alaikuma. Semoga sakinah, mawaddah, warahmah.',d:'Contoh ucapan'}];
a.map(function(x,i){return{x:x,i:i}}).reverse().forEach(function(o){var x=o.x,d=document.createElement('div');d.className='w';var b=document.createElement('b'),p=document.createElement('div'),t=document.createElement('small');b.textContent=x.n;p.textContent=x.m;t.textContent=x.d;d.append(b,p,t);
if(loc&&!s){var r=document.createElement('button');r.textContent='Hapus';r.className='del';r.onclick=function(){var z=ld('wish');z.splice(o.i,1);sv('wish',z);wl()};d.appendChild(r)}
l.appendChild(d)})}
function wl(){if(!BE())return draw(ld('wish'),true);if(SB())return fetch(CFG.sb.url+'/rest/v1/ucapan?select=nama,pesan,created_at&order=id.desc&limit=100',{headers:{apikey:CFG.sb.key}}).then(function(r){return r.json()}).then(function(a){draw(a.reverse().map(function(x){return{n:x.nama,m:x.pesan,d:new Date(x.created_at).toLocaleDateString('id-ID')}}),false)}).catch(function(){draw([],false)});fetch(CFG.api).then(function(r){return r.json()}).then(function(a){draw(a,false)}).catch(function(){draw([],false)})}
$('#wf').onsubmit=function(e){e.preventDefault();var f=this,o={type:'wish',n:$('#wn').value,m:$('#wm').value};
if(!BE()){var a=ld('wish');a.push({n:o.n,m:o.m,d:new Date().toLocaleDateString('id-ID')});sv('wish',a)}
post(o).then(function(){f.reset();setTimeout(wl,BE()?800:0)})};wl();
/* musik instrumental (WebAudio) */
var ac,tm,playing=false,mb=$('#mus'),au;
function note(f,t,d,v){var o=ac.createOscillator(),g=ac.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.05);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(ac.destination);o.start(t);o.stop(t+d)}
var ch=[[261.6,329.6,392,493.9],[220,261.6,329.6,392],[174.6,220,261.6,329.6],[196,246.9,293.7,392]];
function bar(i){var t=ac.currentTime+.05,c=ch[i%4];note(c[0]/2,t,3.4,.07);for(var k=0;k<8;k++)note(c[k%4]*(k>3?2:1),t+k*.5,1.6,.05)}
function start(){if(CFG.musicUrl){au=au||Object.assign(new Audio(CFG.musicUrl),{loop:true});au.play();}else{ac=ac||new (window.AudioContext||window.webkitAudioContext)();ac.resume();var i=0;bar(i++);tm=setInterval(function(){bar(i++)},4000)}playing=true;mb.classList.add('play')}
function stop(){if(au)au.pause();if(tm){clearInterval(tm);tm=null}if(ac)ac.suspend();playing=false;mb.classList.remove('play')}
mb.onclick=function(){playing?stop():start()};
/* buka undangan */
$('#openBtn').onclick=function(){$('#cover').classList.add('open');document.body.classList.remove('lock');mb.classList.add('on');try{start()}catch(e){}window.scrollTo(0,0);setTimeout(function(){$('#cover').style.visibility='hidden'},1200)};
/* reveal & parallax */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll('.rv').forEach(function(e){io.observe(e)});
var orns=document.querySelectorAll('[data-sp]'),tk=false;
addEventListener('scroll',function(){if(tk)return;tk=true;requestAnimationFrame(function(){var y=scrollY;orns.forEach(function(o){var s=parseFloat(o.dataset.sp),fl=o.classList.contains('tr')?'scaleX(-1)':o.classList.contains('bl')?'scaleY(-1)':o.classList.contains('br')?'scale(-1,-1)':'';o.style.transform='translateY('+(y*s)+'px) '+fl});tk=false})},{passive:true});
/* bunga latar yang tetap saat scroll */
document.body.insertAdjacentHTML('afterbegin','<div class="bg-fix" aria-hidden="true"><svg class="orn tl"><use href="#corner"/></svg><svg class="orn tr"><use href="#corner"/></svg><svg class="orn bl"><use href="#corner"/></svg><svg class="orn br"><use href="#corner"/></svg></div>');
/* bunga banyak di tengah: tetap, tidak ikut gulir, bergerak pelan */
(function(){var L=[[50,12,46],[22,22,34],[78,20,40],[10,40,30],[90,44,36],[36,34,52],[64,38,28],[50,52,60],[18,60,40],[84,62,32],[34,72,36],[66,74,48],[50,88,34],[8,80,26],[92,82,30],[26,48,24],[74,52,26],[44,64,22]],h='';
L.forEach(function(a,i){var o=(.22+(i%4)*.05).toFixed(2),d=(7+(i%5)*1.3).toFixed(1),l=(-(i*1.7%9)).toFixed(1);
h+='<svg class="fx" viewBox="-36 -36 72 72" style="left:'+a[0]+'%;top:'+a[1]+'%;width:'+a[2]+'px;height:'+a[2]+'px;margin:-'+a[2]/2+'px 0 0 -'+a[2]/2+'px;opacity:'+o+';animation-duration:'+d+'s;animation-delay:'+l+'s"><use href="#fl"/></svg>'});
document.querySelector('.bg-fix').insertAdjacentHTML('beforeend',h)})();
