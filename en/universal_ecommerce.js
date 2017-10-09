// <![CDATA[
    if (window.EngagingNetworks){
// Standard Ecommerce Tracking for Engaging Networks
    var initialAmount = '{receipt_data~amount}';
    var prettyAmount = initialAmount.replace(/\$/g, '');
        
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
        'name': 'jQuery("input[name='ea.form.id']").val()',
        'sku': '{receipt_data~campaignId}',
        'category': '{receipt_data~type}',
        'price': 'prettyAmount',  
        'quantity': '1'
    });
    ga('ecommerce:send');
} // End window.EngagingNetworks
// ]]>
