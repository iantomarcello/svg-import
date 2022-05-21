import { LitElement, html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { property, state, customElement } from "lit/decorators.js";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
let SvgImport = class extends LitElement {
  constructor() {
    super(...arguments);
    this._iconHTML = null;
  }
  createRenderRoot() {
    return this;
  }
  async importSVG_(src = this.src) {
    this.dispatchEvent(new Event("loading", { bubbles: true }));
    this._iconHTML = await fetch(src).then((resp) => resp.text()).then((text) => {
      if (!text.startsWith("<svg")) {
        throw "Resource is not an svg.";
      }
      return text;
    }).catch((err) => {
      console.error(err);
      return null;
    });
    this.updateComplete.then(() => {
      this.dispatchEvent(new Event("loaded", { bubbles: true }));
    });
  }
  updated(_changedProperties) {
    if (_changedProperties.has("src")) {
      this.importSVG_();
    }
  }
  render() {
    if (this._iconHTML == null) {
      return html`<img .src="${this.src}" alt="${ifDefined(this.title ? this.title : void 0)}">`;
    }
    return html`${unsafeHTML(this._iconHTML)}`;
  }
};
__decorateClass([
  property({ type: String, attribute: true })
], SvgImport.prototype, "src", 2);
__decorateClass([
  state()
], SvgImport.prototype, "_iconHTML", 2);
SvgImport = __decorateClass([
  customElement("svg-import")
], SvgImport);
export { SvgImport };
