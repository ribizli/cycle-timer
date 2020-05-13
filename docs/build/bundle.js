var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function s(t){t.forEach(e)}function r(t){return"function"==typeof t}function i(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function l(e,...n){if(null==e)return t;const s=e.subscribe(...n);return s.unsubscribe?()=>s.unsubscribe():s}function o(t){let e;return l(t,t=>e=t)(),e}function c(t,e,n){t.$$.on_destroy.push(l(e,n))}function u(t,e,n=e){return t.set(n),e}function a(t,e){t.appendChild(e)}function f(t,e,n){t.insertBefore(e,n||null)}function d(t){t.parentNode.removeChild(t)}function m(t){return document.createElement(t)}function p(t){return document.createTextNode(t)}function h(){return p(" ")}function v(t,e,n,s){return t.addEventListener(e,n,s),()=>t.removeEventListener(e,n,s)}function g(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function y(t,e){e=""+e,t.data!==e&&(t.data=e)}function $(t,e){(null!=e||t.value)&&(t.value=e)}function b(t,e,n,s){t.style.setProperty(e,n,s?"important":"")}let k,x;function w(t,e){const n=getComputedStyle(t),s=(parseInt(n.zIndex)||0)-1;"static"===n.position&&(t.style.position="relative");const r=m("iframe");let i;return r.setAttribute("style",`display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: ${s};`),r.setAttribute("aria-hidden","true"),r.tabIndex=-1,!function(){if(void 0===k){k=!1;try{"undefined"!=typeof window&&window.parent&&window.parent.document}catch(t){k=!0}}return k}()?(r.src="about:blank",r.onload=()=>{i=v(r.contentWindow,"resize",e)}):(r.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",i=v(window,"message",t=>{t.source===r.contentWindow&&e()})),a(t,r),()=>{d(r),i&&i()}}function S(t,e,n){t.classList[n?"add":"remove"](e)}function E(t){x=t}const L=[],_=[],A=[],M=[],I=Promise.resolve();let O=!1;function N(t){A.push(t)}let T=!1;const z=new Set;function H(){if(!T){T=!0;do{for(let t=0;t<L.length;t+=1){const e=L[t];E(e),W(e.$$)}for(L.length=0;_.length;)_.pop()();for(let t=0;t<A.length;t+=1){const e=A[t];z.has(e)||(z.add(e),e())}A.length=0}while(L.length);for(;M.length;)M.pop()();O=!1,T=!1,z.clear()}}function W(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(N)}}const C=new Set;function j(t,e){t&&t.i&&(C.delete(t),t.i(e))}function B(t,e){t.d(1),e.delete(t.key)}function D(t,n,i){const{fragment:l,on_mount:o,on_destroy:c,after_update:u}=t.$$;l&&l.m(n,i),N(()=>{const n=o.map(e).filter(r);c?c.push(...n):s(n),t.$$.on_mount=[]}),u.forEach(N)}function J(t,e){const n=t.$$;null!==n.fragment&&(s(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function P(t,e){-1===t.$$.dirty[0]&&(L.push(t),O||(O=!0,I.then(H)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function R(e,r,i,l,o,c,u=[-1]){const a=x;E(e);const f=r.props||{},m=e.$$={fragment:null,ctx:null,props:c,update:t,not_equal:o,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(a?a.$$.context:[]),callbacks:n(),dirty:u};let p=!1;if(m.ctx=i?i(e,f,(t,n,...s)=>{const r=s.length?s[0]:n;return m.ctx&&o(m.ctx[t],m.ctx[t]=r)&&(m.bound[t]&&m.bound[t](r),p&&P(e,t)),n}):[],m.update(),p=!0,s(m.before_update),m.fragment=!!l&&l(m.ctx),r.target){if(r.hydrate){const t=function(t){return Array.from(t.childNodes)}(r.target);m.fragment&&m.fragment.l(t),t.forEach(d)}else m.fragment&&m.fragment.c();r.intro&&j(e.$$.fragment),D(e,r.target,r.anchor),H()}E(a)}class q{$destroy(){J(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}const V=[];function F(e,n=t){let s;const r=[];function l(t){if(i(e,t)&&(e=t,s)){const t=!V.length;for(let t=0;t<r.length;t+=1){const n=r[t];n[1](),V.push(n,e)}if(t){for(let t=0;t<V.length;t+=2)V[t][0](V[t+1]);V.length=0}}}return{set:l,update:function(t){l(t(e))},subscribe:function(i,o=t){const c=[i,o];return r.push(c),1===r.length&&(s=n(l)||t),i(e),()=>{const t=r.indexOf(c);-1!==t&&r.splice(t,1),0===r.length&&(s(),s=null)}}}}function G(e,n,i){const o=!Array.isArray(e),c=o?[e]:e,u=n.length<2;return function(t,e){return{subscribe:F(t,e).subscribe}}(i,e=>{let i=!1;const a=[];let f=0,d=t;const m=()=>{if(f)return;d();const s=n(o?a[0]:a,e);u?e(s):d=r(s)?s:t},p=c.map((t,e)=>l(t,t=>{a[e]=t,f&=~(1<<e),i&&m()},()=>{f|=1<<e}));return i=!0,m(),function(){s(p),d()}})}const K=F(function(){let t=null;try{t=JSON.parse(localStorage.getItem("cyclic-timer-config"))}catch(t){console.error(t)}return t||[]}()),Q=F(null);let U=F(null);const X=G(U,t=>!!t),Y=G(Q,t=>null!=t);let Z=null;const tt=G([K,Q],([t,e],n)=>{if(Z=n,!t.length)return n(null);const s=e%t.length,r=null!=e&&t[s];if(!r)return n(null);n({...r,timeLeft:r.time,index:s})}),et=G([K,Q],([t,e])=>null!=e&&t.length?Math.floor(e/t.length)+1:0),nt={subscribe:K.subscribe,set:t=>{it(),K.set(t),function(t){localStorage.setItem("cyclic-timer-config",JSON.stringify(t))}(t)},update:t=>nt.set(t(o(K)))},st=()=>{const t=o(U);t&&(clearInterval(t),U.set(null))},rt=()=>{let t=o(tt);if(!t)return st();t.timeLeft--<=0?Q.update(t=>++t):Z(t)},it=()=>{lt(),Q.set(null)},lt=()=>{st()};const ot=t=>{if(t<0)return":";let e=Math.floor(t/60),n=t%60;return`${e<10?"0"+e:e}:${n<10?"0"+n:n}`},ct=t=>{const[e,n]=t.split(":"),s=60*parseInt(e)+parseInt(n);return isNaN(s)?0:s},ut=t=>((t,e=null)=>{let n=e,s=t.string(e);return{get value(){return n},set value(e){n=e,s=t.string(e)},get value$(){return s},set value$(e){n=t.value(e),s=e}}})({string:ot,value:ct},t),at=t=>(t.addEventListener("keydown",pt),t.addEventListener("keyup",ht),t.addEventListener("select",vt),t.addEventListener("paste",gt),t.addEventListener("drop",gt),{destroy:()=>{t.removeEventListener("keydown",pt),t.removeEventListener("keyup",ht),t.removeEventListener("select",vt),t.removeEventListener("paste",gt),t.removeEventListener("drop",gt)}}),ft=/^\d$/,dt=/^\d{2}:\d{2}$/,mt=Symbol("prevValue");function pt(t){let e=this[mt]=this.value;if(ft.test(t.key)){if(e=e.slice(0,this.selectionStart)+t.key+e.slice(this.selectionStart+1),console.log(e),dt.test(e))return void(this.selectionEnd=this.selectionStart+1)}else{if(t.key.startsWith("Arrow"))return"ArrowLeft"===t.key&&3===this.selectionStart&&(this.selectionStart=this.selectionEnd=2),void("ArrowRight"===t.key&&1===this.selectionStart&&(this.selectionStart=this.selectionEnd=2));if("Backspace"===t.key&&this.selectionStart>0){let t=this.selectionStart;return 3===t&&(t=2),this.value=e.slice(0,t)+"0"+e.slice(t),void(this.selectionEnd=this.selectionStart=t)}}t.preventDefault()}function ht(t){let e=this.value;dt.test(e)||(this.value=this[mt]),2===this.selectionStart&&(this.selectionStart=this.selectionEnd=3)}function vt(){let t=this.selectionStart;2===t&&(t=3),this.selectionEnd=this.selectionStart=t}function gt(t){t.preventDefault()}function yt(e){let n,s;return{c(){n=m("div"),s=p(e[0]),g(n,"class","svelte-h9hghp")},m(t,e){f(t,n,e),a(n,s)},p(t,[e]){1&e&&y(s,t[0])},i:t,o:t,d(t){t&&d(n)}}}function $t(t,e,n){let s,{time:r=0}=e;return t.$set=t=>{"time"in t&&n(1,r=t.time)},t.$$.update=()=>{2&t.$$.dirty&&n(0,s=ot(r))},[s,r]}class bt extends q{constructor(t){super(),R(this,t,$t,yt,i,{time:1})}}function kt(t,e,n){const s=t.slice();return s[21]=e[n],s[22]=e,s[23]=n,s}function xt(t){let e,n;return{c(){e=m("img"),e.src!==(n="images/play.svg")&&g(e,"src","images/play.svg"),g(e,"alt","play"),g(e,"class","svelte-kfclxt")},m(t,n){f(t,e,n)},d(t){t&&d(e)}}}function wt(t){let e,n;return{c(){e=m("img"),e.src!==(n="images/pause.svg")&&g(e,"src","images/pause.svg"),g(e,"alt","pause"),g(e,"class","svelte-kfclxt")},m(t,n){f(t,e,n)},d(t){t&&d(e)}}}function St(e,n){let i,l,o,c,u,p,y,b;function k(){n[16].call(l,n[21])}function x(){n[17].call(u,n[21])}function w(...t){return n[18](n[23],...t)}return{key:e,first:null,c(){i=m("div"),l=m("input"),c=h(),u=m("input"),p=h(),y=m("button"),y.innerHTML='<img src="images/remove.svg" alt="remove" class="svelte-kfclxt">',l.readOnly=n[5],g(l,"class","time svelte-kfclxt"),u.readOnly=n[5],g(u,"class","name svelte-kfclxt"),g(y,"class","svelte-kfclxt"),g(i,"class","input-row svelte-kfclxt"),S(i,"active",n[23]===n[4]),this.first=i},m(e,d,m){var h;f(e,i,d),a(i,l),$(l,n[21].time.value$),a(i,c),a(i,u),$(u,n[21].name),a(i,p),a(i,y),m&&s(b),b=[v(l,"input",k),(h=o=at.call(null,l),h&&r(h.destroy)?h.destroy:t),v(u,"input",x),v(y,"click",w)]},p(t,e){n=t,32&e&&(l.readOnly=n[5]),2&e&&l.value!==n[21].time.value$&&$(l,n[21].time.value$),32&e&&(u.readOnly=n[5]),2&e&&u.value!==n[21].name&&$(u,n[21].name),18&e&&S(i,"active",n[23]===n[4])},d(t){t&&d(i),s(b)}}}function Et(t){let e,n,r,i,l,o,c,u,$,k,x,E,L,_,A,M,I,O,T,z,H=[],W=new Map;function P(t,e){return t[6]?wt:xt}let R=P(t),q=R(t);const V=new bt({props:{time:t[3]}});let F=t[1];const G=t=>t[21];for(let e=0;e<F.length;e+=1){let n=kt(t,F,e),s=G(n);W.set(s,H[e]=St(s,n))}return{c(){var s;e=m("main"),n=m("div"),r=m("div"),i=m("button"),q.c(),l=h(),o=m("button"),o.innerHTML='<img src="images/stop.svg" alt="stop" class="svelte-kfclxt">',c=h(),u=m("div"),$=p("Round: "),k=p(t[8]),x=h(),(s=V.$$.fragment)&&s.c(),E=h();for(let t=0;t<H.length;t+=1)H[t].c();L=h(),_=m("div"),A=m("button"),A.innerHTML='<img src="images/add.svg" alt="add" class="svelte-kfclxt">',I=h(),O=m("video"),O.innerHTML='<source src="video/blank.m4v"><source src="video/blank.ogv" type="video/ogg"><source src="video/blank.webm" type="video/webm">',g(i,"class","svelte-kfclxt"),g(o,"class","svelte-kfclxt"),g(r,"class","buttons"),g(u,"class","round svelte-kfclxt"),g(A,"class","svelte-kfclxt"),g(_,"class","add svelte-kfclxt"),b(n,"transform","scale("+t[7]+")"),g(n,"class","svelte-kfclxt"),S(n,"running",t[6]),S(n,"started",t[5]),g(e,"class","svelte-kfclxt"),N(()=>t[19].call(e)),O.loop=!0,O.muted=!0,O.playsInline=!0,g(O,"class","svelte-kfclxt")},m(d,m,p){f(d,e,m),a(e,n),a(n,r),a(r,i),q.m(i,null),a(r,l),a(r,o),a(n,c),a(n,u),a(u,$),a(u,k),a(n,x),D(V,n,null),a(n,E);for(let t=0;t<H.length;t+=1)H[t].m(n,null);a(n,L),a(n,_),a(_,A),M=w(e,t[19].bind(e)),f(d,I,m),f(d,O,m),t[20](O),T=!0,p&&s(z),z=[v(i,"click",t[9]),v(o,"click",t[10]),v(A,"click",t[12])]},p(t,[e]){R!==(R=P(t))&&(q.d(1),q=R(t),q&&(q.c(),q.m(i,null))),(!T||256&e)&&y(k,t[8]);const s={};if(8&e&&(s.time=t[3]),V.$set(s),2098&e){const s=t[1];H=function(t,e,n,s,r,i,l,o,c,u,a,f){let d=t.length,m=i.length,p=d;const h={};for(;p--;)h[t[p].key]=p;const v=[],g=new Map,y=new Map;for(p=m;p--;){const t=f(r,i,p),o=n(t);let c=l.get(o);c?s&&c.p(t,e):(c=u(o,t),c.c()),g.set(o,v[p]=c),o in h&&y.set(o,Math.abs(p-h[o]))}const $=new Set,b=new Set;function k(t){j(t,1),t.m(o,a,l.has(t.key)),l.set(t.key,t),a=t.first,m--}for(;d&&m;){const e=v[m-1],n=t[d-1],s=e.key,r=n.key;e===n?(a=e.first,d--,m--):g.has(r)?!l.has(s)||$.has(s)?k(e):b.has(r)?d--:y.get(s)>y.get(r)?(b.add(s),k(e)):($.add(r),d--):(c(n,l),d--)}for(;d--;){const e=t[d];g.has(e.key)||c(e,l)}for(;m;)k(v[m-1]);return v}(H,e,G,1,t,s,W,n,B,St,L,kt)}(!T||128&e)&&b(n,"transform","scale("+t[7]+")"),64&e&&S(n,"running",t[6]),32&e&&S(n,"started",t[5])},i(t){T||(j(V.$$.fragment,t),T=!0)},o(t){!function(t,e,n,s){if(t&&t.o){if(C.has(t))return;C.add(t),(void 0).c.push(()=>{C.delete(t),s&&(n&&t.d(1),s())}),t.o(e)}}(V.$$.fragment,t),T=!1},d(n){n&&d(e),q.d(),J(V);for(let t=0;t<H.length;t+=1)H[t].d();M(),n&&d(I),n&&d(O),t[20](null),s(z)}}}function Lt(t,e,n){let s,r,i,l,a,f;c(t,nt,t=>n(13,s=t)),c(t,tt,t=>n(14,r=t)),c(t,Y,t=>n(5,i=t)),c(t,X,t=>n(6,l=t)),c(t,et,t=>n(8,a=t)),s&&s.length||u(nt,s=[{name:"action",time:60},{name:"break",time:15}]);const d=()=>s.map(t=>({name:t.name,time:ut(t.time)}));let m=d();const p=t=>{n(1,m=m.filter((e,n)=>t!==n))};let h=250;let v,g,y;return t.$$.update=()=>{16384&t.$$.dirty&&n(3,v=r?r.timeLeft:-1),16384&t.$$.dirty&&n(4,g=r&&r.index),8&t.$$.dirty&&(v<4&&v>0?new Audio("sound/beep-ping.mp3").play():0===v&&new Audio("sound/horn-honk.mp3").play()),16&t.$$.dirty&&null!=g&&new Audio("sound/electronic-chime.mp3").play(),4&t.$$.dirty&&n(7,y=h/250)},[f,m,h,v,g,i,l,y,a,()=>{if(i&&l)return f.pause(),lt();i||(u(nt,s=m.map(t=>({name:t.name,time:t.time.value}))),n(1,m=d())),f.play(),((t=!0)=>{o(X)||(t&&(Q.set(null),Q.set(0)),U.set(setInterval(rt,1e3)))})(!i)},()=>{f.pause(),it()},p,()=>{n(1,m=[...m,{name:"new",time:ut(10)}])},s,r,d,function(t){t.time.value$=this.value,n(1,m)},function(t){t.name=this.value,n(1,m)},t=>p(t),function(){h=this.offsetWidth,n(2,h)},function(t){_[t?"unshift":"push"](()=>{n(0,f=t)})}]}return new class extends q{constructor(t){super(),R(this,t,Lt,Et,i,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
