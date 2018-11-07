--I want to rename this to SCU_Alum_Searchers--
CREATE TABLE SCU_ALUM(
        firstname varchar(30),
        lastname varchar(30),
        grad_year int,
        PRIMARY KEY (firstname, lastname, grad_year)
);

--Rename this to SCU_Alum_Listers?--
CREATE TABLE Listers(
        firstname varchar(30),
        lastname varchar(30),
        grad_year int,
        businessname varchar(30),
        --at first approved should be false, then set to true once office approves--
        approved BOOLEAN,
        PRIMARY KEY (firstname, lastname, grad_year),
        UNIQUE (businessname)
);

<!--Table to store all the business edit information
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
        country varchar(30),
        tag varchar(30),
        comments varchar(150),
        image BLOB,
        --at first approved should be false, then set to true once office approves--
        --Do search in the table, for every TRUE in here, take the information and copy it--
        --into the Listers table, then delete it from here--
        approved BOOLEAN,
        FOREIGN KEY (businessname) references Listers(businessname)
);

CREATE TABLE Business_Number_Email(
        businessname varchar(30),
        phonenumber varchar(30),
        email varchar(30),
        FOREIGN KEY (businessname) references Listers(businessname)
);

CREATE TABLE Business_Addresses(
        businessname varchar(30),
        address varchar(30),
        city varchar(30),
        state char(3),
        zipcode varchar(30),
        country varchar(30),
        FOREIGN KEY (businessname) references Listers(businessname)
);

CREATE TABLE Business_Descriptions(
        businessname varchar(30),
        tag varchar(30),
        comments varchar(150),
        image BLOB,
        FOREIGN KEY (businessname) references Listers(businessname)
);

--Table to hold the username login and password the SCU Alum office will be using--
CREATE TABLE login_credentials(
        username varchar(30),
        password varchar(30)
);
