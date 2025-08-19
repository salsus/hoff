//JS variable for QA
function() {
// which feature did a user use first - navigation or search
  var keyValue = sessionStorage.getItem('featureFirstUsed');
  return keyValue;
}
