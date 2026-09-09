Custom Fields for Data Studio built for GTM4WP variables


Publish Date information

Blog Publish Date = publish_date
  Wordpress dataLayer pagePostDate

blog_publish_date_clean
  // set as Text field in Data Studio
TRIM(REGEXP_REPLACE(Blog Publish Date, '\\s+', ' '))

blog_publish_date_parsed 
  // set as a Date field in Data Studio
PARSE_DATE('%B %e, %Y', Blog Publish Date)


blog_publish_month_number
  // set as a Number 
EXTRACT(MONTH FROM blog_publish_date_parsed)

blog_publish_year
 // set as a Number
EXTRACT(YEAR FROM blog_publish_date_parsed)

blog_publish_yearmonth
 // set as Text



*********************************

 Category information

Blog Page Categories
  Wordpress dataLayer pageCategory (flatten array)
  
Blog Post Type
 Wordpress dataLayer pagePostType and pagePostType2

blog_categories_clean
 // set as Text
REGEXP_REPLACE(Blog Page Categories, ',\\s+', ',')

  
blog_category_expanded -- specific to one client
  // set as Text
CASE
  WHEN REGEXP_CONTAINS(blog_categories_clean, '(^|,)groupbenefits(,|$)')
    THEN 'groupbenefits'
  WHEN REGEXP_CONTAINS(blog_categories_clean, '(^|,)retirement-benefits(,|$)')
    THEN 'retirement-benefits'
  WHEN REGEXP_CONTAINS(blog_categories_clean, '(^|,)compliance(,|$)')
    THEN 'compliance'
  WHEN REGEXP_CONTAINS(blog_categories_clean, '(^|,)news(,|$)')
    THEN 'news'
  WHEN REGEXP_CONTAINS(blog_categories_clean, '(^|,)well-being(,|$)')
    THEN 'well-being'
  WHEN REGEXP_CONTAINS(blog_categories_clean, '(^|,)tax-advantaged-side-accounts(,|$)')
    THEN 'tax-advantaged-side-accounts'
  WHEN REGEXP_CONTAINS(blog_categories_clean, '(^|,)all-benefits(,|$)')
    THEN 'all-benefits'
  WHEN REGEXP_CONTAINS(blog_categories_clean, '(^|,)bbtc(,|$)')
    THEN 'bbtc'
  WHEN REGEXP_CONTAINS(blog_categories_clean, '(^|,)life-insurance(,|$)')
    THEN 'life-insurance'
  ELSE 'other'
END


blog_category1
 // set as Text
REGEXP_EXTRACT(blog_categories_clean, '^([^,]+)')


blog_category2
 // set as Text
REGEXP_EXTRACT(blog_categories_clean, '^[^,]+,([^,]+)')



**********************************

Corrected Blog Page Types
  // set as Text
CASE
  WHEN Blog Post Type = "frontpage" THEN "homepage"
  WHEN Blog Post Type = "search-results" THEN "search results"
  WHEN Blog Post Type = "page - single-page"
    OR Blog Post Type = "post - year-post"
    OR Blog Post Type = "post - month-post"
  THEN "wordpress"
  ELSE Blog Page Categories
END


