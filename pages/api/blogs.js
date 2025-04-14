// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fs = require("fs/promises");
const path = require("path");

export default async (req, res) => {
  let filenames = [
      "how-to-be-a-coder.json",
      "how-to-learn-flask.json",
      "how-to-learn-nextjs.json",
      "how-to-learn-unity-3d.json",
      "how-to-learn-django.json",
      "how-to-learn-javascript.json",
      "how-to-learn-python.json",
    ],
    total_blogs = filenames.length,
    file_extension = ".json",
    blogs_count = 3,
    blogs = [];

  if (req.query.count) {
    blogs_count = parseInt(req.query.count);
  }

  filenames = filenames.slice(0, blogs_count);
  /***
   * ```|_ Do not use forEach with async-await _|```
   * Fortunately if your language has async-await then it will also have the `for...of` construction, so you can use that */
  for (const filename of filenames) {
    if (filename.includes(file_extension)) {
      let data = await fetch(`${process.env.HOST_URL}/data/${filename}`);
      blogs.push({
        slug: filename.replace(file_extension, ""),
        ...data,
      });
    }
  }

  res.status(200).json({ blogs, total_blogs });
};
