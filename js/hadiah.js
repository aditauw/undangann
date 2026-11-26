/* ===== Hadiah: tombol salin (tempel di paling bawah app.js) ===== */
(function(){var t=document.createElement('div'),tm;t.className='toast';t.setAttribute('role','status');document.body.appendChild(t);
function say(s){t.textContent=s;t.classList.add('on');clearTimeout(tm);tm=setTimeout(function(){t.classList.remove('on')},2200)}
document.addEventListener('click',function(e){var b=e.target.closest('.copy');if(!b)return;var v=b.dataset.copy;
function fb(){var x=document.createElement('textarea');x.value=v;x.style.cssText='position:fixed;opacity:0';document.body.appendChild(x);x.select();try{document.execCommand('copy');say('Nomor rekening disalin')}catch(_){say('Salin manual: '+v)}x.remove()}
if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(v).then(function(){say('Nomor rekening disalin')},fb);else fb()})})();
