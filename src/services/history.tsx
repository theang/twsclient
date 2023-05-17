import config from "config.json"

export type TickerType = {
    name: string,
    exchange: string,
    typ: string,
    prec: number
}

export type TickerTypeSize = {
    tickerType: TickerType,
    barSize: string
}

export type TickerHistoryRequest = {
    ticker: TickerTypeSize,
    from: number,
    to: number
}

// history data layout, u64 - typed array, f64 typed array:
// u64[bar*6] : epoch millisecond
// f64[bar*6 + 1] : open : double
// f64[bar*6 + 2] : high : double
// f64[bar*6 + 3] : low  : double
// f64[bar*6 + 4] : close: double
// f64[bar*6 + 5] : vol  : double
export type HistoryData = {
    u64: BigUint64Array,
    f64: Float64Array
}

export class HistoryApi {
    public static getHistory(request: TickerHistoryRequest) {
        fetch(`${config.BACKEND}/hist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        }).then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error, status = ${response.status}`);
            }
            return response.arrayBuffer();
        }).then((arrayBuffer: ArrayBuffer) => {
            const historyData: HistoryData = { u64: new BigUint64Array(arrayBuffer), f64: new Float64Array(arrayBuffer) };
            return historyData;
        });
    }
}