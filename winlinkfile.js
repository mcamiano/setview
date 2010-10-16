// winlinkfile.js: create a windows shortcut link to a file
// history: 
// 4/23/05 mca created
// first arg: filepath to link
// second arg: filename of shortcut (a filename with no extension)
// third arg: description of link (defaults to link file name)
// fourth arg: arguments passed to file (defaults to a blank)

Shell = new ActiveXObject("WScript.Shell");

scriptargs = WScript.Arguments; // Get access to command-line arguments

var LinkPath=scriptargs(0)
var LinkFileName=scriptargs(1)
try {
   var LinkDesc=scriptargs(2)
} catch(e) {
   var LinkDesc=LinkFileName
}
try {
   var LinkArgs=scriptargs(3)
} catch(e) {
   var LinkArgs=""
}


var DesktopPath = Shell.SpecialFolders("Desktop");
var WorkingDir=DesktopPath
var WindowsPath=Shell.ExpandEnvironmentStrings("%windir%");

var link = Shell.CreateShortcut(DesktopPath + "\\" + LinkFileName + ".lnk");

link.Arguments = LinkArgs;
link.Description = LinkDesc;
// link.HotKey = "CTRL+ALT+SHIFT+X";
link.IconLocation = WindowsPath+"\\System32\\SHELL32.dll,86"; 
link.TargetPath = LinkPath;
link.WindowStyle = 3;
link.WorkingDirectory = WorkingDir;
link.Save();

Icons = "0   SI_UNKNOWN   Unknown File Type\
1   SI_DEF_DOCUMENT   Default document\
2   SI_DEF_APPLICATION   Default application\
3   SI_FOLDER_CLOSED   Closed folder\
4   SI_FOLDER_OPEN   Open folder\
5   SI_FLOPPY_514   5 1/4 floppy\
6   SI_FLOPPY_35   3 1/2 floppy\
7   SI_REMOVABLE   Removable drive\
8   SI_HDD   Hard disk drive\
9   SI_NETWORKDRIVE   Network drive\
10   SI_NETWORKDRIVE_DISCONNECTED   network drive offline\
11   SI_CDROM   CD drive\
12   SI_RAMDISK   RAM disk\
13   SI_NETWORK   Entire network\
14      ?\
15   SI_MYCOMPUTER   My Computer\
16   SI_PRINTMANAGER   Printer Manager\
17   SI_NETWORK_NEIGHBORHOOD   Network Neighborhood\
18   SI_NETWORK_WORKGROUP   Network Workgroup\
19   SI_STARTMENU_PROGRAMS   Start Menu Programs\
20   SI_STARTMENU_DOCUMENTS   Start Menu Documents\
21   SI_STARTMENU_SETTINGS   Start Menu Settings\
22   SI_STARTMENU_FIND   Start Menu Find\
23   SI_STARTMENU_HELP   Start Menu Help\
24   SI_STARTMENU_RUN   Start Menu Run\
25   SI_STARTMENU_SUSPEND   Start Menu Suspend\
26   SI_STARTMENU_DOCKING   Start Menu Docking\
27   SI_STARTMENU_SHUTDOWN   Start Menu Shutdown\
28   SI_SHARE   Sharing overlay (hand)\
29   SI_SHORTCUT   Shortcut overlay (small arrow)\
30   SI_PRINTER_DEFAULT   Default printer overlay (small tick)\
31   SI_RECYCLEBIN_EMPTY   Recycle bin empty\
32   SI_RECYCLEBIN_FULL   Recycle bin full\
33   SI_DUN   Dial-up Network Folder\
34   SI_DESKTOP   Desktop\
35   SI_CONTROLPANEL   Control Panel\
36   SI_PROGRAMGROUPS   Program Group\
37   SI_PRINTER   Printer\
38   SI_FONT   Font Folder\
39   SI_TASKBAR   Taskbar\
40   SI_AUDIO_CD   Audio CD\
41                 Tree\
42                 Workstation with folder\
43   SI_FAVORITES   IE favorites\
44   SI_LOGOFF   Start Menu Logoff\
45               Key\
46               Search\
47   SI_LOCK   Lock\
48   SI_HIBERNATE   Hibernate\
"
