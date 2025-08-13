console.clear();

// Get non-httpOnly cookies currently set in the browser.
// httpOnly cookies are server-side only and can't be accessed via JS.
// They're not relevant here since tracking cookies need to be readable by the client.
// Ref: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies#security
var currentCookies = document.cookie.split(';').map(function(cookie) {
  return cookie.split('=')[0].trim();
});

// Deep copy of OneTrust group data
var allDomainGroups = JSON.parse(JSON.stringify(window.Optanon.GetDomainData().Groups));

// Build a lookup: cookie name → group ID and label
var cookiesToGroupMap = allDomainGroups.reduce(function(accu, curr) {
  for (var i = 0; i < curr.Cookies.length; i++) {
    accu[curr.Cookies[i].Name] = curr.CustomGroupId + ' ' + curr.GroupName;
  }
  return accu;
}, {});

var cookiesClassification = '';

// Match cookies to OneTrust group or mark as unclassified
for (var j = 0; j < currentCookies.length; j++) {
  var cookie = currentCookies[j];
  if (cookie in cookiesToGroupMap) {
    cookiesClassification += cookie + '\t' + cookiesToGroupMap[cookie] + '\n';
  } else {
    cookiesClassification += cookie + '\t unclassified \n';
  }
}

console.log(cookiesClassification);
