# Bowl & Bloom | Fresh Fusion Poké Bowl Restaurant

A multi-page website for **Bowl & Bloom**, featuring fresh produce, customizable grain & greens bowls, vibrant food options, and interactive order enquiry workflows.

## Website Architecture

```
Poke_Bowl_Fresh_Fusion_Restaurant/
├── index.html          # Home 1: Build Your Bowl (Hero, Interactive Builder, Featured Food, 4 Steps, Signature Creations, Testimonials)
├── home2.html          # Home 2: Eat Bright (Hero Alt, Running Marquee, Fresh Features, Story Grid, Metrics, CTA)
├── menu.html           # Menu: Interactive Category Filter (Bases, Proteins, Toppings, Sauces), Inspiration Combos
├── nutrition.html      # Nutrition: Macro stats, full ingredient nutrition breakdown table, customization advice
├── locations.html      # Locations: 3 Storefront locations, hours, and live embedded OpenStreetMap viewer
├── contact.html        # Contact: Interactive Order Enquiry Form with validation, head office details, FAQs, and map
├── README.md           # Project architecture and documentation
├── assets/
│   └── images/         # All 42 local image assets (heroes, banners, cards, ingredients, testimonials, avatars)
├── images/             # Image directory alias containing all assets
├── css/
│   └── style.css       # Design system tokens, light/dark themes, RTL styles, typography, and responsive layout
└── js/
    └── main.js         # Unified controllers: Light/Dark theme, RTL direction, mobile navigation, bowl builder & filters
```

## Features

- **Local Image Assets**: All 42 photography assets (hero backgrounds, banners, ingredient items, step-by-step guides, customer avatars) are locally hosted in `assets/images/` and `images/`.
- **Dark & Light Mode**: Seamless theme switching with auto-persistence in `localStorage`.
- **RTL Support**: Full Right-To-Left layout support with dynamic styling and `localStorage` persistence.
- **Interactive Bowl Builder** (`index.html`): Real-time ingredient combination and price calculation.
- **Menu Filter** (`menu.html`): Dynamic categorization for bases, proteins, toppings, and sauces.
- **Interactive Enquiry Form** (`contact.html`): Form validation and confirmation notifications.
- **Embedded Interactive Maps** (`locations.html`, `contact.html`): Live OpenStreetMap frames.
- **Mobile Responsive**: Custom hamburger menu drawer with smooth transitions and escape-key handling.
