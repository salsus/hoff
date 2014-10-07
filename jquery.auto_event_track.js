/*
# WWF auto-Event Tracking script
*Author:* Sara Hoffman, Noah Patterson
*Created:* 140721
*Version:* 1.0.4

##Autotracks
- File downloads
- Outbound links
- Mailto links
- Tel links
- Body Link Clicks (when body content is linked)
- Adds Social tracking to Mailto links
- Intention of Printing webpage
*only inventories #content a.href and ignores links with data-track-event attributes

##TO DO:
[X] Use Global WWF.Common Page_Type as Event Category
[X] Add Anchor Link event handling
[X] Add relative link event handling
[X] Add Primary vs Secondary Action via btn styles a.btn-primary or a.btn-simple
[X] Print Intent - Event track if the page was printed (what!)
[ ] FUTURE: Update to universal analytics.js or Google Tag Manager data-layer

##Project Notes:
modified from http://www.blastam.com/blog/index.php/2013/09/howto-track-downloads-links-universalanalytics/
http://www.blastam.com/blog/index.php/2013/03/how-to-track-downloads-in-google-analytics-v2/
Print event tracking: http://www.blastam.com/blog/index.php/2013/07/tracking-print-page-action-google-analytics/
*/
!(function($) {
gaAddLinkClickEvents = function(){
    var filetypes = /\.(zip|exe|dmg|pdf|doc.*|xls.*|ppt.*|mp3|txt|rar|wma|mov|avi|wmv|flv|wav)$/i;
    var baseHref = '';
    if ($('base').attr('href') !== undefined) {
        baseHref = $('base').attr('href');
    }
    var hrefRedirect = '';
    var social = '';

    var buildGAAttributes =  function (optionsHash) {
        var elEv = optionsHash.elEv;
        elEv.value = 0;
        elEv.category = window.WWF.vars.page_type;
        elEv.action = optionsHash.action;
        elEv.label = optionsHash.label;
        elEv.loc = optionsHash.loc !== undefined ? optionsHash.loc : this.href;
        elEv.non_i = optionsHash.non_i !== undefined ? optionsHash.non_i : false;
    };

    var AddEventActionLink = function (elEv, href, isThisDomain, t, el) {
        if (href.match(t) || isThisDomain) {
            if (el.hasClass('primary')) {
             buildGAAttributes({
                elEv: elEv,
                action: 'Primary Action Click',
                label: el.text(),
                non_i: true
            });
        } else if (el.hasClass('btn') || el.hasClass('btn-simple')) {
            buildGAAttributes({
                elEv: elEv,
                action: 'Secondary Action Click',
                label: el.text(),
                non_i: true
            });
        } else {
            buildGAAttributes({
                elEv: elEv,
                action: 'Body Link Click',
                label: el.text(),
                non_i: true
            });
        }
        social = false;
        return true;
        }
    };

    var AddEventAnchorLink = function (elEv, href, el) {
        if (href.charAt(0) == "#") {
            buildGAAttributes({
                elEv: elEv,
                action: 'Anchor Link Click',
                label: el.text(),
                non_i: true
            });
            social = false;
            return true;
        }
    };

    var AddEventBodyLink = function (elEv, href, el) {
        if (!/^http:\/\/|^javascript:/.test(href) ) {
            buildGAAttributes({
                elEv: elEv,
                action: 'Body Link Click',
                label: el.text(),
                non_i: true
            });
            social = false;
            return true;
        }
    };

    var AddEventDownloadLink = function(elEv, href) {
          if (href.match(filetypes)) {
            var extension = (/[.]/.exec(href)) ? /[^.]+$/.exec(href) : undefined;
            buildGAAttributes({
                elEv: elEv,
                action: 'File Download - ' + extension[0],
                label: href.replace(/ /g, '-'),
                loc: baseHref + href
            });
            social = false;
            return true;
        }

    };

    var AddEventMailToLink = function(elEv, href) {
        if (href.match(/^mailto\:/i)) {
            buildGAAttributes({ elEv: elEv,
                                action: 'Mailto Click',
                                label: href.replace(/^mailto\:/i, '')
                            });
            social = true;
            return true;
        }

    };

    var AddEventOutboundLink = function (elEv, href, isThisDomain) {
        if (href.match(/^https?\:/i) && !isThisDomain) {
            buildGAAttributes({
                elEv: elEv,
                action: 'Outbound Link Click',
                label: href.replace(/^https?\:\/\//i, ''),
                non_i: true
            });
            social = false;
            return true;
        }
    };

    // Event Track the Printing
    var addEventPrinting = function() {
        try {
            (function () {
                var afterPrint = function () {
                    _gaq.push(['_trackEvent', 'Print Intent', document.location.pathname]); //for classic GA
                    //ga('send', 'event', 'Print Intent', document.location.pathname); //for Universal GA
                };
                if (window.matchMedia) {
                    var mediaQueryList = window.matchMedia('print');
                    mediaQueryList.addListener(function (mql) {
                        if (!mql.matches) afterPrint();
                    });
                }
                window.onafterprint = afterPrint;
            }());
        } catch (e) {}
    };

    var AddEventTelephoneLink = function (elEv, href) {
        if (href.match(/^tel\:/i)) {
            buildGAAttributes({
                elEv: elEv,
                action: 'Telephone Number Click',
                label: href.replace(/^tel\:/i, '')
            });
            social = false;
            return true;
        }
    };


    var fireGAEvent = function (elEv, track, el) {
        if (track) {
            var ret = true;

            if ((elEv.action === 'Outbound Link Click' || elEv.action.substring(0,15) === 'File Download -') && (el.attr('target') === undefined || el.attr('target').toLowerCase() !=='_blank')) {
                hrefRedirect = elEv.loc;

                _gaq.push(['_trackEvent', elEv.category, elEv.action, elEv.label.toLowerCase(), elEv.value, elEv.non_i]);


                if (social) {
                    _gaq.push(['_trackSocial', 'Email', 'Mailto']); // tracks href mailto: links as Social Tracking interaction, like Tell A Friend.
                }

                ret = false;
            } else {
                _gaq.push(['_trackEvent', elEv.category, elEv.action, elEv.label.toLowerCase(), elEv.value, elEv.non_i]);
            }

            return ret;
        }
    };


    var gaLinkClickListener = function() {
        $('#content').on('click', 'a', function (event) { // this just tracks stuff in the "body content" of our page templates
            var el = $(this),
                track = true;

            if (!el.attr('data-track-event')) // this is unique to WWFUS CMS because some
                {

                var href = (typeof (el.attr('href')) !== undefined) ? el.attr('href').split('?')[0] : '',
                isThisDomain = href.match(document.domain.split('.').slice(-2).join('.')),
                t = ["addyourdomain.com", "www.yourotherdomain.org", "asub.domainhere.org"], // add domains that are "yours" or in your "cross-domain" set up here.
                elEv = [];

                if (AddEventMailToLink(elEv,href)) {
                    fireGAEvent(elEv, track, el);
                    return true;
                }

                if (AddEventDownloadLink(elEv,href)) {
                    fireGAEvent(elEv, track, el);
                    return true;
                }

                if (AddEventOutboundLink(elEv,href, isThisDomain)) {
                    fireGAEvent(elEv, track, el);
                    return true;
                }

                if (AddEventActionLink(elEv,href, isThisDomain, t, el)) {
                    fireGAEvent(elEv, track, el);
                    return true;
                }

                if (AddEventAnchorLink(elEv,href,el)) {
                    fireGAEvent(elEv, track, el);
                    return true;
                }

                if (AddEventBodyLink(elEv,href,el)) {
                    fireGAEvent(elEv, track, el);
                    return true;
                }

                if (AddEventTelephoneLink(elEv,href)) {
                    fireGAEvent(elEv, track, el);
                    return true;
                }

                track = false;
                social = false;
            }
        });
    };

    gaHitCallbackHandler = function (){
        window.location.href = hrefRedirect;
    };

    var init = function() {
        gaLinkClickListener();
        addEventPrinting();
    };

    return{init:init};
}();
gaAddLinkClickEvents.init();
})($);
