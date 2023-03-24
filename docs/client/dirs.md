# Directory documentation

<<<<<<< HEAD
=======
## Navigation

1. [..](../)
1. [Directories](./dirs.md)
1. [Environment variables](./env.md)
1. [Testing](./tests.md)

>>>>>>> main
## /src/api

Api call, result helpers, and types. Should be used instead of vanilla `fetch` javascript api. Any API calls should be implemented there as functions in a format `purpose_method` (ie. `user_get`, `group_spendings_insert`), accepting any parameters needed for the given api call (ie. `export const user_get = (user_id: string) => ...`), and returning the type `ApiCall<SuccessDataType, ErrorType>`.

## /src/assets

Assets used in components, such as images.

## /src/components

Reusable react components.

## /src/hooks

Reusable state [hooks](https://legacy.reactjs.org/docs/hooks-intro.html). See `/src/hooks/alert.tsx` for an example.

## /src/views

Individual pages that are to be rendered in routes defined inside of `/src/App.tsx`. Folder structure should loosely reflect the url path. Non-reusable components should be placed in a `components` subdirectory, and tests - within an `index.test.tsx` file. If the view uses no subcomponents, it needn't contain a `components` subdirectory. All subcomponent tests should be put inside of a `components/__tests__` directory.

For instance, `view1/view2/:param1`, defining a subcomponent `View1/Elem1` would be reflected as:
```
client/src/views
└── View1
    ├── components
    │   ├── Elem1.tsx
    │   └── __tests__
    ├── index.test.tsx
    ├── index.tsx
    └── View2
        ├── index.test.tsx
        ├── index.tsx
        └── [param1]
            ├── index.test.tsx
            └── index.tsx
```