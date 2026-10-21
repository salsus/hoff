# looker-studio-snippets

Calculated (custom) field formulas for Looker Studio / Data Studio, mostly on GA4 data. Each file is a formula to paste into a custom field. Files with more than one formula label each one by its field name on its own line.

## How to use

1. In the report's data source, add a custom field and paste the formula.
2. Use the field name written above the formula, so formulas that reference other fields keep working.
3. Replace anything in `xxxx` or `{{DOUBLE_BRACES}}` with your own values.
4. Make sure the GA4 fields a formula needs exist in your data source. They are listed below.

Syntax notes that have caused errors before:

- Backslashes in regex strings must be doubled (`\\+`, `\\(`, `\\d`).
- `REGEXP_MATCH` needs the whole value to match. `REGEXP_CONTAINS` matches part of a value. Most files here use `REGEXP_CONTAINS` for that reason.
- In a `CASE`, order matters. Put specific patterns above generic ones.

## Files

| File | What it creates | GA4 fields it needs |
|---|---|---|
| `calculated-field-metrics.sql` | Returning Users, % New Users | Active users, New users |
| `data-studio-date-time-calc-fields.sql` | Abbreviated Month, This Year / Last Year / Previous Year, Month Index, Month Year, a day and hour label (for example "Monday 3p"), and a sort key for that label | Month, Date, Hour |
| `extract-first-pagepath.sql` | First folder of the page path; "home" when there is none | Page path |
| `ga4-device-text-and-model-grouping-case.sql` | Device Text (one consistent device name for iOS and Android) and Device Grouping (devices that share a screen size) | Platform, Device, Device model, Mobile model |
| `ga4-referrer-normalization-case-statement.sql` | Cleaned referrer: removes uuid params, turns search URLs into "Search: term", rolls detail pages up to their parent section | Page referrer |
| `ga4-video-completion-rate-calc-fields.sql` | video_starts, video_completes, Video Completion Rate | Event name (needs `video_start` and `video_complete` events) |
| `page-depth.sql` | Number of folders in the page path | Page path |
| `time-on-page.sql` | Engagement time per view | User engagement, Views |
| `url-normalization-trailing-slash.sql` | Adds a trailing slash to a page path | Any page path field (swap in for `{{PAGE_PATH_FIELD}}`) |
| `viewport-breakpoint-bucketing-case.sql` | Design system size buckets for web, app, and web plus app, and Screen Resolution Guess for apps | Screen resolution (web), Device Grouping (app) |
| `wordpress_metadata_gtm4wp.sql` | Blog publish date, category and page type fields built from GTM4WP dataLayer variables | The GTM4WP variables, set up as custom dimensions |
| `app-screen-size-estimation.md` | Full write-up of the app screen size setup, with all four custom fields and the steps for adding new devices | Same as the device and viewport files |

## Notes by file

**Device and screen size files.** App streams do not report screen resolution, so app screen sizes are guesses built from device model. The fields chain together: Device Text, then Device Grouping, then Screen Resolution Guess, then Design System Sizing. `app-screen-size-estimation.md` is the maintained version and explains how to add new phones. The device and viewport `.sql` files hold the same formulas, so update all three together.

**Referrer normalization.** The domains and paths are replaced with `xxxx` placeholders. Substitute your own domain and the detail page paths you want to roll up.

**Dates and times.** `WEEKDAY(Date)` returns 0 for Sunday, which is what the day label and sort key assume.

**WordPress metadata.** The `blog_category_expanded` field is specific to one client's categories. Rewrite the category list before reusing it.
