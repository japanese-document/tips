{ "header": {"name": "React", "order": 8}, "order": 4, "date": "2023-10-28 18:30"  }
---
# Redux ToolkitのcreateAsyncThunkで生成されたAsync Actionのテスト

Redux Toolkitの[createAsyncThunk()](https://redux-toolkit.js.org/api/createAsyncThunk)で生成されたAsync Actionのテストのやり方の例を示します。

```ts
import { configureStore , createReducer, createAsyncThunk } from '@reduxjs/toolkit'

interface AsyncThunkConfig {
  state: RootState
}

export const asyncIncrement = createAsyncThunk<number, void, AsyncThunkConfig>
('ASYNC_INCREMENT', (_, { getState }) => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      const state = getState()
      resolve(state.counter.value + 1)
    }, 1)
  })
})

interface State {
  value: number
}

const initialState = {
  value: 0,
}

const counter = createReducer<State>(initialState, (builder) => {
  builder
    .addCase(asyncIncrement.fulfilled, (state, action) => {
      state.value = action.payload
    })
})

export const reducer = {
  counter,
}

const store = configureStore({
  reducer,
})

type RootState = ReturnType<typeof store.getState>
```

上記のAsync Actionは下記のようにテストします。

```ts
import { configureStore } from '@reduxjs/toolkit'
import { asyncIncrement, reducer } from './store.js'

describe('asyncIncrement', () => {
  test('update', async () => {
    const store = configureStore({
      reducer,
    })

    await store.dispatch(asyncIncrement())
    const state1 = store.getState()
    expect(state1.counter.value).toBe(1)

    await store.dispatch(asyncIncrement())
    const state2 = store.getState()
    expect(state2.counter.value).toBe(2)
  })
})
```
