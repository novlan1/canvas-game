(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7969be78"],{"057f":function(t,e,n){var r=n("fc6a"),o=n("241c").f,i={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],c=function(t){try{return o(t)}catch(e){return a.slice()}};t.exports.f=function(t){return a&&"[object Window]"==i.call(t)?c(t):o(r(t))}},"0b42":function(t,e,n){var r=n("e8b5"),o=n("68ee"),i=n("861d"),a=n("b622"),c=a("species");t.exports=function(t){var e;return r(t)&&(e=t.constructor,o(e)&&(e===Array||r(e.prototype))?e=void 0:i(e)&&(e=e[c],null===e&&(e=void 0))),void 0===e?Array:e}},"1dde":function(t,e,n){var r=n("d039"),o=n("b622"),i=n("2d00"),a=o("species");t.exports=function(t){return i>=51||!r((function(){var e=[],n=e.constructor={};return n[a]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"28b7":function(t,e,n){},"428f":function(t,e,n){var r=n("da84");t.exports=r},"4df4":function(t,e,n){"use strict";var r=n("0366"),o=n("7b0b"),i=n("9bdd"),a=n("e95a"),c=n("68ee"),s=n("50c4"),l=n("8418"),u=n("9a1f"),f=n("35a1");t.exports=function(t){var e=o(t),n=c(this),v=arguments.length,h=v>1?arguments[1]:void 0,d=void 0!==h;d&&(h=r(h,v>2?arguments[2]:void 0,2));var p,g,b,y,m,w,L=f(e),k=0;if(!L||this==Array&&a(L))for(p=s(e.length),g=n?new this(p):Array(p);p>k;k++)w=d?h(e[k],k):e[k],l(g,k,w);else for(y=u(e,L),m=y.next,g=n?new this:[];!(b=m.call(y)).done;k++)w=d?i(y,h,[b.value,k],!0):b.value,l(g,k,w);return g.length=k,g}},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,n){var r=n("1d80"),o=n("577e"),i=n("5899"),a="["+i+"]",c=RegExp("^"+a+a+"*"),s=RegExp(a+a+"*$"),l=function(t){return function(e){var n=o(r(e));return 1&t&&(n=n.replace(c,"")),2&t&&(n=n.replace(s,"")),n}};t.exports={start:l(1),end:l(2),trim:l(3)}},"65f0":function(t,e,n){var r=n("0b42");t.exports=function(t,e){return new(r(t))(0===e?0:e)}},7156:function(t,e,n){var r=n("1626"),o=n("861d"),i=n("d2bb");t.exports=function(t,e,n){var a,c;return i&&r(a=e.constructor)&&a!==n&&o(c=a.prototype)&&c!==n.prototype&&i(t,c),t}},"746f":function(t,e,n){var r=n("428f"),o=n("5135"),i=n("e538"),a=n("9bf2").f;t.exports=function(t){var e=r.Symbol||(r.Symbol={});o(e,t)||a(e,t,{value:i.f(t)})}},8418:function(t,e,n){"use strict";var r=n("a04b"),o=n("9bf2"),i=n("5c6c");t.exports=function(t,e,n){var a=r(e);a in t?o.f(t,a,i(0,n)):t[a]=n}},"8b55":function(t,e,n){"use strict";n("28b7")},"9bdd":function(t,e,n){var r=n("825a"),o=n("2a62");t.exports=function(t,e,n,i){try{return i?e(r(n)[0],n[1]):e(n)}catch(a){o(t,"throw",a)}}},a4d3:function(t,e,n){"use strict";var r=n("23e7"),o=n("da84"),i=n("d066"),a=n("c430"),c=n("83ab"),s=n("4930"),l=n("d039"),u=n("5135"),f=n("e8b5"),v=n("1626"),h=n("861d"),d=n("d9b5"),p=n("825a"),g=n("7b0b"),b=n("fc6a"),y=n("a04b"),m=n("577e"),w=n("5c6c"),L=n("7c73"),k=n("df75"),S=n("241c"),C=n("057f"),O=n("7418"),x=n("06cf"),A=n("9bf2"),N=n("d1e7"),I=n("6eeb"),P=n("5692"),E=n("f772"),j=n("d012"),_=n("90e3"),T=n("b622"),$=n("e538"),R=n("746f"),J=n("d44e"),M=n("69f3"),F=n("b727").forEach,U=E("hidden"),B="Symbol",V="prototype",D=T("toPrimitive"),G=M.set,X=M.getterFor(B),Y=Object[V],z=o.Symbol,H=i("JSON","stringify"),Q=x.f,W=A.f,Z=C.f,q=N.f,K=P("symbols"),tt=P("op-symbols"),et=P("string-to-symbol-registry"),nt=P("symbol-to-string-registry"),rt=P("wks"),ot=o.QObject,it=!ot||!ot[V]||!ot[V].findChild,at=c&&l((function(){return 7!=L(W({},"a",{get:function(){return W(this,"a",{value:7}).a}})).a}))?function(t,e,n){var r=Q(Y,e);r&&delete Y[e],W(t,e,n),r&&t!==Y&&W(Y,e,r)}:W,ct=function(t,e){var n=K[t]=L(z[V]);return G(n,{type:B,tag:t,description:e}),c||(n.description=e),n},st=function(t,e,n){t===Y&&st(tt,e,n),p(t);var r=y(e);return p(n),u(K,r)?(n.enumerable?(u(t,U)&&t[U][r]&&(t[U][r]=!1),n=L(n,{enumerable:w(0,!1)})):(u(t,U)||W(t,U,w(1,{})),t[U][r]=!0),at(t,r,n)):W(t,r,n)},lt=function(t,e){p(t);var n=b(e),r=k(n).concat(dt(n));return F(r,(function(e){c&&!ft.call(n,e)||st(t,e,n[e])})),t},ut=function(t,e){return void 0===e?L(t):lt(L(t),e)},ft=function(t){var e=y(t),n=q.call(this,e);return!(this===Y&&u(K,e)&&!u(tt,e))&&(!(n||!u(this,e)||!u(K,e)||u(this,U)&&this[U][e])||n)},vt=function(t,e){var n=b(t),r=y(e);if(n!==Y||!u(K,r)||u(tt,r)){var o=Q(n,r);return!o||!u(K,r)||u(n,U)&&n[U][r]||(o.enumerable=!0),o}},ht=function(t){var e=Z(b(t)),n=[];return F(e,(function(t){u(K,t)||u(j,t)||n.push(t)})),n},dt=function(t){var e=t===Y,n=Z(e?tt:b(t)),r=[];return F(n,(function(t){!u(K,t)||e&&!u(Y,t)||r.push(K[t])})),r};if(s||(z=function(){if(this instanceof z)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?m(arguments[0]):void 0,e=_(t),n=function(t){this===Y&&n.call(tt,t),u(this,U)&&u(this[U],e)&&(this[U][e]=!1),at(this,e,w(1,t))};return c&&it&&at(Y,e,{configurable:!0,set:n}),ct(e,t)},I(z[V],"toString",(function(){return X(this).tag})),I(z,"withoutSetter",(function(t){return ct(_(t),t)})),N.f=ft,A.f=st,x.f=vt,S.f=C.f=ht,O.f=dt,$.f=function(t){return ct(T(t),t)},c&&(W(z[V],"description",{configurable:!0,get:function(){return X(this).description}}),a||I(Y,"propertyIsEnumerable",ft,{unsafe:!0}))),r({global:!0,wrap:!0,forced:!s,sham:!s},{Symbol:z}),F(k(rt),(function(t){R(t)})),r({target:B,stat:!0,forced:!s},{for:function(t){var e=m(t);if(u(et,e))return et[e];var n=z(e);return et[e]=n,nt[n]=e,n},keyFor:function(t){if(!d(t))throw TypeError(t+" is not a symbol");if(u(nt,t))return nt[t]},useSetter:function(){it=!0},useSimple:function(){it=!1}}),r({target:"Object",stat:!0,forced:!s,sham:!c},{create:ut,defineProperty:st,defineProperties:lt,getOwnPropertyDescriptor:vt}),r({target:"Object",stat:!0,forced:!s},{getOwnPropertyNames:ht,getOwnPropertySymbols:dt}),r({target:"Object",stat:!0,forced:l((function(){O.f(1)}))},{getOwnPropertySymbols:function(t){return O.f(g(t))}}),H){var pt=!s||l((function(){var t=z();return"[null]"!=H([t])||"{}"!=H({a:t})||"{}"!=H(Object(t))}));r({target:"JSON",stat:!0,forced:pt},{stringify:function(t,e,n){var r,o=[t],i=1;while(arguments.length>i)o.push(arguments[i++]);if(r=e,(h(e)||void 0!==t)&&!d(t))return f(e)||(e=function(t,e){if(v(r)&&(e=r.call(this,t,e)),!d(e))return e}),o[1]=e,H.apply(null,o)}})}if(!z[V][D]){var gt=z[V].valueOf;I(z[V],D,(function(){return gt.apply(this,arguments)}))}J(z,B),j[U]=!0},a630:function(t,e,n){var r=n("23e7"),o=n("4df4"),i=n("1c7e"),a=!i((function(t){Array.from(t)}));r({target:"Array",stat:!0,forced:a},{from:o})},a9e3:function(t,e,n){"use strict";var r=n("83ab"),o=n("da84"),i=n("94ca"),a=n("6eeb"),c=n("5135"),s=n("c6b6"),l=n("7156"),u=n("d9b5"),f=n("c04e"),v=n("d039"),h=n("7c73"),d=n("241c").f,p=n("06cf").f,g=n("9bf2").f,b=n("58a8").trim,y="Number",m=o[y],w=m.prototype,L=s(h(w))==y,k=function(t){if(u(t))throw TypeError("Cannot convert a Symbol value to a number");var e,n,r,o,i,a,c,s,l=f(t,"number");if("string"==typeof l&&l.length>2)if(l=b(l),e=l.charCodeAt(0),43===e||45===e){if(n=l.charCodeAt(2),88===n||120===n)return NaN}else if(48===e){switch(l.charCodeAt(1)){case 66:case 98:r=2,o=49;break;case 79:case 111:r=8,o=55;break;default:return+l}for(i=l.slice(2),a=i.length,c=0;c<a;c++)if(s=i.charCodeAt(c),s<48||s>o)return NaN;return parseInt(i,r)}return+l};if(i(y,!m(" 0o1")||!m("0b1")||m("+0x1"))){for(var S,C=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof C&&(L?v((function(){w.valueOf.call(n)})):s(n)!=y)?l(new m(k(e)),n,C):k(e)},O=r?d(m):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),x=0;O.length>x;x++)c(m,S=O[x])&&!c(C,S)&&g(C,S,p(m,S));C.prototype=w,w.constructor=C,a(o,y,C)}},b0c0:function(t,e,n){var r=n("83ab"),o=n("5e77").EXISTS,i=n("9bf2").f,a=Function.prototype,c=a.toString,s=/^\s*function ([^ (]*)/,l="name";r&&!o&&i(a,l,{configurable:!0,get:function(){try{return c.call(this).match(s)[1]}catch(t){return""}}})},b258:function(t,e,n){},b727:function(t,e,n){var r=n("0366"),o=n("44ad"),i=n("7b0b"),a=n("50c4"),c=n("65f0"),s=[].push,l=function(t){var e=1==t,n=2==t,l=3==t,u=4==t,f=6==t,v=7==t,h=5==t||f;return function(d,p,g,b){for(var y,m,w=i(d),L=o(w),k=r(p,g,3),S=a(L.length),C=0,O=b||c,x=e?O(d,S):n||v?O(d,0):void 0;S>C;C++)if((h||C in L)&&(y=L[C],m=k(y,C,w),t))if(e)x[C]=m;else if(m)switch(t){case 3:return!0;case 5:return y;case 6:return C;case 2:s.call(x,y)}else switch(t){case 4:return!1;case 7:s.call(x,y)}return f?-1:l||u?u:x}};t.exports={forEach:l(0),map:l(1),filter:l(2),some:l(3),every:l(4),find:l(5),findIndex:l(6),filterReject:l(7)}},d21f:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wrap"},[n("div",{staticClass:"title"},[t._v(" 第"+t._s(t.curLevel)+"关 ")]),n("div",{staticClass:"top-wrap"},[n("van-tag",{staticClass:"cur-level-tag",attrs:{type:"primary",size:"large"},on:{click:function(e){e.stopPropagation(),t.showActions=!0}}},[t._v(" 点我 ")])],1),n("div",{staticClass:"game-wrap"},t._l(t.lanternList,(function(e,r){return n("div",{key:r,staticClass:"row"},t._l(e,(function(e,o){return n("div",{key:o,staticClass:"grid",class:"grid-"+e,on:{click:function(e){return e.stopPropagation(),t.onClickLantern(r,o)}}})})),0)})),0),n("div",{staticClass:"button-wrap"}),n("van-action-sheet",{attrs:{actions:t.actions,"cancel-text":"取消","close-on-click-action":""},on:{cancel:function(e){t.showActions=!1},select:t.onSelectAction},model:{value:t.showActions,callback:function(e){t.showActions=e},expression:"showActions"}}),n("van-popup",{style:{height:"30%"},attrs:{position:"bottom"},model:{value:t.showPickLevel,callback:function(e){t.showPickLevel=e},expression:"showPickLevel"}},[n("van-picker",{attrs:{title:"选择关卡","show-toolbar":"","default-index":t.curLevel-1,columns:t.levelColumns},on:{cancel:function(e){t.showPickLevel=!1},change:t.onChangePickerLevel,confirm:t.onConfirmPikcerLevel}})],1),n("van-popup",{style:{height:"30%"},attrs:{position:"bottom",closeable:""},model:{value:t.showRule,callback:function(e){t.showRule=e},expression:"showRule"}},[n("div",{staticClass:"rule-wrap"},[n("p",[t._v("1. “点灯笼”一共有"+t._s(t.maxLevel)+"关。")]),n("p",[t._v("2. 灯笼有明暗两种初始状态，点击灯笼，将使自身及相邻上下左右的灯笼状态反转。")]),n("p",[t._v("3. 点亮全部灯笼则挑战成功。")]),n("p",[t._v("4. 灰黑色不可点击。")])])]),n("van-dialog",{attrs:{title:"第"+t.curLevel+"关攻略","show-cancel-button":!1,"confirm-button-text":"我知道了"},model:{value:t.showStrategy,callback:function(e){t.showStrategy=e},expression:"showStrategy"}},[n("div",{staticClass:"strategy-img-wrap"},[n("div",{staticClass:"strategy-tip"},[t._v(" 依次点击下图中的数字 ")]),n("div",{staticClass:"game-wrap strategy-game-wrap"},t._l(t.pureLanternList,(function(e,r){return n("div",{key:r,staticClass:"row"},t._l(e,(function(e,o){return n("div",{key:o,staticClass:"grid",class:"grid-"+e,on:{click:function(e){return e.stopPropagation(),t.onClickLantern(r,o)}}},[t.strategyList[r]&&t.strategyList[r][o]>0?n("span",{staticClass:"strategy-num"},[t._v(t._s(t.strategyList[r]&&t.strategyList[r][o]))]):t._e()])})),0)})),0)])])],1)},o=[],i=(n("e17f"),n("2241"));n("a4d3"),n("e01a"),n("d3b7"),n("d28b"),n("3ca3"),n("ddb0"),n("fb6a"),n("b0c0"),n("a630");function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function c(t,e){if(t){if("string"===typeof t)return a(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(t,e):void 0}}function s(t,e){var n="undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=c(t))||e&&t&&"number"===typeof t.length){n&&(t=n);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,s=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return a=t.done,t},e:function(t){s=!0,i=t},f:function(){try{a||null==n["return"]||n["return"]()}finally{if(s)throw i}}}}n("68ef"),n("a71a"),n("9d70"),n("3743"),n("4d75"),n("e3b3"),n("b258");var l=n("c31d"),u=n("2b0e"),f=n("d282"),v=n("a142"),h=0;function d(t){t?(h||document.body.classList.add("van-toast--unclickable"),h++):(h--,h||document.body.classList.remove("van-toast--unclickable"))}var p=n("6605"),g=n("ad06"),b=n("543e"),y=Object(f["a"])("toast"),m=y[0],w=y[1],L=m({mixins:[Object(p["a"])()],props:{icon:String,className:null,iconPrefix:String,loadingType:String,forbidClick:Boolean,closeOnClick:Boolean,message:[Number,String],type:{type:String,default:"text"},position:{type:String,default:"middle"},transition:{type:String,default:"van-fade"},lockScroll:{type:Boolean,default:!1}},data:function(){return{clickable:!1}},mounted:function(){this.toggleClickable()},destroyed:function(){this.toggleClickable()},watch:{value:"toggleClickable",forbidClick:"toggleClickable"},methods:{onClick:function(){this.closeOnClick&&this.close()},toggleClickable:function(){var t=this.value&&this.forbidClick;this.clickable!==t&&(this.clickable=t,d(t))},onAfterEnter:function(){this.$emit("opened"),this.onOpened&&this.onOpened()},onAfterLeave:function(){this.$emit("closed")},genIcon:function(){var t=this.$createElement,e=this.icon,n=this.type,r=this.iconPrefix,o=this.loadingType,i=e||"success"===n||"fail"===n;return i?t(g["a"],{class:w("icon"),attrs:{classPrefix:r,name:e||n}}):"loading"===n?t(b["a"],{class:w("loading"),attrs:{type:o}}):void 0},genMessage:function(){var t=this.$createElement,e=this.type,n=this.message;if(Object(v["c"])(n)&&""!==n)return"html"===e?t("div",{class:w("text"),domProps:{innerHTML:n}}):t("div",{class:w("text")},[n])}},render:function(){var t,e=arguments[0];return e("transition",{attrs:{name:this.transition},on:{afterEnter:this.onAfterEnter,afterLeave:this.onAfterLeave}},[e("div",{directives:[{name:"show",value:this.value}],class:[w([this.position,(t={},t[this.type]=!this.icon,t)]),this.className],on:{click:this.onClick}},[this.genIcon(),this.genMessage()])])}}),k=n("092d"),S={icon:"",type:"text",mask:!1,value:!0,message:"",className:"",overlay:!1,onClose:null,onOpened:null,duration:2e3,iconPrefix:void 0,position:"middle",transition:"van-fade",forbidClick:!1,loadingType:void 0,getContainer:"body",overlayStyle:null,closeOnClick:!1,closeOnClickOverlay:!1},C={},O=[],x=!1,A=Object(l["a"])({},S);function N(t){return Object(v["e"])(t)?t:{message:t}}function I(t){return document.body.contains(t)}function P(){if(v["f"])return{};if(O=O.filter((function(t){return!t.$el.parentNode||I(t.$el)})),!O.length||x){var t=new(u["default"].extend(L))({el:document.createElement("div")});t.$on("input",(function(e){t.value=e})),O.push(t)}return O[O.length-1]}function E(t){return Object(l["a"])({},t,{overlay:t.mask||t.overlay,mask:void 0,duration:void 0})}function j(t){void 0===t&&(t={});var e=P();return e.value&&e.updateZIndex(),t=N(t),t=Object(l["a"])({},A,C[t.type||A.type],t),t.clear=function(){e.value=!1,t.onClose&&(t.onClose(),t.onClose=null),x&&!v["f"]&&e.$on("closed",(function(){clearTimeout(e.timer),O=O.filter((function(t){return t!==e})),Object(k["a"])(e.$el),e.$destroy()}))},Object(l["a"])(e,E(t)),clearTimeout(e.timer),t.duration>0&&(e.timer=setTimeout((function(){e.clear()}),t.duration)),e}var _=function(t){return function(e){return j(Object(l["a"])({type:t},N(e)))}};["loading","success","fail"].forEach((function(t){j[t]=_(t)})),j.clear=function(t){O.length&&(t?(O.forEach((function(t){t.clear()})),O=[]):x?O.shift().clear():O[0].clear())},j.setDefaultOptions=function(t,e){"string"===typeof t?C[t]=e:Object(l["a"])(A,t)},j.resetDefaultOptions=function(t){"string"===typeof t?C[t]=null:(A=Object(l["a"])({},S),C={})},j.allowMultiple=function(t){void 0===t&&(t=!0),x=t},j.install=function(){u["default"].use(L)},u["default"].prototype.$toast=j;var T=j,$=(n("a9e3"),[[[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1]],[[-1,-1,-1,-1,-1,-1],[-1,0,1,0,0,-1],[-1,-1,-1,-1,-1,-1]],[[-1,-1,1,-1,-1,-1],[0,-1,-1,-1,0,-1],[0,0,0,0,0,-1]],[[-1,-1,0,0,-1,-1],[-1,0,0,0,0,-1],[-1,0,0,0,0,-1]],[[-1,0,0,0,0,-1],[1,-1,-1,-1,0,-1],[-1,0,0,0,0,-1]],[[0,0,0,0,0,0],[0,-1,-1,-1,-1,0],[0,-1,-1,-1,-1,1]],[[0,0,-1,-1,0,0],[0,-1,-1,-1,-1,0],[0,0,0,-1,-1,0]],[[-1,-1,0,0,-1,-1],[-1,0,0,1,0,-1],[0,0,0,0,0,0]],[[-1,0,0,0,0,-1],[-1,0,0,0,0,-1],[-1,0,0,0,0,-1]],[[-1,-1,0,0,-1,-1],[-1,-1,0,0,-1,-1],[-1,-1,-1,-1,-1,-1]],[[-1,-1,0,0,0,-1],[-1,-1,0,-1,0,-1],[-1,-1,0,0,0,-1]],[[-1,-1,-1,0,-1,-1],[-1,-1,0,0,0,-1],[-1,0,0,0,0,0]],[[0,-1,0,0,-1,0],[-1,0,-1,-1,0,-1],[0,0,0,0,0,0]],[[-1,-1,0,0,-1,-1],[-1,-1,0,0,-1,-1],[-1,-1,0,0,-1,-1]],[[0,0,-1,0,0,0],[0,0,-1,0,0,0],[0,0,-1,0,0,0]],[[0,0,-1,-1,-1,1],[0,-1,0,0,0,0],[0,0,0,0,0,0]],[[1,0,0,0,0,0],[-1,-1,-1,0,-1,-1],[1,0,0,0,0,0]],[[-1,0,0,0,0,-1],[-1,0,-1,-1,0,-1],[-1,0,0,0,0,-1]],[[0,-1,0,0,-1,-1],[1,1,0,0,-1,-1],[0,-1,0,0,-1,-1]],[[-1,0,-1,0,-1,0],[0,1,0,1,0,-1],[-1,0,-1,0,-1,0]],[[0,0,-1,-1,-1,-1],[0,-1,-1,0,1,-1],[0,0,-1,0,0,-1]],[[-1,-1,-1,0,0,0],[-1,1,-1,0,0,0],[-1,-1,-1,0,0,0]],[[0,-1,-1,0,0,0],[0,-1,-1,-1,-1,0],[0,0,-1,-1,-1,-1]],[[0,0,0,-1,-1,-1],[0,-1,0,-1,0,1],[0,0,0,-1,-1,0]]]),R=[[[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1]],[[-1,-1,-1,-1,-1,-1],[-1,2,-1,1,-1,-1],[-1,-1,-1,-1,-1,-1]],[[-1,-1,-1,-1,-1,-1],[1,-1,-1,-1,3,-1],[-1,-1,2,-1,-1,-1]],[[-1,-1,-1,-1,-1,-1],[-1,-1,1,4,-1,-1],[-1,-1,2,3,-1,-1]],[[-1,-1,1,-1,-1,-1],[-1,-1,-1,-1,3,-1],[-1,-1,2,-1,-1,-1]],[[-1,-1,2,-1,-1,3],[1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1]],[[1,-1,-1,-1,4,-1],[-1,-1,-1,-1,-1,-1],[-1,2,-1,-1,-1,3]],[[-1,-1,2,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,1,-1,-1,3,-1]],[[-1,10,9,8,7,-1],[-1,1,-1,-1,6,-1],[-1,2,3,4,5,-1]],[[-1,-1,1,2,-1,-1],[-1,-1,4,3,-1,-1],[-1,-1,-1,-1,-1,-1]],[[-1,-1,1,2,3,-1],[-1,-1,8,-1,4,-1],[-1,-1,7,6,5,-1]],[[-1,-1,-1,-1,-1,-1],[-1,-1,-1,1,-1,-1],[-1,2,-1,-1,-1,3]],[[1,-1,4,-1,-1,5],[-1,-1,-1,-1,-1,-1],[-1,2,-1,-1,3,-1]],[[-1,-1,1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,2,-1,-1]],[[1,-1,-1,3,-1,6],[-1,-1,-1,-1,7,-1],[-1,2,-1,4,-1,5]],[[1,-1,-1,-1,-1,-1],[-1,-1,-1,3,-1,-1],[-1,2,-1,-1,-1,4]],[[-1,-1,1,-1,4,-1],[-1,-1,-1,3,-1,-1],[-1,-1,2,-1,5,-1]],[[-1,1,10,9,8,-1],[-1,2,-1,-1,7,-1],[-1,3,4,5,6,-1]],[[1,-1,3,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[2,-1,-1,4,-1,-1]],[[-1,4,-1,5,-1,9],[1,-1,3,-1,7,-1],[-1,2,-1,6,-1,8]],[[1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,2,-1,3,-1,-1]],[[-1,-1,-1,1,-1,4],[-1,-1,-1,-1,5,-1],[-1,-1,-1,2,-1,3]],[[1,-1,-1,3,-1,-1],[-1,-1,-1,-1,-1,4],[-1,2,-1,-1,-1,-1]],[[1,8,7,-1,-1,-1],[2,-1,6,-1,9,-1],[3,4,5,-1,-1,10]]],J=[{name:"选择关卡",key:"chooseLevel"},{name:"重置关卡",key:"resetLevel"},{name:"查看规则",key:"checkRule"},{name:"查看攻略",key:"checkStrategy"}],M={data:function(){return{lanternList:[],pureLanternList:[],strategyList:[],curLevel:0,maxLevel:0,showPickLevel:!1,showActions:!1,showRule:!1,showStrategy:!1,actions:J,strategyConfig:R}},computed:{levelColumns:function(){for(var t=this.maxLevel,e=[],n=0;n<t;n++)e.push("第".concat(n+1,"关"));return e},curStrategyImg:function(){var t=this.curLevel;return"http://doc.uwayfly.com/lantern-level-".concat(t,".png")}},mounted:function(){this.maxLevel=$.length-1,this.curLevel=+localStorage.getItem("curLevel")||1,this.curLevel>this.maxLevel&&(this.curLevel=1,localStorage.setItem("curLevel",1)),this.init(this.curLevel)},methods:{init:function(t){for(var e=$[t],n=R[t]||[],r=e.length,o=e[0].length,i=[],a=[],c=0;c<o;c++){for(var s=[],l=[],u=0;u<r;u++)s.push(e[u][c]),l.push(n[u]&&n[u][c]);i.push(s),a.push(l)}console.log("res",i),console.log("res2",a,n);try{this.lanternList=JSON.parse(JSON.stringify(i)),this.pureLanternList=JSON.parse(JSON.stringify(i)),this.strategyList=JSON.parse(JSON.stringify(a))}catch(f){}},onSelectAction:function(t){switch(console.log("item",t),t.key){case"chooseLevel":this.onShowPickLevel();break;case"resetLevel":this.onReset();break;case"checkRule":this.showRule=!0;break;case"checkStrategy":this.showStrategy=!0;break}},onShowPickLevel:function(){this.showPickLevel=!this.showPickLevel},onChangePickerLevel:function(t,e,n){console.log(t,e,n)},onConfirmPikcerLevel:function(t,e){console.log(t,e),this.curLevel!=e+1&&(this.curLevel=e+1,this.init(this.curLevel),window.localStorage.setItem("curLevel",this.curLevel),T("已切换到第".concat(this.curLevel,"关"))),this.showPickLevel=!1},onReset:function(){this.init(this.curLevel),T("重置成功")},onClickLantern:function(t,e){this.onChnageLanternColor(t,e),this.onCheckSucc()},onCheckSucc:function(){var t,e=this,n=s(this.lanternList);try{for(n.s();!(t=n.n()).done;){var r,o=t.value,a=s(o);try{for(a.s();!(r=a.n()).done;){var c=r.value;if(0==c)return!1}}catch(l){a.e(l)}finally{a.f()}}}catch(l){n.e(l)}finally{n.f()}if(this.curLevel>=this.maxLevel)return console.log("恭喜通关"),void i["a"].confirm({title:"提示",message:"恭喜通关！没有更多了！"}).then((function(){}));console.log("恭喜晋级"),i["a"].confirm({title:"提示",message:"恭喜晋级第".concat(this.curLevel+1,"关")}).then((function(){e.curLevel+=1,console.log("当前关卡",e.curLevel),window.localStorage.setItem("curLevel",e.curLevel),e.init(e.curLevel)})).catch((function(){}))},onChnageLanternColor:function(t,e){var n=this.lanternList,r=this.lanternList[t][e];if(-1!=r){var o=Number(!r);this.lanternList[t][e]=o,this.$forceUpdate(),console.log("123123",t,e,o,n[t][e-1]),n[t+1]&&-1!=n[t+1][e]&&(n[t+1][e]=Number(!n[t+1][e])),n[t-1]&&-1!=n[t-1][e]&&(n[t-1][e]=Number(!n[t-1][e])),null!=n[t][e+1]&&-1!=n[t][e+1]&&(console.log("======+"),n[t][e+1]=Number(!n[t][e+1])),null!=n[t][e-1]&&-1!=n[t][e-1]&&(console.log("======-"),n[t][e-1]=Number(!n[t][e-1])),console.log("lanternList",n),this.$forceUpdate()}}}},F=M,U=(n("8b55"),n("2877")),B=Object(U["a"])(F,r,o,!1,null,null,null);e["default"]=B.exports},d28b:function(t,e,n){var r=n("746f");r("iterator")},e01a:function(t,e,n){"use strict";var r=n("23e7"),o=n("83ab"),i=n("da84"),a=n("5135"),c=n("1626"),s=n("861d"),l=n("9bf2").f,u=n("e893"),f=i.Symbol;if(o&&c(f)&&(!("description"in f.prototype)||void 0!==f().description)){var v={},h=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof h?new f(t):void 0===t?f():f(t);return""===t&&(v[e]=!0),e};u(h,f);var d=h.prototype=f.prototype;d.constructor=h;var p=d.toString,g="Symbol(test)"==String(f("test")),b=/^Symbol\((.*)\)[^)]+$/;l(d,"description",{configurable:!0,get:function(){var t=s(this)?this.valueOf():this,e=p.call(t);if(a(v,t))return"";var n=g?e.slice(7,-1):e.replace(b,"$1");return""===n?void 0:n}}),r({global:!0,forced:!0},{Symbol:h})}},e538:function(t,e,n){var r=n("b622");e.f=r},e8b5:function(t,e,n){var r=n("c6b6");t.exports=Array.isArray||function(t){return"Array"==r(t)}},fb6a:function(t,e,n){"use strict";var r=n("23e7"),o=n("e8b5"),i=n("68ee"),a=n("861d"),c=n("23cb"),s=n("50c4"),l=n("fc6a"),u=n("8418"),f=n("b622"),v=n("1dde"),h=v("slice"),d=f("species"),p=[].slice,g=Math.max;r({target:"Array",proto:!0,forced:!h},{slice:function(t,e){var n,r,f,v=l(this),h=s(v.length),b=c(t,h),y=c(void 0===e?h:e,h);if(o(v)&&(n=v.constructor,i(n)&&(n===Array||o(n.prototype))?n=void 0:a(n)&&(n=n[d],null===n&&(n=void 0)),n===Array||void 0===n))return p.call(v,b,y);for(r=new(void 0===n?Array:n)(g(y-b,0)),f=0;b<y;b++,f++)b in v&&u(r,f,v[b]);return r.length=f,r}})}}]);
//# sourceMappingURL=chunk-7969be78.c7c081aa.js.map