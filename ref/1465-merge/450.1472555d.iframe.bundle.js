"use strict";(self.webpackChunkreact_photoswipe_gallery=self.webpackChunkreact_photoswipe_gallery||[]).push([[450],{"./src/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z2:()=>Gallery,q7:()=>Item,iX:()=>useGallery});var photoswipe_esm=__webpack_require__("./.yarn/cache/photoswipe-npm-5.4.4-f7a755162f-89a2910f01.zip/node_modules/photoswipe/dist/photoswipe.esm.js"),react=__webpack_require__("./.yarn/cache/react-npm-18.2.0-1eae08fee2-b9214a9bd7.zip/node_modules/react/index.js"),react_dom=__webpack_require__("./.yarn/__virtual__/react-dom-virtual-05197f3222/0/cache/react-dom-npm-18.2.0-dd675bca1c-ca5e7762ec.zip/node_modules/react-dom/index.js"),prop_types=__webpack_require__("./.yarn/cache/prop-types-npm-15.8.1-17c71ee7ee-7d959caec0.zip/node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types);const object_to_hash=function objectToHash(obj){return Object.entries(obj).map((([key,value])=>value?`${key}=${value}`:key)).join("&")};const hash_to_object=function hashToObject(hash){return hash.split("&").reduce(((acc,keyValue)=>{const[key,value]=keyValue.split("=");return key&&(acc[key]=value),acc}),{})};const get_hash_without_gid_and_pid=function getHashWithoutGidAndPid(hash){const obj=hash_to_object(hash);return delete obj.gid,delete obj.pid,object_to_hash(obj)};const get_hash_value=function getHashValue(){return window.location.hash.substring(1)};const get_base_url=function getBaseUrl(){return`${window.location.pathname}${window.location.search}`},hash_includes_navigation_query_params=hash=>{const hashParts=hash_to_object(hash);return Boolean(hashParts.gid)&&Boolean(hashParts.pid)};const get_initial_active_slide_index=function getInitialActiveSlideIndex(index,targetId){return null!==index?index:targetId?parseInt(targetId,10)-1:0},Context=(0,react.createContext)({remove:()=>{},set:()=>{},handleClick:()=>{},open:()=>{},isRefRegistered:()=>!1});class PhotoSwipeLightboxStub{constructor(pswp){this.pswp=pswp,this.on=pswp.on.bind(pswp),this.off=pswp.off.bind(pswp),this.dispatch=pswp.dispatch.bind(pswp)}}var __rest=function(s,e){var t={};for(var p in s)Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0&&(t[p]=s[p]);if(null!=s&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(p=Object.getOwnPropertySymbols(s);i<p.length;i++)e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i])&&(t[p[i]]=s[p[i]])}return t};const item_to_slide=(item,itemRef)=>{var _a;const{width,height,original,originalSrcset,thumbnail,cropped,content,id:pid}=item,rest=__rest(item,["width","height","original","originalSrcset","thumbnail","cropped","content","id"]);return Object.assign(Object.assign(Object.assign({w:width?Number(width):void 0,h:height?Number(height):void 0,src:original,srcset:originalSrcset,msrc:thumbnail,element:null!==(_a=null==itemRef?void 0:itemRef.current)&&void 0!==_a?_a:void 0,thumbCropped:cropped,content},void 0!==content?{type:"html"}:{}),void 0!==pid?{pid}:{}),rest)};class NoSourceIdError extends Error{constructor(msg=""){super(),this.message=`\n    ${msg}\n\n    No \`sourceId\` provided.\n    You should add \`sourceId\` prop to Item component during using \`dataSource\` prop at Gallery component.\n    Also you should add \`sourceId\` property to each item of \`dataSource\` array at Gallery component.\n    Example:\n    <Gallery dataSource={[{sourceId: 1, src: 'a.jpg'}]}>\n        <Item sourceId={1}>{({ ref }) => <div ref={ref}></div>}</Item>\n    </Gallery>\n`}}var get_slides_and_index_from_data_source_rest=function(s,e){var t={};for(var p in s)Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0&&(t[p]=s[p]);if(null!=s&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(p=Object.getOwnPropertySymbols(s);i<p.length;i++)e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i])&&(t[p[i]]=s[p[i]])}return t};const get_slides_and_index_from_data_source=(dataSource,items,targetRef,targetId,itemIndex)=>{const itemsWithRefsMap=Array.from(items.current).reduce(((acc,[ref,{sourceId}])=>{if(void 0===sourceId)throw new NoSourceIdError("sourceId is missed on Item component");return acc.set(sourceId,ref),acc}),new Map),{slides,index}=dataSource.reduce(((acc,dataSourceItem,i)=>{const{sourceId}=dataSourceItem,rest=get_slides_and_index_from_data_source_rest(dataSourceItem,["sourceId"]);if(void 0===sourceId)throw new NoSourceIdError("sourceId is missed in dataSource item");const elementRef=itemsWithRefsMap.has(sourceId)?itemsWithRefsMap.get(sourceId):void 0;return(targetRef===elementRef||void 0!==rest.id&&String(rest.id)===targetId)&&(acc.index=i),acc.slides.push(item_to_slide(rest,elementRef)),acc}),{slides:[],index:itemIndex||null});return{slides,index}};const sort_nodes=function sortNodes(a,b){return a===b?0:2&a.compareDocumentPosition(b)?1:-1};class NoRefError extends Error{constructor(msg=""){super(),this.message=`\n    ${msg}\n    No valid \`ref\` provided.\n    You should use \`ref\` from render prop of Item component.\n    Example:\n    <Item>{({ ref }) => <div ref={ref}></div>}</Item>\n`}}const entry_item_ref_is_element=entry=>entry[0].current instanceof Element,ensure_ref_passed=entry=>{if(entry_item_ref_is_element(entry))return entry;throw new NoRefError},get_slides_and_index_from_items_refs=(items,targetRef,targetId,itemIndex)=>{const entries=Array.from(items.current);if("number"==typeof itemIndex&&(void 0===entries[itemIndex]||!entry_item_ref_is_element(entries[itemIndex])))throw new NoRefError(`Failed to open at index ${itemIndex}`);const{slides,index}=entries.map(ensure_ref_passed).sort((([{current:a}],[{current:b}])=>sort_nodes(a,b))).reduce(((acc,entry,i)=>{const[ref,itemData]=entry;return(targetRef===ref||void 0!==itemData.id&&String(itemData.id)===targetId)&&(acc.index=i),acc.slides.push(item_to_slide(itemData,ref)),acc}),{slides:[],index:itemIndex||null});return{slides,index}};let pswp=null;const Gallery=({children,dataSource,options,plugins,uiElements,id:galleryUID,onBeforeOpen,onOpen,withCaption,withDownloadButton})=>{const[contentPortal,setContentPortal]=(0,react.useState)(null),items=(0,react.useRef)(new Map),openWhenReadyPid=(0,react.useRef)(null),open=(0,react.useCallback)(((targetRef,targetId,itemIndex,e)=>{if(pswp)return;const{slides,index}=dataSource?get_slides_and_index_from_data_source(dataSource,items,targetRef,targetId,itemIndex):get_slides_and_index_from_items_refs(items,targetRef,targetId,itemIndex),initialPoint=e&&void 0!==e.clientX&&void 0!==e.clientY?{x:e.clientX,y:e.clientY}:null,instance=new photoswipe_esm.A(Object.assign({dataSource:slides,index:get_initial_active_slide_index(index,targetId),initialPointerPos:initialPoint},options||{}));pswp=instance,instance.on("contentActivate",(({content:slideContent})=>{slideContent.data.content?setContentPortal((0,react_dom.createPortal)(slideContent.data.content,slideContent.element)):setContentPortal(null)})),instance.on("close",(()=>{setContentPortal(null)})),withDownloadButton&&instance.on("uiRegister",(()=>{var _a;null===(_a=instance.ui)||void 0===_a||_a.registerElement({name:"download-button",ariaLabel:"Download",order:8,isButton:!0,tagName:"a",appendTo:"bar",html:{isCustomSVG:!0,inner:'<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1ZM23 23H9v2h14Z" id="pswp__icn-download"/>',outlineID:"pswp__icn-download"},onInit:(el,pswpInstance)=>{el.setAttribute("download",""),el.setAttribute("target","_blank"),el.setAttribute("rel","noopener"),instance.on("change",(()=>{var _a;if(!(null===(_a=pswpInstance.currSlide)||void 0===_a?void 0:_a.data.src))return;el.href=pswpInstance.currSlide.data.src}))}})})),withCaption&&instance.on("uiRegister",(()=>{var _a;null===(_a=instance.ui)||void 0===_a||_a.registerElement({name:"default-caption",order:9,isButton:!1,appendTo:"root",onInit:(el,pswpInstance)=>{el.style.position="absolute",el.style.bottom="15px",el.style.left="0",el.style.right="0",el.style.padding="0 20px",el.style.color="var(--pswp-icon-color)",el.style.textAlign="center",el.style.fontSize="14px",el.style.lineHeight="1.5",el.style.textShadow="1px 1px 3px var(--pswp-icon-color-secondary)",instance.on("change",(()=>{if(!pswpInstance.currSlide)return;const{caption,alt}=pswpInstance.currSlide.data;el.innerHTML=caption||alt||""}))}})})),Array.isArray(uiElements)&&uiElements.forEach((uiElement=>{instance.on("uiRegister",(()=>{var _a;null===(_a=instance.ui)||void 0===_a||_a.registerElement(uiElement)}))})),"function"==typeof plugins&&plugins(new PhotoSwipeLightboxStub(instance)),"function"==typeof onBeforeOpen&&onBeforeOpen(instance);const getHistoryState=()=>({gallery:{galleryUID}});instance.on("beforeOpen",(()=>{var _a;if(void 0===galleryUID)return;if(!hash_includes_navigation_query_params(get_hash_value()))return void window.history.pushState(getHistoryState(),document.title);if(Boolean(null===(_a=window.history.state)||void 0===_a?void 0:_a.gallery))return;const baseUrl=get_base_url(),currentHash=get_hash_value(),hashWithoutGidAndPid=get_hash_without_gid_and_pid(currentHash),urlWithoutOpenedSlide=`${baseUrl}${hashWithoutGidAndPid?`#${hashWithoutGidAndPid}`:""}`,urlWithOpenedSlide=`${baseUrl}#${currentHash}`;window.history.replaceState(window.history.state,document.title,urlWithoutOpenedSlide),window.history.pushState(getHistoryState(),document.title,urlWithOpenedSlide)})),instance.on("change",(()=>{var _a;if(void 0===galleryUID)return;const pid=(null===(_a=instance.currSlide)||void 0===_a?void 0:_a.data.pid)||instance.currIndex+1,urlWithOpenedSlide=`${get_base_url()}#${get_hash_without_gid_and_pid(get_hash_value())}&${object_to_hash({gid:galleryUID,pid})}`;window.history.replaceState(getHistoryState(),document.title,urlWithOpenedSlide)}));const closeGalleryOnHistoryPopState=()=>{void 0!==galleryUID&&null!==pswp&&pswp.close()};window.addEventListener("popstate",closeGalleryOnHistoryPopState),instance.on("destroy",(()=>{void 0!==galleryUID&&(window.removeEventListener("popstate",closeGalleryOnHistoryPopState),hash_includes_navigation_query_params(get_hash_value())&&window.history.back()),pswp=null})),instance.init(),"function"==typeof onOpen&&onOpen(instance)}),[options,plugins,uiElements,galleryUID,onBeforeOpen,onOpen,withCaption,withDownloadButton]);(0,react.useEffect)((()=>()=>{pswp&&pswp.close()}),[]);const openGalleryBasedOnUrlHash=(0,react.useCallback)((()=>{if(void 0===galleryUID)return;if(null!==pswp)return;const hash=get_hash_value();if(hash.length<5)return;const params=hash_to_object(hash),{pid,gid}=params;pid&&gid&&(0!==items.current.size?pid&&gid===String(galleryUID)&&open(null,pid):openWhenReadyPid.current=pid)}),[open,galleryUID]);(0,react.useEffect)((()=>(openGalleryBasedOnUrlHash(),window.addEventListener("popstate",openGalleryBasedOnUrlHash),()=>{window.removeEventListener("popstate",openGalleryBasedOnUrlHash)})),[openGalleryBasedOnUrlHash]);const remove=(0,react.useCallback)((ref=>{items.current.delete(ref)}),[]),set=(0,react.useCallback)(((ref,data)=>{if(items.current.set(ref,data),null===openWhenReadyPid.current)return;const{id}=data;if(id===openWhenReadyPid.current)return open(ref),void(openWhenReadyPid.current=null);if(!id){const index=parseInt(openWhenReadyPid.current,10)-1,refToOpen=Array.from(items.current.keys())[index];refToOpen&&(open(refToOpen),openWhenReadyPid.current=null)}}),[open]),isRefRegistered=(0,react.useCallback)((ref=>items.current.has(ref)),[]),openAt=(0,react.useCallback)((index=>{open(null,null,index)}),[open]),contextValue=(0,react.useMemo)((()=>({remove,set,handleClick:open,open:openAt,isRefRegistered})),[remove,set,open,openAt,isRefRegistered]);return react.createElement(Context.Provider,{value:contextValue},children,contentPortal)};Gallery.propTypes={children:prop_types_default().any,options:prop_types_default().object,plugins:prop_types_default().func,uiElements:prop_types_default().array,id:prop_types_default().oneOfType([prop_types_default().string,prop_types_default().number]),onBeforeOpen:prop_types_default().func,onOpen:prop_types_default().func,withCaption:prop_types_default().bool,withDownloadButton:prop_types_default().bool,dataSource:prop_types_default().array};try{Gallery.displayName="Gallery",Gallery.__docgenInfo={description:"Gallery component providing photoswipe context",displayName:"Gallery",props:{children:{defaultValue:null,description:"Item components",name:"children",required:!1,type:{name:"ReactNode"}},dataSource:{defaultValue:null,description:"Array of data source items\n\nAlternative way of passing data to photoswipe (not via Item components)",name:"dataSource",required:!1,type:{name:"DataSource"}},options:{defaultValue:null,description:"PhotoSwipe options\n\nhttps://photoswipe.com/options/",name:"options",required:!1,type:{name:"Partial<PreparedPhotoSwipeOptions>"}},plugins:{defaultValue:null,description:"Function for registering PhotoSwipe plugins\n\nYou should pass `photoswipeLightbox` to each plugin constructor",name:"plugins",required:!1,type:{name:"((photoswipeLightbox: PhotoSwipeLightboxStub) => void)"}},uiElements:{defaultValue:null,description:"Array of configuration objects for custom UI elements\n\nUse it for adding custom UI elements\n\nhttps://photoswipe.com/adding-ui-elements",name:"uiElements",required:!1,type:{name:"UIElementData[]"}},id:{defaultValue:null,description:"Gallery ID, for hash navigation",name:"id",required:!1,type:{name:"string | number"}},onBeforeOpen:{defaultValue:null,description:"Triggers before PhotoSwipe.init() call\n\nUse it for accessing PhotoSwipe API\n\nhttps://photoswipe.com/events/\nhttps://photoswipe.com/filters/\nhttps://photoswipe.com/methods/",name:"onBeforeOpen",required:!1,type:{name:"((photoswipe: PhotoSwipe) => void)"}},onOpen:{defaultValue:null,description:"Triggers after PhotoSwipe.init() call\n\nUse it for accessing PhotoSwipe API\n\nhttps://photoswipe.com/events/\nhttps://photoswipe.com/filters/\nhttps://photoswipe.com/methods/",name:"onOpen",required:!1,type:{name:"((photoswipe: PhotoSwipe) => void)"}},withCaption:{defaultValue:null,description:"Enables built-in caption display\n\nUse the `caption` prop of the Item component to control caption text\n\nhttps://photoswipe.com/caption/",name:"withCaption",required:!1,type:{name:"boolean"}},withDownloadButton:{defaultValue:null,description:"Adds UI control for downloading the original image of the current slide\n\nhttps://photoswipe.com/adding-ui-elements/#adding-download-button",name:"withDownloadButton",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/gallery.tsx#Gallery"]={docgenInfo:Gallery.__docgenInfo,name:"Gallery",path:"src/gallery.tsx#Gallery"})}catch(__react_docgen_typescript_loader_error){}const useGallery=()=>{const{open}=(0,react.useContext)(Context);return{open}};var item_rest=function(s,e){var t={};for(var p in s)Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0&&(t[p]=s[p]);if(null!=s&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(p=Object.getOwnPropertySymbols(s);i<p.length;i++)e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i])&&(t[p[i]]=s[p[i]])}return t};const Item=_a=>{var{children}=_a,restProps=item_rest(_a,["children"]);const ref=(0,react.useRef)(null),{remove,set,handleClick,isRefRegistered}=(0,react.useContext)(Context),refCallback=(0,react.useCallback)((node=>{ref.current=node,set(ref,restProps)}),[set,...Object.values(restProps)]),open=(0,react.useCallback)((event=>{if(!isRefRegistered(ref))throw new NoRefError;handleClick(ref,null,null,event)}),[handleClick,isRefRegistered]),childrenFnProps=(0,react.useMemo)((()=>({ref:refCallback,open})),[refCallback,open]);return(0,react.useEffect)((()=>()=>{null===ref.current&&remove(ref)}),[remove]),children(childrenFnProps)};Item.propTypes={children:prop_types_default().func.isRequired,original:prop_types_default().string,originalSrcset:prop_types_default().string,thumbnail:prop_types_default().string,width:prop_types_default().oneOfType([prop_types_default().number,prop_types_default().string]),height:prop_types_default().oneOfType([prop_types_default().number,prop_types_default().string]),alt:prop_types_default().string,caption:prop_types_default().string,content:prop_types_default().element,html:prop_types_default().string,id:prop_types_default().oneOfType([prop_types_default().number,prop_types_default().string]),cropped:prop_types_default().bool,sourceId:prop_types_default().number}}}]);