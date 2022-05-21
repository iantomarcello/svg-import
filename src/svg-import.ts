import { html, LitElement } from 'lit';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * Imports an SVG and embed as HTML.
 *
 * @warning SVG rendered is not sanitized. Ensure the SVG file imported is a resource that you trust.
 */
@customElement('svg-import')
export class SvgImport extends LitElement {
  /** URL link to SVG resource. */
  @property({ type: String, attribute: true })
  src!: string;

  /** The HTMLDOMString of the SVG, set by importSVG_ */
  @state()
  protected _iconHTML: string | null = null;

  protected createRenderRoot(): Element | ShadowRoot {
    return this;
  }

  /**
   * Loads the SVG from resource and updates `._iconHTML`.
   */
  private async importSVG_(src = this.src) {
    this.dispatchEvent(
      new Event('loading', { bubbles: true, })
    );

    this._iconHTML = await fetch(src)
      .then(resp => resp.text())
      .then(text => {
        if (!text.startsWith('<svg')) {
          throw 'Resource is not an svg.';
        }
        return text;
      })
      .catch(err => {
        console.error(err);
        return null;
      });

    this.updateComplete.then(() => {
      this.dispatchEvent(
        new Event('loaded', { bubbles: true, })
      );
    });
  }

  protected updated(_changedProperties: Map<string | number | symbol, unknown>): void {
    if ( _changedProperties.has('src') ) {
      this.importSVG_();
    }
  }

  render() {
    if ( this._iconHTML == null) {
      return html`<img .src="${this.src}" alt="${ifDefined(this.title ? this.title : undefined)}">`
    }
    return html`${unsafeHTML(this._iconHTML)}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'svg-import': SvgImport,
  }
}
