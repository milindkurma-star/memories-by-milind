# Portfolio Upload Naming Convention

Welcome to your dynamic portfolio folder! Any images you upload directly to this directory (or to `src/assets/placeholders/`) will be automatically loaded into the website's portfolio gallery with all features (layouts, dynamic category filter tags, lightbox enlargements, etc.) pre-configured.

To control how each image looks and is described in the gallery, name the files using the following format:

```text
[Category]_[Title]_[Location]_[Camera].[extension]
```

Use **single underscores `_`** to separate each piece of information. You can use spaces inside each section!

### Naming Guide & Example

*   **Category**: Must match or start with one of the standard categories (case-insensitive):
    *   `portraits` or `portrait` -> **Portraits**
    *   `pets` or `pet` -> **Pets**
    *   `landscapes` or `landscape` or `sunset` or `mountain` -> **Landscapes**
    *   `lifestyle` or `friends` or `couple` -> **Lifestyle**
    *   `events` or `event` -> **Events**
    *   `bts` or `behind-the-scenes` -> **BTS**
*   **Title**: The display name for the photo (e.g. `Clover Playing`).
*   **Location**: Where the photo was taken (e.g. `Bellevue Downtown Park`).
*   **Camera**: The camera model (e.g. `Sony Alpha 6400`).

#### Example Full Name:
`Pets_Clover in the Park_Bellevue, WA_Sony Alpha 6400.jpg`

---

### Image-Driven Category Filters

The filter bar on the homepage is completely dynamic and **image-format driven**. 
*   Empty categories that have no uploaded images (e.g., if you don't have any Events or BTS images yet) are automatically hidden from the filter bar.
*   As soon as you upload an image tagged with that category (e.g. `BTS_Sony Setup_Studio.jpg`), the corresponding filter tag will automatically appear on your webpage!

---

### Smart Fallbacks (Easier Uploads)

If you are in a rush, you don't have to fill out every field. The app will automatically provide smart default values if you omit fields.

1.  **Only Category and Title**:
    *   `Pets_Clover in the Grass.jpg`
    *   *Result*: Category: **Pets**, Title: **Clover in the Grass**, Location: **Seattle, WA** (Default), Camera: **Sony Alpha 6400** (Default)
2.  **Hyphenated fallback**:
    *   If you just upload `pet-clover-park.jpg` (using hyphens instead of underscores), the loader will recognize it is in the `Pets` category and construct the title `Clover Park` automatically!
