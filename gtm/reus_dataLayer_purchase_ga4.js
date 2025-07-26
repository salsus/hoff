dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.

var giftAmount = parseFloat('[[S120:dc:giftAmount]]'.replace(/\$|,/g, ''));

var giftDuration = '[[S120:dc:recurringFrequencyLabel]]',
         giftAmount = parseFloat("[[S120:dc:giftAmount]]".replace("$", ""));
     //console.log("giftAmount ="+ giftAmount );
     if (giftDuration == '' || giftDuration === null || giftDuration === undefined) {
       giftDuration = 'One time';
     }
	 
[[U0:analyticsCategory=[[T6:[[?xx:x[[S334:s_src]]x::::[[S334:s_src]]]]]]]]  // maps source code to Category
[[U0:analyticsCategory2=[[T6:[[?xx:x[[S334:s_src]]x::::[[S334:s_src]]]]]]]]  // maps subsource code to Category2

dataLayer.push({
  event: "purchase",
  ecommerce: {
    transaction_id: "[[S120:dc:transactionID]]",
    value: giftAmount,
    tax: '', // tax - you don't really need this as a non-profit, amirite?
    shipping: '', // shipping - you probably don't need this either
    currency: "USD",
    items: [
    {
      item_id: "[[S120:dc:donFormId]]",  // donation form id (df_id=XXXX)
      item_name: "[[T6:[[S120:dc:donationFormName]]]] ([[T6:[[S120:dc:donFormId]]]]", // "Donation form name (form id)"
      affiliation: "[[T6:[[S120:dc:campaignName]]]] ([[T6:[[S120:dc:campaignId]]]])",  // "Donation Campaign Name (campaign id)"
      item_brand: "[[T6:[[S120:dc:campaignName]]]]",  
      item_category: "[[T6:[[S120:dc:donationFormName]]]]",
      item_category2: "[[S80:analyticsCategory]]", // s_src
      item_category3: "[[S80:analyticsCategory]]", // s_subsrc
      item_variant: giftDuration,  // donation frequency - one-time, monthly, etc.
      price: giftAmount,
      quantity: 1
    }]
  }
});
