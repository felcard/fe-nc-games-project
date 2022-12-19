# NC-Games-Rating-App Project

## Getting started

Hi, this front-end project's objective is to implement an API developed [here](https://github.com/felcard/game-project) and build a suitable App for it.
The App provides with a space for users to see reviews of classic games be able to vote on the reviews, post and delete comments.
The user should also be able to decide how the app presents the reviews; which can be displayed grouped by review categories and ordered by different parameters, in ascending or descending fashion.
You can see the app deployed [here](https://nc-games-rating.netlify.app/).

1.  run `npm install` to install `react`, `react-dom`, `react-scripts` and their dependencies, this will also install `axios`, `react-router` and its dependencies which are needed for the project . (Thiis may take a few minutes)
2.  run `npm start` to see the app in action on `localhost:3000` in your browser.
3.  use any of the following usernames to gain access : **grumpy19**, **cooljmessy** or **jessjelly**

The app app was developed under node version v19.0.0

## App browser routes

**/** --> will display all reviews

**/reviews** --> will display all reviews

**/reviews/:review_id** --> will diplay an individual review with related comments

**reviews/:review_id/comments** --> will bring up a form to post a comment on the selected review

**reviews/categories/:category** --> will display reviews according to the specified category

Thanks for visiting and stayed tuned for future improvements and enhancements.
