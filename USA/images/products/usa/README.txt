Gift card artwork (prototype)
=============================
Every Gift Card is NOMINAL: one image per brand and value, named <brand>-<value>.svg
(for example amazon-20.svg is the "Amazon $20" card). 72 files in total.

Real brands (12): the official logo on a coloured card. Logos were downloaded from Wikimedia
Commons (public domain "simple logo" pages, flagged "trademarked"); the originals are kept in
_logos/. Brand names and logos remain trademarks of their owners; confirm brand usage with RIA /
the gift card provider before any public release.

Sample brands (10): Glow Beauty, Hope Foundation, Family Fun Park, Urban Style, Gift Box,
Prepaid Card, Sport Zone, Sky Travel, Game Zone and Home Style. They have NO real logo: the card
shows the name as text. They exist only so every category has at least one card in the demo.

Source of the real logos (https://commons.wikimedia.org/wiki/File:<name>):
amazon      Amazon_logo.svg
walmart     Walmart_logo_(2008).svg        (2008 logo, not the current one)
target      Target_Corporation_logo_(vector).svg
starbucks   Starbucks-wordmark-green.svg   (wordmark only)
apple       Apple_logo_black.svg
googleplay  Google_Play_2022_logo.svg
netflix     Netflix_2015_logo.svg
uber        Uber_Eats_2020_logo.svg
doordash    DoorDash_Logo.svg
homedepot   The_Home_Depot_logo.svg
bestbuy     Best_Buy_logo_2018.svg
spotify     Spotify_logo_with_text.svg

Changing brands, values or artwork
----------------------------------
1. Edit js/catalog.js: brands, categories and the list of values (denoms) of each brand.
2. Regenerate the images (needs Node.js), from the USA folder:   node tools/make-cards.js
3. To use the provider's official artwork instead, overwrite <brand>-<value>.svg with any SVG
   (aspect ratio about 3:2), or point img() in js/proto.js at PNG/JPG files.
