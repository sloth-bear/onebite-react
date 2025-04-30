import "./DiaryItem.css";
import { getEmotionImage } from "../util/get-emotion-image";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const DiaryItem = ({ id, emotionId, content, createdDate }) => {
  const navi = useNavigate();

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
    </div>
  </div>;
}

export default DiaryItem;