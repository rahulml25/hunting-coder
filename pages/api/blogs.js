// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fs = require("fs/promises");
const path = require("path");

export default async (req, res) => {
  let dirname = process.env.BLOG_DATA_FOLDER,
    files_str = await fs.readdir(dirname),
    filenames = files_str,
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
      let content = await fs.readFile(`${dirname}/${filename}`, "utf-8");
      let data = JSON.parse(content);
      blogs.push({
        slug: filename.replace(file_extension, ""),
        ...data,
      });
    }
  }

  res.status(200).json({ blogs, total_blogs });
};
