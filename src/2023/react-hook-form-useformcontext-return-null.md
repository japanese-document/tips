{ "header": {"name": "React", "order": 8}, "order": 2, "date": "2023-10-08 18:50"  }
---
# React Hook FormのuseFormContextがnullを返す時の対処法

[React Hook Form](https://www.react-hook-form.com/)の[useFormContext](https://www.react-hook-form.com/api/useformcontext/)が`null`を返す場合、
useFormContextを実行しているコンポーネントをFormProviderコンポーネントの子コンポーネントにする必要があります。
詳しくは[FormProvider](https://www.react-hook-form.com/api/formprovider/)を見てください。
[useWatch](https://www.react-hook-form.com/api/usewatch/)を実行するコンポーネントがFormProviderコンポーネントの子コンポーネントでない場合、
[control](https://www.react-hook-form.com/api/useform/control/)を渡す必要があります。
