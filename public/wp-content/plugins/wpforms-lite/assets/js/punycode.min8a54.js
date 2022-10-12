"use strict";var punycode=new function(){this.utf16={decode:function(r){for(var e,o,t=[],n=0,f=r.length;n<f;){if(55296==(63488&(e=r.charCodeAt(n++)))){if(o=r.charCodeAt(n++),55296!=(64512&e)||56320!=(64512&o))throw new RangeError("UTF-16(decode): Illegal UTF-16 sequence");e=((1023&e)<<10)+(1023&o)+65536}t.push(e)}return t},encode:function(r){for(var e,o=[],t=0,n=r.length;t<n;){if(55296==(63488&(e=r[t++])))throw new RangeError("UTF-16(encode): Illegal UTF-16 value");65535<e&&(e-=65536,o.push(String.fromCharCode(e>>>10&1023|55296)),e=56320|1023&e),o.push(String.fromCharCode(e))}return o.join("")}};var v=36,A=2147483647;this.decode=function(r,l){var e,o,t,u,n,f,d,h,a=[],s=[],g=r.length,C=128,i=0,p=72,c=r.lastIndexOf("-");for(c<0&&(c=0),o=0;o<c;++o){if(l&&(s[a.length]=r.charCodeAt(o)-65<26),128<=r.charCodeAt(o))throw new RangeError("Illegal input >= 0x80");a.push(r.charCodeAt(o))}for(t=0<c?c+1:0;t<g;){for(u=i,n=1,f=v;;f+=v){if(g<=t)return;if(h=r.charCodeAt(t++),v<=(h=h-48<10?h-22:h-65<26?h-65:h-97<26?h-97:v))return;if(h>Math.floor((A-i)/n))return;if(i+=h*n,h<(h=f<=p?1:p+26<=f?26:f-p))break;if(n>Math.floor(A/(v-h)))return;n*=v-h}if(p=function(r,e,o){var t;for(r=o?Math.floor(r/700):r>>1,r+=Math.floor(r/e),t=0;455<r;t+=v)r=Math.floor(r/35);return Math.floor(t+36*r/(r+38))}(i-u,e=a.length+1,0===u),Math.floor(i/e)>A-C)return;C+=Math.floor(i/e),i%=e,l&&s.splice(i,0,r.charCodeAt(t-1)-65<26),a.splice(i,0,C),i++}if(l)for(i=0,d=a.length;i<d;i++)s[i]&&(a[i]=String.fromCharCode(a[i]).toUpperCase().charCodeAt(0));return this.utf16.encode(a)},this.toUnicode=function(r){for(var e=r.split("."),o=[],t=0;t<e.length;++t){var n=e[t];o.push(n.match(/^xn--/)?punycode.decode(n.slice(4)):n)}return o.join(".")}};