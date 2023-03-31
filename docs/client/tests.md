# Test documentation

## Navigation

1. [..](../)
1. [Directories](./dirs.md)
1. [Environment variables](./env.md)
1. [Testing](./tests.md)

## Test structure

Unit tests should be added to their corresponding `__tests__` directories (eg. `/src/api/__tests__/` for api related tests) in `suit_name.test.ts(x)` files. Tests are implemented using the [vitest library](https://vitest.dev/guide/#examples). Please refer to the [docs](https://vitest.dev/guide/#examples), and `/src/api/__tests__/call.test.ts` for examples.

Test are run using the `npm test` command whilst in the `client` directory.