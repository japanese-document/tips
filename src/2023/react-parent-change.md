{ "header": {"name": "React", "order": 8}, "order": 3, "date": "2023-10-21 21:00"  }
---
# Reactで親コンポーネントで子コンポーネントを変更する

Reactで親コンポーネントで子コンポーネントを変更する方法を記載します。

## VNodeを変更する

下記のように[Children.toArray()](https://react.dev/reference/react/Children#children-toarray)を使って、`children`をVNodeの配列に変換します。
[isValidElement()](https://react.dev/reference/react/isValidElement#isvalidelement)でReact elementかどうかを判別します。
[cloneElement()](https://react.dev/reference/react/cloneElement#cloneelement)を使ってReact elementを変更します。

```jsx
const root = createRoot(document.getElementById('app'));
                        
function Parent({children, word}) {
  const changedComponents = React.Children.toArray(children).map(c => {
    if (React.isValidElement(c)) {
      return React.cloneElement(c, {className: 'red'}, c.props.children + '2')
    }
    return c + word
  })
  return <div>{changedComponents}</div>
}

root.render(<Parent word="1">a<p>b</p>c</Parent>);

// a1
// b2
// c1
```

## 子コンポーネント内の要素を参照する

下記のように[forwardRef()](https://react.dev/reference/react/forwardRef)を使って、子コンポーネント内の要素を参照します。

```jsx
import { forwardRef, useRef, useEffect } from 'react'

function _Child(_, ref) {
  return <p ref={ref}>foo</p>
}

const Child = forwardRef(_Child)

function Parent() {
  const ref = useRef(null)
  
  useEffect(() => {
    setTimeout(() => {
      ref.current.textContent = 'bar'}, 1000)
  }, [])
  
  return <Child ref={ref} />
}
```

## 子コンポーネント内で定義された関数を実行する

下記のように[useImperativeHandle()](https://react.dev/reference/react/useImperativeHandle)を使って、子コンポーネント内で定義された関数を実行します。

```jsx
import { forwardRef, useRef, useEffect, useImperativeHandle } from 'react'

function _Child(_, ref) {
  const _ref = useRef(null)
  
  useImperativeHandle(ref, () => {
    return {
      changeText() {
        _ref.current.textContent = 'bar'
      },
    };
  }, []);

  return <p ref={_ref}>foo</p>
}

const Child = forwardRef(_Child)

function Parent() {
  const ref = useRef(null)
  
  useEffect(() => {
    setTimeout(() => {
      ref.current.changeText()
    }, 1000)
  }, [])
  
  return <Child ref={ref} />
}
```