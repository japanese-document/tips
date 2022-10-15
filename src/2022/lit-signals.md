{ "header": {"name": "Lit", "order": 4}, "order": 0 }
---
# Litでシグナル(Signals)を使う

下記の[Mixin](https://lit.dev/docs/composition/mixins/)を作成します。
シグナルには[usignal](https://github.com/WebReflection/usignal)を使います。
[Demo](https://lit.dev/playground/#project=W3sibmFtZSI6ImlucHV0LXJlc3VsdC5qcyIsImNvbnRlbnQiOiJpbXBvcnQgeyBodG1sLCBjc3MsIExpdEVsZW1lbnQgfSBmcm9tICdsaXQnXG5pbXBvcnQgeyBXaXRoVXNpZ25hbCB9IGZyb20gJy4vd2l0aC11c2lnbmFsLmpzJ1xuaW1wb3J0IHsgcmVzdWx0IH0gZnJvbSAnLi9zaWduYWxzLmpzJ1xuXG5jbGFzcyBJbnB1dFJlc3VsdCBleHRlbmRzIFdpdGhVc2lnbmFsKExpdEVsZW1lbnQpIHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiBodG1sYCR7cmVzdWx0LnZhbHVlfWBcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2lucHV0LXJlc3VsdCcsIElucHV0UmVzdWx0KSJ9LHsibmFtZSI6ImluZGV4Lmh0bWwiLCJjb250ZW50IjoiPCFET0NUWVBFIGh0bWw-XG48aHRtbD5cbiAgPGhlYWQ-XG4gICAgPHNjcmlwdCB0eXBlPVwibW9kdWxlXCIgc3JjPVwiLi9pbnB1dC1udW1iZXIuanNcIj48L3NjcmlwdD5cbiAgICA8c2NyaXB0IHR5cGU9XCJtb2R1bGVcIiBzcmM9XCIuL2lucHV0LWdyb3VwLmpzXCI-PC9zY3JpcHQ-XG4gICAgPHNjcmlwdCB0eXBlPVwibW9kdWxlXCIgc3JjPVwiLi9pbnB1dC1yZXN1bHQuanNcIj48L3NjcmlwdD5cbiAgPC9oZWFkPlxuICA8Ym9keT5cbiAgICA8aW5wdXQtZ3JvdXA-PC9pbnB1dC1ncm91cD5cbiAgICA8aW5wdXQtcmVzdWx0PjwvaW5wdXQtcmVzdWx0PlxuICA8L2JvZHk-XG48L2h0bWw-In0seyJuYW1lIjoicGFja2FnZS5qc29uIiwiY29udGVudCI6IntcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwibGl0XCI6IFwiXjIuMC4wXCIsXG4gICAgXCJAbGl0L3JlYWN0aXZlLWVsZW1lbnRcIjogXCJeMS4wLjBcIixcbiAgICBcImxpdC1lbGVtZW50XCI6IFwiXjMuMC4wXCIsXG4gICAgXCJsaXQtaHRtbFwiOiBcIl4yLjAuMFwiXG4gIH1cbn0iLCJoaWRkZW4iOnRydWV9LHsibmFtZSI6IndpdGgtdXNpZ25hbC5qcyIsImNvbnRlbnQiOiJpbXBvcnQgeyBlZmZlY3QgfSBmcm9tICd1c2lnbmFsJ1xuXG5leHBvcnQgZnVuY3Rpb24gV2l0aFVzaWduYWwoQmFzZSl7XG4gIHJldHVybiBjbGFzcyBXaXRoVXNpZ25hbCBleHRlbmRzIEJhc2Uge1xuICAgICNkaXNwb3NlRWZmZWN0XG4gXG4gICAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICB0aGlzLiNkaXNwb3NlRWZmZWN0Py4oKTtcbiAgICB9XG5cbiAgICBwZXJmb3JtVXBkYXRlKCkge1xuICAgICAgaWYgKCF0aGlzLmlzVXBkYXRlUGVuZGluZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLiNkaXNwb3NlRWZmZWN0KSB7XG4gICAgICAgIHN1cGVyLnBlcmZvcm1VcGRhdGUoKTtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuI2Rpc3Bvc2VFZmZlY3QgPSBlZmZlY3QoKCkgPT4ge1xuICAgICAgICB0aGlzLmlzVXBkYXRlUGVuZGluZyA9IHRydWU7XG4gICAgICAgIHN1cGVyLnBlcmZvcm1VcGRhdGUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0ifSx7Im5hbWUiOiJzaWduYWxzLmpzIiwiY29udGVudCI6ImltcG9ydCB7IHNpZ25hbCwgY29tcHV0ZWQgfSBmcm9tICd1c2lnbmFsJ1xuXG5leHBvcnQgY29uc3QgczEgPSBzaWduYWwoMSlcbmV4cG9ydCBjb25zdCBzMiA9IHNpZ25hbCgxKVxuZXhwb3J0IGNvbnN0IHJlc3VsdCA9IGNvbXB1dGVkKCgpID0-IHMxLnZhbHVlICsgczIudmFsdWUpIn0seyJuYW1lIjoiaW5wdXQtZ3JvdXAuanMiLCJjb250ZW50IjoiaW1wb3J0IHsgaHRtbCwgTGl0RWxlbWVudCB9IGZyb20gJ2xpdCdcbmltcG9ydCB7IHMxLCBzMiB9IGZyb20gJy4vc2lnbmFscy5qcydcblxuY2xhc3MgSW5wdXRHcm91cCBleHRlbmRzIExpdEVsZW1lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIGh0bWxgPGlucHV0LW51bWJlciAuc2lnbmFsPSR7czF9PjwvaW5wdXQtbnVtYmVyPiArIDxpbnB1dC1udW1iZXIgLnNpZ25hbD0ke3MyfT48L2lucHV0LW51bWJlcj4gPSBgXG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdpbnB1dC1ncm91cCcsIElucHV0R3JvdXApIn0seyJuYW1lIjoiaW5wdXQtbnVtYmVyLmpzIiwiY29udGVudCI6ImltcG9ydCB7IGh0bWwsIExpdEVsZW1lbnQgfSBmcm9tICdsaXQnXG5cbmNsYXNzIElucHV0TnVtYmVyIGV4dGVuZHMgTGl0RWxlbWVudCB7XG4gIHN0YXRpYyBwcm9wZXJ0aWVzID0ge1xuICAgIHNpZ25hbDoge31cbiAgfVxuXG4gICNvbkNoYW5nZShldmVudCkge1xuICAgIHRoaXMuc2lnbmFsLnZhbHVlID0gK2V2ZW50LnRhcmdldC52YWx1ZVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiBodG1sYDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgdmFsdWU9JHt0aGlzLnNpZ25hbC52YWx1ZX0gQGlucHV0PSR7dGhpcy4jb25DaGFuZ2V9IC8-YFxuICB9XG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnaW5wdXQtbnVtYmVyJywgSW5wdXROdW1iZXIpIn1d)

```js
import { effect } from 'usignal';

export function WithUsignal(Base){
  return class WithUsignal extends Base {
    #disposeEffect
 
    disconnectedCallback() {
      this.#disposeEffect?.();
    }

    performUpdate() {
      if (!this.isUpdatePending) {
        return;
      }

      if (this.#disposeEffect) {
        super.performUpdate();
        return
      }

      this.#disposeEffect = effect(() => {
        this.isUpdatePending = true;
        super.performUpdate();
      });
    }
  };
}
```

Mixinには[LitElement](https://japanese-document.github.io/lit/api-LitElement.html)もしくはそのサブクラスを渡します。

```
import { html, css, LitElement } from 'lit'
import { WithUsignal } from './with-usignal.js'
import { result } from './signals.js'

class InputResult extends WithUsignal(LitElement) {
  render() {
    return html`${result.value}`
  }
}

customElements.define('input-result', InputResult)
```

シグナルの値を足し算するアプリケーションです。

```
import { signal, computed } from 'usignal'

export const s1 = signal(1)
export const s2 = signal(1)
export const result = computed(() => s1.value + s2.value)
```
