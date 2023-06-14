import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducer/reducer';

// reducer.tsx 파일에서 내보내진 reducer들을 configureStore에 전달하여 하나로 결합합니다.
const store = configureStore({
  reducer: reducers,
});

export default store;
