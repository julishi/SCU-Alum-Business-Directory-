--SQL Code to set up all the datatables in our database 

Drop table Business_Edits;
Drop table Business_Descriptions;
Drop table Business_Addresses;
Drop table Business_Number_Email;
Drop table Listers;
Drop table SCU_ALUM;
Drop table Business_Deletions;
Drop table login_credentials;

--This table holds information about SCU Alum who visit our website to search for businesses.
--Primary Key: First Name, Last Name, Grad_Year
CREATE TABLE SCU_ALUM(
        firstname varchar(30),
        lastname varchar(30),
        grad_year int,
        approved int,
        visits int,
        PRIMARY KEY (firstname, lastname, grad_year)
);

--This tables holds information about our Listers, these are SCU Alum who's business has been approved to be listed on our website
-- Primary Key: Firstname, lastname, grad year, businessname
-- Can't have more than one business with the same businessname
CREATE TABLE Listers(
        firstname varchar(30),
        lastname varchar(30),
        grad_year int,
        businessname varchar(30),
        approved int,
        PRIMARY KEY (firstname, lastname, grad_year, businessname),
        UNIQUE (businessname)
);

--This table holds all listed businesses' emails/phonenumbers
--Takes a Foreign Key: Businessname from Listers
--If data in Listers is deleted, the coressponding business data here is deleted
CREATE TABLE Business_Number_Email(
        businessname varchar(30),
        phonenumber varchar(30),
        email varchar(30),
        CONSTRAINT fk_number_email FOREIGN KEY (businessname) references Listers(businessname) On Delete Cascade
);

--This table holds all listed businesses' addesses
--Takes Foreign Key: Businessname from Listers
--If data in Listers is deleted, the corresponding business data here is deleted
CREATE TABLE Business_Addresses(
        businessname varchar(30),
        address varchar(30),
        city varchar(30),
        state char(3),
        zipcode varchar(30),
        CONSTRAINT fk_addresses FOREIGN KEY (businessname) references Listers(businessname) On Delete Cascade
);

--This table holds the descriptions of each business, which includes the type of business it is, comments on the business, and an image.
--If data in Listers is deleted, the corresponding business data here is deleted
CREATE TABLE Business_Descriptions(
        businessname varchar(30),
        tag varchar(30),
        comments varchar(150),
        image BLOB,
        CONSTRAINT fk_descriptions FOREIGN KEY (businessname) references Listers(businessname) On Delete Cascade
);

--This table holds all the information a user submits in an edit request
--We didn't want it to automatically change the original data of the business 
--that's being held across 4 tables: Listers, Business_Number_Email, Business_Addresses, and Business_Descriptions
--Can't have more than one business here with the same businessname
CREATE TABLE Business_Edits(
        firstname varchar(30),
        lastname varchar(30),
        grad_year int,
        businessname varchar(30),
        new_businessname varchar(30),
        phonenumber varchar(30),
        email varchar(30),
        address varchar(30),
        city varchar(30),
        state char(3),
        zipcode varchar(30),
        tag varchar(30),
        comments varchar(150),
        image BLOB,
        approved int,
        UNIQUE (businessname)
);

--Table to hold all business deletion information rather than automaically deleting when the information is taken
--The business and its information to be deleted is stored here, and then used to delete the business's existing 
--information in all other tables relating to it: Listers, Business_Number_Email, Business_Addresses, and Business_Descriptions
--Can't have more than one business with the same name 
CREATE TABLE Business_Deletions(
        firstname varchar(30),
        lastname varchar(30),
        grad_year int,
        businessname varchar(30),
        phonenumber varchar(30),
        requester varchar(30),
        UNIQUE (businessname)
);

--Table to hold the username login and password the SCU Alum office will be using
--There can't be any duplicate usernames
--In real life, the way we've developed our project, an "IT Desk" will be in charge of inserting into this table
--"IT Desk" would be setting a username/password to email to the staff member who has new access to the staff page
CREATE TABLE login_credentials(
        firstname varchar2(30),
        lastname varchar2(30),
        username varchar2(30),
        password varchar2(30),
        UNIQUE (username)
);
