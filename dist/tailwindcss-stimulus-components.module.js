var S=Object.defineProperty;var A=(t,s,a)=>s in t?S(t,s,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[s]=a;var e=(t,s,a)=>(A(t,typeof s!="symbol"?s+"":s,a),a);import{Controller as I}from"@hotwired/stimulus";var f=new Map;async function o(t,s,a=null){s?await l(t,a):await u(t,a)}async function l(t,s=null){try{t.classList.remove("hidden"),await C("enter",t,s)}finally{y(t,s)}}async function u(t,s=null){try{await C("leave",t,s)}finally{t.classList.add("hidden"),y(t,s)}}async function C(t,s,a){y(s,a);let i=w(t,s,a);f.set(s,t),c(s,i.transition),c(s,i.start),await D(),v(s,i.start),c(s,i.end),await L(s),v(s,i.end),v(s,i.transition),"originalClass"in s.dataset&&s.dataset.originalClass!==""&&c(s,s.dataset.originalClass.split(" ")),f.delete(s)}function w(t,s,a){let i=s.dataset,d=a?`${a}-${t}`:t,r=`transition${t.charAt(0).toUpperCase()+t.slice(1)}`;return{transition:i[r]?i[r].split(" "):[d],start:i[`${r}From`]?i[`${r}From`].split(" "):[`${d}-from`],end:i[`${r}To`]?i[`${r}To`].split(" "):[`${d}-to`]}}function c(t,s){t.classList.add(...s)}function v(t,s){t.classList.remove(...s)}function D(){return new Promise(t=>{requestAnimationFrame(()=>{requestAnimationFrame(t)})})}function L(t){return Promise.all(t.getAnimations().map(s=>s.finished))}async function y(t,s=null){if("originalClass"in t.dataset||(t.dataset.originalClass=[...t.classList].filter(a=>a!=="hidden").join(" ")),f.has(t)){let a=f.get(t),i=w(a,t,s);v(t,i.transition+i.start+i.end),"originalClass"in t.dataset&&t.dataset.originalClass!==""&&c(t,t.dataset.originalClass.split(" ")),f.delete(t)}}var p=class extends I{connect(){setTimeout(()=>{l(this.element)},this.showDelayValue),this.hasDismissAfterValue&&setTimeout(()=>{this.close()},this.dismissAfterValue)}close(){u(this.element).then(()=>{this.element.remove()})}};e(p,"values",{dismissAfter:Number,removeDelay:{type:Number,default:1100}}),e(p,"classes",["show","hide"]);import{Controller as k}from"@hotwired/stimulus";var g=class extends k{connect(){this.timeout=null}save(){clearTimeout(this.timeout),this.timeout=setTimeout(()=>{this.statusTarget.textContent=this.submittingTextValue,this.formTarget.requestSubmit()},this.submitDurationValue)}success(){this.setStatus(this.successTextValue)}error(){this.setStatus(this.errorTextValue)}setStatus(t){this.statusTarget.textContent=t,this.timeout=setTimeout(()=>{this.statusTarget.textContent=""},this.statusDurationValue)}};e(g,"targets",["form","status"]),e(g,"values",{submitDuration:{type:Number,default:1e3},statusDuration:{type:Number,default:2e3},submittingText:{type:String,default:"Saving..."},successText:{type:String,default:"Saved!"},errorText:{type:String,default:"Unable to save."}});import{Controller as P}from"@hotwired/stimulus";var n=class extends P{connect(){this.hasButtonTarget&&(this.buttonTarget.addEventListener("keydown",this._onMenuButtonKeydown),this.buttonTarget.setAttribute("aria-haspopup","true"))}disconnect(){this.hasButtonTarget&&(this.buttonTarget.removeEventListener("keydown",this._onMenuButtonKeydown),this.buttonTarget.removeAttribute("aria-haspopup"))}openValueChanged(){o(this.menuTarget,this.openValue)}show(){this.openValue=!0}hide(t){this.element.contains(t.target)===!1&&this.openValue&&(this.openValue=!1)}toggle(){this.openValue=!this.openValue}};e(n,"targets",["menu","button"]),e(n,"values",{open:Boolean,default:!1});import{Controller as B}from"@hotwired/stimulus";var m=class extends B{disconnect(){this.close()}open(){this.openValue=!0}close(){this.openValue=!1}closeBackground(t){t.target===this.containerTarget&&this.close()}openValueChanged(){this.openValue?(this.containerTarget.focus(),this.lockScroll(),l(this.backgroundTarget),l(this.containerTarget)):(this.unlockScroll(),u(this.containerTarget),u(this.backgroundTarget))}lockScroll(){let t=window.innerWidth-document.documentElement.clientWidth;document.body.style.paddingRight=`${t}px`,document.body.classList.add("fixed","inset-x-0","overflow-hidden"),this.restoreScrollValue&&(this.saveScrollPosition(),document.body.style.top=`-${this.scrollPosition}px`)}unlockScroll(){document.body.style.paddingRight=null,document.body.classList.remove("fixed","inset-x-0","overflow-hidden"),this.restoreScrollValue&&(this.restoreScrollPosition(),document.body.style.top=null)}saveScrollPosition(){this.scrollPosition=window.pageYOffset||document.body.scrollTop}restoreScrollPosition(){this.scrollPosition!==void 0&&(document.documentElement.scrollTop=this.scrollPosition)}};e(m,"targets",["container","background"]),e(m,"values",{open:{type:Boolean,default:!1},restoreScroll:{type:Boolean,default:!0}});import{Controller as $}from"@hotwired/stimulus";var h=class extends ${connect(){this.anchor&&(this.indexValue=this.tabTargets.findIndex(t=>t.id===this.anchor)),this.showTab()}change(t){t.currentTarget.dataset.index?this.indexValue=t.currentTarget.dataset.index:t.currentTarget.dataset.id?this.indexValue=this.tabTargets.findIndex(s=>s.id==t.currentTarget.dataset.id):this.indexValue=this.tabTargets.indexOf(t.currentTarget),window.dispatchEvent(new CustomEvent("tsc:tab-change"))}nextTab(){this.indexValue=Math.min(this.indexValue+1,this.tabsCount)}previousTab(){this.indexValue=Math.max(this.indexValue-1,0)}firstTab(){this.indexValue=0}lastTab(){this.indexValue=this.tabsCount-1}indexValueChanged(){this.showTab(),this.updateAnchorValue&&(location.hash=this.tabTargets[this.indexValue].id)}showTab(){this.tabTargets.forEach((t,s)=>{let a=this.panelTargets[s];s===this.indexValue?(a.classList.remove("hidden"),this.hasInactiveTabClass&&t.classList.remove(...this.inactiveTabClasses),this.hasActiveTabClass&&t.classList.add(...this.activeTabClasses)):(a.classList.add("hidden"),this.hasActiveTabClass&&t.classList.remove(...this.activeTabClasses),this.hasInactiveTabClass&&t.classList.add(...this.inactiveTabClasses))})}get tabsCount(){return this.tabTargets.length}get anchor(){return document.URL.split("#").length>1?document.URL.split("#")[1]:null}};e(h,"classes",["activeTab","inactiveTab"]),e(h,"targets",["tab","panel"]),e(h,"values",{index:0,updateAnchor:Boolean});import{Controller as E}from"@hotwired/stimulus";var T=class extends E{toggle(t){this.openValue=!this.openValue}hide(){this.openValue=!1}show(){this.openValue=!0}openValueChanged(){this.toggleableTargets.forEach(t=>{o(t,this.openValue)})}};e(T,"targets",["toggleable"]),e(T,"values",{open:{type:Boolean,default:!1}});import{Controller as W}from"@hotwired/stimulus";var b=class extends W{openValueChanged(){o(this.contentTarget,this.openValue),this.shouldAutoDismiss&&this.scheduleDismissal()}show(t){this.shouldAutoDismiss&&this.scheduleDismissal(),this.openValue=!0}hide(){this.openValue=!1}toggle(){this.openValue=!this.openValue}get shouldAutoDismiss(){return this.openValue&&this.hasDismissAfterValue}scheduleDismissal(){this.hasDismissAfterValue&&(this.cancelDismissal(),this.timeoutId=setTimeout(()=>{this.hide(),this.timeoutId=void 0},this.dismissAfterValue))}cancelDismissal(){typeof this.timeoutId=="number"&&(clearTimeout(this.timeoutId),this.timeoutId=void 0)}};e(b,"targets",["content"]),e(b,"values",{dismissAfter:Number,open:{type:Boolean,default:!1}});var V=class extends n{openValueChanged(){o(this.overlayTarget,this.openValue),o(this.menuTarget,this.openValue)}};e(V,"targets",["menu","overlay"]);import{Controller as q}from"@hotwired/stimulus";var x=class extends q{update(){this.preview=this.colorTarget.value}set preview(t){this.previewTarget.style[this.styleValue]=t;let s=this._getContrastYIQ(t);this.styleValue==="color"?this.previewTarget.style.backgroundColor=s:this.previewTarget.style.color=s}_getContrastYIQ(t){t=t.replace("#","");let s=128,a=parseInt(t.substr(0,2),16),i=parseInt(t.substr(2,2),16),d=parseInt(t.substr(4,2),16);return(a*299+i*587+d*114)/1e3>=s?"#000":"#fff"}};e(x,"targets",["preview","color"]),e(x,"values",{style:{type:String,default:"backgroundColor"}});export{p as Alert,g as Autosave,x as ColorPreview,n as Dropdown,m as Modal,b as Popover,V as Slideover,h as Tabs,T as Toggle};
