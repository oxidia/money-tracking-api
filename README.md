# money-tracking-api

## Env variables

| Name           | Required | Type      | Default value | Description |
| -------------- | -------- | --------- | ------------- | ----------- |
| `PORT`         | false    | `integer` | 3000          | -           |
| `DB_PASSWORD`  | true     | `string`  | -             | -           |
| `DB_NAME`      | true     | `string`  | -             | -           |
| `DATABASE_URL` | true     | `string`  | -             | -           |

## Branch naming

```
prefix-branch_name

prefixes
  - doc-*
  - bug-*
  - feat-*

Example
feat-signin
```

## Commits

```
prefix(scope): message

Example
Feat(db): add database modules
```
