Drop type search_table;
Drop type search_rec FORCE;

--Select data based on search filters
Create or Replace Type search_rec as object (
	businessname VARCHAR(30),
	tag VARCHAR(30),
	comments VARCHAR(150)
);
/
Create or Replace Type search_table as Table of search_rec;
/
Create or Replace Function searchFilters(s_txt in VARCHAR, s_tag in VARCHAR, s_loc in VARCHAR) return search_table
AS
Cursor Search_cur is Select * from Business_Descriptions WHERE businessname in (SELECT businessname FROM Listers WHERE approved = 1);
Cursor Loc_cur is SELECT * FROM Business_Addresses WHERE businessname in (SELECT businessname FROM Listers WHERE approved = 1);

v_search search_table;
l_rec Search_cur%rowtype;
l_loc Loc_cur%rowtype;
bsn_cnt INTEGER;
tag_cnt INTEGER;
cmt_cnt INTEGER;
loc_cnt INTEGER;

BEGIN

	v_search := search_table();

	IF s_txt is NULL AND s_tag is NULL AND s_loc is NULL THEN
		For l_rec in Search_cur
		loop
			v_search.extend;
			v_search(v_search.count) := search_rec(l_rec.businessname, l_rec.tag, l_rec.comments);
		END LOOP;

	ELSIF s_txt is NULL AND s_tag is NOT NULL AND s_loc is NULL THEN
		For l_rec in Search_cur
		loop
			IF l_rec.tag = s_tag THEN
				v_search.extend;
				v_search(v_search.count) := search_rec(l_rec.businessname, l_rec.tag, l_rec.comments);
			END IF;
		END LOOP;

	ELSIF s_txt is NULL AND s_tag is NULL AND s_loc is NOT NULL THEN
		For l_rec in Search_cur
		loop
			For l_loc in Loc_cur
			loop
				IF l_rec.businessname = l_loc.businessname AND l_loc.city = s_loc THEN
					v_search.extend;
					v_search(v_search.count) := search_rec(l_rec.businessname, l_rec.tag, l_rec.comments);
				END IF;
			END LOOP;
		END LOOP;

	ELSIF s_txt is NULL AND s_tag is NOT NULL AND s_loc is NOT NULL THEN
		For l_rec in Search_cur
		loop
			For l_loc in Loc_cur
			loop
				IF l_rec.businessname = l_loc.businessname AND l_rec.tag = s_tag AND l_loc.city = s_loc THEN
					v_search.extend;
					v_search(v_search.count) := search_rec(l_rec.businessname, l_rec.tag, l_rec.comments);
				END IF;
			END LOOP;
		END LOOP;
	ELSIF s_txt is NOT NULL AND s_tag is NULL AND s_loc is NULL THEN
		For l_rec in Search_cur
		loop
			For l_loc in Loc_cur
			loop
				SELECT INSTR(upper(l_rec.businessname), upper(s_txt)) into bsn_cnt FROM DUAL;
				SELECT INSTR(upper(l_rec.tag), upper(s_txt)) into tag_cnt FROM DUAL;
				SELECT INSTR(upper(l_rec.comments), upper(s_txt)) into cmt_cnt FROM DUAL;
				SELECT INSTR(upper(l_loc.city), upper(s_txt)) into loc_cnt FROM DUAL;
				IF l_rec.businessname = l_loc.businessname AND (bsn_cnt > 0 OR tag_cnt > 0 OR cmt_cnt > 0 OR loc_cnt > 0) THEN
					v_search.extend;
					v_search(v_search.count) := search_rec(l_rec.businessname, l_rec.tag, l_rec.comments);
				END IF;
			END LOOP;
		END LOOP;

	ELSIF s_txt is NOT NULL AND s_tag is NOT NULL AND s_loc is NULL THEN
		For l_rec in Search_cur
		loop
			For l_loc in Loc_cur
			loop
				SELECT INSTR(upper(l_rec.businessname), upper(s_txt)) into bsn_cnt FROM DUAL;
				SELECT INSTR(upper(l_rec.tag), upper(s_txt)) into tag_cnt FROM DUAL;
				SELECT INSTR(upper(l_rec.comments), upper(s_txt)) into cmt_cnt FROM DUAL;
				SELECT INSTR(upper(l_loc.city), upper(s_txt)) into loc_cnt FROM DUAL;
				IF l_rec.tag = s_tag AND l_rec.businessname = l_loc.businessname AND (bsn_cnt > 0 OR tag_cnt > 0 OR cmt_cnt > 0 OR loc_cnt > 0) THEN
					v_search.extend;
					v_search(v_search.count) := search_rec(l_rec.businessname, l_rec.tag, l_rec.comments);
				END IF;
			END LOOP;
		END LOOP;

	ELSIF s_txt is NOT NULL AND s_tag is NULL AND s_loc is NOT NULL THEN
		For l_rec in Search_cur
		loop
			For l_loc in Loc_cur
			loop
				SELECT INSTR(upper(l_rec.businessname), upper(s_txt)) into bsn_cnt FROM DUAL;
				SELECT INSTR(upper(l_rec.tag), upper(s_txt)) into tag_cnt FROM DUAL;
				SELECT INSTR(upper(l_rec.comments), upper(s_txt)) into cmt_cnt FROM DUAL;
				SELECT INSTR(upper(l_loc.city), upper(s_txt)) into loc_cnt FROM DUAL;
				IF l_loc.city = s_loc AND l_rec.businessname = l_loc.businessname AND (bsn_cnt > 0 OR tag_cnt > 0 OR cmt_cnt > 0 OR loc_cnt > 0) THEN
					v_search.extend;
					v_search(v_search.count) := search_rec(l_rec.businessname, l_rec.tag, l_rec.comments);
				END IF;
			END LOOP;
		END LOOP;

	ELSIF s_txt is NOT NULL AND s_tag is NOT NULL AND s_loc is NOT NULL THEN
		For l_rec in Search_cur
		loop
			For l_loc in Loc_cur
			loop
				SELECT INSTR(upper(l_rec.businessname), upper(s_txt)) into bsn_cnt FROM DUAL;
				SELECT INSTR(upper(l_rec.tag), upper(s_txt)) into tag_cnt FROM DUAL;
				SELECT INSTR(upper(l_rec.comments), upper(s_txt)) into cmt_cnt FROM DUAL;
				SELECT INSTR(upper(l_loc.city), upper(s_txt)) into loc_cnt FROM DUAL;
				IF l_rec.tag = s_tag AND l_loc.city = s_loc AND l_rec.businessname = l_loc.businessname AND (bsn_cnt > 0 OR tag_cnt > 0 OR cmt_cnt > 0 OR loc_cnt > 0) THEN
					v_search.extend;
					v_search(v_search.count) := search_rec(l_rec.businessname, l_rec.tag, l_rec.comments);
				END IF;
			END LOOP;
		END LOOP;

	END IF;

	return v_search;
END;
/
Show errors;

--Check if business is already in database
Create or Replace Function businessNameCount(var_businessname in VARCHAR) return INTEGER
AS
cnt INTEGER := 0;
found INTEGER := 0;
Begin
  select count(*) into cnt
  FROM Listers
  where businessname = var_businessname;

  IF cnt > 0 THEN
    found := 1;
  ELSE
    found := 0;
	END IF;

  return found;
End;
/
Show errors;

--Check if alum is alreayd in database
Create or Replace Function alumNameCount(var_firstname in VARCHAR, var_lastname in VARCHAR, var_gradyear in int) return INTEGER
AS
found INTEGER := 0;
cnt INTEGER := 0;
Begin
  select count(*) into cnt
  FROM SCU_ALUM
  where firstname = var_firstname AND lastname = var_lastname AND grad_year = var_gradyear;

  IF cnt > 0 THEN
    found := 1;
  ELSE
    found := 0;
	END IF;

  return found;

End;
/
Show errors;
