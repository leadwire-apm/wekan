import { DatePicker } from '/client/lib/datepicker';

function setFr() {

if (moment.locale() != 'fr') {

    var monthsStrictRegex$1 = /^(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i,
        monthsShortStrictRegex$1 = /(janv\.?|févr\.?|mars|avr\.?|mai|juin|juil\.?|août|sept\.?|oct\.?|nov\.?|déc\.?)/i,
        monthsRegex$6 = /(janv\.?|févr\.?|mars|avr\.?|mai|juin|juil\.?|août|sept\.?|oct\.?|nov\.?|déc\.?|janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i,
        monthsParse$6 = [
            /^janv/i,
            /^févr/i,
            /^mars/i,
            /^avr/i,
            /^mai/i,
            /^juin/i,
            /^juil/i,
            /^août/i,
            /^sept/i,
            /^oct/i,
            /^nov/i,
            /^déc/i,
        ];

    moment.defineLocale('fr', {
        months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split(
            '_'
        ),
        monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split(
            '_'
        ),
        monthsRegex: monthsRegex$6,
        monthsShortRegex: monthsRegex$6,
        monthsStrictRegex: monthsStrictRegex$1,
        monthsShortStrictRegex: monthsShortStrictRegex$1,
        monthsParse: monthsParse$6,
        longMonthsParse: monthsParse$6,
        shortMonthsParse: monthsParse$6,
        weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
        weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
        weekdaysMin: 'di_lu_ma_me_je_ve_sa'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm',
        },
        calendar: {
            sameDay: '[Aujourd’hui à] LT',
            nextDay: '[Demain à] LT',
            nextWeek: 'dddd [à] LT',
            lastDay: '[Hier à] LT',
            lastWeek: 'dddd [dernier à] LT',
            sameElse: 'L',
        },
        relativeTime: {
            future: 'dans %s',
            past: 'il y a %s',
            s: 'quelques secondes',
            ss: '%d secondes',
            m: 'une minute',
            mm: '%d minutes',
            h: 'une heure',
            hh: '%d heures',
            d: 'un jour',
            dd: '%d jours',
            w: 'une semaine',
            ww: '%d semaines',
            M: 'un mois',
            MM: '%d mois',
            y: 'un an',
            yy: '%d ans',
        },
        dayOfMonthOrdinalParse: /\d{1,2}(er|)/,
        ordinal: function (number, period) {
            switch (period) {
                // TODO: Return 'e' when day of month > 1. Move this case inside
                // block for masculine words below.
                // See https://github.com/moment/moment/issues/3375
                case 'D':
                    return number + (number === 1 ? 'er' : '');

                // Words with masculine grammatical gender: mois, trimestre, jour
                default:
                case 'M':
                case 'Q':
                case 'DDD':
                case 'd':
                    return number + (number === 1 ? 'er' : 'e');

                // Words with feminine grammatical gender: semaine
                case 'w':
                case 'W':
                    return number + (number === 1 ? 're' : 'e');
            }
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4, // The week that contains Jan 4th is the first week of the year.
        },
    });
	

}


}

moment.locale('fr');

Template.dateBadge.helpers({
  canModifyCard() {
    return (
      Meteor.user() &&
      Meteor.user().isBoardMember() &&
      !Meteor.user().isCommentOnly() &&
      !Meteor.user().isWorker()
    );
  },
});

// editCardReceivedDatePopup
(class extends DatePicker {
  onCreated() {
    super.onCreated(moment().format('YYYY-MM-DD HH:mm'));
    this.data().getReceived() &&
      this.date.set(moment(this.data().getReceived()));
  }

  _storeDate(date) {
    this.card.setReceived(date);
  }

  _deleteDate() {
    this.card.unsetReceived();
  }
}.register('editCardReceivedDatePopup'));

// editCardStartDatePopup
(class extends DatePicker {
  onCreated() {
    super.onCreated(moment().format('YYYY-MM-DD HH:mm'));
    this.data().getStart() && this.date.set(moment(this.data().getStart()));
  }

  onRendered() {
    super.onRendered();
    if (moment.isDate(this.card.getReceived())) {
      this.$('.js-datepicker').datepicker(
        'setStartDate',
        this.card.getReceived(),
      );
    }
  }

  _storeDate(date) {
    this.card.setStart(date);
  }

  _deleteDate() {
    this.card.unsetStart();
  }
}.register('editCardStartDatePopup'));

// editCardDueDatePopup
(class extends DatePicker {
  onCreated() {
    super.onCreated('1970-01-01 17:00:00');
    this.data().getDue() && this.date.set(moment(this.data().getDue()));
  }

  onRendered() {
    super.onRendered();
    if (moment.isDate(this.card.getStart())) {
      this.$('.js-datepicker').datepicker('setStartDate', this.card.getStart());
    }
  }

  _storeDate(date) {
    this.card.setDue(date);
  }

  _deleteDate() {
    this.card.unsetDue();
  }
}.register('editCardDueDatePopup'));

// editCardEndDatePopup
(class extends DatePicker {
  onCreated() {
    super.onCreated(moment().format('YYYY-MM-DD HH:mm'));
    this.data().getEnd() && this.date.set(moment(this.data().getEnd()));
  }

  onRendered() {
    super.onRendered();
    if (moment.isDate(this.card.getStart())) {
      this.$('.js-datepicker').datepicker('setStartDate', this.card.getStart());
    }
  }

  _storeDate(date) {
    this.card.setEnd(date);
  }

  _deleteDate() {
    this.card.unsetEnd();
  }
}.register('editCardEndDatePopup'));

// Display received, start, due & end dates
const CardDate = BlazeComponent.extendComponent({
  template() {
    return 'dateBadge';
  },

  onCreated() {
    const self = this;
    self.date = ReactiveVar();
    self.now = ReactiveVar(moment());
    window.setInterval(() => {
      self.now.set(moment());
    }, 60000);
  },

  showWeek() {
    return this.date.get().week().toString();
  },

  showDate() {
    // this will start working once mquandalle:moment
    // is updated to at least moment.js 2.10.5
    // until then, the date is displayed in the "L" format
    return this.date.get().calendar(null, {
      sameElse: 'llll',
    });
  },

  showISODate() {
    return this.date.get().toISOString();
  },
});

class CardReceivedDate extends CardDate {
  onCreated() {
    super.onCreated();
    const self = this;
    self.autorun(() => {
      self.date.set(moment(self.data().getReceived()));
    });
  }

  classes() {
    let classes = 'received-date ';
    const dueAt = this.data().getDue();
    const endAt = this.data().getEnd();
    const startAt = this.data().getStart();
    const theDate = this.date.get();
    // if dueAt, endAt and startAt exist & are > receivedAt, receivedAt doesn't need to be flagged
    if (
      (startAt && theDate.isAfter(startAt)) ||
      (endAt && theDate.isAfter(endAt)) ||
      (dueAt && theDate.isAfter(dueAt))
    )
      classes += 'long-overdue';
    else classes += 'current';
    return classes;
  }

  showTitle() {
    setFr();
    return `${TAPi18n.__('card-received-on')} ${this.date
      .get()
      .locale('fr')
      .format('LLLL')}`;
  }

  events() {
    return super.events().concat({
      'click .js-edit-date': Popup.open('editCardReceivedDate'),
    });
  }
}
CardReceivedDate.register('cardReceivedDate');

class CardStartDate extends CardDate {
  onCreated() {
    super.onCreated();
    const self = this;
    self.autorun(() => {
      self.date.set(moment(self.data().getStart()));
    });
  }

  classes() {
    let classes = 'start-date' + ' ';
    const dueAt = this.data().getDue();
    const endAt = this.data().getEnd();
    const theDate = this.date.get();
    const now = this.now.get();
    // if dueAt or endAt exist & are > startAt, startAt doesn't need to be flagged
    if ((endAt && theDate.isAfter(endAt)) || (dueAt && theDate.isAfter(dueAt)))
      classes += 'long-overdue';
    else if (theDate.isAfter(now)) classes += '';
    else classes += 'current';
    return classes;
  }

  showTitle() {
    setFr();
    return `${TAPi18n.__('card-start-on')} ${this.date.get().locale('fr').format('LLLL')}`;
  }

  events() {
    return super.events().concat({
      'click .js-edit-date': Popup.open('editCardStartDate'),
    });
  }
}
CardStartDate.register('cardStartDate');

class CardDueDate extends CardDate {
  onCreated() {
    super.onCreated();
    const self = this;
    self.autorun(() => {
      self.date.set(moment(self.data().getDue()));
    });
  }

  classes() {
    let classes = 'due-date' + ' ';
    const endAt = this.data().getEnd();
    const theDate = this.date.get();
    const now = this.now.get();
    // if the due date is after the end date, green - done early
    if (endAt && theDate.isAfter(endAt)) classes += 'current';
    // if there is an end date, don't need to flag the due date
    else if (endAt) classes += '';
    else if (now.diff(theDate, 'days') >= 2) classes += 'long-overdue';
    else if (now.diff(theDate, 'minute') >= 0) classes += 'due';
    else if (now.diff(theDate, 'days') >= -1) classes += 'almost-due';
    return classes;
  }

  showTitle() {
    setFr();
    return `${TAPi18n.__('card-due-on')} ${this.date.get().locale('fr').format('LLLL')}`;
  }

  events() {
    return super.events().concat({
      'click .js-edit-date': Popup.open('editCardDueDate'),
    });
  }
}
CardDueDate.register('cardDueDate');

class CardEndDate extends CardDate {
  onCreated() {
    super.onCreated();
    const self = this;
    self.autorun(() => {
      self.date.set(moment(self.data().getEnd()));
    });
  }

  classes() {
    let classes = 'end-date' + ' ';
    const dueAt = this.data().getDue();
    const theDate = this.date.get();
    if (!dueAt) classes += '';
    else if (theDate.isBefore(dueAt)) classes += 'current';
    else if (theDate.isAfter(dueAt)) classes += 'due';
    return classes;
  }

  showTitle() {
    setFr();
    return `${TAPi18n.__('card-end-on')} ${this.date.get().locale('fr').format('LLLL')}`;
  }

  events() {
    return super.events().concat({
      'click .js-edit-date': Popup.open('editCardEndDate'),
    });
  }
}
CardEndDate.register('cardEndDate');

class CardCustomFieldDate extends CardDate {
  template() {
    return 'dateCustomField';
  }

  onCreated() {
    super.onCreated();
    const self = this;
    self.autorun(() => {
      self.date.set(moment(self.data().value));
    });
  }

  showWeek() {
    return this.date.get().week().toString();
  }

  showDate() {
    // this will start working once mquandalle:moment
    // is updated to at least moment.js 2.10.5
    // until then, the date is displayed in the "L" format
    return this.date.get().calendar(null, {
      sameElse: 'llll',
    });
  }

  showTitle() {
    setFr();
    return `${this.date.get().locale('fr').format('LLLL')}`;
  }

  classes() {
    return 'customfield-date';
  }

  events() {
    return [];
  }
}
CardCustomFieldDate.register('cardCustomFieldDate');

(class extends CardReceivedDate {
  showDate() {
    setFr();
    return this.date.get().locale('fr').format('l');
  }
}.register('minicardReceivedDate'));

(class extends CardStartDate {
  showDate() {
    setFr();
    return this.date.get().locale('fr').format('l');
  }
}.register('minicardStartDate'));

(class extends CardDueDate {
  showDate() {
    setFr();
    return this.date.get().locale('fr').format('l');
  }
}.register('minicardDueDate'));

(class extends CardEndDate {
  showDate() {
    setFr();
    return this.date.get().locale('fr').format('l');
  }
}.register('minicardEndDate'));

(class extends CardCustomFieldDate {
  showDate() {
    setFr();
    return this.date.get().locale('fr').format('l');
  }
}.register('minicardCustomFieldDate'));

class VoteEndDate extends CardDate {
  onCreated() {
    super.onCreated();
    const self = this;
    self.autorun(() => {
      self.date.set(moment(self.data().getVoteEnd()));
    });
  }
  classes() {
    const classes = 'end-date' + ' ';
    return classes;
  }
  showDate() {
    return this.date.get().format('l LT');
  }
  showTitle() {
    setFr();
    return `${TAPi18n.__('card-end-on')} ${this.date.get().locale('fr').format('LLLL')}`;
  }

  events() {
    return super.events().concat({
      'click .js-edit-date': Popup.open('editVoteEndDate'),
    });
  }
}
VoteEndDate.register('voteEndDate');

class PokerEndDate extends CardDate {
  onCreated() {
    super.onCreated();
    const self = this;
    self.autorun(() => {
      self.date.set(moment(self.data().getPokerEnd()));
    });
  }
  classes() {
    const classes = 'end-date' + ' ';
    return classes;
  }
  showDate() {
    return this.date.get().format('l LT');
  }
  showTitle() {
    setFr();
    return `${TAPi18n.__('card-end-on')} ${this.date.get().locale('fr').format('LLLL')}`;
  }

  events() {
    return super.events().concat({
      'click .js-edit-date': Popup.open('editPokerEndDate'),
    });
  }
}
PokerEndDate.register('pokerEndDate');
