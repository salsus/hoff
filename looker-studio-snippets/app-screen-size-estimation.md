# Screen Size Reporting: Mobile App Setup

App streams in GA4 do not report a screen resolution. App screen sizes are therefore estimated from the device model and placed into the same design system sizes as web. Web sizes are measured. App sizes are educated guesses.

## Design system sizes

| Resolution (width) | Name |
|---|---|
| Larger than 1920 | other large / ol |
| 1200-1920 | xlarge / xl |
| 992-1200 | large / lg |
| 768-992 | medium / md |
| 576-768 | small / sm |
| 370-576 | xsmall / xs |
| Smaller than 370 | other small / os |

Width decides the size. The lower number is included, so 576 is small, not xsmall.

## Physical vs logical resolution

- **Physical resolution**: how many actual pixels are packed into the screen (a manufacturing spec).
- **Logical resolution**: the simplified grid your design targets, so things stay a normal, readable size regardless of how many physical pixels there are. Example: a 1290x2796 screen at 3x scale is 430x932 logical.

You design against logical resolution. Physical resolution only affects how crisp things look, not how big they appear.

## How the fields build on each other

Legend for the GA4 side: Device, Device model and Mobile model are GA4 default dimensions. Everything else is a Data Studio custom field.

1. Device model and Mobile model were assessed to create a consistent **Device Text** field, similar to the Device field for Android.
2. Device Text was used to create **Device Grouping**.
3. Device Grouping was used to create **Screen Resolution Guess**.
   - From Screen Resolution Guess we have a value that matches the format of Screen Resolution for web.
4. Using Screen Resolution Guess and Screen Resolution, the final custom field, **Design System Sizing**, exists to match our design sizes.

Notes:

- Screen Resolution Guess is a logical resolution assigned to each group from published specs. Labels marked (guess) have no confirmed spec or have conflicting sources.
- Foldables use the closed (outer) screen where there is one.
- Unknown/Other means the device is not mapped yet. It is not an error.

## Updating for new devices

Filter the report to Unknown/Other and sort by active users to see which new devices need a home. For each one:

1. Add a rule to **Device Grouping**. Place specific patterns above generic ones. Use an existing label if the screen size matches, or create a new label if it does not.
2. Add a matching label line to **Screen Resolution Guess**.

Device Text and Design System Sizing never need to change. If a row comes back Unknown/Other after an edit, the label text in the two fields does not match.

## Custom field code

### 1. Device Text

```
CASE
  WHEN Platform = "iOS" THEN Mobile model
  WHEN Device IS NOT NULL AND Device != "" AND Device != "(not set)" THEN Device
  WHEN Mobile model IS NOT NULL AND Mobile model != "" AND Mobile model != "(not set)" THEN Mobile model
  ELSE Device model
END
```

### 2. Device Grouping

Update this first when new phones release.

```
CASE
  WHEN Platform="iOS" AND REGEXP_CONTAINS(Device model,"iPhone(13,2|13,3|14,5|14,2|14,7|17,5|18,5)$") THEN "iPhone 12 / 13 / 14 / 12 Pro / 13 Pro / 16e / 17e"
  WHEN Platform="iOS" AND REGEXP_CONTAINS(Device model,"iPhone(15,2|16,1|15,4|17,3)$") THEN "iPhone 14 Pro / 15 Pro / 15 / 16 (guess)"
  WHEN Platform="iOS" AND REGEXP_CONTAINS(Device model,"iPhone(15,3|16,2|17,4)$") THEN "iPhone 14 Pro Max / 15 Pro Max / 16 Plus (guess)"
  WHEN Platform="iOS" AND REGEXP_CONTAINS(Device model,"iPhone(13,4|14,3|14,8|15,5|18,4)$") THEN "iPhone 12 Pro Max / 13 Pro Max / 14 Plus / 15 Plus / Air"
  WHEN Platform="iOS" AND REGEXP_CONTAINS(Device model,"iPhone(17,1|18,1|18,3|19,2)$") THEN "iPhone 16 Pro / 17 Pro / 17 / 18 Pro"
  WHEN Platform="iOS" AND REGEXP_CONTAINS(Device model,"iPhone(17,2|18,2|19,3|19,7)$") THEN "iPhone 16 Pro Max / 17 Pro Max / 18 Pro Max"
  WHEN Platform="iOS" AND REGEXP_CONTAINS(Device Text,"iPhone Duo") THEN "iPhone Duo (guess)"
  WHEN Platform="iOS" AND REGEXP_CONTAINS(Device model,"iPhone(10,3|10,6|11,2|12,3|13,1|14,4)$") THEN "iPhone X / XS / 11 Pro / 12 mini / 13 mini"
  WHEN Platform="iOS" AND REGEXP_CONTAINS(Device model,"iPhone(11,8|12,1|11,4|11,6|12,5)$") THEN "iPhone XR / 11 / XS Max / 11 Pro Max"
  WHEN Platform="iOS" AND REGEXP_CONTAINS(Device model,"iPhone(7,2|8,1|9,1|9,3|10,1|10,4|12,8|14,6)$") THEN "iPhone 6 / 6S / 7 / 8 / SE 2020 / SE 2022"
  WHEN Platform="iOS" AND REGEXP_CONTAINS(Device model,"iPhone(7,1|8,2|9,2|9,4|10,2|10,5)$") THEN "iPhone 6+ / 6S+ / 7+ / 8+"
  WHEN Platform="iOS" AND REGEXP_CONTAINS(Device model,"iPhone(5,1|5,2|5,3|5,4|6,1|6,2|8,4)$") THEN "iPhone 5 / SE 2016 / 5C / 5S"
  WHEN Platform="iOS" AND REGEXP_CONTAINS(Device model,"iPad6,11|iPad6,12|iPad7,5|iPad7,6") THEN "iPad 5th/6th gen (9.7in)"
  WHEN Platform="iOS" AND REGEXP_CONTAINS(Device model,"iPad7,11|iPad7,12|iPad11,6|iPad11,7|iPad12,1|iPad12,2") THEN "iPad 7th/8th/9th gen (10.2in)"
  WHEN Platform="iOS" AND REGEXP_CONTAINS(Device model,"iPad13,18|iPad13,19|iPad15,7|iPad15,8|iPad13,1|iPad13,2|iPad13,16|iPad13,17|iPad15,3|iPad15,4") THEN "iPad 10th/11th gen, Air 11in (all gens)"
  WHEN Platform="iOS" AND REGEXP_CONTAINS(Device model,"iPad14,10|iPad14,11|iPad15,5|iPad15,6") THEN "iPad Air 13in (6th gen, M3)"
  WHEN Platform="iOS" AND REGEXP_CONTAINS(Device model,"iPad13,4|iPad13,5|iPad13,6|iPad13,7|iPad14,3|iPad14,4") THEN "iPad Pro 11in (3rd/4th gen)"
  WHEN Platform="iOS" AND REGEXP_CONTAINS(Device model,"iPad16,3|iPad16,4|iPad17,1|iPad17,2") THEN "iPad Pro 11in (M4/M5, guess)"
  WHEN Platform="iOS" AND REGEXP_CONTAINS(Device model,"iPad8,5|iPad8,6|iPad8,7|iPad8,8|iPad8,11|iPad8,12|iPad13,8|iPad13,9|iPad13,10|iPad13,11|iPad14,5|iPad14,6") THEN "iPad Pro 12.9in (3rd-6th gen)"
  WHEN Platform="iOS" AND REGEXP_CONTAINS(Device model,"iPad16,5|iPad16,6|iPad17,3|iPad17,4") THEN "iPad Pro 13in (M4/M5, guess)"
  WHEN Platform="iOS" AND REGEXP_CONTAINS(Device model,"iPad14,1|iPad14,2") THEN "iPad mini (6th gen)"
  WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"iPhone 17e|iPhone18,5") THEN "iPhone 12 / 13 / 14 / 12 Pro / 13 Pro / 16e / 17e"
  WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"Galaxy Tab") THEN "Galaxy Tab"
  WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"Galaxy J") THEN "Galaxy J-series"
  WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"Z Fold") THEN "Galaxy Z Fold"
  WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"Z Flip") THEN "Galaxy Z Flip"
  WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"S25 Ultra|S24 Ultra|S23 Ultra") THEN "Galaxy S25/24/23 Ultra"
  WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"S26 Ultra") THEN "Galaxy S26 Ultra"
  WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"S22 Ultra") THEN "Galaxy S22 Ultra"
  WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"S21 Ultra") THEN "Galaxy S21 Ultra"
  WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"S24\\+|S23\\+") THEN "Galaxy S24+/S23+"
  WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"S26\\+") THEN "Galaxy S26+ (guess)"
  WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"S21 5G") THEN "Galaxy S21 5G"
  WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"S25\\+|S22\\+|S24$|S23$|S22$|S25$") THEN "Galaxy S25/24/23/22, S22+"
  WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"FE") THEN "Galaxy S FE"
  WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"Note") THEN "Galaxy Note"
  WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"XCover|Xcover") THEN "Galaxy XCover"
  WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"Galaxy A") THEN "Galaxy A-series"
  WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"Galaxy F") THEN "Galaxy F-series"
  WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"Galaxy M") THEN "Galaxy M-series"
  WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"Galaxy") THEN "Other Galaxy"
  WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"Pixel.*Fold") THEN "Pixel Fold (guess)"
  WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"Pixel 8 Pro|Pixel 9 Pro XL|Pixel 10 Pro XL|Pixel 11 Pro XL") THEN "Pixel Pro XL"
  WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"Pixel 9 Pro|Pixel 10 Pro|Pixel 11 Pro") THEN "Pixel Pro"
  WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"Pixel 9$") THEN "Pixel 9"
  WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"Pixel 1[01]$") THEN "Pixel 10 / 11"
  WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"OnePlus8Pro") THEN "OnePlus 8 Pro"
  WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"Pixel|OnePlus|Nord|^(8T|9 5G|9 Pro 5G|10 Pro 5G|11 5G|11 Pro\\+|12R|13R|14C 5G|15 Pro|15R|Open)$") THEN "Pixel / OnePlus"
  WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"razr|Razr|motorola edge|Edge|moto g|Moto G|DuraForce|Duraforce|Velvet|^Y[0-9]") THEN "Motorola / other Android"
  ELSE "Unknown/Other"
END
```

### 3. Screen Resolution Guess

Update this second, after Device Grouping. The label text must match Device Grouping exactly.

```
CASE
  WHEN Device Grouping="iPhone 12 / 13 / 14 / 12 Pro / 13 Pro / 16e / 17e" THEN "390x844"
  WHEN Device Grouping="iPhone 14 Pro / 15 Pro / 15 / 16 (guess)" THEN "393x852"
  WHEN Device Grouping="iPhone 14 Pro Max / 15 Pro Max / 16 Plus (guess)" THEN "430x932"
  WHEN Device Grouping="iPhone 12 Pro Max / 13 Pro Max / 14 Plus / 15 Plus / Air" THEN "428x926"
  WHEN Device Grouping="iPhone 16 Pro / 17 Pro / 17 / 18 Pro" THEN "402x874"
  WHEN Device Grouping="iPhone 16 Pro Max / 17 Pro Max / 18 Pro Max" THEN "440x956"
  WHEN Device Grouping="iPhone Duo (guess)" THEN "466x678"
  WHEN Device Grouping="iPhone X / XS / 11 Pro / 12 mini / 13 mini" THEN "375x812"
  WHEN Device Grouping="iPhone XR / 11 / XS Max / 11 Pro Max" THEN "414x896"
  WHEN Device Grouping="iPhone 6 / 6S / 7 / 8 / SE 2020 / SE 2022" THEN "375x667"
  WHEN Device Grouping="iPhone 6+ / 6S+ / 7+ / 8+" THEN "414x736"
  WHEN Device Grouping="iPhone 5 / SE 2016 / 5C / 5S" THEN "320x568"
  WHEN Device Grouping="iPad 5th/6th gen (9.7in)" THEN "768x1024"
  WHEN Device Grouping="iPad 7th/8th/9th gen (10.2in)" THEN "810x1080"
  WHEN Device Grouping="iPad 10th/11th gen, Air 11in (all gens)" THEN "820x1180"
  WHEN Device Grouping="iPad Air 13in (6th gen, M3)" THEN "1024x1366"
  WHEN Device Grouping="iPad Pro 11in (3rd/4th gen)" THEN "834x1194"
  WHEN Device Grouping="iPad Pro 11in (M4/M5, guess)" THEN "834x1210"
  WHEN Device Grouping="iPad Pro 12.9in (3rd-6th gen)" THEN "1024x1366"
  WHEN Device Grouping="iPad Pro 13in (M4/M5, guess)" THEN "1032x1376"
  WHEN Device Grouping="iPad mini (6th gen)" THEN "744x1133"
  WHEN Device Grouping="Galaxy Tab" THEN "768x992"
  WHEN Device Grouping="Galaxy J-series" THEN "360x640"
  WHEN Device Grouping="Galaxy Z Fold" THEN "344x882"
  WHEN Device Grouping="Galaxy Z Flip" THEN "360x880"
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
  WHEN Device Grouping="Galaxy XCover" THEN "360x780"
  WHEN Device Grouping="Galaxy A-series" THEN "412x892"
  WHEN Device Grouping="Galaxy F-series" THEN "412x892"
  WHEN Device Grouping="Galaxy M-series" THEN "412x892"
  WHEN Device Grouping="Other Galaxy" THEN "360x780"
  WHEN Device Grouping="Pixel Fold (guess)" THEN "412x892"
  WHEN Device Grouping="Pixel Pro XL" THEN "448x997"
  WHEN Device Grouping="Pixel Pro" THEN "427x952"
  WHEN Device Grouping="Pixel 9" THEN "360x808"
  WHEN Device Grouping="Pixel 10 / 11" THEN "412x924"
  WHEN Device Grouping="OnePlus 8 Pro" THEN "412x906"
  WHEN Device Grouping="Pixel / OnePlus" THEN "412x915"
  WHEN Device Grouping="Motorola / other Android" THEN "360x800"
  ELSE NULL
END
```

### 4. Design System Sizing (web and app combined)

Never needs to change when new devices come out. Web uses the real Screen resolution. App uses Screen Resolution Guess.

```
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
```

If you want separate web-only and app-only versions, keep only the half of the CASE statement you need. Screen resolution is web; Screen Resolution Guess is app.
