AT.prototype.atReCaptchaRendered = function() {
    $.getScript('//www.google.com/recaptcha/api.js?hl=' + 'fr');
};

AT.prototype.atReCaptchaHelpers = {
    key: function() {
        if (AccountsTemplates.options.reCaptcha && AccountsTemplates.options.reCaptcha.siteKey)
            return AccountsTemplates.options.reCaptcha.siteKey;
        return Meteor.settings.public.reCaptcha.siteKey;
    },

    theme: function() {
        return AccountsTemplates.options.reCaptcha && AccountsTemplates.options.reCaptcha.theme;
    },

    data_type: function() {
        return AccountsTemplates.options.reCaptcha && AccountsTemplates.options.reCaptcha.data_type;
    },
};
