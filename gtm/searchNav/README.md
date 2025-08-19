# Which Feature was used first: Navigation or Search

This configuration is for Google Tag Manager to send 1 GA4 event tag with feature_use_status.
The current implementation sends these parameters as event-scoped, not as user properties. 
Configured as an event-scoped parameter because a user property would only be applicable in BigQuery, AND in the GA4 interface, a user property is best represented as an audience. However, this interaction type could be first in one session but not in another session from the same user.

Uses sessionStorage.


## There are three custom dimensions for this.
- feature_menu
- feature_search
- feature_first_used

## GTM Tag names
- Feature Use Status (GA4 Event)
- HTML - Feature - Send Feature Usage Search or Nav
- HTML - Feature - Used Navigation and set first
- HTML - Feature - Used Search and set first

The "used" HTML tags are triggered off of existing triggers and blockers based on other tracking for these UX sections.
The "send" HTML and the GA4 event use the custom events that the HTML tags set up via the dataLayer.


![Screenshot of all components configured in GTM](https://github.com/salsus/archive/blob/master/GTMcode/searchNav/feature_allGTMelements.png)]



## QA

I used a custom Javascript variable to read the sessionStorage.

`function() {
// which feature did a user first - navigation or search
  var keyValue = sessionStorage.getItem('featureFirstUsed');
  return keyValue;
}`


# Reporting

What questions can we answer with this information?

+ Are users bypassing the main navigation?
+ Is search overused due to unclear IA?
+ Do users default to search on mobile vs. desktop?
+ Is search favored on mobile due to nav constraints?
+ Are specific nav paths underperforming?
+ Which search terms lead to quick exits?
+ Where are users struggling?
+ Should synonym mapping or autocomplete be improved?
+ Which content categories perform well in search vs navigation?
+ Where should new content or navigation updates focus?



## Possible changes or considerations

If you are low on custom dimensions, then consolidate cds to only use two: "feature_used" and "feature_used_first"

This could be extended to include search filters, pagination, sorting, or additional UI features. 

Requires extra work to capture the search term or the navigation item for deeper analysis. This information wouldn't be recommended for the "first_usage" interaction because it fires before a user has thoroughly searched or navigated. It could also be helpful in tandem with SERP clicks and navigation events.
