(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fa31890e"],{5882:function(t,e,a){},6401:function(t,e,a){},"99cf":function(t,e,a){"use strict";a("5882")},"9a0b":function(t,e,a){"use strict";a.r(e);var o=a("7a23"),r=function(t){return Object(o["A"])("data-v-1d53d3c1"),t=t(),Object(o["y"])(),t},c={class:"row pt-1"},n={class:"col-md-1"},i={class:"d-flex flex-column align-items-stretch flex-shrink-0 bg-white",style:{width:"140px",height:"100%"}},s={class:"list-group list-group-flush border-bottom scrollarea"},u=r((function(){return Object(o["h"])("div",{class:"d-flex w-100 align-items-center justify-content-center"},[Object(o["h"])("i",{class:"bi bi-cash iconosBootstrap me-3"})],-1)})),d=r((function(){return Object(o["h"])("div",{class:"d-flex w-100 align-items-center justify-content-center"},[Object(o["h"])("i",{class:"bi bi-piggy-bank iconosBootstrap me-3"})],-1)})),b=r((function(){return Object(o["h"])("div",{class:"d-flex w-100 align-items-center justify-content-center"},[Object(o["h"])("i",{class:"bi bi-door-open iconosBootstrap me-3"})],-1)})),l=r((function(){return Object(o["h"])("div",{class:"d-flex w-100 align-items-center justify-content-center"},[Object(o["h"])("i",{class:"bi bi-trash iconosBootstrap me-3"})],-1)})),j=[l],p=r((function(){return Object(o["h"])("div",{class:"d-flex w-100 align-items-center justify-content-center"},[Object(o["h"])("i",{class:"bi bi-globe iconosBootstrap me-3"})],-1)})),f=[p],h=r((function(){return Object(o["h"])("div",{class:"d-flex w-100 align-items-center justify-content-center"},[Object(o["h"])("i",{class:"bi bi-pencil-square iconosBootstrap me-3"})],-1)})),m=[h],g=r((function(){return Object(o["h"])("div",{class:"d-flex w-100 align-items-center justify-content-center"},[Object(o["h"])("i",{class:"bi bi-key iconosBootstrap me-3"})],-1)})),O={class:"col"};function v(t,e,a,r,l,p){var h=Object(o["F"])("router-link"),v=Object(o["F"])("Trabajador"),T=Object(o["F"])("router-view");return Object(o["x"])(),Object(o["g"])("div",c,[Object(o["h"])("div",n,[Object(o["h"])("div",i,[Object(o["h"])("div",s,[Object(o["k"])(h,{to:"/",class:"list-group-item list-group-item-action py-3 lh-tight"},{default:Object(o["Q"])((function(){return[u]})),_:1}),Object(o["k"])(h,{to:"/menu/caja/tickets",class:"list-group-item list-group-item-action py-3 lh-tight"},{default:Object(o["Q"])((function(){return[d]})),_:1}),Object(o["k"])(h,{to:"/menu/fichajes",class:"list-group-item list-group-item-action py-3 lh-tight"},{default:Object(o["Q"])((function(){return[b]})),_:1}),Object(o["h"])("button",{onClick:e[0]||(e[0]=function(t){return r.devoluciones()}),class:"list-group-item list-group-item-action py-3 lh-tight"},j),Object(o["h"])("button",{onClick:e[1]||(e[1]=function(t){return r.menuPedidos()}),class:"list-group-item list-group-item-action py-3 lh-tight"},f),Object(o["h"])("button",{onClick:e[2]||(e[2]=function(t){return r.imprimirEntregas()}),class:"list-group-item list-group-item-action py-3 lh-tight"},m),Object(o["k"])(h,{to:"/menuTecnico",class:"list-group-item list-group-item-action py-3 lh-tight"},{default:Object(o["Q"])((function(){return[g]})),_:1}),Object(o["k"])(v)])])]),Object(o["h"])("div",O,[Object(o["k"])(T)])])}a("99af");var T=a("5502"),y=a("bc3a"),k=a.n(y),w=a("a18c"),A=a("f06f"),x=["onClick"];function C(t,e,a,r,c,n){return Object(o["x"])(!0),Object(o["g"])(o["a"],null,Object(o["D"])(r.arrayTrabajadores,(function(t,e){return Object(o["x"])(),Object(o["g"])("div",{class:Object(o["r"])(["btn mb-3",[{"btn-color":r.esActivo(t.idTrabajador),"btn-outline-color":!r.esActivo(t.idTrabajador)}]]),key:e,onClick:function(e){return r.changeActivo(t.idTrabajador)}},Object(o["I"])(t.nombre),11,x)})),128)}var B={name:"Trabajador",setup:function(){var t=Object(T["b"])(),e=Object(o["C"])(),a=Object(o["C"])([]);function r(t){return e.value===t}function c(e){k.a.post("trabajadores/setActivo",{id:e}).then((function(a){a.data.error?toast.error("Error al cambiar trabajador activo"):(t.dispatch("Trabajadores/setTrabajadorActivo",e),t.dispatch("Cesta/setNameAction",""),t.dispatch("Cesta/setIdAction",e),n(),w["a"].push("/"))}))}function n(){k.a.post("trabajadores/getTrabajadoresFichados").then((function(o){o.data.error?toast.error("Error en getTrabajadoresFichados"):o.data.res.length>0&&(t.dispatch("Trabajadores/setArrayTrabajadores",o.data.res),a.value=o.data.res,k.a.post("trabajadores/getCurrentTrabajador").then((function(a){a.data.error?tosat.error("Error en getCurrentTrabajador"):(e.value=a.data.trabajador.idTrabajador,t.dispatch("Trabajadores/setTrabajadorActivo",a.data.trabajador.idTrabajador))}))["catch"]((function(t){console.log(t)})))}))["catch"]((function(t){console.log(t)}))}return Object(o["v"])((function(){n()})),{arrayTrabajadores:a,esActivo:r,changeActivo:c}}},E=(a("99cf"),a("d959")),_=a.n(E);const F=_()(B,[["render",C],["__scopeId","data-v-7843a86e"]]);var I=F,M=a("0180"),P={name:"Menu",props:{tipoToast:{required:!1},mensajeToast:{required:!1}},setup:function(t){var e=Object(M["b"])(),a=Object(T["b"])(),r=Object(o["c"])((function(){return a.state.Menu.hidden})),c=A["a"].getParametros(),n=Object(o["C"])("");function i(){a.dispatch("Ticket/setActivoAction",null)}function s(){a.dispatch("Menu/setHiddenAction",!0),i()}function u(){w["a"].push("/menu/pedidos/".concat(c.codigoTienda))}function d(t){w["a"].push(t)}function b(){d(n.value)}function l(){a.dispatch("setModoActual","DEVOLUCION"),w["a"].push("/")}function j(){k.a.post("impresora/imprimirEntregas"),s(),i()}return k.a.get("parametros/getParametrosBonito").then((function(t){0==t.data.error?n.value="/menu/pedidos/".concat(t.data.parametros.codigoTienda,"/").concat(t.data.parametros.database):e.error("Error en parametros/getParametrosBonito")})),void 0!=t.tipoToast&&void 0!=t.mensajeToast&&e(t.mensajeToast,{type:t.tipoToast}),{menuPedidos:b,pedidos:u,devoluciones:l,isHidden:r,hideMenu:s,quitarActivoTicket:i,imprimirEntregas:j,goTo:d,url:n}},components:{Trabajador:I}};a("c0a0");const q=_()(P,[["render",v],["__scopeId","data-v-1d53d3c1"]]);e["default"]=q},c0a0:function(t,e,a){"use strict";a("6401")}}]);
//# sourceMappingURL=chunk-fa31890e.42a673b8.js.map