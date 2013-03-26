# AngularJS vs jQuery: Introductory Examples
Basic examples demonstrating the differing approaches to handling data and
user input between AngularJS and jQuery.

Specific AngularJS concepts covered: Templates, Data binding, and Directives

## Setup
This example uses a basic working directory to begin, which includes
[jQuery](http://www.http://jquery.com), [AngularJS](http://www.angularjs.org),
and [Twitter Bootstrap](http://twitter.github.com/bootstrap/)
(so it's just a little prettier).

> ./static/js &rarr; jQuery, Angular, and Twitter Bootstrap

> ./static/css &rarr; Twitter Bootstrap and main.css

> ./static/img &rarr; Twitter Bootstrap

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

Step 3 explores reusable components

## Step 04
Explanation of Step 4

## Conclusion
Conclusion of this small repo.
