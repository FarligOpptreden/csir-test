export default function asyncify(func: Function, delay: number): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(func());
    }, delay);
  });
}
