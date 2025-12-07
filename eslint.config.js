//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

const eslintConfig = [
  ...tanstackConfig,
  //   {
  //     ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"]
  //   },
  {
    rules: {
      // Custom rules can be added here
      'sort-imports': 'off',
    },
  },
]

export default eslintConfig
