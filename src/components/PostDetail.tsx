import { Link, useNavigate, useParams } from "react-router-dom";
import { getDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebaseApp";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import Loader from "@/components/Loader";
import { PostProps } from "@/components/PostList";
import { toast } from "react-toastify";

export default function PostDetail() {
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    const confirm = window.confirm("해당 게시글을 정말로 삭제하시겠습니까?");
    if (!confirm || !post || !post?.id) return;

    try {
      const docRef = doc(db, "posts", post?.id);
      await deleteDoc(docRef);
      toast.success("게시글이 성공적으로 삭제되었습니다.");
      navigate("/");
    } catch (error: any) {
      console.error(error);
      toast.error("게시글 삭제에 실패했습니다.");
    }
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
