# Template audit: vacation-rental-master.zip

This document records Step 1 (ZIP STRUCTURE) and Step 2 (audit checklist) of the
Hannah Rooms build. The zip is preserved untouched in
`vacation-rental-master.zip`, and its extraction is preserved untouched in
`vacation-rental-master/`. Nothing in it was renamed, removed, or relocated.

## ZIP STRUCTURE (read-only reference)

```
vacation-rental-master/
.DS_Store
about.html
blog-single.html
blog.html
contact.html
css/.DS_Store
css/ajax-loader.gif
css/animate.css
css/bootstrap-datepicker.css
css/bootstrap.min.css
css/bootstrap/.DS_Store
css/bootstrap/bootstrap-grid.css
css/bootstrap/bootstrap-reboot.css
css/css/.DS_Store
css/css/bootstrap-reboot.css
css/css/mixins/_text-hide.css
css/flaticon.css
css/jquery.timepicker.css
css/magnific-popup.css
css/owl.carousel.min.css
css/owl.theme.default.min.css
css/style.css
fonts/.DS_Store
fonts/flaticon/.DS_Store
fonts/flaticon/backup.txt
fonts/flaticon/font/Flaticon.eot
fonts/flaticon/font/Flaticon.svg
fonts/flaticon/font/Flaticon.ttf
fonts/flaticon/font/Flaticon.woff
fonts/flaticon/font/Flaticon.woff2
fonts/flaticon/font/_flaticon.scss
fonts/flaticon/font/flaticon.css
fonts/flaticon/font/flaticon.html
fonts/flaticon/license/license.pdf
images/.DS_Store
images/about.jpg
images/bg_1.jpg
images/bg_2.jpg
images/image_1.jpg
images/image_2.jpg
images/image_3.jpg
images/image_4.jpg
images/image_5.jpg
images/image_6.jpg
images/loc.png
images/person-1.jpg
images/person-2.jpg
images/person-3.jpg
images/person_1.jpg
images/person_2.jpg
images/person_3.jpg
images/person_4.jpg
images/room-1.jpg
images/room-2.jpg
images/room-3.jpg
images/room-4.jpg
images/room-5.jpg
images/room-6.jpg
images/services-1.jpg
images/services-2.jpg
images/services-3.jpg
index.html
js/.DS_Store
js/bootstrap-datepicker.js
js/bootstrap.min.js
js/google-map.js
js/jquery-3.2.1.min.js
js/jquery-migrate-3.0.1.min.js
js/jquery.animateNumber.min.js
js/jquery.easing.1.3.js
js/jquery.magnific-popup.min.js
js/jquery.min.js
js/jquery.stellar.min.js
js/jquery.timepicker.min.js
js/jquery.waypoints.min.js
js/main.js
js/owl.carousel.min.js
js/popper.min.js
js/scrollax.min.js
main.html
prepros-6.config
readme.txt
rooms.html
scss/.DS_Store
scss/bootstrap/.DS_Store
scss/bootstrap/_alert.scss
scss/bootstrap/_badge.scss
scss/bootstrap/_breadcrumb.scss
scss/bootstrap/_button-group.scss
scss/bootstrap/_buttons.scss
scss/bootstrap/_card.scss
scss/bootstrap/_carousel.scss
scss/bootstrap/_close.scss
scss/bootstrap/_code.scss
scss/bootstrap/_custom-forms.scss
scss/bootstrap/_dropdown.scss
scss/bootstrap/_forms.scss
scss/bootstrap/_functions.scss
scss/bootstrap/_grid.scss
scss/bootstrap/_images.scss
scss/bootstrap/_input-group.scss
scss/bootstrap/_jumbotron.scss
scss/bootstrap/_list-group.scss
scss/bootstrap/_media.scss
scss/bootstrap/_mixins.scss
scss/bootstrap/_modal.scss
scss/bootstrap/_nav.scss
scss/bootstrap/_navbar.scss
scss/bootstrap/_pagination.scss
scss/bootstrap/_popover.scss
scss/bootstrap/_print.scss
scss/bootstrap/_progress.scss
scss/bootstrap/_reboot.scss
scss/bootstrap/_root.scss
scss/bootstrap/_spinners.scss
scss/bootstrap/_tables.scss
scss/bootstrap/_toasts.scss
scss/bootstrap/_tooltip.scss
scss/bootstrap/_transitions.scss
scss/bootstrap/_type.scss
scss/bootstrap/_utilities.scss
scss/bootstrap/_variables.scss
scss/bootstrap/bootstrap-grid.scss
scss/bootstrap/bootstrap-reboot.scss
scss/bootstrap/bootstrap.scss
scss/bootstrap/mixins/_alert.scss
scss/bootstrap/mixins/_background-variant.scss
scss/bootstrap/mixins/_badge.scss
scss/bootstrap/mixins/_border-radius.scss
scss/bootstrap/mixins/_box-shadow.scss
scss/bootstrap/mixins/_breakpoints.scss
scss/bootstrap/mixins/_buttons.scss
scss/bootstrap/mixins/_caret.scss
scss/bootstrap/mixins/_clearfix.scss
scss/bootstrap/mixins/_float.scss
scss/bootstrap/mixins/_forms.scss
scss/bootstrap/mixins/_gradients.scss
scss/bootstrap/mixins/_grid-framework.scss
scss/bootstrap/mixins/_grid.scss
scss/bootstrap/mixins/_hover.scss
scss/bootstrap/mixins/_image.scss
scss/bootstrap/mixins/_list-group.scss
scss/bootstrap/mixins/_lists.scss
scss/bootstrap/mixins/_nav-divider.scss
scss/bootstrap/mixins/_pagination.scss
scss/bootstrap/mixins/_reset-text.scss
scss/bootstrap/mixins/_resize.scss
scss/bootstrap/mixins/_screen-reader.scss
scss/bootstrap/mixins/_size.scss
scss/bootstrap/mixins/_table-row.scss
scss/bootstrap/mixins/_text-emphasis.scss
scss/bootstrap/mixins/_text-hide.scss
scss/bootstrap/mixins/_text-truncate.scss
scss/bootstrap/mixins/_transition.scss
scss/bootstrap/mixins/_visibility.scss
scss/bootstrap/utilities/_align.scss
scss/bootstrap/utilities/_background.scss
scss/bootstrap/utilities/_borders.scss
scss/bootstrap/utilities/_clearfix.scss
scss/bootstrap/utilities/_display.scss
scss/bootstrap/utilities/_embed.scss
scss/bootstrap/utilities/_flex.scss
scss/bootstrap/utilities/_float.scss
scss/bootstrap/utilities/_overflow.scss
scss/bootstrap/utilities/_position.scss
scss/bootstrap/utilities/_screenreaders.scss
scss/bootstrap/utilities/_shadows.scss
scss/bootstrap/utilities/_sizing.scss
scss/bootstrap/utilities/_spacing.scss
scss/bootstrap/utilities/_text.scss
scss/bootstrap/utilities/_visibility.scss
scss/style.scss
services.html
```

## Audit checklist

### CSS custom properties

The `:root` block from `vacation-rental-master/css/style.css` is reproduced
verbatim in `src/app/globals.css`. Every `--variable` name found in the zip:

| Variable | Value |
| --- | --- |
| `--blue` | `#007bff` |
| `--indigo` | `#6610f2` |
| `--purple` | `#6f42c1` |
| `--pink` | `#e83e8c` |
| `--red` | `#dc3545` |
| `--orange` | `#fd7e14` |
| `--yellow` | `#ffc107` |
| `--green` | `#28a745` |
| `--teal` | `#20c997` |
| `--cyan` | `#17a2b8` |
| `--white` | `#fff` |
| `--gray` | `#6c757d` |
| `--gray-dark` | `#343a40` |
| `--primary` | `#007bff` |
| `--secondary` | `#6c757d` |
| `--success` | `#28a745` |
| `--info` | `#17a2b8` |
| `--warning` | `#ffc107` |
| `--danger` | `#dc3545` |
| `--light` | `#f8f9fa` |
| `--dark` | `#343a40` |
| `--breakpoint-xs` | `0` |
| `--breakpoint-sm` | `576px` |
| `--breakpoint-md` | `768px` |
| `--breakpoint-lg` | `992px` |
| `--breakpoint-xl` | `1200px` |
| `--font-family-sans-serif` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| `--font-family-monospace` | `SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` |

### @font-face rules

All @font-face rules live in `vacation-rental-master/css/flaticon.css` (and the
copy at `fonts/flaticon/font/flaticon.css`). They are reproduced verbatim in
`src/app/globals.css` with `src` paths rebased from `../fonts/flaticon/font/`
to `/fonts/flaticon/font/` (the same folder names under `public/`, since the
bundled CSS has a different physical location). Font files are copied
byte-for-byte to `public/fonts/flaticon/font/`.

| Family | src paths | Weight | Style |
| --- | --- | --- | --- |
| `Flaticon` | `/fonts/flaticon/font/Flaticon.eot`, `/fonts/flaticon/font/Flaticon.eot?#iefix` (embedded-opentype), `/fonts/flaticon/font/Flaticon.woff` (woff), `/fonts/flaticon/font/Flaticon.ttf` (truetype), `/fonts/flaticon/font/Flaticon.svg#Flaticon` (svg) | normal | normal |
| `Flaticon` (inside `@media screen and (-webkit-min-device-pixel-ratio: 0)`) | `/fonts/flaticon/font/Flaticon.svg#Flaticon` (svg) | (unspecified, defaults normal) | (unspecified, defaults normal) |

Page fonts loaded exactly like the zip (Google Fonts link tags in
`src/app/layout.tsx`): `Poppins:200,300,400,500,600,700,800,900` and
`Playfair Display:400,400i,500,500i,600,600i,700,700i`.

### Checklist items

| Item | In zip? | Where it lives now |
| --- | --- | --- |
| Loading screen component | Yes (`#ftco-loader` markup in `about.html`, CSS in `css/style.css` lines with `#ftco-loader`) | `src/components/LoadingScreen.tsx`, `#ftco-loader` styles in `src/app/globals.css` copied from the zip, plus the Hannah Rooms wordmark and a plain percent |
| Cookie consent banner | Absent in zip | Built fresh: `src/components/CookieConsent.tsx`, localStorage key `hannah-rooms-cookie-consent` |
| CAPTCHA integration | Absent in zip | Built fresh: `src/lib/recaptcha.ts` (server verify, secret server-only) and `src/lib/captchaClient.ts` + `src/components/HumanCheck.tsx` (visible v2 fallback under score 0.5) |
| /legal/privacy-policy | Absent in zip | Built fresh: `src/app/(site)/legal/privacy-policy/page.tsx` (KDPA 2019) |
| /legal/terms | Absent in zip | Built fresh: `src/app/(site)/legal/terms/page.tsx` |
| /legal/cookie-policy | Absent in zip | Built fresh: `src/app/(site)/legal/cookie-policy/page.tsx` |
| 404 page | Absent in zip | Built fresh: `src/app/not-found.tsx` |
| 500 page | Absent in zip | Built fresh: `src/app/error.tsx` (WhatsApp +254112272061) |
| API route file names | None in zip (static template) | Built fresh, see below |
| .env variable names | None in zip | Built fresh, full set in `.env.example` |

### API routes built

- `src/app/api/auth/register/route.ts` (POST)
- `src/app/api/auth/[...nextauth]/route.ts` (NextAuth handler, required for login)
- `src/app/api/rooms/create/route.ts` (POST)
- `src/app/api/rooms/update/route.ts` (PUT)
- `src/app/api/enquiries/create/route.ts` (POST)
- `src/app/api/enquiries/reply/route.ts` (POST)
- `src/app/api/send-enquiry/route.ts` (POST)

### .env variables

`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`,
`NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`, `NEXTAUTH_SECRET`,
`NEXTAUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `PEXELS_API_KEY`,
`KV_REST_API_URL`, `KV_REST_API_TOKEN`, `BLOB_READ_WRITE_TOKEN`, `SMTP_HOST`,
`SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `ADMIN_EMAIL`.

### Zip palette and type inherited (no redesign)

- Primary accent `#fd7792`, deep accent `#fc456a`, secondary `#a3cb4c`
- Light surfaces `#f3f4f7`, footer `#272727` / `#1a1a1a`, warm dark `#3c312e`
- Headings `Playfair Display`, body `Poppins`
- Buttons: radius 4px, uppercase, letter-spacing 3px, 11px
- Cards: radius 5px, shadow `0px 10px 27px -9px rgba(0,0,0,0.11)`
- Forms: radius 5px, shadow `0px 15px 34px -29px rgba(0,0,0,0.54)`
- Pulse keyframes for the WhatsApp button taken from the zip

No gold, chrome, AI orbs, neon, gradients, or luxury staging were introduced.
