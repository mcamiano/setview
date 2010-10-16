// winlink.js: create a windows shortcut link to a url
// history: 
// 4/23/05 mca created
// first arg: url to link
// second arg: filename of shortcut (a filename with no extension)

Shell = new ActiveXObject("WScript.Shell");

scriptargs = WScript.Arguments; // Get access to command-line arguments

var LinkURL=scriptargs(0)
var LinkFileName=scriptargs(1)

var DesktopPath = Shell.SpecialFolders("Desktop");
var WorkingDir=DesktopPath

var link = Shell.CreateShortcut(DesktopPath + "\\" + LinkFileName + ".url");
link.TargetPath = LinkURL;
link.Save();
