import { useState } from "react";
import Button from "./Button";
import "./Editor.css";
import EmotionItem from "./EmotionItem";
import { useNavigate } from "react-router-dom";

const emotions = [
  { id: 1, name: "완전 좋음", },
  { id: 2, name: "좋음", },
  { id: 3, name: "그럭저럭", },
  { id: 4, name: "나쁨", },
  { id: 5, name: "끔찍함", },
];

const formatDate = (targetDate) => {
  const month = targetDate.getMonth() + 1;
  const day = targetDate.getDate();
  return `${targetDate.getFullYear()}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`
}

const Editor = ({ onSubmit }) => {
  const navi = useNavigate();
  const [input, setInput] = useState({
    createdDate: new Date(), 
    emotionId: 3, 
    content: ""
  });

  const onChangeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const parsedValue = name === "createdDate" 
     ? new Date(value)
     : value;

    setInput({ ...input,  [name]: parsedValue })
  }

  const onClickSubmit = () => {
    onSubmit(input);
  }

  const onClickCancel = () => {
    navi(-1);
  }

  return <div className="Editor">
    <section className="date_section">
      <h4>오늘의 날짜</h4>
      <input name="createdDate" type="date" value={formatDate(input.createdDate)} onChange={onChangeInput} />
    </section>
    <section className="emotion_section">
      <h4>오늘의 감정</h4>
      <div className="emotion_list_wrapper">
        {emotions.map(emotion => 
          <EmotionItem 
            key={emotion.id} 
            {...emotion} 
            isSelected={Number(emotion.id) === Number(input.emotionId)} 
            onClick={() => onChangeInput({
              target: {
                name: "emotionId",
                value: emotion.id
              }
            })}
          />)}
      </div>
    </section>
    <section className="content_section">
      <h4>오늘의 일기</h4>
      <textarea name="content" placeholder="오늘은 어땠나요?" onChange={onChangeInput} />
    </section>
    <section className="button_section">
      <Button text={"취소하기"} onClick={onClickCancel} />
      <Button type="POSITIVE" text={"작성완료"} onClick={onClickSubmit} />
    </section>
  </div>;
}

export default Editor;