import { memo, useEffect, useState } from "react";
import "./BlogDetail.scss";
import { getDetailBlog } from "service/UserService";
import { useParams } from "react-router-dom";
import Moment from "react-moment";
const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const getBlogById = async () => {
    let res = await getDetailBlog(id);
    if (res) {
      setBlog(res?.data);
    }
  };
  useEffect(() => {
    getBlogById();
  }, []);
  return (
    <div className="blog-detail">
      <div className="blog-detail__content">
        <h1>{blog?.title}</h1>
        <div className="blog-detail__date">
          <Moment format="YYYY/MM/DD">{blog?.updatedAt}</Moment>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: blog?.description }}
          className="blog-detail__description"
        ></div>
      </div>
    </div>
  );
};
export default memo(BlogDetail);
