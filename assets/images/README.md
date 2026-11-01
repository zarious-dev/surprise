# assets/images — Replace these files with your own GIFs or stickers

All images fall back to an emoji if the file is missing, so the site
works even before you add your own files.

## Where to get GIFs / stickers
- https://giphy.com   → search keyword → Download → GIF
- https://tenor.com   → same
- https://sticker.ly  → sticker packs (PNG/WebP)

## File list

| Filename            | Used for                          | Suggested search keyword     |
|---------------------|-----------------------------------|------------------------------|
| cake.gif            | Cake section (before blown)       | "birthday cake animated"     |
| cake-blown.gif      | Cake section (after blown)        | "birthday slice" / "cake cut"|
| cat1.gif            | Celebration row cat 1             | "cat party" / "cat celebrate"|
| cat2.gif            | Celebration row cat 2             | "dancing cat"                |
| cat3.gif            | Celebration row cat 3             | "cat confetti"               |
| gift1.gif           | Gift A card                       | "gift box bounce"            |
| gift2.gif           | Gift B card                       | "present sparkle"            |
| gift3.gif           | Gift C card                       | "ribbon bow"                 |
| cat-surprise.gif    | Cat section page                  | "cute cat hug" / "cat love"  |
| card1.gif           | Memory game pair 1                | any cute sticker             |
| card2.gif           | Memory game pair 2                | any cute sticker             |
| card3.gif           | Memory game pair 3                | any cute sticker             |
| card4.gif           | Memory game pair 4                | any cute sticker             |
| card5.gif           | Memory game pair 5                | any cute sticker             |
| rate1.gif           | Rating 1 modal                    | "sad cat"                    |
| rate2.gif           | Rating 2 modal                    | "crying cat"                 |
| rate3.gif           | Rating 3 modal                    | "happy cat"                  |
| rate4.gif           | Rating 4 modal                    | "cat love"                   |
| rate5.gif           | Rating 5 modal                    | "cat excited" / "cat party"  |

## To change a file
1. Download your GIF from giphy.com or tenor.com.
2. Rename it to match the filename in the table above.
3. Drop it into this folder (assets/images/).
4. Refresh the browser — done!

## To add more celebration cats
Open script.js and add more entries to ASSETS.celebrationCats:
  { src: "./assets/images/cat4.gif", fallback: "🐾" }
