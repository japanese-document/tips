{ "header": {"name": "JavaScript", "order": 2}, "order": 7 }
---
# JestのmockClear、mockReset、mockRestore

## 各メソッドの効果

* [mockClear](https://jestjs.io/docs/mock-function-api#mockfnmockclear)はmockに保存されているtestの結果をリセットする。
* [mockReset](https://jestjs.io/docs/mock-function-api#mockfnmockreset)はmockに保存されているtestの結果とmockの設定をリセットする。
* [mockRestore](https://jestjs.io/docs/mock-function-api#mockfnmockrestore)はmockResetの効果と[jest.spyOn()](https://jestjs.io/docs/jest-object#jestspyonobject-methodname)で変更された処理を元の処理に戻します。

## test毎に実行する設定

* 設定ファイルに[clearMocks](https://jestjs.io/docs/configuration#clearmocks-boolean)を追加すると各testが実行される前に[jest.clearAllMocks()](https://jestjs.io/docs/jest-object#jestclearallmocks)が実行されます。 
* 設定ファイルに[resetMocks](https://jestjs.io/docs/configuration#resetmocks-boolean)を追加すると各testが実行される前に[jest.resetAllMocks()](https://jestjs.io/docs/jest-object#jestresetallmocks)が実行されます。 
* 設定ファイルに[restoreMocks](https://jestjs.io/docs/configuration#restoremocks-boolean)を追加すると各testが実行される前に[jest.restoreAllMocks()](https://jestjs.io/docs/jest-object#jestrestoreallmocks)が実行されます。 