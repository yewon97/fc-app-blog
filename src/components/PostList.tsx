import { AuthContext } from "@/context/AuthContext";
import { db } from "@/firebaseApp";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  hasNavigation?: boolean;
};

type TabType = "all" | "my";

interface PostProps {
  id: string;
  title: string;
  summary: string;
  content: string;
  createAt: string;
  email: string;
}

export default function PostList({ hasNavigation = true }: Props) {
  const { user } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState<TabType>("all");

  const [posts, setPosts] = useState<PostProps[]>([]);

  const getPosts = async () => {
    const snapshot = collection(db, "posts");
    const docs = await getDocs(snapshot);
    const dataObj = docs.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as PostProps),
    );
    setPosts((prev) => [...prev, ...dataObj]);
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
                    <div className="post__date">{post.createAt}</div>
                  </div>
                  <div className="post__title">{post.title}</div>
                  <div className="post__text">{post.content}</div>
                </Link>
                {post.email === user?.email && (
                  <div className="post__utils-box">
                    <div className="post__delete">삭제</div>
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
