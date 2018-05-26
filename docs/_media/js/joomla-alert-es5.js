(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
  /** Include the relative styles */
  if (!document.head.querySelector('#joomla-alert-style')) {
    var style = document.createElement('style');
    style.id = 'joomla-alert-style';
    style.innerHTML = 'joomla-alert{display:block;min-width:250px;padding:.5rem 1.25rem;margin-bottom:1rem;border:1px solid transparent;opacity:1}joomla-alert>h4{margin:0;padding:.5rem .7rem}joomla-alert>div{margin:0;padding:.5rem .7rem}joomla-alert>button{position:relative;top:-0.5rem;right:-1.25rem;padding:.2rem 1rem;color:inherit;font-size:1.5rem;font-weight:bold;line-height:1;text-shadow:0 1px 0 #fff;float:right;color:#000;background:transparent;border:0}joomla-alert>button:hover,joomla-alert>button:focus{color:#000;text-decoration:none;cursor:pointer;opacity:.75}joomla-alert>button{padding-top:.75rem;font-size:100%;line-height:1.15;cursor:pointer;background:transparent;border:0;-moz-appearance:none;appearance:none;-webkit-appearance:none}joomla-alert[type="success"]{color:#1a6d4e;background-color:#d6f6ea;border-color:#c6f2e2}joomla-alert[type="success"]>hr{border-top-color:#b1edd7}joomla-alert[type="success"]>.alert-link{color:#104431}joomla-alert[type="info"]{color:#10467d;background-color:#d2e7fc;border-color:#c0ddfb}joomla-alert[type="info"]>hr{border-top-color:#a8d0f9}joomla-alert[type="info"]>.alert-link{color:#0a2d50}joomla-alert[type="warning"]{color:#82532f;background-color:#feecde;border-color:#fee4d1}joomla-alert[type="warning"]>hr{border-top-color:#fdd5b8}joomla-alert[type="warning"]>.alert-link{color:#5d3b21}joomla-alert[type="danger"]{color:#7d2a39;background-color:#fcdce2;border-color:#fbced6}joomla-alert[type="danger"]>hr{border-top-color:#f9b6c2}joomla-alert[type="danger"]>.alert-link{color:#571d28}';
    document.head.appendChild(style);
  }

  customElements.define('joomla-alert', function (_HTMLElement) {
    _inherits(_class, _HTMLElement);

    _createClass(_class, [{
      key: 'type',
      get: function get() {
        return this.getAttribute('type');
      },
      set: function set(value) {
        return this.setAttribute('type', value);
      }
    }, {
      key: 'dismiss',
      get: function get() {
        return this.getAttribute('dismiss');
      },
      set: function set(value) {
        return this.setAttribute('type', value);
      }
    }, {
      key: 'title',
      get: function get() {
        return this.getAttribute('title');
      },
      set: function set(value) {
        return this.setAttribute('title', value);
      }
    }, {
      key: 'message',
      get: function get() {
        return this.getAttribute('message');
      },
      set: function set(value) {
        return this.setAttribute('message', value);
      }
    }, {
      key: 'buttonText',
      get: function get() {
        return this.getAttribute('button-text');
      },
      set: function set(value) {
        return this.setAttribute('button-text', value);
      }
    }], [{
      key: 'observedAttributes',

      /* Attributes to monitor */
      get: function get() {
        return ['type', 'dismiss', 'title', 'message', 'show', 'button-text'];
      }
    }]);

    function _class() {
      _classCallCheck(this, _class);

      var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

      _this.header = '';
      _this.messageContainer = '';
      _this.hasDismissButton = false;
      _this.closeButton = '';

      _this.dispatchCustomEvent = _this.dispatchCustomEvent.bind(_this);
      _this.appendCloseButton = _this.appendCloseButton.bind(_this);
      _this.removeCloseButton = _this.removeCloseButton.bind(_this);
      _this.render = _this.render.bind(_this);
      _this.close = _this.close.bind(_this);
      return _this;
    }
    /* Lifecycle, element appended to the DOM */


    _createClass(_class, [{
      key: 'connectedCallback',
      value: function connectedCallback() {
        this.setAttribute('role', 'alert');

        // Default to info
        if (!this.type || ['info', 'warning', 'danger', 'success'].indexOf(this.type) === -1) {
          this.setAttribute('type', 'info');
        }

        // Check if SSR
        this.header = this.querySelector('h4');
        this.messageContainer = this.querySelector('div');

        if (this.header) {
          this.title = this.header.innerText;
        }

        if (this.messageContainer) {
          this.message = this.messageContainer.innerHTML;
        }

        this.render();

        this.dispatchCustomEvent('joomla.alert.show');
      }

      /* Lifecycle, element removed from the DOM */

    }, {
      key: 'disconnectedCallback',
      value: function disconnectedCallback() {
        if (this.closeButton) {
          this.closeButton.removeEventListener('click', this.close);
        }
      }

      /* Respond to attribute changes */

    }, {
      key: 'attributeChangedCallback',
      value: function attributeChangedCallback(attr, oldValue, newValue) {
        switch (attr) {
          case 'type':
            if (!newValue || newValue && ['info', 'warning', 'danger', 'success'].indexOf(newValue) === -1) {
              this.type = 'info';
            }
            break;
          case 'dismiss':
          case 'title':
          case 'message':
          case 'button-text':
            this.render();
            break;
          default:
            break;
        }
      }

      /* Method to dispatch events */

    }, {
      key: 'dispatchCustomEvent',
      value: function dispatchCustomEvent(eventName) {
        var OriginalCustomEvent = new CustomEvent(eventName);
        this.dispatchEvent(OriginalCustomEvent);
        this.removeEventListener(eventName, OriginalCustomEvent);
      }

      /* Method to close the alert */

    }, {
      key: 'close',
      value: function close() {
        this.dispatchCustomEvent('joomla.alert.close');
        this.removeAttribute('show');
        this.parentNode.removeChild(this);
      }

      /* Method to create the close button */

    }, {
      key: 'appendCloseButton',
      value: function appendCloseButton() {
        this.closeButton = this.querySelector('button');

        if (this.closeButton) {
          this.closeButton.setAttribute('aria-label', this.buttonText || 'Close');
          this.closeButton.addEventListener('click', this.close);
          this.closeButton.focus();
          return;
        }

        this.closeButton = document.createElement('button');
        var span = document.createElement('span');
        span.setAttribute('aria-hidden', 'true');
        span.innerHTML = '&times;';
        this.closeButton.setAttribute('aria-label', this.buttonText || 'Close');
        this.closeButton.appendChild(span);

        this.insertAdjacentElement('afterbegin', this.closeButton);
        this.closeButton.addEventListener('click', this.close);
        this.closeButton.focus();
      }

      /* Method to remove the close button */

    }, {
      key: 'removeCloseButton',
      value: function removeCloseButton() {
        if (this.closeButton) {
          this.closeButton.removeEventListener('click', this.close);
          this.removeChild(this.closeButton);
        }
      }
    }, {
      key: 'render',
      value: function render() {

        if (this.title) {
          if (!this.header) {
            this.header = document.createElement('h4');
            this.header.innerText = this.title;
            this.appendChild(this.header);
          }
          this.header.innerText = this.title;
        }

        if (this.message) {
          if (!this.messageContainer) {
            this.messageContainer = document.createElement('div');
            this.messageContainer.innerHTML = this.message;
            this.appendChild(this.messageContainer);
          }
          this.messageContainer.innerHTML = this.message;
        }

        if (this.hasAttribute('dismiss') || this.dismiss && this.dismiss !== 'false') {
          this.appendCloseButton();
        } else {
          this.removeCloseButton();
        }
      }
    }]);

    return _class;
  }(HTMLElement));
})();

},{}]},{},[1]);
