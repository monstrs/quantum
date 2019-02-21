import { SELF_MODIFIER_NAME, Styles } from './types'

export const extract = (styles: Styles): string[] =>
  Object.keys(styles).reduce((result: string[], modifier: string) => {
    if (modifier === SELF_MODIFIER_NAME) {
      return result
    }

    const [name] = modifier.split('=')

    if (name) {
      return [...result, name]
    }

    return result
  }, [])
