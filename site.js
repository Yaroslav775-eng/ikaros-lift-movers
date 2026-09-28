'use strict';
const form=document.getElementById('brief');
const fields=['service','area','floor','date','items'];
function prepareMessage(){
 const value=id=>document.getElementById(id).value.trim();
 for(const id of ['area','items']) document.getElementById(id).setCustomValidity(value(id)?'':'Συμπλήρωσε αυτό το πεδίο.');
 const date=value('date');
 document.getElementById('wa-text').value=[
 'Καλησπέρα! Ενδιαφέρομαι για: '+value('service'),
 'Περιοχή: '+value('area'),
 'Όροφος: '+(value('floor')||'θα το διευκρινίσουμε'),
 'Επιθυμητή ημερομηνία: '+(date?date.split('-').reverse().join('/'):'κατόπιν συνεννόησης'),
 'Αντικείμενα / πρόσβαση: '+value('items'),
 'Μπορείτε να μου πείτε αν είναι εφικτό και τι θα περιλαμβάνει η προσφορά;'
 ].join('\n');
}
form.addEventListener('input',prepareMessage);
form.addEventListener('change',prepareMessage);
form.addEventListener('submit',event=>{
 prepareMessage();
 if(!form.reportValidity()) event.preventDefault();
});
document.querySelectorAll('[data-service]').forEach(link=>link.addEventListener('click',()=>{
 document.getElementById('service').value=link.dataset.service;
 if(link.dataset.hint) document.getElementById('items').placeholder=link.dataset.hint;
 prepareMessage();
}));
document.querySelectorAll('.site-menu nav a').forEach(link=>link.addEventListener('click',()=>{document.querySelector('.site-menu').open=false}));
document.addEventListener('keydown',event=>{if(event.key==='Escape') document.querySelector('.site-menu').open=false});
prepareMessage();
document.getElementById('send-request').disabled=false;
