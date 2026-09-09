Design System Sizes - Web
CASE
 WHEN Screen resolution = "(not set)" THEN "Unknown/Other"
 WHEN CAST(REGEXP_EXTRACT(Screen resolution,"^([0-9]+)x") AS NUMBER) < 370 THEN "Smaller than 370"
 WHEN CAST(REGEXP_EXTRACT(Screen resolution,"^([0-9]+)x") AS NUMBER) < 576 THEN "370-576 xsmall"
 WHEN CAST(REGEXP_EXTRACT(Screen resolution,"^([0-9]+)x") AS NUMBER) < 768 THEN "576-768 small"
 WHEN CAST(REGEXP_EXTRACT(Screen resolution,"^([0-9]+)x") AS NUMBER) < 992 THEN "768-992 medium"
 WHEN CAST(REGEXP_EXTRACT(Screen resolution,"^([0-9]+)x") AS NUMBER) < 1200 THEN "992-1200 large"
 WHEN CAST(REGEXP_EXTRACT(Screen resolution,"^([0-9]+)x") AS NUMBER) < 1920 THEN "1200-1920 xlarge"
 ELSE "Larger than 1920"
END


Design System Sizes - App
CASE
 WHEN Screen Resolution Guess IS NULL THEN "Unknown/Other"
 WHEN CAST(REGEXP_EXTRACT(Screen Resolution Guess,"^(\\d+)") AS NUMBER) < 370 THEN "Smaller than 370"
 WHEN CAST(REGEXP_EXTRACT(Screen Resolution Guess,"^(\\d+)") AS NUMBER) < 576 THEN "370-576 xsmall"
 WHEN CAST(REGEXP_EXTRACT(Screen Resolution Guess,"^(\\d+)") AS NUMBER) < 768 THEN "576-768 small"
 WHEN CAST(REGEXP_EXTRACT(Screen Resolution Guess,"^(\\d+)") AS NUMBER) < 992 THEN "768-992 medium"
 WHEN CAST(REGEXP_EXTRACT(Screen Resolution Guess,"^(\\d+)") AS NUMBER) < 1200 THEN "992-1200 large"
 WHEN CAST(REGEXP_EXTRACT(Screen Resolution Guess,"^(\\d+)") AS NUMBER) < 1920 THEN "1200-1920 xlarge"
 ELSE "Larger than 1920"
END




Design System Sizing - Web and App
CASE
 WHEN Screen resolution != "(not set)" AND CAST(REGEXP_EXTRACT(Screen resolution,"^([0-9]+)x") AS NUMBER) < 370 THEN "Smaller than 370"
 WHEN Screen resolution != "(not set)" AND CAST(REGEXP_EXTRACT(Screen resolution,"^([0-9]+)x") AS NUMBER) < 576 THEN "370-576 xsmall"
 WHEN Screen resolution != "(not set)" AND CAST(REGEXP_EXTRACT(Screen resolution,"^([0-9]+)x") AS NUMBER) < 768 THEN "576-768 small"
 WHEN Screen resolution != "(not set)" AND CAST(REGEXP_EXTRACT(Screen resolution,"^([0-9]+)x") AS NUMBER) < 992 THEN "768-992 medium"
 WHEN Screen resolution != "(not set)" AND CAST(REGEXP_EXTRACT(Screen resolution,"^([0-9]+)x") AS NUMBER) < 1200 THEN "992-1200 large"
 WHEN Screen resolution != "(not set)" AND CAST(REGEXP_EXTRACT(Screen resolution,"^([0-9]+)x") AS NUMBER) < 1920 THEN "1200-1920 xlarge"
 WHEN Screen resolution != "(not set)" THEN "Larger than 1920"
 WHEN Screen Resolution Guess IS NULL THEN "Unknown/Other"
 WHEN CAST(REGEXP_EXTRACT(Screen Resolution Guess,"^(\\d+)") AS NUMBER) < 370 THEN "Smaller than 370"
 WHEN CAST(REGEXP_EXTRACT(Screen Resolution Guess,"^(\\d+)") AS NUMBER) < 576 THEN "370-576 xsmall"
 WHEN CAST(REGEXP_EXTRACT(Screen Resolution Guess,"^(\\d+)") AS NUMBER) < 768 THEN "576-768 small"
 WHEN CAST(REGEXP_EXTRACT(Screen Resolution Guess,"^(\\d+)") AS NUMBER) < 992 THEN "768-992 medium"
 WHEN CAST(REGEXP_EXTRACT(Screen Resolution Guess,"^(\\d+)") AS NUMBER) < 1200 THEN "992-1200 large"
 WHEN CAST(REGEXP_EXTRACT(Screen Resolution Guess,"^(\\d+)") AS NUMBER) < 1920 THEN "1200-1920 xlarge"
 ELSE "Larger than 1920"
END




  Screen Resolution Guess

  CASE
 WHEN Device Grouping="iPhone 12 / 13 / 14 / 12 Pro / 13 Pro / 16e / 17e" THEN "390x844"
 WHEN Device Grouping="iPhone 14 Pro / 15 Pro / 15 / 16 (guess)" THEN "393x852"
 WHEN Device Grouping="iPhone 14 Pro Max / 15 Pro Max / 16 Plus (guess)" THEN "430x932"
 WHEN Device Grouping="iPhone 12 Pro Max / 13 Pro Max / 14 Plus / 15 Plus / Air" THEN "428x926"
 WHEN Device Grouping="iPhone 16 Pro / 17 Pro / 17" THEN "402x874"
 WHEN Device Grouping="iPhone 16 Pro Max / 17 Pro Max" THEN "440x956"
 WHEN Device Grouping="iPhone X / XS / 11 Pro / 12 mini / 13 mini" THEN "375x812"
 WHEN Device Grouping="iPhone XR / 11 / XS Max / 11 Pro Max" THEN "414x896"
 WHEN Device Grouping="iPhone 6 / 6S / 7 / 8 / SE 2020 / SE 2022" THEN "375x667"
 WHEN Device Grouping="iPhone 6+ / 6S+ / 7+ / 8+" THEN "414x736"
 WHEN Device Grouping="iPhone 5 / SE 2016 / 5C / 5S" THEN "320x568"
  WHEN Device Grouping="iPad 5th/6th gen (9.7in)" THEN "768x1024"
 WHEN Device Grouping="iPad 7th/8th/9th gen (10.2in)" THEN "810x1080"
 WHEN Device Grouping="iPad 10th/11th gen, Air 11in (all gens)" THEN "820x1180"
 WHEN Device Grouping="iPad Air 13in (6th gen, M3)" THEN "1366x1024"
 WHEN Device Grouping="iPad Pro 11in (3rd/4th gen)" THEN "834x1194"
 WHEN Device Grouping="iPad Pro 11in (M4/M5, guess)" THEN "834x1210"
 WHEN Device Grouping="iPad Pro 12.9in (3rd-6th gen)" THEN "1024x1366"
 WHEN Device Grouping="iPad Pro 13in (M4/M5, guess)" THEN "1376x1032"
 WHEN Device Grouping="iPad mini (6th gen)" THEN "744x1133"
 WHEN Device Grouping="Galaxy Tab" THEN "768x992"
 WHEN Device Grouping="Galaxy J-series" THEN "360x640"
 WHEN Device Grouping="Galaxy S25/24/23 Ultra" THEN "384x824"
 WHEN Device Grouping="Galaxy S26 Ultra" THEN "412x891"
 WHEN Device Grouping="Galaxy S22 Ultra" THEN "360x772"
 WHEN Device Grouping="Galaxy S21 Ultra" THEN "384x854"
 WHEN Device Grouping="Galaxy S24+/S23+" THEN "384x832"
 WHEN Device Grouping="Galaxy S26+ (guess)" THEN "412x891"
 WHEN Device Grouping="Galaxy S21 5G" THEN "360x800"
 WHEN Device Grouping="Galaxy S25/24/23/22, S22+" THEN "360x780"
 WHEN Device Grouping="Galaxy S FE" THEN "412x914"
 WHEN Device Grouping="Galaxy Note" THEN "384x824"
 WHEN Device Grouping="Galaxy Z Fold" THEN "344x882"
 WHEN Device Grouping="Galaxy Z Flip" THEN "360x880"
 WHEN Device Grouping="Galaxy XCover" THEN "360x780"
 WHEN Device Grouping="Galaxy A-series" THEN "412x892"
 WHEN Device Grouping="Galaxy F-series" THEN "412x892"
 WHEN Device Grouping="Galaxy M-series" THEN "412x892"
 WHEN Device Grouping="Other Galaxy" THEN "360x780"
 WHEN Device Grouping="Pixel Pro XL" THEN "448x997"
 WHEN Device Grouping="Pixel Pro" THEN "427x952"
 WHEN Device Grouping="Pixel 9" THEN "360x808"
 WHEN Device Grouping="Pixel 10" THEN "412x924"
 WHEN Device Grouping="OnePlus 8 Pro" THEN "412x906"
 WHEN Device Grouping="Pixel / OnePlus" THEN "412x915"
 WHEN Device Grouping="Motorola / other Android" THEN "360x800"
 ELSE NULL
END
