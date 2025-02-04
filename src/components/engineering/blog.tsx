import matter from "gray-matter";
import fs from "fs";
import Link from "next/link";

const getBlogPost = async () => {
  const directory = process.cwd() + "/src/engineering/";
  const files = fs.readdirSync(directory);

  return files.map((file) => {
    const path = `${directory}/${file}`;
    const contents = fs.readFileSync(path);
    const markdown = matter(contents);

    return markdown.data;
  });
};

const Blog = async () => {
  const data = await getBlogPost();

  const blogs = data.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <>
      <div className="m-auto mt-[10%] w-10/12">
        <title>Engineering | Engineering Blogs</title>
        <p className="m-0 text-center text-3xl font-bold md:text-left">
          Engineering Blogs
        </p>
        <p className="my-3 w-full text-center md:w-3/4 md:text-left">
          Check out our engineering blogs to learn more about the behind the
          scenes as engineers discuss various challenges, migrations,
          bottlenecks. Our engineering blogs captures how our engineers approach
          problems and bring innovative solutions to the table.
        </p>
        <div className="my-8 grid w-full grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-5">
          {blogs.map(({ title, author, date, link }, index) => (
            <Link
              href={`/engineering/blog/${link}`}
              key={index}
              className="rounded bg-hackathon-blue-200 px-3 py-2 text-white hover:cursor-pointer hover:opacity-80"
            >
              <p className="text-lg font-semibold">{title}</p>
              <p className="text-sm text-gray-300">{author}</p>
              <p className="flex justify-end text-sm text-gray-300">
                {new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
