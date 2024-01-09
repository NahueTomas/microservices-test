## Microservices Project

This project was made to learn bases and principles of microservices, so it has not been made following the bests practices.

There are 4 APIs microservices and 1 event-bus to manage events between them. Also there is a mini-frontend to show this "structure" working.
* Posts -> Manage the posts.
* Comments -> Manage the comments.
* Moderation -> Manage the comments moderation, bassically it let you ban certain words. 
* Query -> Manage the relations between Posts and Comments saving some extra requests.
* Event bus -> Manage events between all the microservices.
* Client -> Mini-frontend to show the microservices structure working.


### .ENV
If you want to test this project you have to create a .env file and fill it following the .env.example file.

### Start
Every project should start with:
```npm run start```