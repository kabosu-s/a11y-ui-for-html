import type { Preview } from '@storybook/html';
import CustomTheme from './Theme';
import DocumentationTemplate from './DocumentationTemplate.mdx';
import '../src/css/style.css';
const preview: Preview = {
  parameters: {
    docs: { 
        theme: CustomTheme,// Docsのテーマ設定
        page: DocumentationTemplate,
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