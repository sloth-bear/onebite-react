import './App.css'
import { Routes, Route, Link } from 'react-router-dom';
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import NotFound from "./pages/NotFound";
import Edit from './pages/Edit';
import { createContext, useReducer, useRef } from 'react';

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

const mockData = [
  {
    id: 1,
    createdDate: new Date("2025-04-29").getTime(),
    emotionId: 1,
    content: "1번 일기 내용"
  },
  {
    id: 2,
    createdDate: new Date("2025-04-30").getTime(),
    emotionId: 2,
    content: "2번 일기 내용"
  },
  {
    id: 3,
    createdDate: new Date("2025-03-20").getTime(),
    emotionId: 3,
    content: "3번 일기 내용"
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
  const idRef = useRef(4);

  const onCreate = (createdDate, emotionId, content) => {
    dispatch({ type: "CREATE", data: { id: idRef.current++, createdDate, emotionId, content } });
  }

  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({ type: "UPDATE", data: { id, createdDate, emotionId, content } });
  }

  const onDelete = (id) => {
    dispatch({ type: "DELETE", id });
  }

  return (
    <>
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
