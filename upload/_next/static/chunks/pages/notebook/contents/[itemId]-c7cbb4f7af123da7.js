(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[203],{41271:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/notebook/contents/[itemId]",function(){return t(79058)}])},30483:function(n,e,t){"use strict";t.d(e,{Z:function(){return o}});var r=t(85893),a=t(35005),c=t(55112),s=t.n(c);function o(n){var e=n.onNextClicked,t=n.onPreviousClicked;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a.Z,{className:"".concat(s().previousPageBtn," ").concat(s().pageBtnFixed),onClick:t,children:(0,r.jsx)("i",{className:"fa fa-chevron-left fa-lg","aria-hidden":"true"})}),(0,r.jsx)(a.Z,{className:"".concat(s().nextPageBtn," ").concat(s().pageBtnFixed," pull-right"),onClick:e,children:(0,r.jsx)("i",{className:"fa fa-chevron-right fa-lg","aria-hidden":"true"})})]})}},79058:function(n,e,t){"use strict";t.r(e),t.d(e,{default:function(){return k}});var r=t(47568),a=t(34051),c=t.n(a),s=t(85893),o=t(67294),i=t(9473),u=t(11163),l=t(21608),f=t(31555),d=t(55112),h=t.n(d),p=t(36250),x=t(31940),m=t(22184),v=t(51722),g=t(30483),j=t(18906),b=t(8914),N=(t(12578),t(14994));function k(){var n=function(n){if(E){var e,t,r;switch((e=E.split(":")).splice(0,1),n){case"-1":w>1||(r="/notebook/".concat(P));break;case"+1":I&&w!==I||(t="np:"+e.join(":")+":1",r="/notebook/p/".concat(t));break;default:e.push(n),t="np:"+e.join(":"),r="/notebook/p/".concat(t)}a.push(r)}},e=!0;(0,N.qu)(e,"Rendering Contents");var t=(0,i.I0)(),a=(0,u.useRouter)(),d=(0,o.useState)(null),k=d[0],Z=d[1],P=(0,i.v9)((function(n){return n.container.container})),C=(0,i.v9)((function(n){return n.container.mode})),_=(0,i.v9)((function(n){return n.container.items})),w=(0,i.v9)((function(n){return n.container.pageNumber})),I=(0,i.v9)((function(n){return n.container.totalNumberOfPages})),q=(0,i.v9)((function(n){return n.container.itemsPerPage})),B=(0,i.v9)((function(n){return n.container.total})),E=(0,i.v9)((function(n){return n.page.id})),y=_.map((function(n,e){return(0,s.jsx)(v.Z,{item:n},e)})),F=function(){var n=(0,r.Z)(c().mark((function n(){var e,t;return c().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,(0,b.Nl)(P);case 3:e=n.sent,t="/notebook/p/".concat(e),a.push(t),n.next=11;break;case 8:n.prev=8,n.t0=n.catch(0),alert("Could not get the first item in the container");case 11:case"end":return n.stop()}}),n,null,[[0,8]])})));return function(){return n.apply(this,arguments)}}(),S=function(){var n=(0,r.Z)(c().mark((function n(){var e,t;return c().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,(0,b.DG)(P);case 3:e=n.sent,t="/notebook/p/".concat(e),a.push(t),n.next=11;break;case 8:n.prev=8,n.t0=n.catch(0),alert("Could not get the first item in the container");case 11:case"end":return n.stop()}}),n,null,[[0,8]])})));return function(){return n.apply(this,arguments)}}();return(0,s.jsx)("div",{className:h().pageBackground,children:(0,s.jsx)(p.Z,{children:(0,s.jsxs)(x.Z,{itemId:a.query.itemId,children:[(0,s.jsx)("br",{}),(0,s.jsx)(m.Z,{onCoverClicked:function(){var n="/notebook/".concat(P);a.push(n)},onPageNumberChanged:function(t){(0,N.qu)(e,"handlePageNumberChanged: ",t),n(t)},onSubmitSearch:function(n){Z(n),t((0,b.zs)({searchValue:n,pageNumber:1}))},onCancelSearch:function(){t((0,b.bZ)({pageNumber:1}))},onGotoFirstItem:F,onGotoLastItem:S}),(0,s.jsx)("br",{}),(0,s.jsx)(l.Z,{children:(0,s.jsx)(f.Z,{lg:{span:10,offset:1},children:(0,s.jsxs)("div",{className:"".concat(h().pagePanel," ").concat(h().notebookPanel),children:[(0,s.jsx)("br",{}),(0,s.jsx)("br",{}),(0,s.jsx)("p",{className:"fs-1 text-center",children:"Contents"}),(0,s.jsxs)(l.Z,{children:[(0,s.jsx)(f.Z,{xs:{span:2,offset:1},sm:{span:2,offset:1},md:{span:1,offset:1},children:(0,s.jsx)("p",{children:"Page"})}),(0,s.jsx)(f.Z,{xs:8,sm:8,md:9,children:(0,s.jsx)("p",{children:"Title"})})]}),(0,s.jsx)(l.Z,{children:(0,s.jsx)(f.Z,{xs:{span:10,offset:1},children:(0,s.jsx)("hr",{className:"mt-0 mb-0"})})}),y,_&&_.length>0&&(0,s.jsx)(l.Z,{children:(0,s.jsx)(f.Z,{sm:{span:10,offset:1},md:{span:8,offset:2},children:(0,s.jsx)("div",{className:"mt-4 d-flex justify-content-center",children:(0,s.jsx)(j.Z,{page:w,total:B,limit:q,changePage:function(n){!function(n){var e=n.pageNumber,r=void 0===e?1:e,a=n.searchMode||C;"listAll"===a?t((0,b.bZ)({pageNumber:r})):"search"===a&&t((0,b.zs)({searchValue:k,pageNumber:r}))}({pageNumber:n})},ellipsis:1})})})})]})})}),(0,s.jsx)(g.Z,{onNextClicked:function(){(0,N.qu)(e,"Next Page "),n("+1")},onPreviousClicked:function(){(0,N.qu)(e,"Previous Page "),n("-1")}})]})})})}}},function(n){n.O(0,[14,142,561,250,712,366,774,888,179],(function(){return e=41271,n(n.s=e);var e}));var e=n.O();_N_E=e}]);