METASOURCES= install manifest.txt README
NORMALSOURCES= listarchives mirrorlocal2localweb mkview newarchive setarchive setview tell_tla_archive_commands tell_tla_no_archive_commands viewtime.sh viewtime.sql tla_in_view.sh mklog setview.setup listviews importbaseline viewhelp
SOURCES= ${METASOURCES} ${NORMALSOURCES}
installdir=/projects/tools/bin

all:
	tla tree-lint

localinstall:
	@-for i in ${SOURCES} ; \
	do \
	   echo $$i ; \
	   /bin/cp $$i  ${installdir} ; \
	done

# Create an installable shell archive, with embedded base64 encoded tar
distribution: manifest.txt
	@-tar -cvzf setview.tgz ${SOURCES} 

manifest.txt:
	@-/bin/rm -f manifest.txt; \
	for file in ${NORMALSOURCES}; \
	do \
	   echo $${file} ; \
	done > manifest.txt

distrodiff:
	@-changed="" ; \
	missing="" ; \
	for i in ${SOURCES} ; \
	do \
	   if [[ ! -f ${installdir}/$$i ]]; \
	   then \
	      missing="$${missing} $$i"; \
	   else \
	      if [[ $$i -ot ${installdir}/$$i ]] ; \
	      then \
	         cmp --quiet $$i  ${installdir}/$$i ; \
	         if [[ $$? -eq 1 ]] ; \
	         then \
	            changed="$${changed} $$i"; \
	         fi ;\
	      fi ; \
	   fi ;\
	done ; \
	if [[ ! -z "$${changed}" ]] ; then echo "Changed: $${changed}"; fi; \
	if [[ ! -z "$${missing}" ]] ; then echo "Missing: $${missing}"; fi;
