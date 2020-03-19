/* [USAGE] *
let a = null;
let result = idx(a, _ => _.b);
console.log(result); // Logs: null

a = { b: 1 };
result = idx(a, _ => _.b);
console.log(result); // Logs: 1
* [USAGE] */
export function idx<T1, T2>(model: T1, idxFn: (input: T1) => T2): T2 {
  try {
    return idxFn(model);
  } catch {
    return null;
  }
}
