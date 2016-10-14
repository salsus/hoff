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

 
//Create the product string: 
for (i = 0; i < productCount; i++) {
 
productListing = "{'name': '"+prodlist[i].innerHTML+"','quantity': '"+quantlist[i].innerHTML+"','price':'"+ pricelist[i].innerHTML+"','variant': '"+variantlist[i].innerHTML+"','brand': 'AJOT','category': 'Download'}";
console.log("product is " + productListing);

  
ga('ec:addProduct', {
  'id': i ,
  'name': prodlist[i].innerHTML,
  'category': 'Download',
  'brand': 'AJOT',
  'variant': variantlist[i].innerHTML,
  'price': pricelist[i].innerHTML,
  'quantity': quantlist[i].innerHTML
}); 
  
if (i==0)
    productList += productListing;
else
    productList += "," + productListing;  

 }


//final formatting
  productList = "["+productList+"]";
console.log("full list is " + productList);
  
//update var name to variable name dl.gtmProd
dataLayer.push({'dl.gtmProd': productList});
  

  
  // Transaction level information is provided via an actionFieldObject.
ga('ec:setAction', 'purchase', {
  'id': orderID,
  'affiliation': 'AJOT',
  'revenue': totalRev,
  'tax': '0',
  'shipping': '0' 
});
  
  
ga("send", "event", "EC Purchase", orderID, "Manual EC");
  console.log("done sending event");
