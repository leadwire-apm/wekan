// We save the user language preference in the user profile, and use that to set
// the language reactively. If the user is not connected we use the language
// information provided by the browser, and default to english.

Meteor.startup(() => {
  TAPi18n.conf.i18n_files_route = Meteor._relativeToSiteRootUrl('/tap-i18n');
  const currentUser = Meteor.user();

    TAPi18n.setLanguage('fr');
    T9n.setLanguage('fr');

});
