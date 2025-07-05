import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

import Logo from "./logo.svg";

addons.setConfig({
  theme: create({
    base: 'light',
    // フォント
    fontBase: '"Noto Sans JP", sans-serif',
    fontCode: '"Source Code Pro", monospace',

    // 左上のStorybookのロゴが入っていたエリア
    brandTitle: 'E2 UI Samples', // imgタグのalt属性に反映される
    brandUrl: '/?path=/docs/information', // imgをクリックした場合の遷移先
    brandImage: Logo, // 左上の画像
    brandTarget: '_self', // 遷移の仕方。aタグのtarget属性に反映される

    // カラー
    colorPrimary: '#228fc0',
    colorSecondary: '#585C6D',

    // UI
    appBg: '#f4f7f7', // サイドナビ背景
    appContentBg: '#fff', // 下部のタブパネルエリア背景
    appPreviewBg: '#fff', // プレビューエリア背景
    appBorderColor: '#eee', // ボーダーカラー
    appBorderRadius: 0, // 角丸

    // テキストカラー
    textColor: '#333',
    textInverseColor: '#fff',

    // ツールバー（下部のタブパネル）
    barTextColor: '#9E9E9E', // タブタイトルテキスト
    barSelectedColor: '#aaaaaa', // 選択中のタブ
    barHoverColor: '#585C6D', // タブホバー中の下線
    barBg: '#f4f7f7', // タブバーの背景

    // フォームカラー
    inputBg: '#f4f7f7', // input背景
    inputBorder: '#585C6D', // inputボーダー
    inputTextColor: '#10162F', // inputテキスト
    inputBorderRadius: 0, // inputの角丸
  }),
});