import type { Preview } from '@storybook/html-vite';
import { create } from 'storybook/theming';
import DocumentationTemplate from './DocumentationTemplate.mdx';
import '/src/css/style.css';
const preview: Preview = {
  parameters: {
    docs: {
      theme: create({
        base: 'light',
        fontBase: '"Noto Sans JP", sans-serif',
        fontCode: '"Source Code Pro", monospace',
      }),
      page: DocumentationTemplate,
      codePanel: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
