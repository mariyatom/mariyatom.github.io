# JavaScript Cafe Challenge
Welcome to the JavaScript Cafe! Joseph will take you through building an app where you can fulfill orders for customers which are generated when you interact with the page.

Challenge | Time |
------------|----------|
JavaScript Cafe | 3 hours |
## Let's do it!

This video is a 'live' code-along session. Follow these steps below and watch this pre-recorded lecture to build the app!
https://www.youtube.com/watch?v=WrhKhAHu0jM

1. Click the Fork button in the top right to create your own copy of this repo.

2. From your command line clone your copy of the repo down to your computer. The terminal command will look something like git clone https://github.com/YOUR-USERNAME/javascript-cafe

3. Open the cloned javascript-cafe folder in your code editor.
Remember to save your progress and use git add -A and git commit -m "your message" (with a more meaningful message) frequently throughout the exercise.

4. Once you have finished working on this exercise remember to add, commit, and push your work to GitHub.

## Important note before you begin

There is new CSS styling for this challenge. What you will see in your browser differs to the styling in the code-along video. Don't panic! There is only one update you should make note of.

In the code-along video at 7.22m, Joseph mentions if we want to see something rendering on the page we need somewhere for it to render to. To assist with this, in the `index.html` file we have added a `<div>` with a class called `container` so that your cafe items are nicely contained and styled with the supplied CSS. Please put all of your `<p>` tags inside the supplied `<div>` tag, and your `<button>` tags outside the `<div>`.

For example, your code will follow this formatting:

````
  <body>
    <h1>Javascript Café</h1>
    <div class="container">
      <p>Some text here.</p>
      <p>Some more text here!</p>
    </div>
    <button>A button here.</button>
    <button>Another button here!</button>
    <script src="cafe.js"></script>
  </body>
````

## Stretch Exercises (Optional)

- I want the product text to turn red when we run out of a particular product. 

- I want a feature where customers have a random amount of money, and their order is rejected if they don't have enough for the total price of the products they want to order.  

- I want a feature where every product has a 'wholesaleCost' property, and each product has a "Restock" button next to it. Clicking the restock button adds one more of that product to your stock, and subtracts the wholesaleCost from your cash. If you don't have enough cash, an alert pops up telling you that you can't restock. 

- I want a feature where if customers order eggs, they have to specify how they want them cooked: scrambled, fried, poached, etc- and then they must be given the correct kind of eggs. 

- I want a feature where if you are out of one item in the customers order, they leave without paying!  

- I want a history feature, where I can look back at the previous transactions. 

- I want a system where there is a small chance that customers will request a refund for their order, and a passive aggressive alert pops up about the quality of your products. 

- I want ambient busy cafe background sounds to play while you're on the webpage. 
