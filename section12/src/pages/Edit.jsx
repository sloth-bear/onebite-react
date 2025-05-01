import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import useDiary from "../hooks/useDiary";

/**
 * 컴포넌트가 마운트되지 않은 시점에 navi를 호출할 수 없다.
 * main.jsx에서 BrowserRouter 컴포넌트가 공급하고 있는 기능이기 때문이다. 이 컴포넌트가 렌더링되기 전에 호출할 수 없다.  
 * const currentDiary = getCurrentDiary(); 
 */
const Edit = () => {
  const params = useParams();
  const navi = useNavigate();
  const { onUpdate, onDelete } = useContext(DiaryDispatchContext);

  const currentDiary = useDiary(params.id);

  const onClickDelete = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      onDelete(params.id);
      navi("/", { replace: true });
    }
  }

  const onClickSubmit = (input) => {
    if (!confirm("정말 수정하시겠습니까?")) {
      return;
    }
    onUpdate(params.id, input.createdDate, input.emotionId, input.content);
    navi("/");
  }

  return <div className="New">
    <Header 
      title={"일기 수정하기"} 
      leftChild={<Button text="뒤로 가기" onClick={() => navi(-1)} />}
      rightChild={<Button type="NEGATIVE" text="삭제하기" onClick={onClickDelete} />}
    />
    <Editor initData={currentDiary} onSubmit={onClickSubmit} />
  </div>
}

export default Edit;
