import { configureStore, ThunkAction, Action, isPlain } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import { isImmutable } from "immutable"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // does not seems needed
      // immutableCheck: {
      //   isImmutable: (value: any) =>
      //     isImmutable(value) || isImmutableDefault(value),
      // },

      // ignore error for immutable value
      serializableCheck: {
        isSerializable: (value: any) => isImmutable(value) || isPlain(value),
        getEntries: (value: any) =>
          isImmutable(value)
            ? (value.entries() as IterableIterator<[string, unknown]>)
            : Object.entries(value),
      },
    }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
