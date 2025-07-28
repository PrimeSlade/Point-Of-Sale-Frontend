function getPaginationRange(
  current: number,
  total: number
): (number | "...")[] {
  const range: (number | "...")[] = [];

  range.push(0);

  if (current > 2) {
    range.push("...");
  }

  for (let i = current - 1; i <= current + 1; i++) {
    if (i > 0 && i < total - 1) {
      range.push(i);
    }
  }

  if (current < total - 3) {
    range.push("...");
  }

  if (total > 1) {
    range.push(total - 1);
  }

  return range;
}

export default getPaginationRange;
