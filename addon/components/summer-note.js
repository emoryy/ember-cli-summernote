import Ember from "ember";

const SummerNoteComponent = Ember.Component.extend({

  classNames: ['wysiwyg-editor'],
  btnSize: 'btn-xs',
  height: 120,
  focus: false,
  airMode: false,
  disabled: false,
  dialogsInBody: false,
  disabledOptions: {},
  lang: undefined,
  fontNames: undefined,
  callbacks: [],

  willDestroyElement() {
    this.$('#summernote').summernote('destroy');
  },

  didInsertElement() {
    const options = this.getProperties([
      'height',
      'focus',
      'airMode',
      'dialogsInBody',
      'lang',
      'fontNames',
      'callbacks'
    ]);
    options.toolbar = this.getToolbarOptions(this.get('disabledOptions'));

    // ensure summernote is loaded
    // summernote 0.6.0 is not working as of this code written.
    // 0.5.10 is working version.

    Ember.assert("summernote has to exist on Ember.$.fn.summernote", typeof Ember.$.fn.summernote === "function");
    Ember.assert("tooltip has to exist on Ember.$.fn.tooltip", typeof Ember.$.fn.tooltip === "function");

    this.$('#summernote').summernote(options);
      // airPopover: [
      //   ['color', ['color']],
      //   ['font', ['bold', 'underline', 'clear']],
      //   ['para', ['ul', 'paragraph']],
      //   ['table', ['table']],
      //   ['insert', ['link', 'picture']]
      // ]

    this.$().find('.note-editable').attr('contenteditable', !this.get('disabled'));
    this.$('.btn').addClass(this.get('btnSize'));

    const _content = this.get('content');
    this.$('#summernote').summernote('code', _content);
  },

  keyUp() {
    this.doUpdate();
  },

  click() {
    this.doUpdate();
  },

  doUpdate() {
    const content = this.$('#summernote').summernote('code');
    this.set('content', content);
  },

  setHeight: Ember.observer('height', function observer(/* sender, key, value, rev */) {
    this.$().find('.note-editable').css('height', this.get('height')); // use css height, as jQuery heigth/outerHeight does add the padding+margin
  }),

  setContentEditable: Ember.observer('disabled', function observer(/* sender, key, value, rev */) {
    this.$().find('.note-editable').attr('contenteditable', !this.get('disabled'));
  }),

  getToolbarOptions(disabledOptions) {
    const availableOptions = {
      style: {
        style: true
      },
      font: {
        bold: true,
        italic: true,
        underline: true,
        superscript: true,
        subscript: true,
        strikethrough: true,
        clear: true
      },
      fontname: {
        fontname: true
      },
      fontsize: {
        fontsize: true
      },
      color: {
        color: true
      },
      para:  {
        ul: true,
        ol: true,
        paragraph: true
      },
      height: {
        height: true
      },
      table: {
        table: true
      },
      insert: {
        link: true,
        picture: true,
        video: true,
        hr: true
      },
      view: {
        fullscreen: true,
        codeview: true
      },
      help: {
        help: true
      }
    };
    const _toolbar = [];

    // disable Options
    Object.keys(availableOptions).forEach(function eachFunc(key) {
      const arr = [];
      if (disabledOptions === undefined || disabledOptions === null || disabledOptions[key] !== false) {
        arr.push(key);
        const arr2 = [];
        Object.keys(availableOptions[key]).forEach(function innerEachFunc(subKey) {
          if (disabledOptions === undefined || disabledOptions === null || disabledOptions[key] === undefined || disabledOptions[key] === null || disabledOptions[key][subKey] !== false) {
            arr2.push(subKey);
          }
        });
        arr.push(arr2);
      }
      if (arr.length > 0) {
        _toolbar.push(arr);
      }
    });

    return _toolbar;
  }
});

export default SummerNoteComponent;
