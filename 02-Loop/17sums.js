function sums(number) {
  if (typeof number !== 'number' || number < 2 || !Number.isInteger(number)) {
    return [];
  }

  function generatePartitions(target, current, start) {
    if (target === 0) {
      partitions.push([...current]);
      return;
    }

    for (let i = start; i <= target; i++) {
      current.push(i);
      generatePartitions(target - i, current, i);
      current.pop();
    }
  }

  const partitions = [];
  generatePartitions(number, [], 1);

  // Remove duplicate partitions and sort the result
  const uniquePartitions = Array.from(
    new Set(partitions.map(JSON.stringify)),
    JSON.parse
  );
  uniquePartitions.sort((a, b) => a.length - b.length || a[0] - b[0]);

  // Filter out arrays containing the original number
  const result = uniquePartitions.filter(
    (partition) => partition[0] !== number
  );

  return result;
}

//   // Example usage:
//   const result = sums(2);
//   console.log(result);
