export const getPercentStep = (total: number): number => {
  if (total >= 0 && total <= 10) {
    return 0.5
  }

  if (total >= 100 && total <= 1_000) {
    return 5
  }

  if (total >= 1_000 && total <= 10_000) {
    return 50
  }

  if (total >= 10_000 && total <= 100_000) {
    return 500
  }

  if (total >= 100_000 && total <= 500_000) {
    return 1_000
  }

  if (total >= 500_000 && total <= 1_000_000) {
    return 5_000
  }

  return 1
}