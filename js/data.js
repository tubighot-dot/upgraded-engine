/* =====================================================================
   CUISINE DE INNHS - YOUR CONTENT FILE
   =====================================================================
   This is the ONLY file you need to edit for food names, descriptions,
   prices, eatery names and photo file names.

   HOW TO EDIT ON GITHUB
   1. Open this file on GitHub and click the pencil icon (Edit).
   2. Type between the quotes, like:   name: "Your food name",
   3. Click "Commit changes". The website updates in about 1 minute.

   RULES
   - Keep the quotes "" and the commas , exactly as they are.
   - Leave a field as "" (empty) to show the [ENTER ...] placeholder.
   - Do not use a double quote (") inside your text. Use an apostrophe (').
   - Only write real eateries and real prices that you have checked.

   PHOTOS
   - Upload your photos into the "images" folder on GitHub
     (Add file > Upload files).
   - Name each photo exactly like the "photo" line, for example
     images/meals-1.jpg  (same spelling, lowercase, .jpg).
   - If your photo has a different name or is a .png, change the
     "photo" line to match, for example  photo: "images/adobo.png",
   - Keep photos under about 1 MB each so the site loads fast.
   ===================================================================== */

window.CUISINE = {

  /* Big banner photo on the Home page */
  hero: "images/hero.jpg",

  /* Photo on the About page (food or community photo) */
  about: "images/about.jpg",

  /* Three category cards on the Home page */
  categories: {
    meals:   "images/category-meals.jpg",
    snacks:  "images/category-snacks.jpg",
    gallery: "images/category-gallery.jpg"
  },

  /* "Food Finds Worth Discovering" on the Home page (3 items) */
  finds: [
    { name: "", note: "", eatery: "", photo: "images/find-1.jpg" },
    { name: "", note: "", eatery: "", photo: "images/find-2.jpg" },
    { name: "", note: "", eatery: "", photo: "images/find-3.jpg" }
  ],

  /* MEALS AND EVERYDAY EATS (9 cards)
     The first 3 also appear as the preview on the Home page. */
  meals: [
    { name: "", description: "", price: "", eatery: "", photo: "images/meals-1.jpg" },
    { name: "", description: "", price: "", eatery: "", photo: "images/meals-2.jpg" },
    { name: "", description: "", price: "", eatery: "", photo: "images/meals-3.jpg" },
    { name: "", description: "", price: "", eatery: "", photo: "images/meals-4.jpg" },
    { name: "", description: "", price: "", eatery: "", photo: "images/meals-5.jpg" },
    { name: "", description: "", price: "", eatery: "", photo: "images/meals-6.jpg" },
    { name: "", description: "", price: "", eatery: "", photo: "images/meals-7.jpg" },
    { name: "", description: "", price: "", eatery: "", photo: "images/meals-8.jpg" },
    { name: "", description: "", price: "", eatery: "", photo: "images/meals-9.jpg" }
  ],

  /* SNACKS AND STREET FOODS (9 cards)
     Cards 1-3 show under "Snack Favorites".
     Cards 4-9 show under "Quick Bites Around Campus".
     The first 3 also appear as the preview on the Home page. */
  snacks: [
    { name: "", description: "", price: "", eatery: "", photo: "images/snacks-1.jpg" },
    { name: "", description: "", price: "", eatery: "", photo: "images/snacks-2.jpg" },
    { name: "", description: "", price: "", eatery: "", photo: "images/snacks-3.jpg" },
    { name: "", description: "", price: "", eatery: "", photo: "images/snacks-4.jpg" },
    { name: "", description: "", price: "", eatery: "", photo: "images/snacks-5.jpg" },
    { name: "", description: "", price: "", eatery: "", photo: "images/snacks-6.jpg" },
    { name: "", description: "", price: "", eatery: "", photo: "images/snacks-7.jpg" },
    { name: "", description: "", price: "", eatery: "", photo: "images/snacks-8.jpg" },
    { name: "", description: "", price: "", eatery: "", photo: "images/snacks-9.jpg" }
  ],

  /* GALLERY (15 photos). "title" is the food or eatery name. */
  gallery: [
    { title: "", caption: "", photo: "images/gallery-1.jpg" },
    { title: "", caption: "", photo: "images/gallery-2.jpg" },
    { title: "", caption: "", photo: "images/gallery-3.jpg" },
    { title: "", caption: "", photo: "images/gallery-4.jpg" },
    { title: "", caption: "", photo: "images/gallery-5.jpg" },
    { title: "", caption: "", photo: "images/gallery-6.jpg" },
    { title: "", caption: "", photo: "images/gallery-7.jpg" },
    { title: "", caption: "", photo: "images/gallery-8.jpg" },
    { title: "", caption: "", photo: "images/gallery-9.jpg" },
    { title: "", caption: "", photo: "images/gallery-10.jpg" },
    { title: "", caption: "", photo: "images/gallery-11.jpg" },
    { title: "", caption: "", photo: "images/gallery-12.jpg" },
    { title: "", caption: "", photo: "images/gallery-13.jpg" },
    { title: "", caption: "", photo: "images/gallery-14.jpg" },
    { title: "", caption: "", photo: "images/gallery-15.jpg" }
  ]
};
