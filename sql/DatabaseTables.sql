Drop table Business_Edits;
Drop table Business_Descriptions;
Drop table Business_Addresses;
Drop table Business_Number_Email;
Drop table Listers;
Drop table SCU_ALUM;
Drop table Business_Deletions;
Drop table login_credentials;

CREATE TABLE SCU_ALUM(
        firstname varchar(30),
        lastname varchar(30),
        grad_year int,
        approved int,
        visits int,
        PRIMARY KEY (firstname, lastname, grad_year)
);


CREATE TABLE Listers(
        firstname varchar(30),
        lastname varchar(30),
        grad_year int,
        businessname varchar(30),
        approved int,
        PRIMARY KEY (firstname, lastname, grad_year, businessname),
        UNIQUE (businessname)
);


CREATE TABLE Business_Number_Email(
        businessname varchar(30),
        phonenumber varchar(30),
        email varchar(30),
        CONSTRAINT fk_number_email FOREIGN KEY (businessname) references Listers(businessname) On Delete Cascade
);

CREATE TABLE Business_Addresses(
        businessname varchar(30),
        address varchar(30),
        city varchar(30),
        state char(3),
        zipcode varchar(30),
        CONSTRAINT fk_addresses FOREIGN KEY (businessname) references Listers(businessname) On Delete Cascade
);

CREATE TABLE Business_Descriptions(
        businessname varchar(30),
        tag varchar(30),
        comments varchar(150),
        image BLOB,
        CONSTRAINT fk_descriptions FOREIGN KEY (businessname) references Listers(businessname) On Delete Cascade
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
        UNIQUE (businessname)
);

CREATE TABLE Business_Deletions(
        firstname varchar(30),
        lastname varchar(30),
        grad_year int,
        businessname varchar(30),
        phonenumber varchar(30),
        requester varchar(30),
        UNIQUE (businessname)
);

--Table to hold the username login and password the SCU Alum office will be using--
CREATE TABLE login_credentials(
        username varchar(30),
        password varchar(30)
);
