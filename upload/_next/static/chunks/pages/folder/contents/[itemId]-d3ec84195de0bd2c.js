(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[206],{35193:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/folder/contents/[itemId]",function(){return t(29224)}])},47065:function(e,n,t){"use strict";t.d(n,{Z:function(){return l}});var r=t(85893),a=t(67294),c=t(35005),s=t(65557),i=t(55112),u=t.n(i),o=t(14994);function l(e){var n=e.addAnItem,t=e.pageOnly,i=void 0!==t&&t,l=(0,a.useState)(!1),f=l[0],d=l[1];return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(c.Z,{variant:"primary",className:u().btnCircle,onClick:function(){return d(!0)},children:(0,r.jsx)("i",{id:"1",className:"fa fa-plus fa-lg","aria-hidden":"true"})}),(0,r.jsx)(s.Z,{pageOnly:i,show:f,handleClose:function(){return d(!1)},optionSelected:function(e){(0,o.qu)(false,e),d(!1),n(e,"addAnItemOnTop")}})]})}},37594:function(e,n,t){"use strict";t.d(n,{Z:function(){return o}});var r=t(85893),a=t(67294),c=t(32171),s=t(35005),i=t(12529),u=t(14994);function o(e){var n=e.show,t=void 0!==n&&n,o=e.handleClose,l=e.handleCreateANewItem;(0,u.qu)(!1,"Rendering NewItemModal: ","".concat(t,"}"));var f=(0,a.useRef)(null);return(0,r.jsx)(c.Z,{show:t,onHide:o,onEntered:function(){f.current.focus()},children:(0,r.jsxs)(c.Z.Body,{children:[(0,r.jsx)("h3",{children:"Title"}),(0,r.jsx)(i.Z.Control,{ref:f,size:"lg",type:"text"}),(0,r.jsx)("br",{}),(0,r.jsx)("br",{}),(0,r.jsx)(s.Z,{variant:"primary",onClick:function(){var e=f.current.value;l(e)},className:"pull-right",children:"Create"}),(0,r.jsx)(s.Z,{variant:"secondary",onClick:o,className:"pull-right",children:"Close"})]})})}},29224:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return C}});var r=t(47568),a=t(34051),c=t.n(a),s=t(85893),i=t(67294),u=t(11163),o=t(9473),l=t(21608),f=t(31555),d=t(55112),h=t.n(d),p=t(36250),v=t(31940),m=t(22184),x=t(51722),j=t(47065),g=t(37594),N=t(18906),Z=t(8914),b=(t(12578),t(14994)),w=t(8180);function C(){var e=!0;(0,b.qu)(e,"Rendering Contents");var n=(0,o.I0)(),t=(0,u.useRouter)(),a=(0,i.useState)(null),d=a[0],C=a[1],y=(0,i.useState)(null),I=y[0],k=y[1],S=(0,i.useState)(null),_=S[0],A=S[1],E=(0,i.useState)(null),P=E[0],q=E[1],O=(0,i.useState)(!1),T=O[0],K=O[1],R=(0,i.useState)(null),V=R[0],z=R[1],G=(0,o.v9)((function(e){return e.container.container})),B=(0,o.v9)((function(e){return e.container.mode})),F=(0,o.v9)((function(e){return e.container.items})),M=(0,o.v9)((function(e){return e.container.newItem})),X=(0,o.v9)((function(e){return e.container.pageNumber})),D=(0,o.v9)((function(e){return e.container.itemsPerPage})),H=(0,o.v9)((function(e){return e.container.total})),L=(0,o.v9)((function(e){return e.container.workspaceKey})),J=(0,o.v9)((function(e){return e.container.searchKey})),Q=(0,o.v9)((function(e){return e.container.searchIV})),U=function(n,t,r,a){(0,b.qu)(e,"".concat(n," ").concat(t," ").concat(r," ").concat(a)),Y(n,t,r,a)},W=F.map((function(e,n){return(0,s.jsx)(x.Z,{item:e,onAdd:U},n)})),Y=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;C(e),k(n),A(t),q(r),K(!0)},$=function(){var e=(0,r.Z)(c().mark((function e(){var n,r;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,Z.Nl)(G);case 3:(n=e.sent)&&(r="/folder/p/".concat(n),t.push(r)),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),alert("Could not get the first item in the container");case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),ee=function(){var e=(0,r.Z)(c().mark((function e(){var n,r;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,Z.DG)(G);case 3:(n=e.sent)&&(r="/folder/p/".concat(n),t.push(r)),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),alert("Could not get the first item in the container");case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),ne=function(){var t=(0,r.Z)(c().mark((function t(r){return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:(0,b.qu)(e,"createANewItem",r),K(!1),n((0,Z.Ag)({titleStr:r,currentContainer:G,selectedItemType:d,addAction:I,targetItem:_,targetPosition:P,workspaceKey:L,searchKey:J,searchIV:Q}));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return(0,i.useEffect)((function(){if(M){var e=(0,w.vp)(M);n((0,Z.Ej)()),t.push(e)}}),[M]),(0,s.jsx)("div",{className:h().pageBackground,children:(0,s.jsx)(p.Z,{children:(0,s.jsxs)(v.Z,{itemId:t.query.itemId,children:[(0,s.jsx)("br",{}),(0,s.jsx)(m.Z,{onCoverClicked:function(){var e="/folder/".concat(G);t.push(e)},onGotoFirstItem:$,onGotoLastItem:ee,onSubmitSearch:function(e){z(e),n((0,Z.zs)({searchValue:e,pageNumber:1}))},onCancelSearch:function(){n((0,Z.bZ)({pageNumber:1}))}}),(0,s.jsx)("br",{}),(0,s.jsx)(l.Z,{children:(0,s.jsx)(f.Z,{lg:{span:10,offset:1},children:(0,s.jsxs)("div",{className:"".concat(h().pagePanel," ").concat(h().folderPanel),children:[(0,s.jsx)("br",{}),(0,s.jsx)("br",{}),(0,s.jsx)("p",{className:"fs-1 text-center",children:"Contents"}),(0,s.jsx)(l.Z,{className:"justify-content-center",children:(0,s.jsx)(j.Z,{pageOnly:!0,addAnItem:Y})}),(0,s.jsx)(g.Z,{show:T,handleClose:function(){return K(!1)},handleCreateANewItem:ne}),(0,s.jsx)("br",{}),(0,s.jsx)("br",{}),W,F&&F.length>0&&(0,s.jsx)(l.Z,{children:(0,s.jsx)(f.Z,{sm:{span:10,offset:1},md:{span:8,offset:2},children:(0,s.jsx)("div",{className:"mt-4 d-flex justify-content-center",children:(0,s.jsx)(N.Z,{page:X,total:H,limit:D,changePage:function(e){!function(e){var t=e.pageNumber,r=void 0===t?1:t,a=e.searchMode||B;"listAll"===a?n((0,Z.bZ)({pageNumber:r})):"search"===a&&n((0,Z.zs)({searchValue:V,pageNumber:r}))}({pageNumber:e})},ellipsis:1})})})})]})})})]})})})}}},function(e){e.O(0,[14,142,561,250,712,366,774,888,179],(function(){return n=35193,e(e.s=n);var n}));var n=e.O();_N_E=n}]);