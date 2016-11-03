function() {
  if (typeof CONVIO !== 'undefined' && CONVIO.referrer.length > 0) {
    thisRef = CONVIO.referrer;
  }
  return thisRef
}
