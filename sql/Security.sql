--The code used is from https://oracle-base.com/articles/9i/storing-passwords-in-the-database-9i
--Source code for hash function: https://asktom.oracle.com/pls/asktom/f?p=100:11:::::P11_QUESTION_ID:95412348059
--All in pl/sql

--Goal of this file: The file here is in charge of security procol for log-in credentials. It has a function to hash a password
--so it's stored securly in our datatable, a function to then store this hashed password along with the person's first/last name
--and username, functions/procedures to check if a username/password exists when someone tries to log-in, and lastly 
--a procedure to allow a password to be reset. 

--This part of the code is written by Maggie Cai
--defining the procedures and functions 
CREATE OR REPLACE PACKAGE user_security AS

  FUNCTION get_hash (p_username  IN  VARCHAR2,
                     p_password  IN  VARCHAR2)
    RETURN VARCHAR2;

  PROCEDURE add_staff_member (v_firstname IN VARCHAR2,
                              v_lastname IN VARCHAR2,
                              p_username  IN  VARCHAR2,
                              p_password  IN  VARCHAR2);

  PROCEDURE change_account_password (p_username IN VARCHAR2,
                                    p_oldpassword IN VARCHAR2,
                                    p_newpassword IN VARCHAR2);

  PROCEDURE validate_user_account_exists (p_username  IN  VARCHAR2,
                                          p_password  IN  VARCHAR2);

  FUNCTION validate_user_account_exists(p_username  IN  VARCHAR2,
                                        p_password  IN  VARCHAR2)
    RETURN NUMBER;

END;
/
Show errors;

--This part of the code is written by Juliana Shihadeh, except for change_account_password - which was written by Maggie Cai 
--Body of the defined functions and procedures starts here
CREATE OR REPLACE PACKAGE BODY user_security AS

--Function: Hashing a password
--To hash a password, need to take in the peron's username and password. 
--Technically if the project was to be used in real life, the IT desk would be in charge of inserting. 
  FUNCTION get_hash (p_username  IN  VARCHAR2,
                     p_password  IN  VARCHAR2)
    RETURN VARCHAR2 AS
    --Results of function will be VARCHAR2(40))

  BEGIN
    -- HASH function
    -- takes 3 variables: the value to hash, base value for returned value to start at, and size of the hash table
    -- the value to hash is a combination of the username and password so the value stored is a unique combination of username/password
    -- helps prevent accidental duplicate stored password values if two users were to have the same password 
    RETURN ltrim( to_char( DBMS_UTILITY.GET_HASH_VALUE( upper(p_username)||'/'||upper(p_password), 1000000000, power(2,30) ),
                            rpad( 'X', 29, 'X' ) || 'X') );
  END;

-- Procedure: Adding a new staff member
-- Again, if the project was to be used in real life the IT desk would be in charge of inserting new staff logins by running a sql command:
-- INSERT INTO ADD_STAFF_MEMBER(.......) 
-- Variables needed to add a new staff member: firstname, lastname, username, and password
-- HASH function called in here to hash the password before storing it in the database
-- At the end of procedure a new staff member is added to have log-in accessibility 
  PROCEDURE add_staff_member (v_firstname IN VARCHAR2, v_lastname IN VARCHAR2, p_username  IN  VARCHAR2,
                        p_password  IN  VARCHAR2) AS
  BEGIN
    INSERT INTO login_credentials (
      firstname,
      lastname,
      username,
      password
    )
    
    --The values that will be inserted in the table 
    VALUES (
      UPPER(v_firstname),
      UPPER(v_lastname),
      UPPER(p_username),
      --call the hash function to hash the password before insertion
      get_hash(p_username, p_password)
    );

    COMMIT;
  END;
  
  --Procedure: Change Account Password
  --changing password: requires the username, old password, and new password
  --old password is used to look up the location of the stored data in the datatable 
  PROCEDURE change_account_password (p_username IN VARCHAR2,
                                    p_oldpassword IN VARCHAR2,
                                    p_newpassword IN VARCHAR2) AS
  --looking up location of old password to update password value there with the new password
  v_rowid ROWID;
  BEGIN
    SELECT rowid
    INTO v_rowid
    FROM login_credentials
    WHERE username = UPPER(p_username)
    AND password = get_hash(p_username, p_oldpassword)
    FOR UPDATE;

    --calling in the hash function to hash the new password
    UPDATE login_credentials
    SET password = get_hash(p_username, p_newpassword)
    where rowid = v_rowid;

    COMMIT;
  EXCEPTION
    WHEN NO_DATA_FOUND THEN
      RAISE_APPLICATION_ERROR(-20000, 'Invalid username/password.');
  END;

  --Procedure: Validata a User Account Exists
  --searches for user, if itsn't found returns an application error 
  PROCEDURE validate_user_account_exists (p_username  IN  VARCHAR2,
                      p_password  IN  VARCHAR2) AS
  v_dummy  VARCHAR2(1);

  BEGIN
    SELECT '1'
    INTO   v_dummy
    FROM   login_credentials
    WHERE  username = UPPER(p_username)
    AND    password = get_hash(p_username, p_password);
  EXCEPTION
    WHEN NO_DATA_FOUND THEN
      RAISE_APPLICATION_ERROR(-20000, 'Invalid username/password.');
  END;

  --Function: Validate a user account exists by calling the procedure validate_user_account_exists to run the check 
  --calls the validate_user_account_exists procedure to check if user exists
  --returns 1 if a value was found, otherwise if it rain into raised error returns 0
  FUNCTION validate_user_account_exists(p_username  IN  VARCHAR2,
                 p_password  IN  VARCHAR2)
    RETURN NUMBER AS

  BEGIN
    validate_user_account_exists(p_username, p_password);
    RETURN 1;
  EXCEPTION
    WHEN OTHERS THEN
      RETURN 0;
  END;

END;
/
Show errors;
