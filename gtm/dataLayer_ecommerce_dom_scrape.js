var productCount = jQuery('ul.line').length;
var arrayCount=0;
var productListing;
var productList="";
  
dataLayer.push({'gtmCount': productCount});
     
  var orderID = jQuery("[id*='Content_lblOrderID']").text(); 
  var totalRev = jQuery("[id*='Content_lblSubTotal']").text(); 
  dataLayer.push({'orderID': orderID});
//dataLayer.push({'AJOT AMT': totalRev});

  
var productList="";
var prodData , quantData , priceData  , variantData ;
var prodlist , quantlist  , pricelist  , variantlist , productListing ;
   var productCount = jQuery('ul.line').length;
 
     variantData = jQuery("[id*='OrderSummary_aProduct']"); 
     quantData  = jQuery("[id*='lblQuantity']"); 
     priceData  = jQuery("[id*='lblPrice']");  
     prodData = jQuery("[id*='lblDetails']"); 
  
 //Make the arrays for each variable

var prodlist = jQuery.makeArray( prodData );
var quantlist = jQuery.makeArray( quantData );
var pricelist = jQuery.makeArray( priceData );
var variantlist = jQuery.makeArray( variantData );
var productFields = [];
  
//loop thru the items creating the objects: 
for (i = 0; i < productCount; i++) {
 
obj = {};
obj["name"] = prodlist[i].innerHTML;
obj["quantity"] = quantlist[i].innerHTML;
obj["price"] = pricelist[i].innerHTML;
obj["variant"] = variantlist[i].innerHTML;
obj["brand"] = "AJOT";
obj["category"] = "Download";
productFields.push(obj); 
//console.log("obj pushed");
// console.log(obj);
  
 //for troubleshooting: string view 
  productListing = "{'name': '"+prodlist[i].innerHTML+"','quantity': '"+quantlist[i].innerHTML+"','price':'"+ pricelist[i].innerHTML+"','variant': '"+variantlist[i].innerHTML+"','brand': 'AJOT','category': 'Download'}";
//console.log("product is " + productListing);
if (i==0)
    productList += productListing;
else
    productList += "," + productListing;  

 
 }


//for troubleshooting. final formatting and send to DL . this variable isnt needed anymore
productList = "["+productList+"]";
console.log("full list is " + productList);
dataLayer.push({'dl.gtmProd': productList});
//console.log(productFields);  
  
//push to datalayer. all ready to go.
  dataLayer.push({
'event' : 'purchase',
  'ecommerce': {
    'purchase': {
      'actionField': {
        'id': orderID,
        'affiliation': 'AJOT',
        'revenue': totalRev,
        'tax':'0.00',
        'shipping': '0.00'
      },
	'products': productFields
	}
	}
});
  
