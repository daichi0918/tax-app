import {
  calcRetirementIncomeDeduction,
  // calcTaxableRetirementIncome,
  // calcIncomeTaxBase,
  // calcTaxWithheld,
  calcIncomeTaxForSeverancePay,
} from './calcTax'

describe('退職所得控除額', () => {
  describe('勤続年数が1年の場合', () => {
    describe('「障害者となったことに直接基因して退職」に該当しない場合', () => {
      test.each`
        yearsOfService | expected
        ${1}           | ${800_000}
      `(
        '勤続年数$yearsOfService年 → $expected円',
        ({ yearsOfService, expected }) => {
          const deduction = calcRetirementIncomeDeduction({
            yearsOfService,
            isDisability: false,
          })
          expect(deduction).toBe(expected)
        },
      )
    })
    describe('「障害者となったことに直接基因して退職」に該当する場合', () => {
      test.each`
        yearsOfService | expected
        ${1}           | ${1_800_000}
      `(
        '勤続年数$yearsOfService年 → $expected円',
        ({ yearsOfService, expected }) => {
          const deduction = calcRetirementIncomeDeduction({
            yearsOfService,
            isDisability: true,
          })
          expect(deduction).toBe(expected)
        },
      )
    })
  })
  describe('勤続年数が2年から19年の場合', () => {
    describe('「障害者となったことに直接基因して退職」に該当しない場合', () => {
      test.each`
        yearsOfService | expected
        ${2}           | ${800_000}
        ${3}           | ${1_200_000}
        ${19}          | ${7_600_000}
      `(
        '勤続年数$yearsOfService年 → $expected円',
        ({ yearsOfService, expected }) => {
          const deduction = calcRetirementIncomeDeduction({
            yearsOfService,
            isDisability: false,
          })
          expect(deduction).toBe(expected)
        },
      )
    })
    describe('「障害者となったことに直接基因して退職」に該当する場合', () => {
      test.each`
        yearsOfService | expected
        ${2}           | ${1_800_000}
        ${3}           | ${2_200_000}
        ${19}          | ${8_600_000}
      `(
        '勤続年数$yearsOfService年 → $expected円',
        ({ yearsOfService, expected }) => {
          const deduction = calcRetirementIncomeDeduction({
            yearsOfService,
            isDisability: true,
          })
          expect(deduction).toBe(expected)
        },
      )
    })
  })
  describe('勤続年数が20年超の場合', () => {
    describe('「障害者となったことに直接基因して退職」に該当しない場合', () => {
      test.each`
        yearsOfService | expected
        ${20}          | ${8_000_000}
        ${21}          | ${8_700_000}
        ${30}          | ${15_000_000}
      `(
        '勤続年数$yearsOfService年 → $expected円',
        ({ yearsOfService, expected }) => {
          const deduction = calcRetirementIncomeDeduction({
            yearsOfService,
            isDisability: false,
          })
          expect(deduction).toBe(expected)
        },
      )
    })
    describe('「障害者となったことに直接基因して退職」に該当する場合', () => {
      test.each`
        yearsOfService | expected
        ${20}          | ${9_000_000}
        ${21}          | ${9_700_000}
        ${30}          | ${16_000_000}
      `(
        '勤続年数$yearsOfService年 → $expected円',
        ({ yearsOfService, expected }) => {
          const deduction = calcRetirementIncomeDeduction({
            yearsOfService,
            isDisability: true,
          })
          expect(deduction).toBe(expected)
        },
      )
    })
  })
})

describe('退職金の所得税', () => {
  test.each`
    yearsOfService | isDisability | isOfficer | severancePay | expected
    ${5}           | ${false}     | ${false}  | ${8_000_000} | ${482422}
    ${10}          | ${false}     | ${false}  | ${8_000_000} | ${104652}
    ${5}           | ${true}      | ${false}  | ${8_000_000} | ${278222}
    ${10}          | ${true}      | ${false}  | ${8_000_000} | ${76575}
    ${5}           | ${false}     | ${true}   | ${8_000_000} | ${788722}
    ${10}          | ${false}     | ${true}   | ${8_000_000} | ${104652}
    ${5}           | ${true}      | ${true}   | ${8_000_000} | ${584522}
    ${10}          | ${true}      | ${true}   | ${8_000_000} | ${76575}
  `(
    '勤続年数$yearsOfService年・障害者となったことに直接基因して退職:$isDisability・' +
      '役員等:$isOfficer・退職金$severancePay円 → $expected円',
    ({ yearsOfService, isDisability, isOfficer, severancePay, expected }) => {
      const tax = calcIncomeTaxForSeverancePay({
        yearsOfService,
        isDisability,
        isOfficer,
        severancePay,
      })
      expect(tax).toBe(expected)
    },
  )
})
