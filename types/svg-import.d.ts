import { LitElement } from 'lit';
/**
 * Imports an SVG and embed as HTML.
 *
 * @warning SVG rendered is not sanitized. Ensure the SVG file imported is a resource that you trust.
 */
export declare class SvgImport extends LitElement {
    /** URL link to SVG resource. */
    src: string;
    /** The HTMLDOMString of the SVG, set by importSVG_ */
    protected _iconHTML: string | null;
    protected createRenderRoot(): Element | ShadowRoot;
    /**
     * Loads the SVG from resource and updates `._iconHTML`.
     */
    private importSVG_;
    protected updated(_changedProperties: Map<string | number | symbol, unknown>): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'svg-import': SvgImport;
    }
}
