CREATE TABLE SCU_ALUM(
        firstname varchar(),
        lastname varchar(),
        grad_year int
        PRIMARY KEY (firstname, lastname, grad_year)
);


CREATE TABLE Listers(
        firstname varchar(),
        lastname varchar(),
        grad_year int,
        businessname varchar(),
        approved varchar(),
        PRIMARY KEY (firstname, lastname, grad_year),
        UNIQUE (businessname)
);


CREATE TABLE Business_Number_Email(
        businessname varchar(),
        phonenumber varchar(),
        email varchar(),
        FOREIGN KEY (businessname) reference Listers(businessname)
);

CREATE TABLE Business_Addresses(
        businessname varchar(),
        address varchar(),
        city varchar(),
        state char(3).
        zipcode varchar(),
        country varchar(),
        FOREIGN KEY (businessname) reference Listers(businessname)
);

CREATE TABLE Business_Tags(
        businessname varchar(),
        tag varchar(),
        FOREIGN KEY (businessname) reference Listers(businessname)
);
