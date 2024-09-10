import { AuthContext } from "@/context/AuthContext";
import { db } from "@/firebaseApp";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {
  hasNavigation?: boolean;
};

type TabType = "all" | "my";

export interface PostProps {
  id: string;
  title: string;
  summary: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  uid: string;
}

export default function PostList({ hasNavigation = true }: Props) {
  const { user } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState<TabType>("all");

  const [posts, setPosts] = useState<PostProps[]>([]);

  const getPosts = async () => {
    setPosts([]);

    try {
      const snapshot = collection(db, "posts");
      const docs = await getDocs(snapshot);
      const dataObj = docs.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as PostProps),
      );
      setPosts(dataObj);
    } catch (error: any) {
      console.error("게시글을 불러오는 데 실패했습니다.", error);
      toast.error("게시글을 불러오는 데 실패했습니다.");
    }
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("해당 게시글을 정말로 삭제하시겠습니까?");
    if (!confirm || !id) return;

    try {
      const docRef = doc(db, "posts", id);
      await deleteDoc(docRef);
      toast.success("게시글이 성공적으로 삭제되었습니다.");
      getPosts();
    } catch (error: any) {
      console.error("게시글 삭제에 실패했습니다.", error);
      toast.error("게시글 삭제에 실패했습니다.");
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {hasNavigation && (
        <>
          <div className="post__navigation">
            <div
              role="presentation"
              onClick={() => setActiveTab("all")}
              className={activeTab === "all" ? "post__navigation--active" : ""}
            >
              전체
            </div>
            <div
              role="presentation"
              onClick={() => setActiveTab("my")}
              className={activeTab === "my" ? "post__navigation--active" : ""}
            >
              나의 글
            </div>
          </div>
          <hr className="line-gray" />
        </>
      )}

      <div className="post__list">
        {posts?.length > 0
          ? posts?.map((post, idx) => (
              <div key={post.id} className="post__box">
                <Link to={`/posts/${post.id}`}>
                  <div className="post__profile-box">
                    <div className="post__profile"></div>
                    <div className="post__author-name">{post.email}</div>
                    <div className="post__date">{post.createdAt}</div>
                  </div>
                  <div className="post__title">{post.title}</div>
                  <div className="post__text">{post.summary}</div>
                </Link>
                {post.email === user?.email && (
                  <div className="post__utils-box">
                    <div
                      className="post__delete"
                      role="presentation"
                      onClick={() => handleDelete(post.id)}
                    >
                      삭제
                    </div>
                    <div className="post__edit">
                      <Link to={`/posts/edit/${post.id}`}>수정</Link>
                    </div>
                  </div>
                )}
              </div>
            ))
          : "게시글이 없습니다."}
      </div>
    </>
  );
}
