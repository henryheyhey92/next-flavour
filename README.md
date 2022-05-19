# Bean-Flavour

<div>
  <img src='docImage/nex-flavour.png' style='display:block, width: 100%'><br>
</div>

## Project Summary

**Project Context**

Bean Flavour is a mobile-responsive Ecommerce web application that allows users to purchase local sg branded flavour coffee bean. Users can sign up account with Bean-flavour coffee, add items to chart, checkout item and do online payment. 


**Organisational Goals**

The app aims to promote local brand coffee products and provide service that allows users to search and purchase. For the product owner, it would be a system for them to keep track of item stocks, number of purchases and transaction history.

**User Goals**

Able to look for the desire coffee products, order, add to cart and online payment.


## UI/UX

### **Strategy**

_Organisation_
* objective: display coffee products catalogue, allow to user to purchase products made by the organsation from online store and make profit out from it

_User_
* objective: search coffee products that suits the user, able to order and purchase items from the online store.

_Pain Point_
* unable to find high quality, certified coffee bean or coffee products that are made by local brands in the market

User stories | Acceptance Criteria
-------------|--------------------
As a user, I would like to see all the available product name, price and image, so that I know what are product that I can purchase from the web store. | retrieve product information from database
As a user, I want the website to be able to search products by name, type etc, so that I will only retrieve product information that are only related to my search input. | search feature
As a user, I would like to do payment online and through credit card, so that I do not require to do payment in cheque or cash | feature that allows payment to be make online
As a user, I would like to see my cart item, so that I can know what are the items that I have added to the shopping cart | feature that can display can display cart items
As a user, I would like to see my purchase history, so that I can know what are the items I have purchased and how much money I spent | feature that can display the shopping/purchase history 


### **Scope**
_Functional Specifications_

* Able to search for coffee products by name, type and price etc

* Able to add item to cart

* Able to place order

* Able to make payment online

_Non-functional requirments_ 
* Mobile responsiveness

* Performance

### **Structure**

* The following is the next-flavour coffee application structure diagram

<img src='docImage/Front-end.jpeg' style="display: block; width: 100%"><br>
<img src='docImage/Express.jpeg' style="display: block; width: 100%"><br>

### **Skeleton**

Wireframes for mobile, desktop version

[https://henry358751.invisionapp.com/homepage?tid=10386126](https://henry358751.invisionapp.com/homepage?tid=10386126)

### **Surface**

1. White background color with black navbar, so that the product image can be stand out and blend in easily.

2. Open Sans, Smooch and fonts by default are use in the main page of the application. I personally find the two cursive font would enhance the visual and aesthetic to the look of the web application. 


### Technologies used

- [React](https://reactjs.org/)

  React js is used to create the front-end framework.


- [Axios](https://github.com/axios/axios)

  Axios js is used to handle most API requests. Some static data calls with built-in fetch API.



- [HTML5](https://developer.mozilla.org/en-US/docs/Glossary/HTML5)/[CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

  The project relies on HTML5 and CSS technologies to create the front-end layout.



- [Material UI](https://mui.com/)/[MUI Get started](https://mui.com/material-ui/getting-started/installation/)

The project uses material UI for the textfield, dropdown, checkbox, radio button, form validation, mobile responsive

- [Google Font](https://fonts.google.com/) and material ui typography

The project uses google fonts and material ui typography for fonts

- [Express](https://expressjs.com/) frame work for Nodejs

-[Bookshelf](https://bookshelfjs.org/) Javascript ORM for Nodejs

- [MySql](https://www.mysql.com/) For database 

-[Cloudinary](https://cloudinary.com/) for upload images


## Additional Features to be implemented in the future

| Feature                      | Description                            |
| ---------------------------- | -------------------------------------- |
| onboarding                   | in-app tutorial animation to guide user| 
| Search AutoComplete          | Suggestions for search autocomplete    |


## Feature fixes to be implemented in the future

| Feature                      | Description                            |
| ---------------------------- | -------------------------------------- |
| onboarding                   | in-app tutorial animation to guide user| 
| Better Routing               | Using the hooks feature in react       |
| Improve the structure of the code base  | Improve overall workflow of the codebase for Readability and better coding standard  |

## Testing

 The project is developed using a combination of manual testing. The testing done for the critical functionality of this project is documented at the link below:

Link : [https://docs.google.com/spreadsheets/d/1F_I_k4V71amvCwd0-54xw2j1I6ho-cmw6LTu7NA9ycw/edit?usp=sharing](https://docs.google.com/spreadsheets/d/1F_I_k4V71amvCwd0-54xw2j1I6ho-cmw6LTu7NA9ycw/edit?usp=sharing)


## Deployment

This project is deployed on Netlify and heroku. The deployed version can be found at the link below:


Link: [https://next-flavour-coffee.netlify.app/](https://next-flavour-coffee.netlify.app/)

Link: [https://hl-espresso.herokuapp.com/](https://hl-espresso.herokuapp.com/)


# Acknowledgemnts and Credits


* The images used in the project are from stonestreetcoffee.com and from the pexels.com

* Paul's code in the react lab were used as references 

* Axios cdn was used for retrieving data.

* The material UI, bootstrap are used for the UI layout

* all material uses in this project are for academic purposes
