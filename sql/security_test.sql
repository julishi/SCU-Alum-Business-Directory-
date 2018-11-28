exec user_security.add_staff_member('A_firstname', 'A_lastname', 'A_flastname', 'A_password');
--exec user_security.add_staff_member('B_firstname', 'B_lastname', 'B_flastname', 'B_password');
--exec user_security.add_staff_member('C_firstname', 'C_lastname', 'C_flastname', 'C_password');
--exec user_security.add_staff_member('D_firstname', 'D_lastname', 'D_flastname', 'D_password');

BEGIN
     IF user_security.validate_user_account_exists('A_flastname', 'A_Error_password'); TH
      DBMS_OUTPUT.PUT_LINE('TRUE');
     ELSE
      DBMS_OUTPUT.PUT_LINE('FALSE');
          END IF;
END;
/

BEGIN
     IF user_security.validate_user_account_exists('A_flastname', 'A_Error_password'); TH
      DBMS_OUTPUT.PUT_LINE('TRUE');
     ELSE
      DBMS_OUTPUT.PUT_LINE('FALSE');
          END IF;
END;
/

BEGIN
     IF user_security.validate_user_account_exists('A_Error_flastname', 'A_password'); TH
      DBMS_OUTPUT.PUT_LINE('TRUE');
     ELSE
      DBMS_OUTPUT.PUT_LINE('FALSE');
          END IF;
END;
/
