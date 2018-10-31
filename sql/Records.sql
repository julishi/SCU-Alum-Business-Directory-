--Insert data into tables
@DatabaseTables

--Insert values into SCU_ALUM
--(firstname, lastname, grad year)
Insert into SCU_ALUM values('John', 'Doe', 1985);
Insert into SCU_ALUM values('Jane', 'Doe', 1997);
Insert into SCU_ALUM values('Santa', 'Clara', 1950);
Insert into SCU_ALUM values('William', 'Smith', 1999);
Insert into SCU_ALUM values('Anne', 'Green', 2012);
Insert into SCU_ALUM values('Harry', 'Potter', 2015);
Insert into SCU_ALUM values('Sponge', 'Bob', 2009);
Insert into SCU_ALUM values('Captain', 'America', 2012);
Insert into SCU_ALUM values('Tony', 'Stark', 1993);
Insert into SCU_ALUM values('Jane', 'Eyre', 2018);

--Insert values into Listers 
--(firstname, lastname, grad year, business name, approved)
Insert into Listers values('John', 'Doe', 1985, 'B01', 1);
Insert into Listers values('Jane', 'Doe', 1997, 'B02', 1);
Insert into Listers values('Santa', 'Clara', 1950, 'B03', 1);
Insert into Listers values('William', 'Smith', 1999, 'B04', 1);
Insert into Listers values('Anne', 'Green', 2012, 'B05', 1);
Insert into Listers values('Harry', 'Potter', 2015, 'B06', 0);
Insert into Listers values('Sponge', 'Bob', 2009, 'B07', 0);
Insert into Listers values('Captain', 'America', 2012, 'B08', 0);
Insert into Listers values('Tony', 'Stark', 1993, 'B09', 0);
Insert into Listers values('Jane', 'Eyre', 2018, 'B10', 0);

--Insert values into Business_Number_Email
--(business name, phone num, email)
Insert into Business_Number_Email values('B01', '0001112222', 'b01@gmail.com');
Insert into Business_Number_Email values('B02', '1234567890', 'b02@gmail.com');
Insert into Business_Number_Email values('B03', '4081235678', 'b03@gmail.com');
Insert into Business_Number_Email values('B04', '0127893456', 'b04@gmail.com');
Insert into Business_Number_Email values('B05', '1029384756', 'b05@gmail.com');
Insert into Business_Number_Email values('B06', '5647382910', 'b06@gmail.com');
Insert into Business_Number_Email values('B07', '0981237654', 'b07@gmail.com');
Insert into Business_Number_Email values('B08', '9998887777', 'b08@gmail.com');
Insert into Business_Number_Email values('B09', '1357924680', 'b09@gmail.com');
Insert into Business_Number_Email values('B10', '1472583690', 'b10@gmail.com');

--Insert values into Business_Addresses
--(business name, address, city, state, zipcode, country)
Insert into Business_Addresses values('B01', 'A01', 'Santa Clara', 'CA', 'Z01', 'USA');
Insert into Business_Addresses values('B02', 'A02', 'Santa Clara', 'CA', 'Z02', 'USA');
Insert into Business_Addresses values('B03', 'A03', 'Santa Clara', 'CA', 'Z03', 'USA');
Insert into Business_Addresses values('B04', 'A04', 'Santa Clara', 'CA', 'Z04', 'USA');
Insert into Business_Addresses values('B05', 'A05', 'Santa Clara', 'CA', 'Z05', 'USA');
Insert into Business_Addresses values('B06', 'A06', 'Santa Clara', 'CA', 'Z06', 'USA');
Insert into Business_Addresses values('B07', 'A07', 'Santa Clara', 'CA', 'Z07', 'USA');
Insert into Business_Addresses values('B08', 'A08', 'Santa Clara', 'CA', 'Z08', 'USA');
Insert into Business_Addresses values('B09', 'A09', 'Santa Clara', 'CA', 'Z09', 'USA');
Insert into Business_Addresses values('B10', 'A10', 'Santa Clara', 'CA', 'Z10', 'USA');

--Insert values into Business_Tags
--(business name, tag)
Insert into Business_Tags values('B01', 'Clothing');
Insert into Business_Tags values('B02', 'Cosmetics');
Insert into Business_Tags values('B03', 'Entertainment');
Insert into Business_Tags values('B04', 'Food');
Insert into Business_Tags values('B05', 'Health');
Insert into Business_Tags values('B06', 'Manufacturing');
Insert into Business_Tags values('B07', 'Shopping');
Insert into Business_Tags values('B08', 'Tech');
Insert into Business_Tags values('B09', 'Clothing');
Insert into Business_Tags values('B10', 'Food');
