import { addons } from '@storybook/manager-api';
import CustomTheme from './Theme';

addons.setConfig({
  theme: CustomTheme,
});