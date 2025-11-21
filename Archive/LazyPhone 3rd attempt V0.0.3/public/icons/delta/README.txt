# Icon Pack Folder for LazyPhone

Drop your PNG icons here, for example from the iOS 14-style IconScout pack.

Example filenames that match the defaults in src/config/apps.ts:

  lazy-map.png
  maps.png
  phone.png
  notes.png
  camera.png
  tasks.png
  checklist.png
  journal.png
  book.png
  hub.png
  apps.png
  settings.png
  calendar.png
  photos.png

They will be loaded at runtime via paths like:

  /icons/delta/phone.png

You can add more icons and reference them in src/config/apps.ts under the
`icons` array for each app.