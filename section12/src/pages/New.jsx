import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";

const New = () => {
  const navi = useNavigate();
  const { onCreate } = useContext(DiaryDispatchContext);

  const onSubmit = (input) => {
    onCreate(input.createdDate?.getTime(), input.emotionId, input.content );
    navi("/", { replace: true });
  }

  return <div className="New">
    <Header title={"새 일기 쓰기"} leftChild={<Button text="뒤로 가기" onClick={() => navi(-1)} />}/>
    <Editor onSubmit={onSubmit} />
  </div>
}

export default New;