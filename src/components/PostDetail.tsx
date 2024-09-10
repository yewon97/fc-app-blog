import { Link, useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebaseApp";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import Loader from "@/components/Loader";
import { PostProps } from "@/components/PostList";

export default function PostDetail() {
  const { user } = useContext(AuthContext);
  const params = useParams();

  const [post, setPost] = useState<PostProps | null>(null);

  const getPost = async (id: string) => {
    if (!id) return;

    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setPost({ ...docSnap.data(), id: docSnap.id } as PostProps);
    }
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, [params?.id]);

  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <>
      <div className="post__detail">
        {post ? (
          <div className="post__box">
            <div className="post__title">{post?.title}</div>
            <div className="post__profile-box">
              <div className="post__profile"></div>
              <div className="post__author-name">{post?.email}</div>
              <div className="post__date">{post?.createdAt}</div>
            </div>
            {post?.email === user?.email && (
              <div className="post__utils-box">
                <div
                  className="post__delete"
                  role="presentation"
                  onClick={handleDelete}
                >
                  삭제
                </div>
                <div className="post__edit">
                  <Link to={`/posts/edit/${post?.id}`}>수정</Link>
                </div>
              </div>
            )}
            <div className="post__text post__text--pre-wrap">
              {post?.content}
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
