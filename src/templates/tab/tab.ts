export const tab = () => {
  const tabs = document.getElementsByClassName('js-tab') as HTMLCollectionOf<HTMLElement>;

  if (!tabs) return;

  const _closeAllTabs = (contents: HTMLCollectionOf<Element>) => {
    for (const content of Array.from(contents)) {
      content.setAttribute('aria-hidden', 'true');
    }
  };

  const _openTab = (tab: HTMLElement, targetId: string) => {
    const target = tab.querySelector(`#${targetId}`);

    target?.setAttribute('aria-hidden', 'false');
  };

  for (const tab of Array.from(tabs)) {
    const tabButtons = tab.getElementsByClassName('js-tab__button');
    const tabPanel = tab.getElementsByClassName('js-tab__panel');

    for (const button of Array.from(tabButtons)) {
      button.addEventListener('click', () => {
        const targetId = button.getAttribute('aria-controls');

        if (!targetId) return;

        _closeAllTabs(tabPanel);
        _openTab(tab, targetId);
      });
    }
  }
};
