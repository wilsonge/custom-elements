# Alert

## What is this

**Purpose**: Users need to be aware of important information related to their current activity (contextual alerts) or related to the system (system notifications).

**Description**: An alert is an element that displays a brief, important message in a way that attracts the user's attention without interrupting the user's task.

Alerts are available for any length of text, as well as an optional dismiss button. Alerts can also contain additional HTML elements like headings and paragraphs.

### When to use

* As a notification that keeps people informed of the status of the system and which may or may not require the user to respond. This includes errors, warnings, and general updates.
* As a validation message that alerts someone that they just did something that needs to be corrected or as confirmation that a task was completed successfully.

### When to consider something else

* On long forms, always include in-line validation in addition to any error messages that appear at the top of the form.
* If an action will result in destroying a user's work (for example, deleting an application) use a more intrusive pattern, such as a confirmation modal dialogue, to allow the user to confirm that this is what they want.


## Usage

In order to use the alert custom element you need to import the element in the document's head:

```html
<script src="joomla-alert.min.js"></script>
```

The simplified version of the custom elements
```html
// Client side rendering
<joomla-alert
    type="info"
    title="Alert:"
    message="This alert needs your attention, but it's not super important."
    dismiss
    button-text="Close"
>
</joomla-alert>

// Server side rendering
<joomla-alert type="info" dismiss>
    <button aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
    <h4>Alert:</h4>
    <div>This alert needs your attention, but it's not super important.</div>
</joomla-alert>
```

### Alerts demo:
<div class="mermaid">
<joomla-alert><div>No params passed</div></joomla-alert>
</div>
<div class="mermaid">
<joomla-alert type="info" dismiss><button aria-label="Close"><span aria-hidden="true">&times;</span></button><h4>Alert:</h4><div>This alert needs your attention, but it's not super important.</div></joomla-alert>
</div>

<div class="mermaid">
<joomla-alert type="success" dismiss><button aria-label="Close"><span aria-hidden="true">&times;</span></button><h4>Well done!</h4><div>You successfully read this important alert message.</div></joomla-alert>
</div>

<div class="mermaid">
<joomla-alert type="warning" dismiss><button aria-label="Close"><span aria-hidden="true">&times;</span></button><h4>Warning!</h4><div>You probably need to do something here.</div></joomla-alert>
</div>

<div class="mermaid">
<joomla-alert type="danger" dismiss><button aria-label="Close"><span aria-hidden="true">&times;</span></button><h4>Ooops!</h4><div>We probably did something wrong.</div></joomla-alert>
</div>

<p>
<button role="button" id="insertNewFloated" class="btn btn-success">Create a floated alert</button>
</p>

## Attibutes
Control the design and functionality of the custom element through attributes.


|Attribute		|Description																					|
|---------------|-----------------------------------------------------------------------------------------------|
|type			|This attribute is responsible for the looks. if not defined defaults to "info"					|
|dismiss		|Appends the x button. True is the only value.													|
|title			|The title of the alert.																		|
|message		|The main text of the alert.																	|
|button-text	|The aria-label for the close button. if not defined defaults to "Close"						|


## Dismissing
The functionality to dismiss an allert is baked in. Here’s how it works:

Add a `dismiss` attribute.
That's it!
Now clicking the x button will close the alert!

## JavaScript behavior
### Triggers

Trigger the dismissal of an alert via JavaScript:
```js
el.close()
```

Change the alert type:
```js
el.setAttribute('type', 'warning')
```

Remove or add the close button:
```js
el.removeAttribute('dismiss'); // Will remove the attribute
el.setAttribute('dismiss', ''); // Will set the attribute
```

## Events
The custom element exposes a few events for hooking into alert functionality.


|Event					|Description																					|
|-----------------------|-----------------------------------------------------------------------------------------------|
|Joomla.Alert.onShow	|This event fires immediately when the element is appended in the DOM.							|
|Joomla.Alert.onClose	|This event fires immediately when the close instance method is called.							|

Example:
Add some functonality when the alert is closing (right before the css transition start):
```js
el.addEventListener('joomla.alert.close', function() {
  alert('Impressed!')
})
```


## Programmatically add a new alert:
Use the following script:


```js
var el = document.createElement('joomla-alert');
el.setAttribute('type', 'success');
el.setAttribute('dismiss', '');
el.title = 'Alert:';
el.message = 'Wow it works!';

document.body.appendChild(el);
```


### Demo

<div id="insert-new-alert"></div>

Run the above command by clicking this button:
<p>
<button role="button" id="insertNew" class="btn btn-success">Create An Alert</button>
</p>

### Programmatically change an alert or add remove the close button:
Use the following script:


```js
var el = document.querySelector('joomla-alert');
el.setAttribute('type', 'success');
el.setAttribute('dismiss', '');
```


### Live example
<div class="mermaid">
<joomla-alert id="change-me" type="info" dismiss><h4>Alert:</h4><div>text goes here</div></joomla-alert>
</div>
<div id="replaceble" markdown="0">
<button role="button" data-opt1="type" value="info">Make it info</button>
<button role="button" data-opt1="type" value="success">Make it success</button>
<button role="button" data-opt1="type" value="warning">Make it warning</button>
<button role="button" data-opt1="type" value="danger">Make it danger</button>
<button role="button" data-opt1="dismiss" value="true">Add close button</button>
<button role="button" data-opt1="dismiss" value="false">Remove close button</button>
</div>




### Programmatically close an alert:
Use the following script:


```js
var el = document.querySelector('joomla-alert');
el.close();
```


### Demo

<div class="mermaid">
<joomla-alert type="danger" dismiss id="close-me-with-a-btn">
    <h4>Alert:</h4>
    <div>Close me with javascript</div>
</joomla-alert>
</div>


<p>
<button role="button" id="i-will-close-that-alert">Close the above alert</button>
</p>

## Accessibility

This alert component complies to all the specification for alerts published in WAI-ARIA Authoring Practices 1.1:

[WAI ARIA Practices - 2.3 Alert](https://www.w3.org/TR/wai-aria-practices-1.1/)


<script markdown="0">
var addNew = function() {
    var tempElement = document.createElement('joomla-alert');
    tempElement.setAttribute('type', 'success');
    tempElement.setAttribute('dismiss', '');
    tempElement.title = 'New alert:';
    tempElement.message = 'Wow it works!';
    document.getElementById('insert-new-alert').appendChild(tempElement);
};

var addNewFloated = function() {
    var tempElement = document.createElement('joomla-alert');
    tempElement.setAttribute('type', 'warning');
    tempElement.setAttribute('dismiss', '');
	tempElement.setAttribute('position', 'top-center');
    tempElement.title = "An another:";
    tempElement.message = "I'm a floated alert! You can position me to the top left or right too!";
    document.body.appendChild(tempElement);
};

var changeAlert = function(dataAttr, value) {
    var tempElement = document.getElementById('change-me');
    if (dataAttr === 'dismiss' && value === 'false') {
        tempElement.removeAttribute(dataAttr);
    } else if (dataAttr === 'dismiss' && value === 'true') {
        tempElement.setAttribute(dataAttr, '');
    } else {
        tempElement.setAttribute(dataAttr, value);
    }

};
var addNewButton = document.getElementById('insertNew'),
    changeButtons = document.querySelectorAll('#replaceble > button');

var addNewButtonFloated = document.getElementById('insertNewFloated');

addNewButton.addEventListener('click', addNew);
addNewButtonFloated.addEventListener('click', addNewFloated);
document.getElementById('change-me').addEventListener('joomla.alert.close', function() { alert('Seeing is believing. Event "joomla.alert.close" fired!') });

for (var i = 0, l = changeButtons.length; i < l; i++) {
        changeButtons[i].addEventListener('click', function() { changeAlert(this.getAttribute('data-opt1'), this.getAttribute('value')) });
}

document.getElementById('i-will-close-that-alert').addEventListener('click', function(event) { var a = document.getElementById('close-me-with-a-btn');
if (a) a.close(); event.target.setAttribute('disabled', true); event.target.removeEventListener('click', arguments.callee); });

</script>
