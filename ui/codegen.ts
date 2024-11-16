import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://cms.duocnv.top/graphql',
  documents: 'src/modules/**/*.graphql',
  generates: {
    'src/gql/': {
      preset: 'client',
      plugins: ['typescript', 'typescript-operations'],
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
}

export default config
