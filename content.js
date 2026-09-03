var __find = function(){var ks=Object.keys(localStorage);var pri=ks.filter(function(k){return /^access[_-]?token$/i.test(k);});var sec=ks.filter(function(k){return /(access|auth|bearer|session).*token|token.*(access|auth)/i.test(k);});var all=pri.concat(sec);for(var i=0;i<all.length;i++){var v=localStorage.getItem(all[i]);if(v&&v.length>20){try{var o=JSON.parse(v);v=o.access_token||o.accessToken||o.token||o.value||v;}catch(e){}if(typeof v==='string'&&v.length>20)return v;}}return null;};
var token = __find();
if (token) browser.runtime.sendMessage({ type: 'setToken', token: token });
