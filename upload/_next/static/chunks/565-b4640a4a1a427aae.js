"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[565],{47065:function(e,n,r){r.d(n,{Z:function(){return u}});var a=r(85893),t=r(67294),s=r(35005),i=r(65557),c=r(55112),o=r.n(c),l=r(14994);function u(e){var n=e.addAnItem,r=e.pageOnly,c=void 0!==r&&r,u=(0,t.useState)(!1),d=u[0],f=u[1];return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(s.Z,{variant:"primary",className:o().btnCircle,onClick:function(){return f(!0)},children:(0,a.jsx)("i",{id:"1",className:"fa fa-plus fa-lg","aria-hidden":"true"})}),(0,a.jsx)(i.Z,{pageOnly:c,show:d,handleClose:function(){return f(!1)},optionSelected:function(e){(0,l.qu)(false,e),f(!1),n(e,"addAnItemOnTop")}})]})}},37594:function(e,n,r){r.d(n,{Z:function(){return l}});var a=r(85893),t=r(67294),s=r(32171),i=r(35005),c=r(12529),o=r(14994);function l(e){var n=e.show,r=void 0!==n&&n,l=e.handleClose,u=e.handleCreateANewItem;(0,o.qu)(!1,"Rendering NewItemModal: ","".concat(r,"}"));var d=(0,t.useRef)(null);return(0,a.jsx)(s.Z,{show:r,onHide:l,onEntered:function(){d.current.focus()},children:(0,a.jsxs)(s.Z.Body,{children:[(0,a.jsx)("h3",{children:"Title"}),(0,a.jsx)(c.Z.Control,{ref:d,size:"lg",type:"text"}),(0,a.jsx)("br",{}),(0,a.jsx)("br",{}),(0,a.jsx)(i.Z,{variant:"primary",onClick:function(){var e=d.current.value;u(e)},className:"pull-right",children:"Create"}),(0,a.jsx)(i.Z,{variant:"secondary",onClick:l,className:"pull-right",children:"Close"})]})})}},18906:function(e,n,r){r.d(n,{Z:function(){return g}});var a=r(85893),t=r(94184),s=r.n(t),i=r(67294),c=r(76792),o=r(13551);const l=i.forwardRef((({active:e,disabled:n,className:r,style:t,activeLabel:i,children:c,...l},u)=>{const d=e||n?"span":o.Z;return(0,a.jsx)("li",{ref:u,style:t,className:s()(r,"page-item",{active:e,disabled:n}),children:(0,a.jsxs)(d,{className:"page-link",disabled:n,...l,children:[c,e&&i&&(0,a.jsx)("span",{className:"visually-hidden",children:i})]})})}));l.defaultProps={active:!1,disabled:!1,activeLabel:"(current)"},l.displayName="PageItem";var u=l;function d(e,n,r=e){const t=i.forwardRef((({children:e,...t},s)=>(0,a.jsxs)(l,{...t,ref:s,children:[(0,a.jsx)("span",{"aria-hidden":"true",children:e||n}),(0,a.jsx)("span",{className:"visually-hidden",children:r})]})));return t.displayName=e,t}const f=d("First","\xab"),h=d("Prev","\u2039","Previous"),m=d("Ellipsis","\u2026","More"),v=d("Next","\u203a"),x=d("Last","\xbb"),p=i.forwardRef((({bsPrefix:e,className:n,size:r,...t},i)=>{const o=(0,c.vE)(e,"pagination");return(0,a.jsx)("ul",{ref:i,...t,className:s()(n,o,r&&`${o}-${r}`)})}));p.displayName="Pagination";var j=Object.assign(p,{First:f,Prev:h,Ellipsis:m,Item:u,Next:v,Last:x});function g(e){for(var n=function(e){c.push((0,a.jsx)(j.Item,{active:e===r,onClick:function(){return i(e)},children:e},e))},r=e.page,t=e.total,s=e.limit,i=e.changePage,c=[],o=1;o<=Math.ceil(t/s);o++)n(o);return(0,a.jsx)(j,{children:c})}},77167:function(e,n,r){r.d(n,{Z:function(){return E}});var a=r(47568),t=r(34051),s=r.n(t),i=r(85893),c=r(67294),o=r(9473),l=r(11163),u=r(41664),d=r.n(u),f=r(10682),h=r(21608),m=r(31555),v=r(35005),x=r(12529),p=r(62318),j=r(36968),g=r(55112),N=r.n(g),b=r(47065),Z=r(37594),y=r(28329),C=r(18906),w=r(8180),k=r(8914),P=r(12578),I=r(14994);function E(e){var n=e.readyToList,r=void 0!==n&&n,t=!1;(0,I.qu)(t,"Rendering Workspace");var u=(0,l.useRouter)(),g=(0,o.I0)(),E=(0,o.v9)((function(e){return e.container.workspace})),$=(0,o.v9)((function(e){return e.container.workspaceKey})),R=(0,o.v9)((function(e){return e.container.workspaceKeyReady})),S=(0,o.v9)((function(e){return e.container.searchKey})),A=(0,o.v9)((function(e){return e.container.searchIV})),q=(0,o.v9)((function(e){return e.container.container})),z=(0,o.v9)((function(e){return e.container.mode})),T=(0,o.v9)((function(e){return e.container.activity})),K=(0,c.useState)(""),L=K[0],O=K[1],B=(0,o.v9)((function(e){return e.container.items})),F=(0,o.v9)((function(e){return e.container.newItem})),H=(0,o.v9)((function(e){return e.container.pageNumber})),M=(0,o.v9)((function(e){return e.container.itemsPerPage})),_=(0,o.v9)((function(e){return e.container.total})),V=(0,c.useState)(null),D=V[0],G=V[1],J=(0,c.useState)(null),W=J[0],Q=J[1],U=(0,c.useState)(null),X=U[0],Y=U[1],ee=(0,c.useState)(null),ne=ee[0],re=ee[1],ae=(0,c.useState)(!1),te=ae[0],se=ae[1],ie=function(e,n,r,a){(0,I.qu)(t,"".concat(e," ").concat(n," ").concat(r," ").concat(a)),oe(e,n,r,a)},ce=B.map((function(e,n){return(0,i.jsx)(y.Z,{item:e,onAdd:ie},n)})),oe=function(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;G(e),Q(n),Y(r),re(a),se(!0)},le=function(){var e=(0,a.Z)(s().mark((function e(n){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(0,I.qu)(t,"createANewItem",n),se(!1),g((0,k.Ag)({titleStr:n,currentContainer:E,selectedItemType:D,addAction:W,targetItem:X,targetPosition:ne,workspaceKey:$,searchKey:S,searchIV:A}));case 3:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),ue=function(e){e.preventDefault(),g((0,k.zs)({searchValue:L,pageNumber:1}))};return(0,c.useEffect)((function(){if((0,I.qu)(t,"workspaceKeyReady: ".concat(R," ")),r&&E&&R&&"root"===q){(0,I.qu)(t,"listItemsThunk"),g((0,P.rs)());var e=[{_id:E}];g((0,P.rJ)(e)),g((0,k.bZ)({pageNumber:1}))}}),[r,q,E,R]),(0,c.useEffect)((function(){if(F){var e=(0,w.vp)(F);g((0,k.Ej)()),u.push(e)}}),[F]),(0,i.jsxs)(f.Z,{className:N().container,children:[(0,i.jsx)(h.Z,{children:(0,i.jsx)(x.Z,{onSubmit:ue,children:(0,i.jsxs)(p.Z,{className:"mb-3",children:[(0,i.jsx)(x.Z.Control,{size:"lg",type:"text",value:L,onChange:function(e){(0,I.qu)(t,"search value:",e.target.value),O(e.target.value)}}),(0,i.jsx)(v.Z,{variant:"link",children:(0,i.jsx)("i",{id:"1",className:"fa fa-search fa-lg text-dark","aria-hidden":"true",onClick:ue})})]})})}),(0,i.jsx)(h.Z,{className:"justify-content-center",children:(0,i.jsx)(b.Z,{addAnItem:oe})}),(0,i.jsx)(Z.Z,{show:te,handleClose:function(){return se(!1)},handleCreateANewItem:le}),(0,i.jsx)("br",{}),"Done"!==T&&"Error"!==T&&(0,i.jsx)(h.Z,{className:"justify-content-center",children:(0,i.jsx)(j.Z,{animation:"border"})}),(0,i.jsx)("br",{}),"search"===z&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(h.Z,{children:(0,i.jsx)(m.Z,{children:(0,i.jsx)(v.Z,{variant:"default",className:"".concat(N().btnCircle," pull-right"),onClick:function(e){e.preventDefault(),O(""),g((0,k.bZ)({pageNumber:1}))},children:(0,i.jsx)("i",{id:"1",className:"fa fa-times fa-lg","aria-hidden":"true"})})})}),(0,i.jsx)("br",{})]}),ce,B&&B.length>0&&(0,i.jsx)(h.Z,{children:(0,i.jsx)(m.Z,{sm:{span:10,offset:1},md:{span:8,offset:2},children:(0,i.jsx)("div",{className:"mt-4 d-flex justify-content-center",children:(0,i.jsx)(C.Z,{page:H,total:_,limit:M,changePage:function(e){!function(e){var n=e.pageNumber,r=void 0===n?1:n,a=e.searchMode||z;"listAll"===a?g((0,k.bZ)({pageNumber:r})):"search"===a&&g((0,k.zs)({searchValue:L,pageNumber:r}))}({pageNumber:e})},ellipsis:1})})})}),(0,i.jsx)("br",{}),(0,i.jsx)("br",{}),(0,i.jsx)("br",{}),E&&(0,i.jsx)(h.Z,{children:(0,i.jsx)(m.Z,{xs:12,children:(0,i.jsx)(d(),{href:"/trashBox/"+E,children:(0,i.jsx)(v.Z,{variant:"light",className:"pull-right border-0 shadow-none",children:(0,i.jsx)("i",{className:"fa fa-5x fa-trash","aria-hidden":"true"})})})})})]})}},2086:function(e,n,r){var a=r(94184),t=r.n(a),s=r(67294),i=r(76792),c=r(85893);const o=s.forwardRef((({bsPrefix:e,size:n,vertical:r,className:a,as:s="div",...o},l)=>{const u=(0,i.vE)(e,"btn-group");let d=u;return r&&(d=`${u}-vertical`),(0,c.jsx)(s,{...o,ref:l,className:t()(a,d,n&&`${u}-${n}`)})}));o.displayName="ButtonGroup",o.defaultProps={vertical:!1,role:"group"},n.Z=o},67525:function(e,n,r){r.d(n,{Z:function(){return k}});var a=r(94184),t=r.n(a),s=r(67294),i=r(76792),c=r(66611),o=r(39602),l=r(85893);const u=s.forwardRef((({bsPrefix:e,className:n,variant:r,as:a="img",...s},c)=>{const o=(0,i.vE)(e,"card-img");return(0,l.jsx)(a,{ref:c,className:t()(r?`${o}-${r}`:o,n),...s})}));u.displayName="CardImg";var d=u;const f=s.createContext(null);f.displayName="CardHeaderContext";var h=f;const m=s.forwardRef((({bsPrefix:e,className:n,as:r="div",...a},c)=>{const o=(0,i.vE)(e,"card-header"),u=(0,s.useMemo)((()=>({cardHeaderBsPrefix:o})),[o]);return(0,l.jsx)(h.Provider,{value:u,children:(0,l.jsx)(r,{ref:c,...a,className:t()(n,o)})})}));m.displayName="CardHeader";var v=m;const x=(0,o.Z)("h5"),p=(0,o.Z)("h6"),j=(0,c.Z)("card-body"),g=(0,c.Z)("card-title",{Component:x}),N=(0,c.Z)("card-subtitle",{Component:p}),b=(0,c.Z)("card-link",{Component:"a"}),Z=(0,c.Z)("card-text",{Component:"p"}),y=(0,c.Z)("card-footer"),C=(0,c.Z)("card-img-overlay"),w=s.forwardRef((({bsPrefix:e,className:n,bg:r,text:a,border:s,body:c,children:o,as:u="div",...d},f)=>{const h=(0,i.vE)(e,"card");return(0,l.jsx)(u,{ref:f,...d,className:t()(n,h,r&&`bg-${r}`,a&&`text-${a}`,s&&`border-${s}`),children:c?(0,l.jsx)(j,{children:o}):o})}));w.displayName="Card",w.defaultProps={body:!1};var k=Object.assign(w,{Img:d,Title:g,Subtitle:N,Body:j,Link:b,Text:Z,Header:v,Footer:y,ImgOverlay:C})},36968:function(e,n,r){var a=r(94184),t=r.n(a),s=r(67294),i=r(76792),c=r(85893);const o=s.forwardRef((({bsPrefix:e,variant:n,animation:r,size:a,as:s="div",className:o,...l},u)=>{const d=`${e=(0,i.vE)(e,"spinner")}-${r}`;return(0,c.jsx)(s,{ref:u,...l,className:t()(o,d,a&&`${d}-${a}`,n&&`text-${n}`)})}));o.displayName="Spinner",n.Z=o}}]);