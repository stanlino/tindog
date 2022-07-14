import { format, intervalToDuration, parse } from "date-fns"
import I18n from "i18n-js"

type DateFormatted = {
  nanoseconds: number
  seconds: number
}

export function calculateFullAge(birth_date: Date) {
  const date = birth_date as unknown as DateFormatted
  
  if (date.seconds) {
    const dateFormatted = new Date(date.seconds * 1000)
    const birthDate = parse(format(dateFormatted, 'dd/MM/yyyy'), "dd/MM/yyyy", new Date())
    const { years, months } = intervalToDuration({ start: birthDate, end: new Date() })

    return `${years} ${I18n.t('year')}${years! > 1 && 's'}${months! > 0 ? `, ${months} ${I18n.t('months')}` : ''}`
  }

  const birthDate = parse(format(birth_date, 'dd/MM/yyyy'), "dd/MM/yyyy", new Date())
  const { years, months } = intervalToDuration({ start: birthDate, end: new Date() })

  return `${years} ${I18n.t('year')}${years! > 1 && 's'}${months! > 0 ? `, ${months} ${I18n.t('months')}` : ''}`
}