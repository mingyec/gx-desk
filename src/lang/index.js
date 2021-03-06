import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { storage } from '../utils/storage'
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n);

const messages = {
    en: {
        ...enLocale,
        ...elementEnLocale
    },
    zh: {
        ...zhLocale,
        ...elementZhLocale
    }
}

const i18n = new VueI18n({
    locale: storage.get('lang') || 'zh',
    messages
})
console.info(i18n)

export default i18n
