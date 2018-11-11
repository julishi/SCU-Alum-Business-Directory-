Create or Replace Function businessNameCount(var_businessname in VARCHAR) return INTEGER
AS
found INTEGER := 0;
Begin
  select count(*) into found
  FROM Listers
  where businessname = var_businessname;

  IF count > 0 THEN
    found := 1;
  else:
    found := 0;

  return found;
End;
/

Create or Replace Function alumNameCount(var_firstname in VARCHAR, var_lastname in VARCHAR, var_gradyear in int) return INTEGER
AS
found INTEGER := 0;
Begin
  select count(*) into found
  FROM SCU_ALUM
  where firstname = var_firstname AND where lastname = var_lastname AND where grad_year = var_gradyear;

  if count > 0:
    found := 1;
  else:
    found := 0;

  return found;

End;
/
