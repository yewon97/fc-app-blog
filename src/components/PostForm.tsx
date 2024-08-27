export default function PostForm() {
  return (
    <form action="/post" method="POST" className="form">
      <div className="form__block">
        <label htmlFor="title">제목</label>
        <input
          type="text"
          name="title"
          id="title"
          required
          placeholder="제목을 입력해주세요."
        />
      </div>
      <div className="form__block">
        <label htmlFor="summary">요약</label>
        <input
          type="text"
          name="summary"
          id="summary"
          required
          placeholder="요약을 입력해주세요."
        />
      </div>
      <div className="form__block">
        <label htmlFor="content">내용</label>
        <textarea
          name="content"
          id="content"
          required
          placeholder="내용을 입력해주세요."
        />
      </div>
      <div className="form__block">
        <button type="submit" className="form__btn--submit">
          제출
        </button>
      </div>
    </form>
  );
}
