(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1455e880"],{"1da1":function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));r("d3b7");function n(t,e,r,n,o,a,i){try{var c=t[a](i),s=c.value}catch(u){return void r(u)}c.done?e(s):Promise.resolve(s).then(n,o)}function o(t){return function(){var e=this,r=arguments;return new Promise((function(o,a){var i=t.apply(e,r);function c(t){n(i,o,a,c,s,"next",t)}function s(t){n(i,o,a,c,s,"throw",t)}c(void 0)}))}}},"7b47":function(t,e,r){"use strict";r.r(e);var n=r("7a23");function o(t,e,r,o,a,i){var c=Object(n["F"])("InstallWizardComponent");return Object(n["x"])(),Object(n["e"])(c)}var a=r("8782"),i=r.n(a),c=function(t){return Object(n["A"])("data-v-0c3ac351"),t=t(),Object(n["y"])(),t},s=c((function(){return Object(n["h"])("div",{class:"row mt-1"},[Object(n["h"])("h1",{class:"text-center",style:{"font-weight":"bold"}},"Instalador de licencia")],-1)})),u={class:"row mt-2"},l={class:"col"},f={class:"mb-3"},p=c((function(){return Object(n["h"])("label",{class:"form-label"},"Nº Licencia",-1)})),h={class:"mb-3"},d=c((function(){return Object(n["h"])("label",{class:"form-label"},"Contraseña",-1)})),b={class:"mb-3"},m=c((function(){return Object(n["h"])("label",{class:"form-label"},"Tipo datáfono",-1)})),v=c((function(){return Object(n["h"])("option",{selected:"",value:"CLEARONE"},"CLEARONE",-1)})),y=c((function(){return Object(n["h"])("option",{value:"3G"},"3G",-1)})),g=c((function(){return Object(n["h"])("option",{value:"PAYTEF"},"PAYTEF",-1)})),O=[v,y,g],j={class:"col"},w={class:"mb-3"},x=c((function(){return Object(n["h"])("label",{class:"form-label"},"Tipo impresora",-1)})),E=c((function(){return Object(n["h"])("option",{selected:"",value:"USB"},"USB",-1)})),L=c((function(){return Object(n["h"])("option",{value:"SERIE"},"SERIE",-1)})),C=[E,L],k={class:"mb-3"},I=c((function(){return Object(n["h"])("label",{class:"form-label"},"Impresora cafetería",-1)})),N=c((function(){return Object(n["h"])("option",{selected:"",value:"SI"},"SI",-1)})),P=c((function(){return Object(n["h"])("option",{value:"NO"},"NO",-1)})),_=[N,P],R={key:0,class:"row"},S=c((function(){return Object(n["h"])("p",{style:{"font-size":"20px","font-weight":"bold"}},"¡Atención! Si ya habían datos en este TPV, instalar la licencia eliminará los datos antiguos.",-1)})),T={key:0,src:i.a,style:{display:"block",margin:"auto",width:"300px"},alt:"Esperando respuesta del servidor"},A={key:1,class:"row"},G=c((function(){return Object(n["h"])("p",{style:{"font-size":"20px","font-weight":"bold",color:"green"}},"¡Datos correctos! Espera mientras se descargan los datos del TPV.",-1)})),F={key:0,src:i.a,style:{display:"block",margin:"auto",width:"300px"},alt:"Esperando respuesta del servidor"},V={class:"position-absolute bottom-0 end-0 me-2"};function D(t,e,r,o,a,i){return Object(n["x"])(),Object(n["g"])(n["a"],null,[s,Object(n["h"])("div",u,[Object(n["h"])("div",l,[Object(n["h"])("div",f,[p,Object(n["R"])(Object(n["h"])("input",{"onUpdate:modelValue":e[0]||(e[0]=function(t){return o.licencia=t}),type:"number",class:"form-control form-control-lg"},null,512),[[n["N"],o.licencia]])]),Object(n["h"])("div",h,[d,Object(n["R"])(Object(n["h"])("input",{"onUpdate:modelValue":e[1]||(e[1]=function(t){return o.password=t}),type:"password",class:"form-control form-control-lg",autocomplete:"on"},null,512),[[n["N"],o.password]])]),Object(n["h"])("div",b,[m,Object(n["R"])(Object(n["h"])("select",{"onUpdate:modelValue":e[2]||(e[2]=function(t){return o.tipoDatafono=t}),class:"form-select form-select-lg mb-3"},O,512),[[n["M"],o.tipoDatafono]])])]),Object(n["h"])("div",j,[Object(n["h"])("div",w,[x,Object(n["R"])(Object(n["h"])("select",{"onUpdate:modelValue":e[3]||(e[3]=function(t){return o.tipoImpresora=t}),class:"form-select form-select-lg mb-3"},C,512),[[n["M"],o.tipoImpresora]])]),Object(n["h"])("div",k,[I,Object(n["R"])(Object(n["h"])("select",{"onUpdate:modelValue":e[4]||(e[4]=function(t){return o.impresoraCafeteria=t}),class:"form-select form-select-lg mb-3"},_,512),[[n["M"],o.impresoraCafeteria]])])])]),o.primeraParte?(Object(n["x"])(),Object(n["g"])("div",R,[S,o.esperando?(Object(n["x"])(),Object(n["g"])("img",T)):Object(n["f"])("",!0)])):Object(n["f"])("",!0),o.segundaParte?(Object(n["x"])(),Object(n["g"])("div",A,[G,o.esperando?(Object(n["x"])(),Object(n["g"])("img",F)):Object(n["f"])("",!0)])):Object(n["f"])("",!0),Object(n["h"])("div",V,[Object(n["h"])("button",{type:"button",class:"btn btn-success botones me-4",onClick:e[5]||(e[5]=function(t){return o.irAVentas()})}," Menú ventas "),Object(n["h"])("button",{type:"button",class:"btn btn-primary botones me-2",onClick:e[6]||(e[6]=function(t){return o.confirmar()})}," Confirmar "),Object(n["h"])("button",{type:"button",class:"btn btn-danger botones",onClick:e[7]||(e[7]=function(e){return t.reset()})}," Reset ")])],64)}var U=r("1da1"),z=(r("96cf"),r("99af"),r("a9e3"),r("bc3a")),M=r.n(z),W=r("a18c"),Y=r("0180"),B={name:"InstallWizard",setup:function(){var t=Object(Y["b"])(),e=Object(n["C"])(""),r=Object(n["C"])(""),o=Object(n["C"])("USB"),a=Object(n["C"])("CLEARONE"),i=Object(n["C"])("NO"),c=Object(n["C"])(!1),s=Object(n["C"])(!0),u=Object(n["C"])(!1);function l(){console.log("La password es: ".concat(r.value," y la licencia: ").concat(e.value))}function f(){return p.apply(this,arguments)}function p(){return p=Object(U["a"])(regeneratorRuntime.mark((function n(){var l,f,p;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return c.value=!0,l={parametros:{licencia:Number(e.value),password:r.value,tipoImpresora:o.value,tipoDatafono:a.value,impresoraCafeteria:i.value}},console.log(l),n.prev=3,n.next=6,M.a.post("/instalador/pedirDatos",{password:l.parametros.password,numLlicencia:l.parametros.licencia,tipoImpresora:l.parametros.tipoImpresora,tipoDatafono:l.parametros.tipoDatafono,impresoraCafeteria:l.parametros.impresoraCafeteria});case 6:if(f=n.sent,f.data.error){n.next=16;break}return s.value=!1,u.value=!0,n.next=12,M.a.post("instalador/descargarTodo");case 12:p=n.sent,!1===p.data.error?(W["a"].push("/"),c.value=!1):(c.value=!1,t.error(p.data.mensaje)),n.next=18;break;case 16:c.value=!1,t.error(f.data.mensaje);case 18:n.next=25;break;case 20:n.prev=20,n.t0=n["catch"](3),console.log(n.t0),c.value=!1,t.error("Ha habido un error. Comprueba el log");case 25:case"end":return n.stop()}}),n,null,[[3,20]])}))),p.apply(this,arguments)}function h(){W["a"].push("/")}return{irAVentas:h,primeraParte:s,segundaParte:u,testPrint:l,confirmar:f,licencia:e,password:r,tipoImpresora:o,tipoDatafono:a,impresoraCafeteria:i,esperando:c}}},J=(r("9296"),r("d959")),H=r.n(J);const q=H()(B,[["render",D],["__scopeId","data-v-0c3ac351"]]);var K=q,Q={name:"InstallWizard",components:{InstallWizardComponent:K}};const X=H()(Q,[["render",o]]);e["default"]=X},8782:function(t,e,r){t.exports=r.p+"img/loadingNew.4cbd3eda.gif"},"8cfc":function(t,e,r){},9296:function(t,e,r){"use strict";r("8cfc")},"96cf":function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function s(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(R){s=function(t,e,r){return t[e]=r}}function u(t,e,r,n){var o=e&&e.prototype instanceof m?e:m,a=Object.create(o.prototype),i=new N(n||[]);return a._invoke=L(t,r,i),a}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(R){return{type:"throw",arg:R}}}t.wrap=u;var f="suspendedStart",p="suspendedYield",h="executing",d="completed",b={};function m(){}function v(){}function y(){}var g={};s(g,a,(function(){return this}));var O=Object.getPrototypeOf,j=O&&O(O(P([])));j&&j!==r&&n.call(j,a)&&(g=j);var w=y.prototype=m.prototype=Object.create(g);function x(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,e){function r(o,a,i,c){var s=l(t[o],t,a);if("throw"!==s.type){var u=s.arg,f=u.value;return f&&"object"===typeof f&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,i,c)}),(function(t){r("throw",t,i,c)})):e.resolve(f).then((function(t){u.value=t,i(u)}),(function(t){return r("throw",t,i,c)}))}c(s.arg)}var o;function a(t,n){function a(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(a,a):a()}this._invoke=a}function L(t,e,r){var n=f;return function(o,a){if(n===h)throw new Error("Generator is already running");if(n===d){if("throw"===o)throw a;return _()}r.method=o,r.arg=a;while(1){var i=r.delegate;if(i){var c=C(i,r);if(c){if(c===b)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=d,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=h;var s=l(t,e,r);if("normal"===s.type){if(n=r.done?d:p,s.arg===b)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n=d,r.method="throw",r.arg=s.arg)}}}function C(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,C(t,r),"throw"===r.method))return b;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return b}var o=l(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,b;var a=o.arg;return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,b):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,b)}function k(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function I(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function N(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(k,this),this.reset(!0)}function P(t){if(t){var r=t[a];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var o=-1,i=function r(){while(++o<t.length)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}return{next:_}}function _(){return{value:e,done:!0}}return v.prototype=y,s(w,"constructor",y),s(y,"constructor",v),v.displayName=s(y,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,s(t,c,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},x(E.prototype),s(E.prototype,i,(function(){return this})),t.AsyncIterator=E,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new E(u(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},x(w),s(w,c,"Generator"),s(w,a,(function(){return this})),s(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=P,N.prototype={constructor:N,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(I),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return c.type="throw",c.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var s=n.call(i,"catchLoc"),u=n.call(i,"finallyLoc");if(s&&u){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,b):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),b},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),I(r),b}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;I(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:P(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),b}},t}(t.exports);try{regeneratorRuntime=n}catch(o){"object"===typeof globalThis?globalThis.regeneratorRuntime=n:Function("r","regeneratorRuntime = r")(n)}}}]);
//# sourceMappingURL=chunk-1455e880.51a30068.js.map