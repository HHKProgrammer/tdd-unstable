function diceRoll(randomFn = Math.random) {//input random
  const min = 1;
  const max = 6;
  return Math.floor(randomFn() * (max + 1 - min) + min);// MathRandom unpredictable
}

export function diceHandValue(randomFn = Math.random) {
  const die1 = diceRoll(randomFn);
  const die2 = diceRoll(randomFn);
  if (die1 === die2) {
    // one pair
    return 100 + die1;
  } else {
    // high die
    return Math.max(die1, die2);
  }
}
