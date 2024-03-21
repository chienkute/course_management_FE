import { memo, useEffect, useState } from "react";
import "./Blog.scss";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { getBlogByUser } from "service/UserService";
const BlogList = (props) => {
  const { title } = props;
  const [blog, setBlog] = useState([]);
  console.log(blog);
  const getAllBlog = async () => {
    let res = await getBlogByUser("");
    if (res) {
      setBlog(res?.data);
    }
  };
  useEffect(() => {
    getAllBlog();
  }, []);
  return (
    <div className="blist col-lg-12">
      <div className="blist__card">
        <h2 className="blist__title position-relative">{title}</h2>
        {blog &&
          blog?.length > 0 &&
          blog?.map((item, index) => {
            if (item?.category === title) {
              return (
                <div className="blist__list d-flex flex-wrap rounded-0">
                  <div className="blist__thumb rounded-2 overflow-hidden">
                    <Link to={`/blog/${item?._id}`}>
                      <img src={item?.image} alt="" />
                    </Link>
                  </div>
                  <div className="blist__content p-0 ps-md-3 ps-0 pt-3 pt-md-0">
                    <h3>
                      <Link to={`/blog/${item?._id}`}>{item?.title}</Link>
                    </h3>
                    <div className="blist__date d-flex align-items-center mb-2">
                      <Moment format="YYYY/MM/DD">{item?.updatedAt}</Moment>
                    </div>
                    <div
                      dangerouslySetInnerHTML={{ __html: item?.description }}
                      className="blist__description"
                      style={{ fontSize: "15px" }}
                    ></div>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};
export default memo(BlogList);
