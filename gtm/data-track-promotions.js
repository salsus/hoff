(function(window) {
define([
    'jquery',
    ], function ($) {
    "use strict";

    return {
        trackPromotion: function(options) {
            if (options.enabled) {
                $(document).ready(function() {
                    /**  Track the promotion clicks   */
                    $('[data-track-promo-id]').click(function() {
                        var promoId = $(this).attr('data-track-promo-id'),
                            promoName = $(this).attr('data-track-promo-name'),
                            promoCreative = $(this).attr('data-track-promo-creative'),
                            promoPosition = $(this).attr('data-track-promo-position');

                        dataLayer.push({
                            'event': 'promotionClick',
                            'ecommerce': {
                                'promoClick': {
                                    'promotions': [
                                        {
                                            'id': promoId,
                                            'name': promoName,
                                            'creative': promoCreative,
                                            'position': promoPosition
                                        }]
                                }
                            }
                        });
                    });
                    /** Track the promotion views */
                    var promotionViews = [];
                    $('[data-track-promo-id]').each(function() {
                        var promoId = $(this).attr('data-track-promo-id'),
                            promoName = $(this).attr('data-track-promo-name'),
                            promoCreative = $(this).attr('data-track-promo-creative'),
                            promoPosition = $(this).attr('data-track-promo-position');

                        promotionViews.push({
                            'id': promoId,
                            'name': promoName,
                            'creative': promoCreative,
                            'position': promoPosition
                        });
                    });
                    if (promotionViews.length) {
                        dataLayer.push({
                            'ecommerce': {
                                'promoView': {
                                    'promotions': promotionViews
                                }
                            }
                        });
                    }
                });
            }
        }
    };

});
})(window);
