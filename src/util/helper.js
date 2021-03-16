
function getStandardDeviation (array) {
  const n = array.length
  const mean = array.reduce((a, b) => a + b.value, 0) / n
  const standardDeviation = Math.sqrt(array.map(x => Math.pow(x.value - mean, 2)).reduce((a, b) => a + b) / n)
  return [mean, standardDeviation]
}


function calcMedian(arr) {
  const ar1 = arr.map(el => el.value)
  const half = Math.floor(ar1.length / 2);
  ar1.sort(function(a, b) { return a - b;});
  if (ar1.length % 2) {
    return ar1[half];
  } else {
    return (ar1[half] + ar1[half] + 1) / 2.0;
  }
}

function getModes(arr) {
  let frequency = {}; // array of frequency.
  let maxFreq = 0; // holds the max frequency.
  let modes = [];

  let array = arr.map(el => el.value)

  for (let i in array) {
    frequency[array[i]] = (frequency[array[i]] || 0) + 1; // increment frequency.

    if (frequency[array[i]] > maxFreq) { // is this frequency > max so far ?
      maxFreq = frequency[array[i]]; // update max.
    }
  }

  for (let k in frequency) {
    if (frequency[k] === maxFreq) {
      modes.push(k);
    }
  }

  return modes;
}


function getLost (arr) {
  const lost = arr.reduce((acc, curEl, curIndex) => {
    let prev = curIndex  === arr.length - 1 ? curIndex : curIndex  + 1

    let delta = arr[prev]?.id - curEl?.id - 1
    return delta > 1 ? acc += delta : acc += 0
  }, 0)

  return lost;

}


export const getStats = (arr, stats, setStats) => {
  if(arr.length) {
    const time_0 = performance.now();

    const [mean, standardDeviation] = getStandardDeviation(arr)
    const med = calcMedian(arr)
    const modes = getModes(arr)
    const lost = getLost(arr)

    const duration = (performance.now() - time_0)
    setStats([...stats, {mean: mean,  standardDeviation: standardDeviation, med: med, modes: modes.join(', '), lost: lost, duration: duration}])

  } else {
    alert('Данные для статистики отсутствуют!!!')
  }

}