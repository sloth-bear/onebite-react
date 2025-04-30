import "./DiaryItem.css";
import { getEmotionImage } from "../util/get-emotion-image";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";

const DiaryItem = ({ id, emotionId, content, createdDate }) => {
  const navi = useNavigate();
  const { onDelete } = useContext(DiaryDispatchContext);
  
  const onClickDelete = (id) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      onDelete(id);
    }
  }

  return <div className="DiaryItem">
    <div className={`img_section img_section_${emotionId}`} onClick={() => navi(`/diary/${id}`)}>
      <img src={getEmotionImage(emotionId)} />
    </div>
    <div className="info_section" onClick={() => navi(`/diary/${id}`)}>
      <div className="created_date">
        {new Date(createdDate).toLocaleDateString()}
      </div>
      <div className="content">
        {content}
      </div>
    </div>
    <div className="button_section">
      <Button text={"수정하기"} onClick={() => navi(`/edit/${id}`)}/>
      <Button type="NEGATIVE" text={"삭제하기"} onClick={() => onClickDelete(id)}/>
    </div>
  </div>;
}

export default DiaryItem;