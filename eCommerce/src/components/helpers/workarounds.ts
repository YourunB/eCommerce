import state from '../../state/state';

/**
 * function is checking myCart.cart and if it undefined will check again after interval ms and repeat it count times.
 * @type {number, number}
 * @example await waitCart(5, 100);
 */
export async function waitCart(count: number, interval: number): Promise<void> {
  let cnt = count;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (cnt < 1) return Promise.resolve();
    try {
      if (state.isLoaded) {
        return Promise.resolve();
      } else throw new Error();
    } catch (error) {
      cnt -= 1;
      await delay(interval * 1.5);
    }
  }
}

/**
 * function is checking state.access_token.access_token and if it undefined will check again after interval ms and repeat it count times.
 * @type {number, number}
 * @example await waitToken(5, 100);
 */
export async function waitToken(count: number, interval: number): Promise<void> {
  let cnt = count;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (cnt < 1) return Promise.resolve();
    try {
      if (state.isLoaded) {
        return Promise.resolve();
      } else throw new Error();
    } catch (error) {
      cnt -= 1;
      await delay(interval * 1.5);
    }
  }
}

function delay(interval: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, interval);
  });
}
