import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductDetailResponseData } from '../../api';
// 코드 흐름을 따라가면서 이해해보시고 추가로 작성해주시면 됩니다.

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

// 단일 제품 상세 조회 - 예약 정보가 있을 경우 타입
interface ReservationState {
  start: string;
  end: string;
  isCanceled: boolean;
  isExpired: boolean;
}

// 예약 날짜
interface SelectedDate {
  date: string;
}

// 예약 시간
interface SelectedTime {
  start: string;
  end: string;
  timeDiffer: string;
}

// 예약 인원
interface SelectedGuests {
  guests: number;
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

// 예약 정보가 있을 경우 초기값
const initialReservationState: ReservationState = {
  start: '',
  end: '',
  isCanceled: false,
  isExpired: false,
};

// 단일 제품 상세 조회 초기값
const initialProductState: ProductDetailResponseData = {
  id: '',
  title: '',
  price: 0,
  description: '',
  tags: [],
  thumbnail: '',
  photo: '',
  isSoldOut: false,
  reservations: [],
  discountRate: 0,
};

const initialDateState: SelectedDate = {
  date: '',
};

const initialTimeState: SelectedTime = {
  start: '',
  end: '',
  timeDiffer: '',
};

const initialGuestsState: SelectedGuests = {
  guests: 1,
};

const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    selectTab: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        selectedTab: action.payload,
      };
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
    },
    category: (state, action: PayloadAction<string>) => {
      state.searchedValue = action.payload;
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

const reservationSlice = createSlice({
  name: 'reservation',
  initialState: initialReservationState,
  reducers: {
    updateReservation: (state, action: PayloadAction<ReservationState>) => {
      action.payload;
    },
  },
});

const productSlice = createSlice({
  name: 'product',
  initialState: initialProductState,
  reducers: {
    updateProductDetail: (
      state,
      action: PayloadAction<ProductDetailResponseData>
    ) => {
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.price = action.payload.price;
      state.description = action.payload.description;
      state.tags = action.payload.tags;
      state.thumbnail = action.payload.thumbnail;
      state.photo = action.payload.photo;
      state.isSoldOut = action.payload.isSoldOut;
      state.reservations = action.payload.reservations;
      state.discountRate = action.payload.discountRate;
    },
  },
});

const dateSlice = createSlice({
  name: 'date',
  initialState: initialDateState,
  reducers: {
    selectedDate: (state, action: PayloadAction<SelectedDate>) => {
      state.date = action.payload.date;
    },
  },
});

const timeSlice = createSlice({
  name: 'time',
  initialState: initialTimeState,
  reducers: {
    selectedTime: (state, action: PayloadAction<SelectedTime>) => {
      state.start = action.payload.start;
      state.end = action.payload.end;
      state.timeDiffer = action.payload.timeDiffer;
    },
  },
});

const guestsSlice = createSlice({
  name: 'guests',
  initialState: initialGuestsState,
  reducers: {
    selectedGuests: (state, action: PayloadAction<SelectedGuests>) => {
      state.guests = action.payload.guests;
    },
  },
});
export interface RootState {
  tabSlice: TabState;
  counterSlice: Counterstate;
  searchSlice: Searchstate;
  listSlice: listState;
  productSlice: ProductDetailResponseData;
  reservationSlice: ReservationState;
  dateSlice: SelectedDate;
  timeSlice: SelectedTime;
  guestsSlice: SelectedGuests;
}

export const { selectTab } = tabSlice.actions;
export const { up, down } = counterSlice.actions;
export const { search, category } = searchSlice.actions;
export const { plist } = listSlice.actions;
export const { updateProductDetail } = productSlice.actions;
export const { updateReservation } = reservationSlice.actions;
export const { selectedDate } = dateSlice.actions;
export const { selectedTime } = timeSlice.actions;
export const { selectedGuests } = guestsSlice.actions;

export default {
  tabSlice: tabSlice.reducer,
  counterSlice: counterSlice.reducer,
  searchSlice: searchSlice.reducer,
  listSlice: listSlice.reducer,
  productSlice: productSlice.reducer,
  reservationSlice: reservationSlice.reducer,
  dateSlice: dateSlice.reducer,
  timeSlice: timeSlice.reducer,
  guestsSlice: guestsSlice.reducer,
};
