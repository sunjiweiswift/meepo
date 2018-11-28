// api
const DOMAIN = location.href.indexOf('localhost') > -1 ? '//10.121.177.139:8888' : location.href.indexOf('test') > -1 ? '//10.121.177.139:8000' : '//10.121.177.139:8000'

export const FETCH_TAMPLATE_INFO_URL = `${DOMAIN}/api/template`
export const SUBMIT_TAMPLATE_INFO_URL = `${DOMAIN}/api/submit`
