import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import useDiary from "../hooks/useDiary";
import { formatDate } from "../util/dateFormatter";

const Diary = () => {
  const params = useParams();
  const navi = useNavigate();

  const currentDiary = useDiary(params.id);
  if (!currentDiary) {
    return <div>Loading...</div>
  }

  const { createdDate } = currentDiary;
  const title = formatDate(new Date(createdDate));

  return <div>
    <Header 
      title={`${title} 기록`}
      leftChild={<Button text="뒤로 가기" onClick={() => navi(-1)} />}
      rightChild={<Button text="수정하기" onClick={() => navi(`/edit/${params.id}`)} />}
    />
    <Viewer {...currentDiary} />
  </div>
}

export default Diary;