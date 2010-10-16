@echo off

REM check arguments: %1=filepath , %2=link fileName(no extension)
if "%1"=="" goto usageexit
if "%2"=="" goto usageexit

REM run the jscript program to make the link
cscript //nologo winlinkfile.js "%1" "%2" 

REM jump around the usage message
goto normalexit

:usageexit
echo winlinkfile: Create a windows shortcut file link
echo Usage: winlinkfile FilePath LinkFileName
goto normalexit

rem :errorexit
rem echo "winlinkfile Error: "
rem goto normalexit

:normalexit
