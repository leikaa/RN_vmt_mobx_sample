# Mobile application vmt description

### Application Overview
* The application is for “internal money” transfer between system users.
* The application will be very “polite” and will inform a user of any problems (i.e. login not successful, not enough “internal money” to remit the transaction, etc.)
    
### User registration
* Any person on Earth can register with the service for free, providing their Name (e.g. John Smith), valid email (e.g. jsmith@gmail.com) and password.
* When a new user registers, the system will verify that the user has provided a unique (not previously registered in the system) email, and has also provided a human name and a password. These 3 fields are mandatory. Password is to be typed twice for justification. No email verification required.
* On successful registration every User will be awarded with 500 (five hundred) “internal money” starting balance.

### Logging in
* Users login to the system using their email and password.
* Users must log in automatically on repeated application launch.
* Users will be able to Log out.
* No password recovery, change password, etc. functions required.

### Application
* The system will allow users to perform the following operations:
    * See their Name and current “internal money” balance always on screen
    * Create a new transaction. To make a new transaction (“internal money” payment) a user will
        * Choose the recipient by querying the User list by name (autocomplete).
        * When a recipient is chosen, entering the “internal money” transaction amount. The system will check that the transaction amount is not greater than the current user balance.
        * Committing a transaction. Once the transaction succeeds, the recipient account will be credited (“internal money”++) by the entered amount of “internal money”, and the payee account debited (“internal money”--) for the same amount of “internal money”. The system shall display “internal money” balance changes immediately to the user.
    * (Optional) Create a new transaction as a copy from a list of their existing transactions: create a handy UI for a user to browse their recent transactions, and select a transaction as a basis for a new transaction. Once an old transaction is selected, all its details (recipient, “internal money” amount) will be copied to the new transaction.
    * Review a list (history) of their transactions. A list of transactions will show the most recent transactions on top of the list and display the following info for each transaction:
        * Date/Time of the transaction (should be user location-based)
        * Correspondent Name
        * Transaction amount, (Debit/Credit for “internal money” transferred)
        * Resulting balance
        * (Optional) Implement any kind of filtering and/or sorting of transaction list by date / correspondent name / amount. 
    
### Architecture requirements
* Application will implement full functionality, and communicate with WEB API using JSON.
  
### Technical requirements
* React Native

### API
* [Link to API](https://docs.google.com/document/d/1JbBdzroRFkHuUNAF7fnDuXvPgHgY-XvM8f_6R7bUjkg/edit)

