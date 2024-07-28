import { Link } from "react-router-dom";

type Props = {
  hasNavigation?: boolean;
};

export default function PostList({ hasNavigation = true }: Props) {
  return (
    <>
      {hasNavigation && (
        <>
          <div className="post__navigation">
            <div className="post__navigation--active">전체</div>
            <div>나의 글</div>
          </div>
          <hr className="line-gray" />
        </>
      )}

      <div className="post__list">
        {[...Array(10)].map((e, idx) => (
          <div key={idx} className="post__box">
            <Link to={`/posts/${idx}`}>
              <div className="post__profile-box">
                <div className="post__profile"></div>
                <div className="post__author-name">패스트캠퍼스</div>
                <div className="post__date">2023.08.09 토요일</div>
              </div>
              <div className="post__title">게시글 {idx}</div>
              <div className="post__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                autem sit sequi similique unde officia eius consequatur, maxime
                reiciendis incidunt odio aliquid soluta, quod, consequuntur
                voluptatibus exercitationem quis aut obcaecati!
              </div>
              <div className="post__utils-box">
                <div className="post__delete">삭제</div>
                <div className="post__edit">수정</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
