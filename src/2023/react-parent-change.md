{ "header": {"name": "React", "order": 8}, "order": 3, "date": "2023-10-18 22:30"  }
---
# Reactで親コンポーネントで子コンポーネントを変更する

Reactで親コンポーネントで子コンポーネントを変更するには、
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