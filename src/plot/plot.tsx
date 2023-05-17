export type PlotProps = {
    volPrice: boolean,
    volSeries: boolean,
    typ: string
}

export class Plot {
    _gl: WebGL2RenderingContext;
    _props: PlotProps;

    constructor(canvas: HTMLCanvasElement, props: PlotProps) {
        this._gl = canvas.getContext("webgl2", {
           antialias: true 
        })
        if (!this._gl) {
            throw new Error(`Could not initialize webgl2`);
        }
        this._props = props
    }
}