--The code used is from https://oracle-base.com/articles/9i/storing-passwords-in-the-database-9i
--Source code for hash function: https://asktom.oracle.com/pls/asktom/f?p=100:11:::::P11_QUESTION_ID:95412348059

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
    RETURN BOOLEAN;

END;
/
Show errors;

CREATE OR REPLACE PACKAGE BODY user_security AS

  FUNCTION get_hash (p_username  IN  VARCHAR2,
                     p_password  IN  VARCHAR2)
    RETURN VARCHAR2 AS
    --Results of function will be VARCHAR2(40))

  BEGIN
    -- Oracle 10g+ : Requires EXECUTE on DBMS_CRYPTO
    RETURN ltrim( to_char( DBMS_UTILITY.GET_HASH_VALUE( upper(p_username)||'/'||upper(p_password), 1000000000, power(2,30) ),
                            rpad( 'X', 29, 'X' ) || 'X') );
  END;

  PROCEDURE add_staff_member (v_firstname IN VARCHAR2, v_lastname IN VARCHAR2, p_username  IN  VARCHAR2,
                        p_password  IN  VARCHAR2) AS
  BEGIN
    INSERT INTO login_credentials (
      firstname,
      lastname,
      username,
      password
    )
    VALUES (
      UPPER(v_firstname),
      UPPER(v_lastname),
      UPPER(p_username),
      get_hash(p_username, p_password)
    );

    COMMIT;
  END;

  PROCEDURE change_account_password (p_username IN VARCHAR2,
                                    p_oldpassword IN VARCHAR2,
                                    p_newpassword IN VARCHAR2) AS
  v_rowid ROWID;
  BEGIN
    SELECT rowid
    INTO v_rowid
    FROM login_credentials
    WHERE username = UPPER(p_username)
    AND password = get_hash(p_username, p_oldpassword)
    FOR UPDATE;

    UPDATE login_credentials
    SET password = get_hash(p_username, p_newpassword)
    where rowid = v_rowid;

    COMMIT;
  EXCEPTION
    WHEN NO_DATA_FOUND THEN
      RAISE_APPLICATION_ERROR(-20000, 'Invalid username/password.');
  END;

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

  FUNCTION validate_user_account_exists(p_username  IN  VARCHAR2,
                 p_password  IN  VARCHAR2)
    RETURN BOOLEAN AS

  BEGIN
    validate_user_account_exists(p_username, p_password);
    RETURN TRUE;
  EXCEPTION
    WHEN OTHERS THEN
      RETURN FALSE;
  END;

END;
/
Show errors;
