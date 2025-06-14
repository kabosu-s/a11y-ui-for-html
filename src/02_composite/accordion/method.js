export const Accordionset = () => {
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".js_accordion").forEach((el) => {
      const acc = new Accordion(el);
      acc.init();
    });
  });
}

class Accordion {
  constructor(el) {
    this.details = el;
    this.trigger = el.querySelector("summary");
    this.panel = this.trigger.nextElementSibling;
    this.isOpen = el.open;
    this.isAnimating = false;
  }

  init() {
    this._updateAria(this.isOpen);
    this.trigger.setAttribute("role", "button");

    this.panel.style.overflow = "hidden";
    this.panel.style.height = this.isOpen ? "auto" : "0";

    this.trigger.addEventListener("click", (e) => {
      e.preventDefault(); // ここでデフォルト阻止して自前制御に切り替える
      this.toggle();
    });

    this.trigger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.toggle();
      }
    });
  }

  async toggle() {
    if (this.isAnimating) return;

    this.isOpen = !this.isOpen;
    this.details.open = true; // open属性を先に立てる（CSS的に必要な場合あり）

    this._updateAria(this.isOpen);
    this.isAnimating = true;

    if (this.isOpen) {
      await this._expand();
    } else {
      await this._collapse();
      this.details.open = false; // 閉じた後にopenをfalse
    }

    this.isAnimating = false;
  }

  _updateAria(isOpen) {
    this.trigger.setAttribute("aria-expanded", String(isOpen));
    this.panel.setAttribute("aria-hidden", String(!isOpen));
  }

  _expand() {
    this.panel.style.height = "auto";
    const height = this.panel.scrollHeight + "px";
    this.panel.style.height = "0";
    requestAnimationFrame(() => {
      this.panel.style.transition = "height 300ms ease-in-out";
      this.panel.style.height = height;
    });

    return new Promise((res) => {
      this.panel.addEventListener("transitionend", () => {
        this.panel.style.height = "auto";
        this.panel.style.transition = "";
        res();
      }, { once: true });
    });
  }

  _collapse() {
    const height = this.panel.scrollHeight + "px";
    this.panel.style.height = height;
    requestAnimationFrame(() => {
      this.panel.style.transition = "height 300ms ease-in-out";
      this.panel.style.height = "0";
    });

    return new Promise((res) => {
      this.panel.addEventListener("transitionend", () => {
        this.panel.style.transition = "";
        res();
      }, { once: true });
    });
  }
}