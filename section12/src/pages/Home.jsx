import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import { useContext, useState } from "react";
import { DiaryStateContext } from "../App";

const getMonthlyDiarys = (pivotDate, diarys = []) => {
  const startTimeOfThisMonth = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime();
  const endTimeOfThisMonth = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 0, 23, 59, 59).getTime();

  return diarys.filter((item) => startTimeOfThisMonth <= item.createdDate && item.createdDate <= endTimeOfThisMonth);
}

const Home = () => {
  const diarys = useContext(DiaryStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());

  const monthlyDiarys = getMonthlyDiarys(pivotDate, diarys);

  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  }

  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  }

  return <div>
    <Header 
      title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`} 
      leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
      rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
    />
    <DiaryList data={monthlyDiarys} />
  </div>
}

export default Home;