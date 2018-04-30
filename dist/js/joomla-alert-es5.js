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
    style.innerHTML = 'joomla-alert{display:block;min-width:250px;padding:.5rem 1.25rem;margin-bottom:1rem;border:1px solid transparent;opacity:0;transition:opacity .15s linear}joomla-alert.joomla-alert--show{display:block;opacity:1}joomla-alert .joomla-alert--close,joomla-alert .joomla-alert-button--close{position:relative;top:-0.5rem;right:-1.25rem;padding:.2rem 1rem;color:inherit}joomla-alert .joomla-alert--close{font-size:1.5rem;font-weight:bold;line-height:1;text-shadow:0 1px 0 #fff}joomla-alert .joomla-alert--close,joomla-alert .joomla-alert-button--close{float:right;color:#000;background:transparent;border:0;opacity:.5}joomla-alert .joomla-alert--close:hover,joomla-alert .joomla-alert--close:focus,joomla-alert .joomla-alert-button--close:hover,joomla-alert .joomla-alert-button--close:focus{color:#000;text-decoration:none;cursor:pointer;opacity:.75}joomla-alert button.joomla-alert-button--close{padding-top:.75rem;font-size:100%;line-height:1.15;cursor:pointer;background:transparent;border:0;-webkit-appearance:none}joomla-alert[type="success"]{color:#1a6d4e;background-color:#d6f6ea;border-color:#c6f2e2}joomla-alert[type="success"] hr{border-top-color:#b1edd7}joomla-alert[type="success"] .alert-link{color:#104431}joomla-alert[type="info"]{color:#10467d;background-color:#d2e7fc;border-color:#c0ddfb}joomla-alert[type="info"] hr{border-top-color:#a8d0f9}joomla-alert[type="info"] .alert-link{color:#0a2d50}joomla-alert[type="warning"]{color:#82532f;background-color:#feecde;border-color:#fee4d1}joomla-alert[type="warning"] hr{border-top-color:#fdd5b8}joomla-alert[type="warning"] .alert-link{color:#5d3b21}joomla-alert[type="danger"]{color:#7d2a39;background-color:#fcdce2;border-color:#fbced6}joomla-alert[type="danger"] hr{border-top-color:#f9b6c2}joomla-alert[type="danger"] .alert-link{color:#571d28}';
    document.head.appendChild(style);
  }

  customElements.define('joomla-alert', function (_HTMLElement) {
    _inherits(_class, _HTMLElement);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
      key: 'connectedCallback',


      /* Lifecycle, element appended to the DOM */
      value: function connectedCallback() {
        this.setAttribute('role', 'alert');
        this.classList.add('joomla-alert--show');

        // Default to info
        if (!this.type || ['info', 'warning', 'danger', 'success'].indexOf(this.type) === -1) {
          this.setAttribute('type', 'info');
        }
        // Append button
        if (this.hasAttribute('dismiss') || this.hasAttribute('acknowledge') || this.hasAttribute('href')) {
          if (this.getAttribute('href') !== '' && !this.querySelector('button.joomla-alert--close') && !this.querySelector('button.joomla-alert-button--close')) {
            this.appendCloseButton();
          }
        }

        this.dispatchCustomEvent('joomla.alert.show');

        var closeButton = this.querySelector('button.joomla-alert--close') || this.querySelector('button.joomla-alert-button--close');

        if (closeButton) {
          closeButton.focus();
        }
      }

      /* Lifecycle, element removed from the DOM */

    }, {
      key: 'disconnectedCallback',
      value: function disconnectedCallback() {
        this.removeEventListener('joomla.alert.show', this);
        this.removeEventListener('joomla.alert.close', this);
        this.removeEventListener('joomla.alert.closed', this);

        if (this.firstChild.tagName && this.firstChild.tagName.toLowerCase() === 'button') {
          this.firstChild.removeEventListener('click', this);
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
          case 'acknowledge':
            if (!newValue || newValue === 'true') {
              this.appendCloseButton();
            } else {
              this.removeCloseButton();
            }
            break;
          case 'href':
            if (!newValue || newValue === '') {
              this.removeCloseButton();
            } else if (!this.querySelector('button.joomla-alert-button--close')) {
              this.appendCloseButton();
            }
            break;
          default:
            break;
        }
      }

      /* Method to close the alert */

    }, {
      key: 'close',
      value: function close() {
        var _this2 = this;

        this.dispatchCustomEvent('joomla.alert.close');
        this.addEventListener('transitionend', function () {
          _this2.dispatchCustomEvent('joomla.alert.closed');
          _this2.parentNode.removeChild(_this2);
        }, false);
        this.classList.remove('joomla-alert--show');
      }

      /* Method to dispatch events */

    }, {
      key: 'dispatchCustomEvent',
      value: function dispatchCustomEvent(eventName) {
        var OriginalCustomEvent = new CustomEvent(eventName);
        OriginalCustomEvent.relatedTarget = this;
        this.dispatchEvent(OriginalCustomEvent);
        this.removeEventListener(eventName, this);
      }

      /* Method to create the close button */

    }, {
      key: 'appendCloseButton',
      value: function appendCloseButton() {
        if (this.querySelector('button.joomla-alert--close') || this.querySelector('button.joomla-alert-button--close')) {
          return;
        }

        var self = this;
        var closeButton = document.createElement('button');

        if (this.hasAttribute('dismiss')) {
          closeButton.classList.add('joomla-alert--close');
          closeButton.innerHTML = '<span aria-hidden="true">&times;</span>';
          closeButton.setAttribute('aria-label', this.getText('JCLOSE', 'Close'));
        } else {
          closeButton.classList.add('joomla-alert-button--close');
          if (this.hasAttribute('acknowledge')) {
            closeButton.innerHTML = this.getText('JOK', 'ok');
          } else {
            closeButton.innerHTML = this.getText('JOPEN', 'Open');
          }
        }

        if (this.firstChild) {
          this.insertBefore(closeButton, this.firstChild);
        } else {
          this.appendChild(closeButton);
        }

        /* Add the required listener */
        if (closeButton) {
          if (!this.href) {
            closeButton.addEventListener('click', function () {
              self.dispatchCustomEvent('joomla.alert.buttonClicked');
              if (self.getAttribute('data-callback')) {
                window[self.getAttribute('data-callback')]();
                self.close();
              } else {
                self.close();
              }
            });
          } else {
            closeButton.addEventListener('click', function () {
              self.dispatchCustomEvent('joomla.alert.buttonClicked');
              window.location.href = self.href;
              self.close();
            });
          }
        }

        if (this.hasAttribute('auto-dismiss')) {
          setTimeout(function () {
            self.dispatchCustomEvent('joomla.alert.buttonClicked');
            if (self.hasAttribute('data-callback')) {
              window[self.getAttribute('data-callback')]();
            } else {
              self.close();
            }
          }, parseInt(self.getAttribute('auto-dismiss'), 10) ? self.getAttribute('auto-dismiss') : 3000);
        }
      }

      /* Method to remove the close button */

    }, {
      key: 'removeCloseButton',
      value: function removeCloseButton() {
        var button = this.querySelector('button');
        if (button) {
          button.removeEventListener('click', this);
          button.parentNode.removeChild(button);
        }
      }

      /* Method to get the translated text */

    }, {
      key: 'getText',
      value: function getText(str, fallback) {
        return window.Joomla && window.Joomla.JText && window.Joomla.JText._ && typeof window.Joomla.JText._ === 'function' && window.Joomla.JText._(str) ? window.Joomla.JText._(str) : fallback;
      }
    }, {
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
      }
    }, {
      key: 'acknowledge',
      get: function get() {
        return this.getAttribute('acknowledge');
      }
    }, {
      key: 'href',
      get: function get() {
        return this.getAttribute('href');
      }
    }], [{
      key: 'observedAttributes',

      /* Attributes to monitor */
      get: function get() {
        return ['type', 'dismiss', 'acknowledge', 'href'];
      }
    }]);

    return _class;
  }(HTMLElement));
})();

},{}]},{},[1]);
