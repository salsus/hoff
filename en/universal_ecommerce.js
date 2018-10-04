// <![CDATA[
    if (window.EngagingNetworks){
// Standard Ecommerce Tracking for Engaging Networks
    var initialAmount = '{receipt_data~amount}',
        prettyAmount = initialAmount.replace(/\$/g, ''),
        formName = jQuery("input[name='ea.form.id']").val();
        
    ga('require', 'ecommerce');
    ga('ecommerce:addTransaction', {
        'id': '{receipt_data~txId}',
        'affiliation': 'Engaging Networks Donation Form',
        'revenue': 'prettyAmount',
        'shipping': '',
        'tax': ''
    });
    ga('ecommerce:addItem', {
        'id': '{receipt_data~txId}',
        'name': formName,
        'sku': '{receipt_data~campaignId}',
        'category': '{receipt_data~type}',
        'price': 'prettyAmount',  
        'quantity': '1'
    });
    ga('ecommerce:send');
} // End window.EngagingNetworks
// ]]>
