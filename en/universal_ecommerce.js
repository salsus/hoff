// <![CDATA[
    if (window.EngagingNetworks){
// Standard Ecommerce Tracking for Engaging Networks
    ga('require', 'ecommerce');
    ga('ecommerce:addTransaction', {
        'id': '{receipt_data~txId}',
        'affiliation': 'Engaging Networks Donation Form',
        'revenue': '{receipt_data~amount}'.replace(/\$|\s/g, '')',
        'shipping': '',
        'tax': ''
    });
    ga('ecommerce:addItem', {
        'id': '{receipt_data~txId}',
        'name': 'jQuery("input[name='ea.form.id']").val()',
        'sku': '{receipt_data~other2}' === 'N' ? 'OneTime' : '{receipt_data~other2}' === 'Y' ? 'Recurring' : 'Other',
        'category': 'jQuery("input[name='ea.campaign.id ']").val()',
        'price': '{receipt_data~amount}'.replace(/\$|\s/g, '')',  
        'quantity': '1'
    });
    ga('ecommerce:send');
} // End window.EngagingNetworks
// ]]>
