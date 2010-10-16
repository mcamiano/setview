@echo off

REM check arguments: %1=URL , %2=link fileName(no extension)
if "%1"=="" goto usageexit
if "%2"=="" goto usageexit

REM var LinkURL=scriptargs(0)
REM var LinkFileName=scriptargs(1)

REM run the jscript program to make the link
cscript //nologo winlink.js "%1" "%2" 

REM jump around the usage message
goto normalexit

:usageexit
echo winlink: Create a windows shortcut URL link
echo Usage: winlink LinkURL LinkFileName
goto normalexit

rem :errorexit
rem echo "winlink Error: "
rem goto normalexit

:normalexit
