if (window.EngagingNetworks){
//Standard Ecommerce Tracking for Google Analytics; Fire Transaction in GTM off of 'transactionComplete'

console.log(pageJson.pageName);
console.log(pageJson.pageNumber);
console.log(pageJson.trackingId);
console.log(pageJson.campaignId);

var initialAmount = '{receipt_data~amount}',
    prettyAmount = initialAmount.replace(/\$/g, ''),   
    donationFrequency = '{receipt_data~recurringFrequency}';
console.log('frequency' + '{receipt_data~recurringFrequency}');

var productVariant; 
if (donationFrequency) {productVariant = donationFrequency;} else {productVariant = "OneTime";}

  dataLayer.push({
      'transactionId': '{receipt_data~txId}',
      'transactionTotal': prettyAmount,
      'transactionAffiliation': pageJson.campaignId, 
      'transactionProducts': [{
          'sku': productVariant,
          'name': pageJson.pageName + " - " + pageJson.campaignPageId, 
          'price': prettyAmount,
          'quantity': 1
        }],
        'event': 'transactionComplete'
   });
 	}
