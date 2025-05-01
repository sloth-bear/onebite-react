import { DiaryStateContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useDiary = (id) => {
  const diarys = useContext(DiaryStateContext);
  const [currentDiary, setCurrentDiary] = useState();
  const navi = useNavigate();

  useEffect(() => {
    const data = getCurrentDiary();
    if (!data) {
      alert("존재하지 않는 일기입니다.");
      navi("/", { replace: true });
    }
    setCurrentDiary(data);
  }, [id]);

  const getCurrentDiary = () => {
    const data = diarys.find((item) => String(item.id) === String(id));
    return data;
  }

  return currentDiary;
}

export default useDiary;