// <![CDATA[
if (window.EngagingNetworks) {
  console.log(pageJson.pageName);
  console.log(pageJson.pageNumber);
  console.log(pageJson.trackingId);
  console.log(pageJson.campaignId);

  // Standard Ecommerce Tracking for Engaging Networks
  var initialAmount = "{receipt_data~amount}",
    prettyAmount = initialAmount.replace(/\$/g, ''),
    donationFrequency = "{receipt_data~recurringFrequency}",
    formName = pageJson.pageName + " - " + pageJson.campaignPageId;
  console.log("frequency" + "{receipt_data~recurringFrequency}");

  var productVariant;
  if (donationFrequency) {
    productVariant = donationFrequency;
  } else {
    productVariant = "OneTime";
  }

  ga("require", "ecommerce");
  ga("ecommerce:addTransaction", {
    id: "{receipt_data~txId}",
    affiliation: "Engaging Networks Donation Form",
    revenue: "prettyAmount",
    shipping: "",
    tax: ""
  });
  ga("ecommerce:addItem", {
    id: "{receipt_data~txId}",
    name: formName, // pageName + id: Renew Form - 1001
    sku: pageJson.campaignPageId, // 1001
    category: productVariant, // donation frequency, one-time or monthly,quarterly, etc
    price: "prettyAmount",
    quantity: "1"
  });
  ga("ecommerce:send");
} // End window.EngagingNetworks
// ]]>
