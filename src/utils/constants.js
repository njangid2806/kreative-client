import React from "react";
import { GiCompass, GiDiamondHard, GiStabbedNote } from "react-icons/gi";
export const links = [
  {
    id: 1,
    text: "home",
    url: "/",
  },
  {
    id: 2,
    text: "about",
    url: "/about",
  },
  {
    id: 3,
    text: "products",
    url: "/products",
  },
];

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: "mission",
    text: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.",
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: "vision",
    text: "The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that does not distract from the layout.",
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: "history",
    text: "The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software.",
  },
];

// export const products_url = 'https://course-api.com/react-store-products'
export const products_url = "/.netlify/functions/products";

// export const single_product_url = `https://course-api.com/react-store-single-product?id=`
export const single_product_url = "/.netlify/functions/single-product?id=";
