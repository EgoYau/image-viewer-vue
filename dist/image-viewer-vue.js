!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("image-viewer-vue",[],t):"object"==typeof exports?exports["image-viewer-vue"]=t():e["image-viewer-vue"]=t()}("undefined"!=typeof self?self:this,function(){return function(e){function t(n){if(i[n])return i[n].exports;var o=i[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var i={};return t.m=e,t.c=i,t.d=function(e,i,n){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/dist/",t(t.s=1)}([function(e,t,i){"use strict";var n={offsetX:0,offsetY:0,state:0};t.a={name:"image-viewer-vue",props:{imgUrlList:{type:Array,default:[],required:!0},index:{type:Number,default:0,required:!1},title:{type:String,default:"图片",required:!1}},data:function(){return{innerIndex:0,innerImgUrl:"",innerTitle:"",spinShow:!0,imageDivShow:!1}},methods:{imageLoadSuccess:function(){this.spinShow=!1,this.imageDivShow=!0,this.fixImageSize()},imageLoadError:function(){this.spinShow=!1,this.imageDivShow=!0},fixImageSize:function(){var e=this.$refs.imagePhoto;e.width=e.naturalWidth,e.height=e.naturalHeight;var t=e.width,i=e.height,n=document.body.clientWidth,o=document.body.clientHeight,r=t/n,a=i/o;if(r>=.9||a>=.9)if(r>=a){var s=t/(3*n/4);t=3*n/4,e.width=t,e.height=i/s}else{var c=i/(3*o/4);i=3*o/4,e.width=t/c,e.height=i}},clickMask:function(){this.closeSelf()},clickWrap:function(){this.closeSelf()},clickImageDiv:function(){this.closeSelf()},clickImagePhotos:function(){},clickImage:function(){},clickCloseIcon:function(){this.closeSelf()},leftBtnClick:function(){var e=this.imgUrlList;e.length;this.innerIndex>0?this.innerIndex--:this.innerIndex=0,this.innerImgUrl=e[this.innerIndex]},rightBtnClick:function(){var e=this.imgUrlList,t=e.length;this.innerIndex<t-1?this.innerIndex++:this.innerIndex=e.length-1,this.innerImgUrl=e[this.innerIndex]},closeSelf:function(){this.$emit("closeImageViewer")},mousedown:function(e){var t=this.getEvent(e);n.offsetX=t.offsetX,n.offsetY=t.offsetY,n.state=1},mouseup:function(e){n.state=0},mousemove:function(e){var t=this.getEvent(e);if(n.state){n.endX=t.clientX,n.endY=t.clientY;var i=this.$refs.imageDiv;i.style.top=n.endY-n.offsetY+"px",i.style.left=n.endX-n.offsetX+"px"}},mouseWheelScroll:function(e){var t=this.$refs.imageDiv,i=this.$refs.imagePhoto,n=i.width,o=i.height,r=n,a=o;e.deltaY<0?n<2e3&&(r=1.025*n,a=1.025*o):n>300&&(r=.975*n,a=.975*o),i.height=Math.round(a),i.width=Math.round(r);var s=t.offsetLeft,c=t.offsetTop;t.style.left=s-(r-n)/2+"px",t.style.top=c-(a-o)/2+"px"},getEvent:function(e){return e||window.event}},watch:{index:{handler:function(e){this.innerIndex=Number(e)},immediate:!0},innerIndex:{handler:function(e,t){var i=Number(e),n=this.$refs.imageDiv;n&&n.style&&(n.style.top="",n.style.left=""),i<0&&(i=0),i>this.imgUrlList.length&&(i=this.imgUrlList.length-1),this.imageDivShow=!1,this.spinShow=!0,this.innerTitle=this.title+" "+(i+1)+"/"+this.imgUrlList.length,this.$set(this._data,"innerImgUrl",this.imgUrlList[i])},immediate:!0}}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(2),o={install:function(e,t){e.component(n.a.name,n.a)}};t.default=o},function(e,t,i){"use strict";function n(e){i(3)}var o=i(0),r=i(9),a=i(8),s=n,c=a(o.a,r.a,!1,s,"data-v-0df0fb83",null);t.a=c.exports},function(e,t,i){var n=i(4);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);i(6)("09a0c9af",n,!0,{})},function(e,t,i){t=e.exports=i(5)(!1),t.push([e.i,'.image-container[data-v-0df0fb83]{width:100%}.image-container[data-v-0df0fb83],.image-viewer-mask[data-v-0df0fb83]{position:fixed;z-index:10000;top:0;bottom:0;left:0;right:0;background-color:rgba(55,55,55,.6);height:100%}.image-viewer-wrap[data-v-0df0fb83]{position:fixed;overflow:auto;top:0;right:0;bottom:0;left:0;z-index:10000;display:flex;align-items:center;justify-content:center}.image-viewer-wrap .image-div[data-v-0df0fb83]{text-align:center;margin:auto;position:absolute;background-color:#fff}.image-viewer-wrap .image-div .image-photos[data-v-0df0fb83]{display:flex;align-items:center;justify-content:center;position:relative}.image-viewer-wrap .image-div .image-photos:hover>.leftButton[data-v-0df0fb83],.image-viewer-wrap .image-div .image-photos:hover>.rightButton[data-v-0df0fb83]{opacity:.4}.image-viewer-wrap .image-div .image-photos:hover>.bottomTitle[data-v-0df0fb83]{opacity:.8}.image-viewer-wrap .image-div .image-photos .imgContent[data-v-0df0fb83]{cursor:move}.image-viewer-wrap .image-div .image-photos .cancelButton[data-v-0df0fb83]{width:32px;height:32px;position:absolute;top:-16px;right:-16px;background-image:url("/src/assets/cancel.png");background-repeat:round;z-index:10100;cursor:pointer}.image-viewer-wrap .image-div .image-photos .cancelButton[data-v-0df0fb83]:hover{background-image:url("/src/assets/cancel-highlight.png")}.image-viewer-wrap .image-div .image-photos .leftButton[data-v-0df0fb83]{width:24px;height:68px;position:absolute;top:0;bottom:0;margin-top:auto;margin-bottom:auto;left:10px;background-image:url("/src/assets/left-row-opaque.png");background-repeat:round;opacity:0;z-index:10100;cursor:pointer}.image-viewer-wrap .image-div .image-photos .leftButton[data-v-0df0fb83]:hover{opacity:1}.image-viewer-wrap .image-div .image-photos .rightButton[data-v-0df0fb83]{width:24px;height:68px;position:absolute;top:0;bottom:0;margin-top:auto;margin-bottom:auto;right:10px;background-image:url("/src/assets/right-row-opaque.png");background-repeat:round;opacity:0;z-index:10100;cursor:pointer}.image-viewer-wrap .image-div .image-photos .rightButton[data-v-0df0fb83]:hover{opacity:1}.image-viewer-wrap .image-div .image-photos .bottomTitle[data-v-0df0fb83]{position:absolute;left:0;bottom:0;width:100%;height:32px;line-height:32px;background-color:rgba(0,0,0,.8);color:#fff;overflow:hidden;font-size:12px;text-align:center;opacity:0;z-index:10100}',""])},function(e,t){function i(e,t){var i=e[1]||"",o=e[3];if(!o)return i;if(t&&"function"==typeof btoa){var r=n(o);return[i].concat(o.sources.map(function(e){return"/*# sourceURL="+o.sourceRoot+e+" */"})).concat([r]).join("\n")}return[i].join("\n")}function n(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=i(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,i){"string"==typeof e&&(e=[[null,e,""]]);for(var n={},o=0;o<this.length;o++){var r=this[o][0];"number"==typeof r&&(n[r]=!0)}for(o=0;o<e.length;o++){var a=e[o];"number"==typeof a[0]&&n[a[0]]||(i&&!a[2]?a[2]=i:i&&(a[2]="("+a[2]+") and ("+i+")"),t.push(a))}},t}},function(e,t,i){function n(e){for(var t=0;t<e.length;t++){var i=e[t],n=u[i.id];if(n){n.refs++;for(var o=0;o<n.parts.length;o++)n.parts[o](i.parts[o]);for(;o<i.parts.length;o++)n.parts.push(r(i.parts[o]));n.parts.length>i.parts.length&&(n.parts.length=i.parts.length)}else{for(var a=[],o=0;o<i.parts.length;o++)a.push(r(i.parts[o]));u[i.id]={id:i.id,refs:1,parts:a}}}}function o(){var e=document.createElement("style");return e.type="text/css",l.appendChild(e),e}function r(e){var t,i,n=document.querySelector("style["+v+'~="'+e.id+'"]');if(n){if(g)return h;n.parentNode.removeChild(n)}if(b){var r=p++;n=d||(d=o()),t=a.bind(null,n,r,!1),i=a.bind(null,n,r,!0)}else n=o(),t=s.bind(null,n),i=function(){n.parentNode.removeChild(n)};return t(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap)return;t(e=n)}else i()}}function a(e,t,i,n){var o=i?"":n.css;if(e.styleSheet)e.styleSheet.cssText=w(t,o);else{var r=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(r,a[t]):e.appendChild(r)}}function s(e,t){var i=t.css,n=t.media,o=t.sourceMap;if(n&&e.setAttribute("media",n),m.ssrId&&e.setAttribute(v,t.id),o&&(i+="\n/*# sourceURL="+o.sources[0]+" */",i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),e.styleSheet)e.styleSheet.cssText=i;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(i))}}var c="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!c)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var f=i(7),u={},l=c&&(document.head||document.getElementsByTagName("head")[0]),d=null,p=0,g=!1,h=function(){},m=null,v="data-vue-ssr-id",b="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());e.exports=function(e,t,i,o){g=i,m=o||{};var r=f(e,t);return n(r),function(t){for(var i=[],o=0;o<r.length;o++){var a=r[o],s=u[a.id];s.refs--,i.push(s)}t?(r=f(e,t),n(r)):r=[];for(var o=0;o<i.length;o++){var s=i[o];if(0===s.refs){for(var c=0;c<s.parts.length;c++)s.parts[c]();delete u[s.id]}}}};var w=function(){var e=[];return function(t,i){return e[t]=i,e.filter(Boolean).join("\n")}}()},function(e,t){e.exports=function(e,t){for(var i=[],n={},o=0;o<t.length;o++){var r=t[o],a=r[0],s=r[1],c=r[2],f=r[3],u={id:e+":"+o,css:s,media:c,sourceMap:f};n[a]?n[a].parts.push(u):i.push(n[a]={id:a,parts:[u]})}return i}},function(e,t){e.exports=function(e,t,i,n,o,r){var a,s=e=e||{},c=typeof e.default;"object"!==c&&"function"!==c||(a=e,s=e.default);var f="function"==typeof s?s.options:s;t&&(f.render=t.render,f.staticRenderFns=t.staticRenderFns,f._compiled=!0),i&&(f.functional=!0),o&&(f._scopeId=o);var u;if(r?(u=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(r)},f._ssrRegister=u):n&&(u=n),u){var l=f.functional,d=l?f.render:f.beforeCreate;l?(f._injectStyles=u,f.render=function(e,t){return u.call(t),d(e,t)}):f.beforeCreate=d?[].concat(d,u):[u]}return{esModule:a,exports:s,options:f}}},function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{ref:"imageContainer",staticClass:"image-container"},[i("div",{staticClass:"image-viewer-mask",on:{click:function(t){e.clickMask()}}}),e._v(" "),i("div",{staticClass:"image-viewer-wrap",on:{click:function(t){e.clickWrap()}}},[i("div",{ref:"imageDiv",staticClass:"image-div",on:{click:function(t){e.clickImageDiv()}}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.imageDivShow,expression:"imageDivShow"}],ref:"imageDiv",staticClass:"image-photos",on:{click:function(t){e.clickImagePhotos()},mousewheel:function(t){e.mouseWheelScroll(t)}}},[i("img",{ref:"imagePhoto",staticClass:"imgContent",attrs:{draggable:"false",src:e.innerImgUrl},on:{click:function(t){t.stopPropagation(),e.clickImage()},load:function(t){e.imageLoadSuccess()},error:function(t){e.imageLoadError()},mousedown:e.mousedown,mousemove:e.mousemove,mouseup:e.mouseup}}),e._v(" "),i("span",{staticClass:"cancelButton",on:{click:function(t){t.stopPropagation(),e.closeSelf()}}}),e._v(" "),i("span",{ref:"leftButton",staticClass:"leftButton",on:{click:function(t){t.stopPropagation(),e.leftBtnClick()}}}),e._v(" "),i("span",{ref:"rightButton",staticClass:"rightButton",on:{click:function(t){t.stopPropagation(),e.rightBtnClick()}}}),e._v(" "),i("span",{staticClass:"bottomTitle",on:{click:function(t){t.stopPropagation(),e.clickImage()}}},[e._v(e._s(e.innerTitle))])])])])])},o=[],r={render:n,staticRenderFns:o};t.a=r}])});
//# sourceMappingURL=image-viewer-vue.js.map