export default function ({ app, redirect, req }) {
  //check set default language
  if (app.$auth.$state.user.settings[0].default_language === undefined || app.$auth.$state.user.settings[0].default_language === ""){
    return redirect('/pos/setting')
  }
}