# Directory documentation

## /src/api

Api call, result helpers, and types. Should be used instead of vanilla `fetch` javascript api. Any API calls should be implemented there as functions in a format `purpose_method` (ie. `user_get`, `group_spendings_insert`), accepting any parameters needed for the given api call (ie. `export const user_get = (user_id: string) => ...`), and returning the type `ApiCall<SuccessDataType, ErrorType>`.

## /src/assets

Assets used in components, such as images.

## /src/components

Reusable react components.

## /src/hooks

Reusable state [hooks](https://legacy.reactjs.org/docs/hooks-intro.html). See `/src/hooks/alert.tsx` for an example.

## /src/views

Individual pages that are to be rendered in routes defined inside of `/src/App.tsx`. Folder structure should reflect the url structure. For instance, `/user/:user_id/groups` should be reflected as `views/user/groups`.
