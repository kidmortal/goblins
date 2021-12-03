Backend for a small market project called Goblins market.


This back end was made using Nestjs and prisma + postgresql.


This project has swagger, so you can easily see what routes are available and how to use each of them.

![image](https://user-images.githubusercontent.com/18023467/144631676-2e6e8a70-8eb3-4e76-8c46-40d6594c59c7.png)


Including authentication with Google, discord or the usual username + password.


Creating user -

route: /goblin/user

body:

![image](https://user-images.githubusercontent.com/18023467/144632142-5e74de92-39dd-4135-9375-5f4cfe4d4b49.png)

response: 

![image](https://user-images.githubusercontent.com/18023467/144632198-3b7a530a-4e15-43b7-b6e0-b466887169fb.png)


you can alter the user iconUrl using the patch method.

This method needs authentication, so makes sure you provide the JWT token on the headers.


Creating product - 

route: goblin/product

body:

![image](https://user-images.githubusercontent.com/18023467/144632425-cad56df1-f40d-4522-befc-d4d34a3bf0dc.png)

response: 

![image](https://user-images.githubusercontent.com/18023467/144632565-87142170-dc89-4bf5-a7db-9b19b90fe06c.png)


The product itself doesnt need anything else.

Login with name and password -

route: goblin/auth

body: ![image](https://user-images.githubusercontent.com/18023467/144633229-d5c19fb2-7773-47b9-97b5-11e02c66e5bc.png)

response: ![image](https://user-images.githubusercontent.com/18023467/144633244-366a334e-231b-4ea7-a458-581d1a52a89e.png)


Thats the token you gonna need for making any requests for this user (like listing for buying stuff)


Creating transaction - 

Thats where everything happens, in order to any user receive a product, it must be through a transaction.
For creating a transaction, there must be a listing on the market, and the user also need to have enough money for buying it.

route: goblin/transaction

body:

![image](https://user-images.githubusercontent.com/18023467/144632927-bb6b6de2-c010-4cca-b6cd-3734142bf8ea.png)


If you havent authenticated, this is gonna happen.

![image](https://user-images.githubusercontent.com/18023467/144632996-f75d79a4-9e24-4c6d-bcac-d24122b1ce7a.png)

Or if you are authenticated but trying to buy with someone's id.

![image](https://user-images.githubusercontent.com/18023467/144633589-a3d13cd3-b395-46d7-80a4-276c420f5e3e.png)



But besides auth, there are multiple ways to end up with an error. such as

![image](https://user-images.githubusercontent.com/18023467/144633480-4fc70c5f-5539-488d-88c0-eae779a29738.png)


So make sure the transaction you are trying to create is valid.



