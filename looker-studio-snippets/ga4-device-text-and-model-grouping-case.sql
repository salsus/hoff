Device Text
CASE
 WHEN Platform = "iOS" THEN Mobile model
 WHEN Device IS NOT NULL AND Device != "" AND Device != "(not set)" THEN Device
 WHEN Mobile model IS NOT NULL AND Mobile model != "" AND Mobile model != "(not set)" THEN Mobile model
 ELSE Device model
END



Device Grouping
CASE
 WHEN Platform="iOS" AND REGEXP_CONTAINS(Device model,"iPhone(13,2|13,3|14,5|14,2|14,7|17,5|18,5)$") THEN "iPhone 12 / 13 / 14 / 12 Pro / 13 Pro / 16e / 17e"
 WHEN Platform="iOS" AND REGEXP_CONTAINS(Device model,"iPhone(15,2|16,1|15,4|17,3)$") THEN "iPhone 14 Pro / 15 Pro / 15 / 16 (guess)"
 WHEN Platform="iOS" AND REGEXP_CONTAINS(Device model,"iPhone(15,3|16,2|17,4)$") THEN "iPhone 14 Pro Max / 15 Pro Max / 16 Plus (guess)"
 WHEN Platform="iOS" AND REGEXP_CONTAINS(Device model,"iPhone(13,4|14,3|14,8|15,5|18,4)$") THEN "iPhone 12 Pro Max / 13 Pro Max / 14 Plus / 15 Plus / Air"
 WHEN Platform="iOS" AND REGEXP_CONTAINS(Device model,"iPhone(17,1|18,1|18,3)$") THEN "iPhone 16 Pro / 17 Pro / 17"
 WHEN Platform="iOS" AND REGEXP_CONTAINS(Device model,"iPhone(17,2|18,2)$") THEN "iPhone 16 Pro Max / 17 Pro Max"
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
 WHEN Platform="iOS" AND REGEXP_CONTAINS(Device Text,"iPhone 17e|iPhone18,5") THEN "iPhone 12 / 13 / 14 / 12 Pro / 13 Pro / 16e / 17e"
 WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"Galaxy Tab") THEN "Galaxy Tab"
 WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"Galaxy J") THEN "Galaxy J-series"
 WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"S25 Ultra|S24 Ultra|S23 Ultra") THEN "Galaxy S25/24/23 Ultra"
 WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"S26 Ultra") THEN "Galaxy S26 Ultra"
 WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"S22 Ultra") THEN "Galaxy S22 Ultra"
 WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"S21 Ultra") THEN "Galaxy S21 Ultra"
 WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"S24\\+|S23\\+") THEN "Galaxy S24+/S23+"
 WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"S26\\+") THEN "Galaxy S26+ (guess)"
 WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"S21 5G") THEN "Galaxy S21 5G"
 WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"S25\\+|S24$|S23$|S22$|S25$") THEN "Galaxy S25/24/23/22, S22+"
 WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"FE") THEN "Galaxy S FE"
 WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"Note") THEN "Galaxy Note"
 WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"Z Fold") THEN "Galaxy Z Fold"
 WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"Z Flip") THEN "Galaxy Z Flip"
 WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"XCover|Xcover") THEN "Galaxy XCover"
 WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"Galaxy A") THEN "Galaxy A-series"
 WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"Galaxy F") THEN "Galaxy F-series"
 WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"Galaxy M") THEN "Galaxy M-series"
 WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"Galaxy") THEN "Other Galaxy"
 WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"Pixel 8 Pro|Pixel 9 Pro XL|Pixel 10 Pro XL") THEN "Pixel Pro XL"
 WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"Pixel 9 Pro|Pixel 10 Pro") THEN "Pixel Pro"
 WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"Pixel 9$") THEN "Pixel 9"
 WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"Pixel 10$") THEN "Pixel 10"
 WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"OnePlus8Pro") THEN "OnePlus 8 Pro"
 WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"Pixel|OnePlus|Nord|^(8T|9 5G|9 Pro 5G|10 Pro 5G|11 5G|11 Pro\\+|12R|13R|14C 5G|15 Pro|15R|Open)$") THEN "Pixel / OnePlus"
 WHEN Platform="Android" AND REGEXP_CONTAINS(Device Text,"razr|Razr|motorola edge|Edge|moto g|Moto G|DuraForce|Duraforce|Velvet|^Y[0-9]") THEN "Motorola / other Android"
 ELSE "Unknown/Other"
END
