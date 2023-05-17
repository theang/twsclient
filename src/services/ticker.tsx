import config from "config.json"

export type TickerType = {
    id: number,
    name: string,
    exchange: string,
    typ: string,
    barSize: string,
    prec: number
}

export class TickerApi {
    public static async getTickers(): Promise<Array<TickerType>> {
        const result = await fetch(`${config.BACKEND}/tickerType`)
        return result.json()
    }
}