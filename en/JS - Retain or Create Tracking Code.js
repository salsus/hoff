//Auto generated source codes
  
  var d = new Date();
    var fullYear = d.getFullYear();
    var fullYear = fullYear.toString();
    var twoDigitYear = fullYear.substring(2);  // source code by calendar year
    var month; 
switch (new Date().getMonth()) {
    case 0:
        month = "A";
        break;
    case 1:
        month = "B";
        break;
    case 2:
        month = "C";
        break;
    case 3:
        month = "D";
        break;
    case 4:
        month = "E";
        break;
    case 5:
        month = "F";
        break;
    case 6:
        month = "G";
        break;
    case 7:
        month = "H";
        break;
    case 8:
        month = "I";
        break;
    case 9:
        month = "J";
        break;
    case 10:
        month = "K";
        break;
    case 11:
        month = "L";
        break;
    default: 
    	month = "X";
}

 
//dynamic source codes, enable after Jan 1, 2018
var organicSearchCode = twoDigitYear + "K" +"P" + month + "PEAXX";  // change contents for other source code structures
var directSourceCode = twoDigitYear + "Z" +"P" + month + "PEAXX";
var referrerSourceCode = twoDigitYear + "O" +"P" + month + "PEAXX";

 var domain;   
var documentReferrer = document.referrer;
function getHostName(url) {
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2];
    }
    else {
        return null;
    }
}  
function getDomain(url) {
    var hostName = getHostName(url);
    var domain = hostName;
    
    if (hostName != null) {
        var parts = hostName.split('.').reverse();
        
        if (parts != null && parts.length > 1) {
            domain = parts[1] + '.' + parts[0];
                
            if (hostName.toLowerCase().indexOf('.co.uk') != -1 && parts.length > 2) {
              domain = parts[2] + '.' + domain;
            }
        }
    }
    //console.log('domain: ' + domain);
    return domain;
}  
  
  
  (function($){
    // Load variable values from GTM
    var CRMDomains = '{{CRMDomain}}';  // constant GTM variable with hostname of eCRM non-secure and secure; can be concat with ','
    var CMSDomain = '{{CMSDomain}}';  // constant GTM variable with hostname of content management system
    var bfrSource = '{{bfrSource}}';  // constant GTM variable indicating the parameter name for tracking code use, en = ea.tracking.id also set ito Cookie named "ea.tracking.id"
    var Cookie =  function(name,value,expiration,path,domain){
      if(!name.trim()){
        return false;
      }
      // If only name was provided, get the requested cookie
      if(typeof value === "undefined"){
        var cookieList = document.cookie.split(";"),
        cookieItem;
        for(var i = 0; i < cookieList.length; ++i){
          cookieItem = cookieList[i].split("=");
          if(cookieItem[0].trim() == name.trim()){
            return cookieItem[1].trim();
          }
        }
        // If no matching cookie was found, return false
        return false;
      }
      /**
      * Set default values
      */
      value = value || "";
      path = path || "/";
      if(typeof domain === 'undefined'){
        // Set default domain to domain unless on a subdomain, then set to wildcard subdomain
        if(isIPAddress(location.host)){
          domain = location.host;
        }
        else if(location.host.split(".").length === 1){
          // Currently not on a subdomain
          domain = location.host;
        }
        else{
          // Set to all subdomains
          var domainParts = location.host.split('.');
          domainParts.shift();
          domain = '.'+domainParts.join('.');
        }
      }
      // Set cookie value
      document.cookie = name.trim() + "=" + value.trim() + "; path=" + path + "; domain=" + domain;
      // Verify it was set, if not it was not a subdomain
      if(Cookie(name) != value){
        document.cookie = name.trim() + "=" + value.trim() + "; path=" + path + "; domain=." + location.host;
      }
    };
    var Param = function(name){
      if(!name.trim()){
        return false;
      }
      // Get parameter matching the provided name
      var paramsString = window.location.search,
      paramsList,
      paramsItem;
      // Remove question mark from beginning of string
      if(paramsString.indexOf("?") === 0){
        paramsString = paramsString.substr(1);
      }
      paramsList = paramsString.split("&");
      for(var i = 0; i < paramsList.length; ++i){
        paramsItem = paramsList[i].split("=");
        if(paramsItem[0].trim() == name.trim()){
          return paramsItem[1].trim();
        }
      }
      // If no match was found return false
      return false;
    };
    /**
    *  Define a trim method to the string prototype if browser doesn't already have one
    */
    if(typeof String.prototype.trim === "undefined"){
    String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/gm,'');
    };
    }
    /**
    *  Define a method to check if a string is an IP address
    */
    var isIPAddress = function(ipaddress){
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)){
    return (true);
    }
    return (false);
    };
    /**
    *  Provide a global method for other JavaScript to provide source data to AJAX submissions
    */
    var BFRSource = {
      get : function(){
        return cookieValue;
      }
    };
    window.BFRSource = BFRSource;
    /**
    * Start runtime logic
    */
    // STEP 1 -- If URL parameter bfrSource is set, apply it to the cookie
    var URLSource = Param(bfrSource);
    if(URLSource){
      Cookie(bfrSource,URLSource);
    }
    // STEP 2 -- If at this point there is no value in the cookie, generate one
    var cookieValue = Cookie(bfrSource),
    documentReferrer = document.referrer;
    console.log('referrer' + documentReferrer); 
    // DEBUG: Apply test referrer value
    // documentReferrer = "https://www.reddit.com/r/askscience/comments/3yjg5x/with_advances_in_many_fields_of_medicine/";
    if(!cookieValue){
      // Create array of organic search referrers
      var organicSearchReferrers = [
      "google.com",
      "yahoo.com",
      "msn.com",
      "bing.com"      
      ];
      // If document.referrer is null, set source to "direct"
      if(!documentReferrer){
        Cookie(bfrSource,directSourceCode);
      }
      else{
        console.log('check referrer');
        var referrer = document.createElement("a");
        var domainReferrer = getDomain(documentReferrer);
        //console.log('referrer domain: ' + domainReferrer);
        //console.log('search: '  + organicSearchReferrers);
        if(organicSearchReferrers.indexOf(domainReferrer) > -1){
          // The referrer domain matches one of the search engine domains. Mark as organic search
          //console.log('matches search engine');
          Cookie(bfrSource, organicSearchCode);
        }
        else{
          // If this point is reached, simply use the document.referrer domain as the source value
          //console.log('does not match search engine');
          Cookie(bfrSource, referrerSourceCode);
        }
      }
      cookieValue = Cookie(bfrSource);
    }
    // STEP 3: CRM & CMS are on different domains, provide logic to append source to links between them
    // Bind onto all link click events
    $(function(){
      $("body").on('click',"a",function(e){
        var $a = $(this),
        href = $a.attr('href');
        var CRMParsedDomains = CRMDomains.split(",");
        console.log($a[0].hostname, window.location.host, href, CMSDomain, CRMParsedDomains, bfrSource, cookieValue);
        // Ignore this link if the bfrSource value is already in the link
        if(href.indexOf(bfrSource) > -1){
          return;
        }
       // console.log(window.location.host === CMSDomain);
       // console.log(CRMParsedDomains.indexOf($a[0].hostname));
        // If on the CMSDomain or CRMDomain and this link goes to the alternate, append the source value to the URL
        if((window.location.host === CMSDomain && CRMParsedDomains.indexOf($a[0].hostname) > -1) || (CRMParsedDomains.indexOf(window.location.host) > -1 && $a[0].hostname === CMSDomain)){
          href += href.indexOf("?") > -1 ? "&" : "?";
          href += bfrSource + "=" + cookieValue;
         // console.log(href);
          $a.attr('href',href);
          console.log($a.attr('href'));
        }
      });
    });
    window.BFREDDebug = function(){
      console.log(CRMDomains,CMSDomain,BFRSource); 
    }
    
  })(jQuery);
