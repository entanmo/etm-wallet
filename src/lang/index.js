import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './en_GB'
import cn from './zh_CN'
Vue.use(VueI18n)

const DEFAULT_LANG = 'zh_CN'
const LOCALE_KEY = 'localeLanguage'

const locales = {
  'zh_CN': {
    ...cn
  },
  'en_GB': {
    ...en
  }
}
const i18n = new VueI18n({
  locale: DEFAULT_LANG,
  messages: locales
})
export const setup = lang => {
  if (lang === undefined) {
    lang = window.sessionStorage.getItem(LOCALE_KEY)
    if (locales[lang] === undefined) {
      lang = DEFAULT_LANG
    }
  }
  window.sessionStorage.setItem(LOCALE_KEY, lang)
  Object.keys(locales).forEach(lang => {
    document.body.classList.remove(`lang-${lang}`)
  })
  document.body.classList.add(`lang-${lang}`)
  document.body.setAttribute('lang', lang)

  Vue.config.lang = lang
  i18n.locale = lang
}
window.i18n = i18n
setup()
export default i18n
