import type { StorybookConfig } from '@storybook/html-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": ['@storybook/addon-a11y', "@storybook/addon-docs"],
  "framework": {
    "name": "@storybook/html-vite",
    "options": {}
  },
  "docs": {
    defaultName: 'ドキュメント',
  },
};
export default config;