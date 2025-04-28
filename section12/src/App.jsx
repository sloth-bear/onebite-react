import './App.css'
import { Routes, Route, Link } from 'react-router-dom';
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import NotFound from "./pages/NotFound";
import { useNavigate } from 'react-router-dom';
import Edit from './pages/Edit';

import Header from './components/Header';
import Button from './components/Button';

// 1. "/" : 모든 일기 조회하는 Home
// 2. "/new": 새로운 일기 작성하는 New 페이지 
// 3. "/diary": 일기를 상세히 조회하는 Diary
function App() {
  const navi = useNavigate();

  const onClickButton = () => {
    navi("/new");
  }

  return (
    <>
      <Header 
        title="Header"
        leftChild={<Button text="left" />}
        rightChild={<Button text="right" />}
      />
      <Button text="버튼" />
      <Button type="POSITIVE" text="긍정" />
      <Button type="NEGATIVE" text="부정" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
