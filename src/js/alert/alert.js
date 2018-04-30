(() => {
  /** Include the relative styles */
  if (!document.head.querySelector('#joomla-alert-style')) {
    const style = document.createElement('style');
    style.id = 'joomla-alert-style';
    style.innerHTML = '{{stylesheet}}';
    document.head.appendChild(style);
  }


  customElements.define('joomla-alert', class extends HTMLElement {
    /* Attributes to monitor */
    static get observedAttributes() { return ['type', 'dismiss', 'acknowledge', 'href']; }
    get type() { return this.getAttribute('type'); }
    set type(value) { return this.setAttribute('type', value); }
    get dismiss() { return this.getAttribute('dismiss'); }
    set dismiss(value) { return this.setAttribute('type', value); }

    constructor() {
      super();
      this.buttons = [{ crap: true }, { crap: false }];
      this.hasDismissButton = false;
      this.closeButton = '';

      this.dispatchCustomEvent = this.dispatchCustomEvent.bind(this);
      this.appendCloseButton = this.appendCloseButton.bind(this);
      this.removeCloseButton = this.removeCloseButton.bind(this);
      this.close = this.close.bind(this);
      this.footer = document.createElement('footer');
    }
    /* Lifecycle, element appended to the DOM */
    connectedCallback() {
      this.setAttribute('role', 'alert');
      this.classList.add('joomla-alert--show');

      // Default to info
      if (!this.type || ['info', 'warning', 'danger', 'success'].indexOf(this.type) === -1) {
        this.setAttribute('type', 'info');
      }

      // Append button
      if (this.hasAttribute('dismiss')) {
        this.appendCloseButton();
        this.closeButton.addEventListener('click', this.close);
        this.closeButton.focus();
      }

      this.dispatchCustomEvent('joomla.alert.show');
    }

    /* Lifecycle, element removed from the DOM */
    disconnectedCallback() {
      this.removeEventListener('joomla.alert.show', this);
      this.removeEventListener('joomla.alert.close', this);
      this.removeEventListener('joomla.alert.closed', this);

      if (this.closeButton) {
        this.closeButton.removeEventListener('click', this.close);
      }
    }

    /* Respond to attribute changes */
    attributeChangedCallback(attr, oldValue, newValue) {
      switch (attr) {
        case 'type':
          if (!newValue || (newValue && ['info', 'warning', 'danger', 'success'].indexOf(newValue) === -1)) {
            this.type = 'info';
          }
          break;
        case 'dismiss':
          if (!newValue || newValue === 'true') {
            this.appendCloseButton();
          } else {
            this.removeCloseButton();
          }
          break;
        default:
          break;
      }
    }

    /* Method to dispatch events */
    dispatchCustomEvent(eventName) {
      const OriginalCustomEvent = new CustomEvent(eventName);
      OriginalCustomEvent.relatedTarget = this;
      this.dispatchEvent(OriginalCustomEvent);
      this.removeEventListener(eventName, this);
    }

    /* Method to close the alert */
    close() {
      this.classList.add('close');
      this.dispatchCustomEvent('joomla.alert.close');
      this.addEventListener('transitionend', () => {
        this.dispatchCustomEvent('joomla.alert.closed');
        this.parentNode.removeChild(this);
      });
    }

    /* Method to create the close button */
    appendCloseButton() {
      if (this.closeButton) {
        return;
      }

      this.closeButton = document.createElement('button');

      if (this.hasAttribute('dismiss')) {
        // this.closeButton.classList.add('joomla-alert--close');
        this.closeButton.innerHTML = 'Close';
        // this.closeButton.setAttribute('aria-label', 'Close');
      }

      this.footer.appendChild(this.closeButton);

      this.footer.insertAdjacentElement('beforeend', this.closeButton);

      this.insertAdjacentElement('beforeend', this.footer);
    }

    /* Method to remove the close button */
    removeCloseButton() {
      if (this.closeButton) {
        this.closeButton.removeEventListener('click', this);
        this.closeButton.parentNode.removeChild(this.closeButton);
      }
    }
  });
})();
