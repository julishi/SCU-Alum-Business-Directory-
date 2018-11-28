<!--The code used is based on https://oracle-base.com/articles/9i/storing-passwords-in-the-database-9i with minor edits to fit our system-->
CREATE OR REPLACE PACKAGE BODY user_security AS

  FUNCTION get_hash (p_username  IN  VARCHAR2,
                     p_password  IN  VARCHAR2)
    RETURN VARCHAR2 AS
    --Results of function will be VARCHAR2(40))

  BEGIN
    RETURN DBMS_UTILITY.GET_HASH_VALUE( upper(p_username)||'/'||upper(p_password), 1000000000, power(2,30) )
  END;

  PROCEDURE add_staff_member (firstname IN VARCHAR2, lastname IN VARCHAR2, p_username  IN  VARCHAR2,
                        p_password  IN  VARCHAR2) AS
    BEGIN
      INSERT INTO login_credentials (
        firstname,
        lastname,
        username,
        password
      )
      VALUES (
        UPPER(firstname),
        UPPER(lastname),
        UPPER(p_username),
        get_hash(p_username, p_password)
      );

      COMMIT;
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

