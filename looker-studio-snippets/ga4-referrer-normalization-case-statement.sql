What it does: Cleans up the Page referrer for reporting, in priority order:

1. Strip uuid params off the referrer.
2. If it has a search param (s= or q=), extract and clean the search term, label it "Search: <term>".
3. Otherwise, if the path is a detail page with specific record IDs in it, collapse it to the parent section (drop the IDs) so all those detail pages roll up into one row instead of hundreds of unique URLs.
4. Otherwise, just return the cleaned referrer path.

  

CASE
  WHEN REGEXP_EXTRACT(REGEXP_REPLACE(REGEXP_REPLACE(Page referrer,"\\?uuid=[^&#]*",""),"&uuid=[^&#]*",""), "(?:[?&](?:s|q)=)([^&#]*)") IS NOT NULL
    THEN
      CONCAT(
        "Search: ",
        REGEXP_REPLACE(
          REGEXP_REPLACE(
            REGEXP_REPLACE(
              REGEXP_REPLACE(
                REGEXP_REPLACE(
                  REGEXP_REPLACE(
                    REGEXP_REPLACE(
                      LOWER(
                        REGEXP_EXTRACT(REGEXP_REPLACE(REGEXP_REPLACE(Page referrer,"\\?uuid=[^&#]*",""),"&uuid=[^&#]*",""), "(?:[?&](?:s|q)=)([^&#]*)")
                      ),
                      "\\+",
                      " "
                    ),
                    "%20",
                    " "
                  ),
                  "%26",
                  "&"
                ),
                "%28",
                "("
              ),
              "%29",
              ")"
            ),
            "%e2%80%99",
            "'"
          ),
          "401\\s*\\(?k\\)?",
          "401k"
        )
      )
  WHEN REGEXP_MATCH(
    REGEXP_REPLACE(
      REGEXP_REPLACE(REGEXP_REPLACE(Page referrer,"\\?uuid=[^&#]*",""),"&uuid=[^&#]*",""),
      "^https://(?:content\\.)xxxxxxxxx\\.xxxxxxxx\\.com",
      ""
    ),
    "^/administration/xxxxxxx/xxxxxxxx/xxxxxxx/[^/?#]+/[^/?#]+.*"
  )
    THEN "/administration/xxxxxxx/xxxxxxxx/xxxxxxx/"
  WHEN REGEXP_MATCH(
    REGEXP_REPLACE(
      REGEXP_REPLACE(REGEXP_REPLACE(Page referrer,"\\?uuid=[^&#]*",""),"&uuid=[^&#]*",""),
      "^https://(?:content\\.)xxxxxxxxx\\.xxxxxxxxxxx\\.com",
      ""
    ),
    "^/administration/employee/details/retirement/[^/?#]+/[^/?#]+.*"
  )
    THEN "/administration/xxxxxxx/xxxxxxxx/xxxxx/"
  WHEN REGEXP_MATCH(
    REGEXP_REPLACE(
      REGEXP_REPLACE(REGEXP_REPLACE(Page referrer,"\\?uuid=[^&#]*",""),"&uuid=[^&#]*",""),
      "^https://(?:content\\.)?xxxxxxxxxxxx\\.xxxx\\.com",
      ""
    ),
    "^/administration/xxxxxx/xxxxxx/xxxxxxxxxx/[^/?#]+/[^/?#]+.*"
  )
    THEN "/administration/xxxxxx/xxxxxx/xxxxxxxxxx/"
  WHEN REGEXP_MATCH(
    REGEXP_REPLACE(
      REGEXP_REPLACE(REGEXP_REPLACE(Page referrer,"\\?uuid=[^&#]*",""),"&uuid=[^&#]*",""),
      "^https://(?:content\\.)?xxxxxxxx\\.xxxxxx\\.com",
      ""
    ),
    "^/administration/xxxxx/xxxxxx/[^/?#]+/[^/?#]+.*"
  )
    THEN "/administration/xxxxx/xxxxxx/"
  ELSE REGEXP_REPLACE(
    REGEXP_REPLACE(REGEXP_REPLACE(Page referrer,"\\?uuid=[^&#]*",""),"&uuid=[^&#]*",""),
    "^https://(?:content\\.)?xxxxxxx\\.xxxxxx\\.com",
    ""
  )
END
