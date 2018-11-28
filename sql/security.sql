<!--The code used is from https://oracle-base.com/articles/9i/storing-passwords-in-the-database-9i -->


CREATE OR REPLACE PACKAGE BODY user_security AS

  FUNCTION get_hash (p_username  IN  VARCHAR2,
                     p_password  IN  VARCHAR2)
    RETURN VARCHAR2 AS
    --Results of function will be VARCHAR2(40))

    --The salt value--
    l_salt VARCHAR2(30) := 'E1F53135E559C254';
  BEGIN
    -- Oracle 10g+ : Requires EXECUTE on DBMS_CRYPTO
    RETURN DBMS_CRYPTO.HASH(UTL_RAW.CAST_TO_RAW(UPPER(p_username) || l_salt || UPPER(p_password)), DBMS_CRYPTO.HASH_SH1);
  END;

  PROCEDURE add_staff_member (p_username  IN  VARCHAR2,
                        p_password  IN  VARCHAR2) AS
    BEGIN
      INSERT INTO login_credentials (
        firstname,
        lastname,
        username,
        password
      )
      VALUES (
        app_users_seq.NEXTVAL,
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
