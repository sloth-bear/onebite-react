import './App.css'
import { Routes, Route, Link } from 'react-router-dom';
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import NotFound from "./pages/NotFound";
import Edit from './pages/Edit';
import { createContext, useReducer, useRef } from 'react';

const DiaryStateContext = createContext();
const DiaryDispatchContext = createContext();

const mockData = [
  {
    id: 1,
    createdDate: new Date().getTime(),
    emotionId: 1,
    content: "1번 일기 내용"
  },
  {
    id: 2,
    createdDate: new Date().getTime(),
    emotionId: 2,
    content: "2번 일기 내용"
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE": return [ action.data, ...state ];
    case "UPDATE": return state.map(v => String(v.id) === String(action.data.id) ? action.data : v);
    case "DELETE": return state.filter(v => String(v.id) !== String(action.id));
    default: state;
  }
}

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreate = (createDate, emotionId, content) => {
    dispatch({ type: "CREATE", data: { id: idRef.current++, createDate, emotionId, content } });
  }

  const onUpdate = (id, createDate, emotionId, content) => {
    dispatch({ type: "UPDATE", data: { id, createDate, emotionId, content } });
  }

  const onDelete = (id) => {
    dispatch({ type: "DELETE", id });
  }

  return (
    <>
    <button onClick={() => onCreate(new Date().getTime(), 1, "Hello")}>클릭</button>
    <button onClick={() => onUpdate(1, new Date().getTime(), 2, "일기 수정")}>수정</button>
    <button onClick={() => onDelete(1)}>삭제</button>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  )
}

export default App
