// =============================================================
// YAHAN APNA SCRIPT PASTE KARO
// Har scene ek object hai. "type" decide karta hai kaunsa
// animation style use hoga. "durationInSeconds" scene ki length hai.
// =============================================================

export type SceneType = 'title' | 'whiteboard' | 'kinetic' | 'quote';

export interface Scene {
  type: SceneType;
  // Main text jo dikhega (whiteboard me sirf KEYWORDS likho, poora sentence nahi)
  text: string;
  // Optional smaller supporting line (kinetic/quote scenes ke liye)
  subtext?: string;
  durationInSeconds: number;
}

export const scenes: Scene[] = [
  { type: 'title', text: "YOU'RE BEING FOOLED", subtext: 'BY THE "STOP HUNT" STORY', durationInSeconds: 4 },

  { type: 'kinetic', text: 'Imagine this.', durationInSeconds: 2.5 },
  { type: 'kinetic', text: 'You open your chart.', durationInSeconds: 3 },
  { type: 'kinetic', text: 'Price is sitting just above an obvious swing low.', durationInSeconds: 4 },
  { type: 'kinetic', text: 'You do what every trading master told you to do.', durationInSeconds: 4 },
  { type: 'kinetic', text: 'You enter long...', durationInSeconds: 2.5 },
  { type: 'kinetic', text: '...and place your stop loss just below that low.', durationInSeconds: 4 },
  { type: 'kinetic', text: 'A few minutes later, price drops.', durationInSeconds: 3 },
  { type: 'kinetic', text: 'It touches your stop.', durationInSeconds: 2.5 },
  { type: 'kinetic', text: "You're out.", durationInSeconds: 2 },
  { type: 'kinetic', text: 'And then...', subtext: 'price immediately shoots back up.', durationInSeconds: 4 },
  { type: 'quote', text: 'They hunted my stop.', durationInSeconds: 3.5 },

  { type: 'kinetic', text: 'This is one of the most powerful stories ever sold to retail traders.', durationInSeconds: 5 },
  { type: 'kinetic', text: '"Smart money knows where your stop is."', durationInSeconds: 3.5 },
  { type: 'kinetic', text: '"Institutions pushed price down to collect retail liquidity."', durationInSeconds: 4 },
  { type: 'kinetic', text: '"They engineered the liquidity sweep."', durationInSeconds: 3.5 },
  { type: 'kinetic', text: 'And because the chart often looks exactly like that...', subtext: 'you believe it.', durationInSeconds: 4.5 },

  { type: 'kinetic', text: "But let's slow down.", durationInSeconds: 3 },
  { type: 'kinetic', text: 'There is something real underneath this story.', durationInSeconds: 3.5 },
  { type: 'whiteboard', text: 'LIQUIDITY', durationInSeconds: 3 },
  { type: 'kinetic', text: 'Liquidity really does cluster around obvious prices.', durationInSeconds: 4 },
  { type: 'whiteboard', text: 'SWING HIGHS & LOWS', durationInSeconds: 3.5 },
  { type: 'kinetic', text: 'Previous day highs and lows. Range boundaries. Breakout levels.', durationInSeconds: 4.5 },
  { type: 'kinetic', text: 'These are visible to millions of market participants.', durationInSeconds: 4 },
  { type: 'kinetic', text: 'And stop orders can accumulate around them.', durationInSeconds: 3.5 },
  { type: 'kinetic', text: 'So when price approaches one of these areas, a lot can happen.', durationInSeconds: 4.5 },
  { type: 'kinetic', text: 'Stops can trigger. Breakout traders can enter. Existing positions can exit.', durationInSeconds: 5 },
  { type: 'kinetic', text: 'Limit orders can absorb aggressive orders.', subtext: 'Algorithms can react to the same information.', durationInSeconds: 5 },
  { type: 'kinetic', text: 'And suddenly...', subtext: 'you get a fast move through the level.', durationInSeconds: 4 },

  { type: 'kinetic', text: "But here's where the story gets distorted.", durationInSeconds: 3.5 },
  { type: 'quote', text: "The market doesn't need to know your stop.", durationInSeconds: 4 },
  { type: 'kinetic', text: "And it doesn't need to personally target retail traders.", durationInSeconds: 4 },
  { type: 'kinetic', text: 'Price simply interacts with the orders and liquidity available around that area.', durationInSeconds: 5 },
  { type: 'kinetic', text: 'That difference sounds small.', subtext: 'But it completely changes how you read a chart.', durationInSeconds: 5 },

  { type: 'whiteboard', text: 'AUCTION THEORY', durationInSeconds: 3.5 },
  { type: 'kinetic', text: 'Think of the market as an auction.', durationInSeconds: 3.5 },
  { type: 'kinetic', text: 'Every moment, buyers and sellers are negotiating over price.', durationInSeconds: 4.5 },
  { type: 'kinetic', text: 'Price moves higher when the auction searches for sellers at higher prices.', durationInSeconds: 5 },
  { type: 'kinetic', text: 'It moves lower when the auction searches for buyers at lower prices.', durationInSeconds: 5 },
  { type: 'kinetic', text: 'And sometimes...', subtext: 'the market discovers that a price is acceptable.', durationInSeconds: 4.5 },
  { type: 'whiteboard', text: 'ACCEPTANCE', durationInSeconds: 3 },
  { type: 'kinetic', text: 'Other times, price reaches an area, trades there briefly, and gets rejected.', durationInSeconds: 5 },
  { type: 'whiteboard', text: 'REJECTION', durationInSeconds: 3 },

  { type: 'kinetic', text: 'Now go back to that swing low.', durationInSeconds: 3.5 },
  { type: 'kinetic', text: 'Price breaks below it.', subtext: 'Your stop gets triggered.', durationInSeconds: 4 },
  { type: 'kinetic', text: 'The internet calls it a liquidity hunt.', durationInSeconds: 3.5 },
  { type: 'kinetic', text: "But don't stop there.", subtext: 'Ask what happened after the break.', durationInSeconds: 4 },
  { type: 'kinetic', text: 'Did price remain below the low?', subtext: 'Did trading continue there?', durationInSeconds: 4.5 },
  { type: 'kinetic', text: 'Did the market establish value at those lower prices?', durationInSeconds: 4 },
  { type: 'kinetic', text: 'If yes, the auction may be accepting lower prices.', durationInSeconds: 4 },
  { type: 'kinetic', text: 'But what if price quickly moves below the low...', durationInSeconds: 4 },
  { type: 'kinetic', text: '...then returns back above it...', durationInSeconds: 3 },
  { type: 'kinetic', text: '...and begins trading comfortably inside the previous range?', durationInSeconds: 4 },
  { type: 'quote', text: 'Now you have evidence of rejection.', durationInSeconds: 4 },

  { type: 'kinetic', text: 'And that is far more useful than simply saying...', durationInSeconds: 4 },
  { type: 'quote', text: '"Smart money hunted the stops."', durationInSeconds: 3.5 },
  { type: 'kinetic', text: "Because you're no longer trying to read the mind of an invisible institution.", durationInSeconds: 5.5 },
  { type: 'kinetic', text: "You're observing the behavior of the auction.", durationInSeconds: 4 },
  { type: 'kinetic', text: 'And this is the biggest lesson.', durationInSeconds: 3.5 },

  { type: 'quote', text: 'A liquidity sweep is not automatically a reversal signal.', durationInSeconds: 4.5 },
  { type: 'quote', text: 'A break below a low is not automatically manipulation.', durationInSeconds: 4.5 },
  { type: 'quote', text: 'And a stop getting hit before price reverses is not proof that someone targeted you.', durationInSeconds: 5.5 },
  { type: 'quote', text: "The chart doesn't tell you a story.", subtext: 'You tell yourself the story.', durationInSeconds: 5 },

  { type: 'kinetic', text: 'Your job as a trader is to separate the story from the evidence.', durationInSeconds: 5 },
  { type: 'kinetic', text: "So next time price takes a well-known low, don't immediately ask...", durationInSeconds: 5 },
  { type: 'quote', text: '"Who hunted the stops?"', durationInSeconds: 3.5 },
  { type: 'kinetic', text: 'Ask instead:', durationInSeconds: 2.5 },
  { type: 'quote', text: '"Did the market accept these prices... or reject them?"', durationInSeconds: 4.5 },

  { type: 'kinetic', text: 'Because once you stop seeing every wick as a conspiracy...', durationInSeconds: 4.5 },
  { type: 'kinetic', text: '...and start seeing the market as an ongoing auction...', durationInSeconds: 4.5 },
  { type: 'kinetic', text: '...you stop trading the stories sold by trading masters...', durationInSeconds: 4.5 },
  { type: 'quote', text: 'and start reading what the market is actually doing.', durationInSeconds: 5 },
];

// FPS jis pe pura video calculate hota hai — Root.tsx me bhi yahi use hota hai
export const FPS = 30;
