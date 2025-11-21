# Delta Icons Integration (Optional)

LazyPhone can use third-party icon packs such as **Delta Icons for iOS** to
skin the home screen.

## How this project is set up

- `src/config/apps.ts` defines the apps shown on the home screen and their
  optional `icon` paths.
- The `AppIcon` component in `src/components/home/AppIcon.tsx` will render
  an image if `iconSrc` is provided, otherwise it falls back to an emoji.
- Icons are expected to live in: `public/icons/delta`.

Example mapping (from `src/config/apps.ts`):

```ts
{ id: "lazy-map", label: "Lazy Map", emoji: "🗺️", icon: "/icons/delta/lazy-map.png" }
```

This tells the UI to try loading:

```
public/icons/delta/lazy-map.png
```

at runtime.

## Using the official Delta Icons iOS pack

The upstream project is here:

- https://github.com/Delta-Icons/ios

According to their README, the icon pack is licensed under
**Creative Commons Attribution-NonCommercial-NoDerivatives 4.0**.

This LazyPhone repo does **not** ship any Delta icon assets by default.
To use them:

1. Download the icons yourself from the official repo / site.
2. Export or copy the PNGs you want into `public/icons/delta`.
3. Rename them to match the filenames referenced in `src/config/apps.ts`.
4. Make sure your use of the icons follows the license terms
   (especially around non-commercial use and no-derivatives).

If you prefer, you can swap in your own custom icon set by:

- Putting your own PNGs into `public/icons/whatever`.
- Updating the paths in `src/config/apps.ts`.