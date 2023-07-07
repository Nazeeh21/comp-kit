export const makeCancelable = <T>(
  promise: Promise<T>
): { promise: Promise<T>; cancel: () => void } => {
  let hasCanceled = false;

  const wrappedPromise = new Promise<T>((resolve, reject) => {
    promise.then(
      value => {
        if (!hasCanceled) {
          resolve(value);
        }
      },
      error => {
        if (!hasCanceled) {
          reject(error);
        }
      }
    );
  });

  return {
    promise: wrappedPromise,
    cancel: () => {
      hasCanceled = true;
    },
  };
};
