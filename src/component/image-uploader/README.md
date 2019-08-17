# feat: implement replace image feature #122

In order to solve issue #122 I've googled:

https://www.google.com/search?q=firebase+upload+image+with+name

In `lecture.component.jsx` I've passed through a property `lectureId` the value of `lectureId` down to the `ImageUploader` component.

In the `ImageUploader` I've replace in two places `image.name` with `lectureId`.

This is all folks. Literally all.
