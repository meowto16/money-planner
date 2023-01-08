import { numberFormat, numberUnformat } from './numberFormat'

describe('numberFormat', () => {
  it('Should format to RU format', () => {
    expect(numberFormat(1_000_000)).toBe('1 000 000')
  })
})

describe('numberUnformat', () => {
  it('Should parse from RU format to number', () => {
    const formatted = numberFormat(1_000_000)

    expect(numberUnformat(formatted)).toBe(1_000_000)
  })
})