(this["webpackJsonppair-gen"]=this["webpackJsonppair-gen"]||[]).push([[0],{100:function(e,t,n){},101:function(e,t,n){},117:function(e,t,n){},129:function(e,t,n){},132:function(e,t,n){"use strict";n.r(t);var c=n(8),a=n(0),i=n.n(a),r=n(17),o=n.n(r),l=(n(99),n(30)),s=n(28),u=n(23),j=n(41),f=(n(100),n(139)),d=(n(101),32),b=8,h=37,g=13,O=9;var p=function(e){var t=e.names,n=e.onNewName,i=e.onEnter,r=Object(a.useState)([]),o=Object(s.a)(r,2),u=o[0],j=o[1],p=Object(a.useState)(""),m=Object(s.a)(p,2),v=m[0],x=m[1],w=Object(a.useRef)(null);Object(a.useEffect)((function(){JSON.stringify(u)!==JSON.stringify(t)&&j(t)}),[t]),Object(a.useEffect)((function(){JSON.stringify(u)!==JSON.stringify(t)&&n(u)}),[u]);var y=function(e){j([].concat(Object(l.a)(u),[String(e)])),x("")},S=function(){var e=u.pop();return j(Object(l.a)(u)),null!==e&&void 0!==e?e:""};return Object(c.jsx)(c.Fragment,{children:Object(c.jsxs)("div",{className:"input-container",children:[u.map((function(e){return Object(c.jsx)(f.a,{style:{margin:"4px",display:"flex",alignItems:"center"},closable:!0,onClose:function(t){t.preventDefault(),function(e){var t,n=u.filter((function(t){return t!==e}));j(n),null===w||void 0===w||null===(t=w.current)||void 0===t||t.focus()}(e)},color:"#63b89e",children:e})})),Object(c.jsx)("input",{className:"pair-input",ref:w,autoFocus:!0,placeholder:u.length?"":"Enter names. Ex. chris robert oscar",onChange:function(e){return x(String(e.target.value))},onPaste:function(e){var t,n=e.clipboardData.getData("Text"),c=n.replace(/\r/g,"").split(/\n/).filter((function(e){return""!==e}));t=1===c.length?n.split(" ").filter((function(e){return""!==e})):c,j([].concat(Object(l.a)(u),Object(l.a)(t))),x(""),e.preventDefault()},onKeyDown:function(e){if(e.which=e.which||e.keyCode,e.which===d||e.which===O)""!==e.target.value.trim(" ")&&(e.preventDefault(),y(e.target.value));else if(e.which===b)""===e.target.value&&S();else if(e.which===h){if(""===e.target.value){e.preventDefault();var t=S();x(t)}}else e.which===g&&(""!==e.target.value.trim(" ")?(y(e.target.value),i([].concat(Object(l.a)(u),[e.target.value]))):i(u))},value:v})]})})},m=n(135),v=(n(117),n(82)),x=n.n(v);var w=function(e){var t=e.pair,n=e.pairIndex;return Object(c.jsx)(m.a,{className:"card",title:"Pair ".concat(n),bordered:!1,"data-visible":1,children:Object(c.jsx)("div",{className:"tag-container",children:t.map((function(e){return Object(c.jsx)(x.a,{children:Object(c.jsx)(f.a,{color:"#56ca8d",children:e})})}))})})},y=n(138),S=n(92),N=n.p+"static/media/logo.3f1917ed.png",E=n(137),k=n.p+"static/media/dice.120d193d.svg";n(129);var C=function(e){var t=e.onClick,n=e.doAnimation,i=e.onRollAnimationEnd,r=Object(a.useState)(n),o=Object(s.a)(r,2),l=o[0],u=o[1];return Object(a.useEffect)((function(){u(n)}),[n]),Object(c.jsx)("img",{width:"30px",style:{cursor:"pointer"},height:"30px",src:k,className:"center image",onClick:function(){t()},onAnimationEnd:function(){u(0),i()},"data-wobble":l})};var D=function(){var e=Object(a.useState)([]),t=Object(s.a)(e,2),n=t[0],i=t[1],r=Object(a.useState)([]),o=Object(s.a)(r,2),f=o[0],d=o[1],b=Object(a.useState)(0),h=Object(s.a)(b,2),g=h[0],O=h[1],m=Object(a.useState)(),v=Object(s.a)(m,2),x=v[0],k=v[1],D=window.location.search,F=new URLSearchParams(D);function M(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e)+e)}var P=function(e){O(1);for(var t=e,n=[],c=function(){var e=M(0,t.length),c=t[e];if(0===(t=t.filter((function(e){return e!==c}))).length)return n=[].concat(Object(l.a)(n),[[c]]),"break";e=M(0,t.length);var a=t[e];t=t.filter((function(e){return e!==a})),n=[].concat(Object(l.a)(n),[[c,a]])};t.length>0;){if("break"===c())break}d(n)},A=function(e){e.length>0?window.history.replaceState(null,"","?names=".concat(e.join())):window.history.replaceState(null,"","/")};return Object(a.useEffect)((function(){var e=F.get("names");if(e){console.log(e);var t=e.split(",").filter((function(e){return""!==e})).map((function(e){return decodeURIComponent(e).trim()}));console.log(t),i(t),P(t)}}),[]),Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("div",{className:"App",children:Object(c.jsxs)(u.a,{children:[Object(c.jsxs)(j.a,{align:"middle",justify:"center",gutter:[8,36],children:[Object(c.jsx)(u.a,{children:Object(c.jsx)("img",{height:"100",width:"100",src:N})}),Object(c.jsx)(u.a,{children:Object(c.jsx)("span",{className:"title-text",children:"Pair Gen"})})]}),Object(c.jsxs)(j.a,{align:"middle",justify:"center",gutter:[8,8],children:[Object(c.jsx)(p,{names:n,onNewName:function(e){i(e)},onEnter:function(e){A(e),P(e)}}),Object(c.jsx)(u.a,{children:Object(c.jsx)(C,{doAnimation:g,onClick:function(){A(n),P(n)},onRollAnimationEnd:function(){O(0)}})})]}),Object(c.jsx)(j.a,{align:"middle",justify:"center",gutter:[16,1],children:Object(c.jsx)("div",{className:"pair-card-container ".concat(x?"pair-card-container-hover":""),children:f.map((function(e,t){return Object(c.jsx)(w,{pair:e,pairIndex:t})}))})}),Object(c.jsx)(j.a,{align:"middle",justify:"center",children:Object(c.jsx)("div",{className:"copy-container",children:f.length>0&&Object(c.jsx)(y.a,{onMouseEnter:function(){k(!0)},onMouseLeave:function(){k(!1)},onClick:function(){var e;navigator.clipboard.writeText((e=f,"Pairs for ".concat((new Date).toDateString(),": ").concat(e.map((function(e){return"\n(".concat(e.join(", "),")")})).join(""),"\nGenerated using ").concat(window.location.href)))},style:{background:"transparent",border:0},children:Object(c.jsx)(E.a,{className:"copy-icon"})})})})]})}),Object(c.jsx)(S.a,{color:"#56ca8d",num:40,type:"cobweb",bg:!0})]})},F=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,140)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),c(e),a(e),i(e),r(e)}))};o.a.render(Object(c.jsx)(i.a.StrictMode,{children:Object(c.jsx)(D,{})}),document.getElementById("root")),F()},99:function(e,t,n){}},[[132,1,2]]]);
//# sourceMappingURL=main.9d0f1772.chunk.js.map