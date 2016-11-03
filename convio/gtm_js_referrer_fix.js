function() {
  //console.log('start referrer check');
  convioRef = CONVIO.referrer;
  //console.log(convioRef);
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  // first let's take document referrer
  var bfrReferrer = getParameterByName('referrer');
  if (!!bfrReferrer) {
    //Android Quick Search Box that is showing up in direct
    if (bfrReferrer.indexOf("googlequicksearch") != -1) {
      bfrReferrer = "www.google.com";
    }
   // console.log('query string parameter: ' + bfrReferrer);
    return bfrReferrer;
  }

  // just return document.referrer
  else {
    if (convioRef) {
      bfrReferrer = convioRef;
    } else {
      bfrReferrer = document.referrer;
    //  console.log('document referrer : ' + bfrReferrer);
      return bfrReferrer;
    }
  }
  return bfrReferrer;
}
