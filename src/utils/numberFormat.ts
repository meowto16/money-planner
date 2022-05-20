const numberFormat = new Intl.NumberFormat('ru-RU')
export const numberUnformat = (num: string): number => +num.replace(/[^0-9]/g, '')

export default numberFormat