import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://cms.duocnv.top/graphql',  // Đảm bảo URL schema chính xác
  documents: 'src/modules/**/*.graphql',  // Đảm bảo rằng đường dẫn đúng
  generates: {
    'src/types/types.ts': { plugins: ['typescript'] },
    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.type.ts',
        baseTypesPath: 'types/types.ts',
      },
      plugins: ['typescript-operations','typescript-document-nodes'],
    },
  },
};

export default config;
