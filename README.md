# AngularJS vs jQuery: Introductory Examples
Basic examples demonstrating the differing approaches to handling data and
user input between AngularJS and jQuery.

Specific AngularJS concepts covered: Templates, Data binding, and Directives

## Setup
This example uses a basic working directory to begin, which includes
[jQuery](http://jquery.com), [AngularJS](http://www.angularjs.org),
and [Twitter Bootstrap](http://twitter.github.com/bootstrap/)
(so it's just a little prettier).

> ./static/js &rarr; jQuery, Angular, and Twitter Bootstrap

> ./static/css &rarr; Twitter Bootstrap and main.css

> ./static/img &rarr; Twitter Bootstrap **Note: /img/ is not tracked in this
> repo. Nor are any of the Twitter bootstrap images. If you want them, simply
> create an /img/ directory in ./static/ and add the bootsrap glyphcons.

Then we have our two example HTML files, one for jQuery and one for AngularJS.
Each of these has basic HTML5 doctype and structure, they include our relevant
css/js file in header (I know, I know).

> ./jquery_hello_world.html

> ./angular_hello_world.html

## Step 01
`git checkout step-01`

Our first step examines the method in which one would insert a static greeting
to a page through javascript. Of course we're going to use Hello World!

### jQuery
Open jquery_hello_world.html. This is familiar to most of us.

* Tag a specific part of the DOM with an ID or Class
  * `id="greeting"`
  * This allows us to find and manipulate it later with jQuery
* Wait for the DOM to load
  * `$( ... );`
* Find the DOM element and replace the contents with our desired greeting
  * `$("#greeting").html("Hello World!");`

### Angular
Now open angular_hello_world.html. This will be less familiar, however it looks
remarkably similar at this stage.  That said, the mechanisms behind this version
are significantly different (as we'll see in later examples).

So what's going on?

* We define an angular controller for a page element and bind a variable to
part of the template.
  * `ng-controller="HelloWorldCtrl"` tells angular to let the HelloWorldCtrl
'control' anything within it's scope.
  * `{{greeting}}` binds the greeting variable to that part of the template
* Define the value of our greeting variable inside our controller
  * `function HelloWorldCtrl($scope) { ... }`
  * `$scope.greeting = "Hello World! (from Angular)";`
* Wait for the document to load and for Angular to bootstrap

If you open both files in a browser they will look and behave nearly
identically.

### Take Away
* (almost) No more direct DOM manipulation! This is a big deal.
* Both methods seem pretty similar right now
  * You’ll see the magic soon (hint: DATA vs DOM)
* DOM manipulation is necessary sometimes
  * That’s where Directives come in (later)

## Step 02
`git checkout step-02`

Step 2 demonstrates a key differentiator of Angular: it's focus on _data_ and
data models.

Question: How do you make User Input update a portion of the page?

### jQuery
Several ways one could approach this question with jQuery but the basic concept
is the same: bind user interaction from one element of the page to the DOM
content on another element of the page.

* Add an new input element to the page and give it an addressable ID
  * `<input id="greetingInput" .../>`
* Select the new input element and bind a callback function to a user action
(in this case .keyup)
  * `$('#greetingInput').keyup(function(){ ... });`
  * Callback function finds the value of the `<input>`
  * Inserts this value into the DOM element `#greeting`

### Angular
This highlights Angular's focus on _data_. Note: For this simple example, our
`HelloWorldCtrl` controller isn't necessary (it's there for consistency).

* Add a new input element to the page, as in jQuery
  * No addressable ID required (unless you want it for styling or otherwise)
  * Instead, assign the input's value to an `ng-model` (Angular Model)
    * `ng-model="greeting"` &rarr; Bind value of `<input>` to 'greeting' model
* Bind the greeting model somewhere inside the template
  * `{{greeting}}`
  * The template now reflects the _current_ value of that data model

### Take Away
The Angular design revolves around _data_, not arbitrary user interaction
bindings (.keyup, .change, etc.) or DOM lookups and replacements.

If you type into the input box quickly, you'll also notice a speed difference
between these two methods, which is remarkable given the simplicity of the
example.

## Step 03
`git checkout step-03`

Step 3 explores reusable components.  Think about how you would typically
approach a 'widget'.

* Server-side includes?
* Client-side includes?
* iFrames?

AngularJS provides a way to extend the HTML vocabulary to address some of these
issues.  Imagine a `<my-widget></my-widget>` tag. The requirements for this
example are:

* A reusable component
* Custom greetings for each component, or, 'widget'
* All widgets reflect the same user input

### jQuery
Currently no jQuery example.

### Angular
First, we'll designate this page as our 'hello-world' application so Angular
knows about it when it bootstraps. `ng-app` is in fact a directive on it's own,
with the purpose of identifying which element Angular should consider as the
root element of our application (in this case, the whole page).

> `<html ng-app="hello-world">`

Next, let's create some awesome widgets on our page that follow the requirements
set out above.  Don't worry, this will be tied together soon.

> `<greeting-module season-greeting="Merry Christmas" greeting="{{greeting}}">`
> `</greeting-module>`

* We have a new HTML element called 'greeting-module'.
  * This is a directive, it will be defined in our application in a moment.
* Each directive has two attributes
  * `season-greeting`
    * Hard coded seasonal greeting, such as "Happy Easter"
  * `greeting`
    * The value of greeting, you'll notice, is actually bound to the current
    value of our `greeting` variable, which is still defined by the current
    value of `<input>`

Now we have some new HTML elements on our page, each with some attributes.
It's time to define the behavior of these _directives_.

Inside our script we will create a new angular module called 'hello-world'
(which links it to our ng-app directive of the same name). This is assigned
to a variable 'app' (which is used for readability and code organization but
is not necessary). The `[]` is used in more advance applications for dependency
injection.

> `app = angular.module('hello-world', []);`

Define a directive for this application (app).

> `app.directive('greetingModule', function() { ... });`

* Note: Angular uses snake-case for attribute names and camelCase for the
corresponding directive name. So, `<my-directive>` in your DOM is `myDirective`
when defining the directive in your script.

A directive has a laundry list of optional return attributes it can accept.
For more detail, look at the [Directive Documentation](http://docs.angularjs.org/guide/directive). For this example, I'll highlight a few of them.

* `restrict: 'E'`
  * Restrict this directive to an Element. This can also be an
  Attribute, Class, or Comment
    * Example of Attribute: `<div my-directive></div>`
* `scope: { ... }`
  * Define the values of variables in the isolate scope of this directive.
  * Pull them as Read-Only from the attributes of this directive (`@greeting`)
  * See documentation for more on this.
* `link: function(scope, element, attrs) { ... }`
  * We will discuss this in Step 04. Not used right now.
* `template: '<div>...</div>'`
  * Define what HTML will be inserted into the directive and how our isloate
  scope variables will be used.

### Take Away
Each directive in our DOM declares a hard-coded season-greeting (i.e. Happy
Halloween) and a greeting, which reflects the current value of the `greeting`
model defined in the user input.

Angular then tells this directive to read the values of the 'season-greeting'
and the 'greeting', then put them into a sentence format, wrapped in a '<div>'.

We can have as many of these as we desire, as is shown with the three seasonal
directives in this example.

## Step 04
`git checkout step-04`

The final step in this brief example is to add _data-specific logic_ to the
directive.

### The Linking function
From Step03 we saw an empty `link` function. This is where the lion's share of
directive logic will live. Refer to documentation for more info.

The function will typically accept scope, element, and attrs, which refer to
* The `scope` used by the directive (for registering watches)
* The `iElement`, which is the instance element where the directive is used
* The `iAttrs`, which are the instance attributes

In this example we only use the scope in order to
[$watch](http://docs.angularjs.org/api/ng.$rootScope.Scope#$watch) for updates
to the seasonGreeting (season-greeting). Test this script leaving out this watch
expression, you'll notice that scope.seasonGreeting does not have a value. That
is due to Angular's digest cycle and bootstrapping process - that value may not
necessarily exist at the time this directive linking function is first evaluated.

We do a very simple string evaluation on this variable's value to see what
season we think it is. `scope.seasonGreeting == "Merry Christmas"`

Based on the season, we define a font_color variable to be used in our `template`
to define the font color.

### Take Away
Directives allow for _data-specific logic_. This example is extremely contrived
but that principle has big implications for data-centric applications.  This
allows design to behave based on the underlying data and for the design / user
experience to reflect the underlying data.

## Conclusion
The goal of this simple example is to highlight a critical difference in
designing a web application with Angular versus nearly any other method (direct javascript, library-based (jQuery), other MV* frameworks): DATA

Data is king and Angular allows an application to be designed in an extensible
and maintainable fashion when data is critical to the application's design or
use.
