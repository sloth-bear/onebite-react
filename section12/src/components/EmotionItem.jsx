import "./EmotionItem.css";
import { getEmotionImage } from "../util/get-emotion-image";

const EmotionItem = ({ id, name, isSelected, onClick }) => {
  return <div className={`EmotionItem ${isSelected ? `ÈmotionItem_on_${id}` : ""}`} onClick={onClick}>
    <img src={getEmotionImage(id)} className="emotion_img" />
    <div className="emotion_name">{name}</div>
  </div>;
}

export default EmotionItem;