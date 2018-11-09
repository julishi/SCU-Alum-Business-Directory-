Drop table Business_Edits;
Drop table Business_Descriptions;
Drop table Business_Addresses;
Drop table Business_Number_Email;
Drop table Listers;
Drop table SCU_ALUM;

CREATE TABLE SCU_ALUM(
        firstname varchar(30),
        lastname varchar(30),
        grad_year int,
        approved int,
        PRIMARY KEY (firstname, lastname, grad_year)
);


CREATE TABLE Listers(
        firstname varchar(30),
        lastname varchar(30),
        grad_year int,
        businessname varchar(30),
        approved int,
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
        FOREIGN KEY (businessname) references Listers(businessname)
);

CREATE TABLE Business_Descriptions(
        businessname varchar(30),
        tag varchar(30),
        comments varchar(150),
        image BLOB,
        FOREIGN KEY (businessname) references Listers(businessname)
);

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
        FOREIGN KEY (businessname) references Listers(businessname)
);

