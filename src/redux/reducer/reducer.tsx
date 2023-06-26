import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// 코드 흐름을 따라가면서 이해해보시고 추가로 작성해주시면 됩니다.

// 타입을 정의합니다.
interface TabState {
  selectedTab: string;
}
interface Counterstate {
  clickedCounter: number;
}
interface Searchstate {
  searchedValue: string;
}
interface listState {
  listValue: Product[];
}

export interface Product {
  // 제품 정보
  id: string; // 제품 ID
  title: string; // 제품 이름
  price: number; // 제품 가격
  description: string; // 제품 설명(최대 100자)
  tags: string[]; // 제품 태그
  thumbnail: string | undefined; // 제품 썸네일 이미지(URL)
  discountRate: number; // 제품 할인율
}

// 초기값 설정입니다.
const initialState: TabState = {
  selectedTab: '내 정보',
};
const productInitialState: listState = {
  listValue: [
    {
      id: '',
      title: '',
      price: 0,
      description: '',
      tags: [''],
      thumbnail: '',
      discountRate: 0,
    },
  ],
};

// createSlice 함수는 리듀서 함수와 해당 리듀서의 액션 생성자 함수들을 한 번에 생성해주는 편리한 기능을 제공합니다.
// createSlice를 호출하면 반환되는 객체에는 reducer와 actions라는 두 가지 속성이 있습니다.
// - reducer: 생성된 리듀서 함수입니다. 이 리듀서 함수는 tabSlice.reducer로서 store의 리듀서로 사용됩니다.
// - actions: 생성된 액션 생성자 함수들이 포함된 객체입니다. 액션 생성자 함수들은 해당 slice의 액션을 생성하는데 사용됩니다.
const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    selectTab: (state, action: PayloadAction<string>) => {
      state.selectedTab = action.payload;
    },
  },
});

const counterSlice = createSlice({
  name: 'counterSlice',
  initialState: { clickedCounter: 0 },
  reducers: {
    up: (state, action: PayloadAction<number>) => {
      state.clickedCounter = state.clickedCounter + action.payload;
    },
    down: (state, action: PayloadAction<number>) => {
      state.clickedCounter = state.clickedCounter - action.payload;
    },
  },
});

const searchSlice = createSlice({
  name: 'searchSlice',
  initialState: { searchedValue: '' },
  reducers: {
    search: (state, action: PayloadAction<string>) => {
      state.searchedValue = action.payload;
      console.log(state.searchedValue);
    },
    category: (state, action: PayloadAction<string>) => {
      state.searchedValue = action.payload;
      console.log(state.searchedValue);
    },
  },
});

const listSlice = createSlice({
  name: 'listSlice',
  initialState: productInitialState,
  reducers: {
    plist: (state, action: PayloadAction<Product[]>) => {
      state.listValue = action.payload;
    },
  },
});

// 모든 리듀서의 상태 타입을 포함하여 묶어서 내보내는 역할을 합니다.
export interface RootState {
  // 상태 타입을 추가해주세요
  tabSlice: TabState;
  counterSlice: Counterstate;
  searchSlice: Searchstate;
  listSlice: listState;
}

// createSlice 함수에서 반환된 action을 내보냅니다.
// 다른 action들도 아래와 같이 추가로 작성하셔서 내보내면 됩니다.
export const { selectTab } = tabSlice.actions;
export const { up, down } = counterSlice.actions;
export const { search, category } = searchSlice.actions;
export const { plist } = listSlice.actions;

// createSlice 함수에서 반환된 reducer를 내보냅니다.
export default {
  // 다른 reducer들도 아래와 같이 추가로 작성하셔서 내보내면 됩니다.
  tabSlice: tabSlice.reducer,
  counterSlice: counterSlice.reducer,
  searchSlice: searchSlice.reducer,
  listSlice: listSlice.reducer,
};
