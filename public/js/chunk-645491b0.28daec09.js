(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-645491b0"],{"0afe":function(t,e,c){"use strict";c("4620")},"159b":function(t,e,c){var a=c("da84"),i=c("fdbc"),n=c("785a"),o=c("17c2"),r=c("9112"),s=function(t){if(t&&t.forEach!==o)try{r(t,"forEach",o)}catch(e){t.forEach=o}};for(var l in i)i[l]&&s(a[l]&&a[l].prototype);s(n)},"17c2":function(t,e,c){"use strict";var a=c("b727").forEach,i=c("a640"),n=i("forEach");t.exports=n?[].forEach:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}},4160:function(t,e,c){"use strict";var a=c("23e7"),i=c("17c2");a({target:"Array",proto:!0,forced:[].forEach!=i},{forEach:i})},4620:function(t,e,c){},a640:function(t,e,c){"use strict";var a=c("d039");t.exports=function(t,e){var c=[][t];return!!c&&a((function(){c.call(null,e||function(){throw 1},1)}))}},ef15:function(t,e,c){"use strict";c.r(e);c("b0c0");var a=c("7a23"),i=function(t){return Object(a["A"])("data-v-7b53b3ae"),t=t(),Object(a["y"])(),t},n={class:"row justify-content-center mt-4"},o={class:"col-7"},r={class:"card"},s=i((function(){return Object(a["h"])("div",{class:"card-header"},[Object(a["h"])("h4",null,"Último cierre de caja")],-1)})),l={class:"card-body"},b={class:"row row-2"},d={class:"col-6"},u=i((function(){return Object(a["h"])("h6",{class:"text-center"},"Detalle",-1)})),f={class:"card"},j={class:"card-body"},O={class:"text-muted"},h={class:"row row-2"},v=i((function(){return Object(a["h"])("div",{class:"col-4"},"Resp:",-1)})),m={class:"col-8 text-start"},p=i((function(){return Object(a["h"])("div",{class:"col-4"},"Inici:",-1)})),C={class:"col-8 text-start"},x=i((function(){return Object(a["h"])("div",{class:"col-4"},"Final:",-1)})),g={class:"col-8 text-start"},I=i((function(){return Object(a["h"])("div",{class:"col-6 mb-2 mt-4"},"Calaix fet:",-1)})),D={class:"col-4 mb-2 mt-4 text-start"},w=i((function(){return Object(a["h"])("div",{class:"col-6 mt-2"},"Descuadre:",-1)})),F={class:"col-4 mt-2 text-start"},T=i((function(){return Object(a["h"])("div",{class:"col-6 mt-2"},"Clients atessos:",-1)})),y={class:"col-4 mt-2 text-start"},E=i((function(){return Object(a["h"])("div",{class:"col-6 mt-2"},"Rescaudat:",-1)})),M={class:"col-4 mt-2 text-start"},k=i((function(){return Object(a["h"])("div",{class:"col-6 mt-2"},"Total 3G:",-1)})),G={class:"col-4 mt-2 text-start"},U=i((function(){return Object(a["h"])("div",{class:"col-6 mt-2"},"Canvi inicial:",-1)})),H={class:"col-4 mt-2 text-start"},Y=i((function(){return Object(a["h"])("div",{class:"col-6 mt-2"},"Canvi final:",-1)})),Z={class:"col-4 mt-2 text-start"},_={class:"col-6 overflow-scroll"},A=i((function(){return Object(a["h"])("h6",{class:"text-center"},"Moviments de Caixa",-1)})),B={class:"card-body"},J={class:"row row-2 text-muted"},R=i((function(){return Object(a["h"])("div",{class:"col-4"},"Cantidad: ",-1)})),P={class:"col-6 text-start"},V=i((function(){return Object(a["h"])("div",{class:"col-4"},"Fecha: ",-1)})),q={class:"col-6 text-start"},z=i((function(){return Object(a["h"])("div",{class:"col-4"},"Concepto: ",-1)})),K={class:"col-6 text-start"},L={class:"card-footer text-center"},N=i((function(){return Object(a["h"])("i",{class:"bi bi-printer-fill fs-3"},null,-1)})),Q=[N];function S(t,e,c,i,N,S){return Object(a["x"])(),Object(a["g"])("div",n,[Object(a["h"])("div",o,[Object(a["h"])("div",r,[s,Object(a["h"])("div",l,[Object(a["h"])("div",b,[Object(a["h"])("div",d,[u,Object(a["h"])("div",f,[Object(a["h"])("div",j,[Object(a["h"])("div",O,[Object(a["h"])("div",h,[v,Object(a["h"])("div",m,Object(a["I"])(i.name),1),p,Object(a["h"])("div",C,Object(a["I"])(i.inicioTime),1),x,Object(a["h"])("div",g,Object(a["I"])(i.finalTime),1),I,Object(a["h"])("div",D,Object(a["I"])(i.calaixFetZ),1),w,Object(a["h"])("div",F,Object(a["I"])(i.descuadre),1),T,Object(a["h"])("div",y,Object(a["I"])(i.nClientes),1),E,Object(a["h"])("div",M,Object(a["I"])(i.recaudado),1),k,Object(a["h"])("div",G,Object(a["I"])(i.totalDatafono3G),1),U,Object(a["h"])("div",H,Object(a["I"])(i.cambioInicial),1),Y,Object(a["h"])("div",Z,Object(a["I"])(i.cambioFinal),1)])])])])]),Object(a["h"])("div",_,[A,(Object(a["x"])(!0),Object(a["g"])(a["a"],null,Object(a["D"])(i.moviments,(function(t,e){return Object(a["x"])(),Object(a["g"])("div",{class:"card mb-2",key:e},[Object(a["h"])("div",B,[Object(a["h"])("div",J,[R,Object(a["h"])("div",P,Object(a["I"])(t.valor),1),V,Object(a["h"])("div",q,Object(a["I"])(t.fecha),1),z,Object(a["h"])("div",K,Object(a["I"])(t.concepto),1)])])])})),128))])])]),Object(a["h"])("div",L,[Object(a["h"])("button",{onClick:e[0]||(e[0]=function(t){return i.imprimirUltimoCierre()}),type:"button",class:"btn botonesPrincipales w-50"},Q)])])])])}c("0d03"),c("4160"),c("d3b7"),c("159b"),c("7b17");var W=c("bc3a"),X=c.n(W),$=(c("a18c"),c("5502")),tt=c("0180"),et={name:"VerCaja",setup:function(){Object(tt["b"])(),Object($["b"])(),Object(a["C"])(0);var t=Object(a["C"])(""),e=Object(a["C"])(0),c=Object(a["C"])(0),i=Object(a["C"])(0),n=Object(a["C"])(0),o=Object(a["C"])(0),r=Object(a["C"])(0),s=Object(a["C"])([]),l=Object(a["C"])(0),b=Object(a["C"])(0),d=Object(a["C"])(0),u=Object(a["C"])(0),f=Object(a["C"])(0),j=Object(a["C"])("");function O(){X.a.post("/caja/getDatosUltimoCierre").then((function(t){X.a.post("/trabajadores/getTrabajadorByID",{id:t.data.info[0].idDependienta}).then((function(e){t.data.info[0].idDependienta=e.data.trabajador.nombre,X.a.post("/caja/getDatosMoviments",{fechaInicio:t.data.info[0].inicioTime,fechaFinal:t.data.info[0].finalTime}).then((function(e){t.data.info[0].movimientos=e.data.info,X.a.post("/impresora/imprimirCaja",{caja:t.data.info[0]}).then((function(t){}))}))}))}))}return Object(a["v"])((function(){X.a.post("/caja/getDatosUltimoCierre").then((function(a){X.a.post("/trabajadores/getTrabajadorByID",{id:a.data.info[0].idDependienta}).then((function(e){t.value=e.data.trabajador.nombre}));var u=new Date(a.data.info[0].inicioTime),f=new Date(a.data.info[0].finalTime);e.value=u.getDate()+"-"+u.getMonth()+"-"+u.getFullYear()+"  "+u.getHours()+":"+u.getMinutes(),c.value=f.getDate()+"-"+f.getMonth()+"-"+f.getFullYear()+"  "+f.getHours()+":"+f.getMinutes(),i.value=a.data.info[0].calaixFetZ,o.value=a.data.info[0].totalDatafono3G,n.value=a.data.info[0].descuadre,r.value=a.data.info[0].nClientes,d.value=a.data.info[0].recaudado,l.value=a.data.info[0].infoExtra.cambioInicial,b.value=a.data.info[0].infoExtra.cambioFinal,X.a.post("/caja/getDatosMoviments",{fechaInicio:a.data.info[0].inicioTime,fechaFinal:a.data.info[0].finalTime}).then((function(t){t.data.info.forEach((function(t){var e=new Date(t._id),c=e.getDate()+"-"+e.getMonth()+"-"+e.getFullYear()+"  "+e.getHours()+":"+e.getMinutes();s.value.push({fecha:c,concepto:t.concepto,valor:t.valor})}))}))}))})),{name:t,inicioTime:e,finalTime:c,calaixFetZ:i,totalDatafono3G:o,descuadre:n,recaudado:d,nClientes:r,cambioInicial:l,cambioFinal:b,moviments:s,concepto:j,valor:f,fecha:u,imprimirUltimoCierre:O}}},ct=(c("0afe"),c("d959")),at=c.n(ct);const it=at()(et,[["render",S],["__scopeId","data-v-7b53b3ae"]]);e["default"]=it}}]);
//# sourceMappingURL=chunk-645491b0.28daec09.js.map