export interface Candle {
  open: number;
  close: number;
  high: number;
  low: number;
}

// Narrative-crafted price action: sideways range → swing low forms →
// a deep wick sweeps below it (the "stop hunt") → sharp recovery.
export const candles: Candle[] = [
  { open: 102, close: 104, high: 105, low: 101 },
  { open: 104, close: 103, high: 105, low: 102 },
  { open: 103, close: 105, high: 106, low: 102 },
  { open: 105, close: 104, high: 106, low: 103 },
  { open: 104, close: 102, high: 105, low: 101 },
  { open: 102, close: 100, high: 103, low: 99 },
  { open: 100, close: 101, high: 102, low: 99 },
  { open: 101, close: 99, high: 102, low: 98 },
  { open: 99, close: 97, high: 100, low: 96 },
  { open: 97, close: 96, high: 98, low: 95 }, // <- swing low candle (low = 95)
  { open: 96, close: 98, high: 99, low: 95 },
  { open: 98, close: 100, high: 101, low: 97 },
  { open: 100, close: 99, high: 102, low: 98 },
  { open: 99, close: 101, high: 102, low: 98 },
  { open: 101, close: 100, high: 103, low: 99 },
  { open: 100, close: 99, high: 101, low: 92 }, // <- the sweep candle (deep wick, closes back up)
  { open: 99, close: 103, high: 104, low: 98 },
  { open: 103, close: 107, high: 108, low: 102 },
  { open: 107, close: 111, high: 112, low: 106 },
];

export const SWING_LOW_PRICE = 95;
export const STOP_LOSS_PRICE = 93.5;
export const SWEEP_CANDLE_INDEX = 15;

export const PRICE_MIN = 88;
export const PRICE_MAX = 114;
