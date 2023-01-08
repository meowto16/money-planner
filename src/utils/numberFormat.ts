const numberFormat = (num: number): string => new Intl.NumberFormat('ru-RU').format(num)
const numberUnformat = (num: string): number => +num.replace(/[^0-9]/g, '')

export {
  numberFormat,
  numberUnformat,
}