# money-tracking-api

## Env variables

| Name             | Required | Type      | Default value | Description |
| ---------------- | -------- | --------- | ------------- | ----------- |
| `PORT`           | true     | `integer` | -             | -           |
| `DB_PASSWORD`    | true     | `string`  | -             | -           |
| `DB_NAME`        | true     | `string`  | -             | -           |
| `DATABASE_URL`   | true     | `string`  | -             | -           |
| `JWT_SECRET_KEY` | true     | `string`  | -             | -           |

## Branch naming

```
prefix-branch_name

prefixes
- feat: (new feature for the user, not a new feature for build script)
- fix: (bug fix for the user, not a fix to a build script)
- doc: (changes to the documentation)
- style: (formatting, missing semi colons, etc; no production code change)
- refactor: (refactoring production code, eg. renaming a variable)
- test: (adding missing tests, refactoring tests; no production code change)


Example
feat-signin
```

## Commits

```
prefix(scope): message

Example
Feat(db): add database modules
```
