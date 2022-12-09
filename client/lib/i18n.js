import { TAPi18n } from '/imports/i18n';

// We save the user language preference in the user profile, and use that to set
// the language reactively. If the user is not connected we use the language
// information provided by the browser, and default to english.

Meteor.startup(() => {
  const currentUser = Meteor.user();

    TAPi18n.setLanguage('fr');

});
