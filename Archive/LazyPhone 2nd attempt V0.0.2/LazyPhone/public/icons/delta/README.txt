# Delta-style Icons for LazyPhone

This folder is where you can drop PNG icons from the Delta Icons iOS pack
(or any other icon set) to be used by the React UI.

Expected usage:

- Put 180x180 (or similar) PNG icons in this folder.
- Name them to match the paths referenced in src/config/apps.ts, for example:
    lazy-map.png
    phone.png
    notes.png
    camera.png
    tasks.png
    journal.png
    hub.png
    settings.png

Then in the browser, the icons will be loaded from:
    /icons/delta/<file>.png

## Licensing Note

The official Delta Icons iOS pack is licensed under:
Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.

That means:
- You must follow the license terms from the original project.
- This LazyPhone project does NOT bundle any Delta icon assets by default.
- You are responsible for downloading and using them in a way that respects
  the original license and your own use case (personal vs commercial, etc.).