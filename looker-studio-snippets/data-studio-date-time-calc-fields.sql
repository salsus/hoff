
Abbreviated Month
CASE Month
  WHEN 1 THEN "Jan"
  WHEN 2 THEN "Feb"
  WHEN 3 THEN "Mar"
  WHEN 4 THEN "Apr"
  WHEN 5 THEN "May"
  WHEN 6 THEN "Jun"
  WHEN 7 THEN "Jul"
  WHEN 8 THEN "Aug"
  WHEN 9 THEN "Sep"
  WHEN 10 THEN "Oct"
  WHEN 11 THEN "Nov"
  WHEN 12 THEN "Dec"
END


Last Year
YEAR(CURRENT_DATE()) - 1

Previous Year
YEAR(CURRENT_DATE()) - 2

This Year
YEAR(CURRENT_DATE())

  
  
  
Month Index
EXTRACT(MONTH FROM Date)


Month Year
FORMAT_DATETIME("%b %Y", Date)


Time - Day Hour Label
CONCAT(
  CASE
    WHEN WEEKDAY(Date) = 0 THEN "Sunday"
    WHEN WEEKDAY(Date) = 1 THEN "Monday"
    WHEN WEEKDAY(Date) = 2 THEN "Tuesday"
    WHEN WEEKDAY(Date) = 3 THEN "Wednesday"
    WHEN WEEKDAY(Date) = 4 THEN "Thursday"
    WHEN WEEKDAY(Date) = 5 THEN "Friday"
    WHEN WEEKDAY(Date) = 6 THEN "Saturday"
  END,
  " ",
  CASE
    WHEN Hour = 0 THEN "12a"
    WHEN Hour < 12 THEN CONCAT(CAST(Hour AS TEXT), "a")
    WHEN Hour = 12 THEN "12p"
    ELSE CONCAT(CAST(Hour - 12 AS TEXT), "p")
  END
)


Time - Sort Key
WEEKDAY(Date) * 100 + Hour
