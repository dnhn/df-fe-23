import { defineConfig } from 'orval'

export default defineConfig({
  bookstore: {
    input: {
      target: 'https://develop-api.bookstore.dwarvesf.com/swagger/doc.json',
      validation: false,
    },
    output: {
      mode: 'tags-split',
      workspace: 'src/api',
      target: './app.ts',
      schemas: './model',
      client: 'swr',
      prettier: true,
      override: {
        mutator: {
          path: './mutator/requester.ts',
          name: 'requester',
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'eslint ./src/api --ext .ts,.tsx,.js --fix',
    },
  },
})
