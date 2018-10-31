Drop table Business_Tags;
Drop table Business_Addresses;
Drop table Business_Number_Email;
Drop table Listers;
Drop table SCU_ALUM;

CREATE TABLE SCU_ALUM(
        firstname varchar(30),
        lastname varchar(30),
        grad_year int,
        approved varchar(30),
        PRIMARY KEY (firstname, lastname, grad_year)
);


CREATE TABLE Listers(
        firstname varchar(30),
        lastname varchar(30),
        grad_year int,
        businessname varchar(30),
        approved varchar(30),
        PRIMARY KEY (firstname, lastname, grad_year),
        UNIQUE (businessname)
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

CREATE TABLE Business_Tags(
        businessname varchar(30),
        tag varchar(30),
        FOREIGN KEY (businessname) references Listers(businessname)
);
