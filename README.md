# HackSC 2019: Smart Share
More on Devpost: https://devpost.com/software/smart-share

## Inspiration
We love the idea of car sharing and often drive around with a rental car. However, there's also some downside to it, for example, the rental and return location isn't flexible at all. In this app, we will focus on improving the existing car sharing system with the APIs provided by Smart Car and store the ride information in amazon web service database.
 
## What it does
It is a car-sharing platform that helps the car-sharing company to best allocate their cars according to the needs and storages. Unlike the traditional car-sharing platform, we not only offer our customers with the round trip but also provide them with the single-trip option, as long as there are enough cars in the user's departure area, or the customer is successfully matched with another user through our platform, or even they would like to pay up to 20 percent of money to hire a driver for them to return the car. 
As we know, most of the car-sharing companies have a strict policy that the place of returning the car has to be the place we rent it, and it is not convenient for the user sometimes. Our project aims at encouraging customers to match with others in order to collaboratively rent and return the car to the same place. Also, we used the SmartCar API to keep track of the location of our cars, and our algorithm analyzed the real-time allocation of our cars in order to determine whether or not the users in a certain place are ...

## How I built it
Using Smart Car APIs, combining with Node.js, to requests ride information and store it into the database.

## Challenges I ran into
We ran into many issues with selecting information from the database. In addition, the browser wasn't compatible with the CSS files, so we had to rewrite parts of our program using HTML.

## Accomplishments that I'm proud of
Completing the entire project.

## What I learned
Usage of Smart Car APIs, methods to make our program compatible, and ways to solve the connecting issue with MySQL.

## What's next for Smart Share
Adapting the new functionalities
