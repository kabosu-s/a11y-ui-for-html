
export const tab = (): void => {
  const closeAllTabs = (buttons: NodeListOf<HTMLButtonElement>): void => {
    buttons.forEach((button) => {
      const panelId = button.getAttribute("aria-controls");
      if (panelId) {
        const panel = document.getElementById(panelId);
        if (panel) {
          panel.setAttribute("aria-hidden", "true");
          panel.style.display = "none";
        }
      }
      button.setAttribute("aria-selected", "false");
    });
  };

  const openTab = (button: HTMLButtonElement): void => {
    const panelId = button.getAttribute("aria-controls");
    if (panelId) {
      const panel = document.getElementById(panelId);
      if (panel) {
        panel.setAttribute("aria-hidden", "false");
        panel.style.display = "block";
        panel.setAttribute("tabindex", "-1");
        panel.focus();
      }
    }
    button.setAttribute("aria-selected", "true");
  };

  const initTabs = (): void => {
    const tablists = document.querySelectorAll<HTMLElement>('[role="tablist"]');

    tablists.forEach((tablist) => {
      const buttons = tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]');

      tablist.setAttribute("aria-orientation", "horizontal");

      buttons.forEach((button, index) => {
        const panelId = button.getAttribute("aria-controls");
        button.setAttribute("aria-selected", index === 0 ? "true" : "false");
        button.setAttribute("tabindex", "0"); // すべて0に統一

        if (panelId) {
          const panel = document.getElementById(panelId);
          if (panel) {
            panel.setAttribute("role", "tabpanel");
            panel.setAttribute("aria-labelledby", button.id);
            panel.setAttribute("aria-hidden", index === 0 ? "false" : "true");
            panel.setAttribute("aria-live", "polite");
            panel.style.display = index === 0 ? "block" : "none";
          }
        }
      });

      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          closeAllTabs(buttons);
          openTab(button);
          button.focus();
        });

        button.addEventListener("keydown", (e: KeyboardEvent) => {
          const key = e.key;
          const currentIndex = Array.from(buttons).indexOf(button);
          let newIndex = currentIndex;

          switch (key) {
            case "ArrowRight":
              newIndex = (currentIndex + 1) % buttons.length;
              e.preventDefault();
              buttons[newIndex].focus();
              break;
            case "ArrowLeft":
              newIndex = (currentIndex - 1 + buttons.length) % buttons.length;
              e.preventDefault();
              buttons[newIndex].focus();
              break;
            case "Home":
              newIndex = 0;
              e.preventDefault();
              buttons[newIndex].focus();
              break;
            case "End":
              newIndex = buttons.length - 1;
              e.preventDefault();
              buttons[newIndex].focus();
              break;
            case "Enter":
            case " ":
              e.preventDefault();
              closeAllTabs(buttons);
              openTab(button);
              break;
            default:
              break;
          }
        });
      });
    });
  };

  initTabs();
};
