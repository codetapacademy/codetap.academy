
export const mapLevel = {
  supporter: 0,
  starter: 1,
  wise: 2,
  mentored: 3
}

// '01:25:41' -> split
// ['01', '25', '41'] -> reverse()
// ['41', '25', '01']
export const getTotalSeconds = duration => duration
  .split(':')
  .reverse()
  .map((v, c) => +v * Math.pow(60, c))
  .reduce((a, c) => a + c, 0)

// {name: 'Marian', 0: 0, 1: 0, 2: 0, ...., 150: 0}
export const getPlayHistoryObject = seconds => Array
  .from({ length: seconds + 1 }, (_, k) => k)
  // [0, 1, 2, 3, 4, ..., 150]
  .reduce((a, c) => ({ ...a, [c]: 0 }), {})
