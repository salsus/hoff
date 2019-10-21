#Install in GTM:

2 Javascript tags, 1 Universal Analytics tag, 3 triggers

1) Create tag: JS - Internal Promotions View URL Listener 
2) Create trigger: Internal Promotion Click - promo_name
3) Create tag: JS - Internal Promo Click URL Listener
4) Create two triggers: promotionClick and promotionView
5) Create tag: UA - Event - Promotion Helper


--------

##Tag name: JS - Internal Promotions View URL Listener

Tag Type: Custom HTML

Fring rules:
	Trigger on DOM Ready
	Exceptions: any staging or development environments

```
<script type="text/javascript">
(function () {
 "use strict";
 var internalPromotions = {
 promos: [],
 count: 0
 };
 var promo_name='promo_name';//change to your query parameter if needed
 var promo_id='promo_id'//change to your query parameter if needed
 var promo_creative='promo_creative';//change to your query parameter if needed
 var promo_position='promo_position';//change to your query parameter if needed

 function getParameterByName(name, url) {
 var regex = new RegExp("[?&]" + name.replace(/[\[\]]/ig, "\\$&") + "(=([^&#]*)|&|#|$)");
 var results = regex.exec(url);
 if (!results) return null;
 if (!results[2]) return null;
 return decodeURIComponent(results[2].replace(/\+/ig, " "));
 }

 Array.prototype.slice.call(document.getElementsByTagName("a")).forEach(function (element) {
 if (element.getAttribute("href") !== null && element.getAttribute("href") !== undefined) {
 if (element.getAttribute("href").match(new RegExp(promo_name, 'ig')) !== null || element.getAttribute("href").match(new RegExp(promo_id, 'ig')) !== null) {
 internalPromotions.promos[internalPromotions.count]={};
 if (element.getAttribute("href").match(new RegExp(promo_name, 'ig')) !== null){
 internalPromotions.promos[internalPromotions.count].name = getParameterByName(promo_name, element.getAttribute("href"));
 console.log(element.getAttribute("href").match(new RegExp(promo_name, 'ig')));
 }
 if (element.getAttribute("href").match(new RegExp(promo_id, 'ig')) !== null){
 internalPromotions.promos[internalPromotions.count].id=getParameterByName(promo_id, element.getAttribute("href"));
 }
 if (element.getAttribute("href").match(new RegExp(promo_position, 'ig')) !== null){
 internalPromotions.promos[internalPromotions.count].position=getParameterByName(promo_position, element.getAttribute("href"));
 }
 if (element.getAttribute("href").match(new RegExp(promo_creative, 'ig')) !== null){
 internalPromotions.promos[internalPromotions.count].creative=getParameterByName(promo_creative, element.getAttribute("href"));
 }
 internalPromotions.count+=1;
 }
 }
 });

 if (internalPromotions.count > 0) {
 dataLayer.push({
 'event': 'promotionView',
 'ecommerce': {
 'promoView': {
 'promotions': internalPromotions.promos
 }
 }
 });
 }

}());
</script>
```


--------



##Trigger Name: Internal Promotion Click - promo_name

Trigger Type: Click - Just Links

This trigger fires on
Click Element 	matches RegEx (ignore case) 	promo_name




--------




##Tag Name: JS - Internal Promo Click URL Listener

Tag Type: Custom HTML

Fring rules:
	Trigger on DOM Ready
	Exceptions: any CMS staging or development environments
	
```	
<script type="text/javascript">
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

  
 // console.log('start promo click tracking');
(function() {
 "use strict";
  
    console.log('element url :' + {{Click URL}});
  var promoURL = {{Click URL}};
  var promo_name = getParameterByName("promo_name", promoURL);
  var promo_creative = getParameterByName("promo_creative", promoURL); 
  var promo_position = getParameterByName("promo_position", promoURL); 
  var promoClickData = {};
 if ((promo_name !== undefined && promo_name.length > 0) || (promo_id !== undefined && promo_id.length > 0)) {
 
 if (promo_name !== undefined && promo_name.length > 0) {
 promoClickData.name = promo_name;
 }
// if (promo_id !== undefined && promo_id.length > 0) {
// promoClickData.id = promo_id;
// }
 if (promo_creative !== undefined && promo_creative.length > 0) {
 promoClickData.creative = promo_creative;
 }
 if (promo_position !== undefined && promo_position.length > 0) {
 promoClickData.position = promo_position;
 }
 dataLayer.push({
 'event': 'promotionClick',
 'ecommerce': {
 'promoClick': {
 'promotions': [promoClickData]
 }
 }
 });
 }

}());
</script>
```



--------



##Trigger Name: promotionClick

Trigger Type: Custom Event

Event Name: promotionClick



##Trigger Name: promotionView

Trigger Type: Custom Event

Event Name: promotionView



--------


##Tag Name: UA - Event - Promotion Helper

Tag Type: Google Analytics: Universal Analytics
Track Type: Event

Category: eCommerce helpder
Action:	{{Event}}

Non-Interaction Hit: True


Fring rules:
	Trigger on promotionClick and promotionView
	Exceptions: any staging or development environments
