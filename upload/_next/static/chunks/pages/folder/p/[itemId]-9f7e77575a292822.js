(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[652],{72659:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/folder/p/[itemId]",function(){return t(73420)}])},37594:function(e,n,t){"use strict";t.d(n,{Z:function(){return i}});var r=t(85893),a=t(67294),c=t(32171),o=t(35005),u=t(12529),s=t(14994);function i(e){var n=e.show,t=void 0!==n&&n,i=e.handleClose,l=e.handleCreateANewItem;(0,s.qu)(!1,"Rendering NewItemModal: ","".concat(t,"}"));var f=(0,a.useRef)(null);return(0,r.jsx)(c.Z,{show:t,onHide:i,onEntered:function(){f.current.focus()},children:(0,r.jsxs)(c.Z.Body,{children:[(0,r.jsx)("h3",{children:"Title"}),(0,r.jsx)(u.Z.Control,{ref:f,size:"lg",type:"text"}),(0,r.jsx)("br",{}),(0,r.jsx)("br",{}),(0,r.jsx)(o.Z,{variant:"primary",onClick:function(){var e=f.current.value;l(e)},className:"pull-right",children:"Create"}),(0,r.jsx)(o.Z,{variant:"secondary",onClick:i,className:"pull-right",children:"Close"})]})})}},30483:function(e,n,t){"use strict";t.d(n,{Z:function(){return u}});var r=t(85893),a=t(35005),c=t(55112),o=t.n(c);function u(e){var n=e.onNextClicked,t=e.onPreviousClicked;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a.Z,{className:"".concat(o().previousPageBtn," ").concat(o().pageBtnFixed),onClick:t,children:(0,r.jsx)("i",{className:"fa fa-chevron-left fa-lg","aria-hidden":"true"})}),(0,r.jsx)(a.Z,{className:"".concat(o().nextPageBtn," ").concat(o().pageBtnFixed," pull-right"),onClick:n,children:(0,r.jsx)("i",{className:"fa fa-chevron-right fa-lg","aria-hidden":"true"})})]})}},73420:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return I}});var r=t(47568),a=t(34051),c=t.n(a),o=t(85893),u=t(67294),s=t(11163),i=t(9473),l=t(21608),f=t(31555),d=t(55112),p=t.n(d),h=t(68139),v=t(36250),x=t(31940),g=t(22184),k=t(4940),m=t(34880),j=t(30483),C=t(37594),N=t(8914),w=t(12578),Z=t(14994),b=t(8180);function I(){var e=!0;(0,Z.qu)(e,"Rendering item");var n=(0,s.useRouter)(),t=(0,u.useState)(null),a=t[0],d=t[1],I=(0,u.useState)(null),P=I[0],y=I[1],_=(0,u.useState)(null),q=_[0],E=_[1],F=(0,u.useState)(null),S=F[0],B=F[1],A=(0,u.useState)(!1),R=A[0],O=A[1],D=(0,i.v9)((function(e){return e.page.changingPage})),G=(0,i.v9)((function(e){return e.page.id})),T=(0,i.v9)((function(e){return e.page.container})),K=(0,i.v9)((function(e){return e.page.position})),X=(0,i.v9)((function(e){return e.container.container})),z=(0,i.v9)((function(e){return e.container.workspaceKey})),H=(0,i.v9)((function(e){return e.container.searchKey})),L=(0,i.v9)((function(e){return e.container.searchIV}));function M(e){return V.apply(this,arguments)}function V(){return(V=(0,r.Z)(c().mark((function t(r){var a,o;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if((0,Z.qu)(e,"gotoAnotherPage ".concat(D," ").concat(G," ").concat(T," ").concat(K)),!(D||!G&&T&&K)){t.next=3;break}return t.abrupt("return");case 3:(0,w.cD)(!0),o=null,t.t0=r,t.next="-1"===t.t0?8:"+1"===t.t0?18:28;break;case 8:return t.prev=8,t.next=11,(0,b.IS)("getPreviousFolderPage",T,K);case 11:a=t.sent,o="EndOfFolder"===a?"/folder/contents/".concat(T):"/folder/p/".concat(a),t.next=17;break;case 15:t.prev=15,t.t1=t.catch(8);case 17:return t.abrupt("break",28);case 18:return t.prev=18,t.next=21,(0,b.IS)("getNextFolderPage",T,K);case 21:"EndOfFolder"===(a=t.sent)?alert("End of folder"):o="/folder/p/".concat(a),t.next=27;break;case 25:t.prev=25,t.t2=t.catch(18);case 27:return t.abrupt("break",28);case 28:(0,Z.qu)(e,"setNavigationInSameContainer ..."),(0,N.RB)(!0),o?n.push(o):(0,w.cD)(!1);case 31:case"end":return t.stop()}}),t,null,[[8,15],[18,25]])})))).apply(this,arguments)}var W=function(){var e=(0,r.Z)(c().mark((function e(){var t,r;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,N.Nl)(X);case 3:(t=e.sent)&&(r="/folder/p/".concat(t),n.push(r)),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),alert("Could not get the first item in the container");case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),J=function(){var e=(0,r.Z)(c().mark((function e(){var t,r;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,N.DG)(X);case 3:(t=e.sent)&&(r="/folder/p/".concat(t),n.push(r)),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),alert("Could not get the first item in the container");case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),Q=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;d(e),y(n),E(t),B(r),O(!0)},U=function(){var t=(0,r.Z)(c().mark((function t(r){var o,u;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(0,Z.qu)(e,"createANewItem",r),O(!1),t.next=4,(0,N.createANewItem)(r,containerInWorkspaces,a,P,q,S,z,H,L);case 4:o=t.sent,u=(0,b.vp)(o),n.push(u);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return(0,o.jsxs)("div",{className:p().pageBackground,children:[(0,o.jsx)(v.Z,{children:(0,o.jsxs)(x.Z,{itemId:n.query.itemId,children:[(0,o.jsx)("br",{}),(0,o.jsx)(g.Z,{onCoverClicked:function(){var e="/folder/".concat(X);n.push(e)},onContentsClicked:function(){var e="/folder/contents/".concat(T);n.push(e)},onGotoFirstItem:W,onGotoLastItem:J,onAdd:function(n,t,r,a){(0,Z.qu)(e,"".concat(n," ").concat(t," ").concat(r," ").concat(a)),Q(n,t,r,a)}}),(0,o.jsx)("br",{}),(0,o.jsx)(l.Z,{children:(0,o.jsx)(f.Z,{lg:{span:10,offset:1},children:(0,o.jsxs)("div",{className:"".concat(p().pagePanel),children:[(0,o.jsx)(k.Z,{}),(0,o.jsx)(m.Z,{})]})})}),(0,o.jsx)(C.Z,{show:R,handleClose:function(){return O(!1)},handleCreateANewItem:U}),(0,o.jsx)(j.Z,{onNextClicked:function(){(0,Z.qu)(e,"Next Page "),M("+1")},onPreviousClicked:function(){(0,Z.qu)(e,"Previous Page "),M("-1")}})]})}),(0,o.jsx)(h.Z,{})]})}}},function(e){e.O(0,[571,14,142,621,250,712,64,290,774,888,179],(function(){return n=72659,e(e.s=n);var n}));var n=e.O();_N_E=n}]);