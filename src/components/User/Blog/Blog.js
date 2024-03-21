import { memo } from "react";
import "./Blog.scss";
import BlogList from "./BlogList";
const Blog = () => {
  return (
    <div className="blog row">
      <BlogList title={"thủ thuật wordpress"}></BlogList>
      <BlogList title={"wordpress cơ bản"}></BlogList>
    </div>
  );
};
export default memo(Blog);
