////////////////////
//
// JScript implementation of the BrowseForFolder function.
//
// This script will display the BrowseForFolder GUI and allow the user to select
// a folder (or file) which it returns as a text string. If the Cancel button
// is pressed or an illegal item is selected, NULL is returned.
//
// ~~Author~~. Eric Mauger (mauger@aosi.com)
// Date : 15Jun1999
//
// Some updates provided by Mitch Amiano (Mitch.Amiano@AgileMarkup.com)
// See http://msdn.microsoft.com/library/default.asp?url=/library/en-us/shellcc/platform/shell/reference/structures/browseinfo.asp
// and http://msdn.microsoft.com/library/default.asp?url=/library/en-us/shellcc/platform/shell/reference/objects/shell/browseforfolder.asp
// for more info.
//
// Note : This script is based upon the "browse_for_folder.vbs" VBScript which
// was developed by Jan Herman Scheffer, Seán Hennessy, and Gordon Ali.
//
////////////////////


// BrowseInfo presets
var BIF_None = 0x0000, // None
    BIF_OnlyIncludeDirs    = 0x0001,  // Only include directories (e.g. not Printers or Control Panel)
    BIF_DontGoBelowDomain  = 0x0002,  // Don't go below domain
    BIF_StatusText         = 0x0004,  // Includes a status area
    BIF_ReturnFSAncestors  = 0x0008,  // Only return file system ancestors
    BIF_InputBox           = 0x0010,  // Includes an InputBox so the user can type a path
    BIF_ValidateInputBox   = 0x0020,  // Validate the path typed in the InputBox
    BIF_BrowseForComputer  = 0x1000,  // Browse for computers
    BIF_BrowseForPrinter   = 0x2000,  // Browse for printers
    BIF_BrowseIncludeFiles = 0x4000;  // Include files

// BrowseInfo presets, Updated from newer list
var BIF_RETURNONLYFSDIRS   = 0x0001 //only file system directories
var BIF_DONTGOBELOWDOMAIN = 0x0002  //no network folders below domain level
var BIF_STATUSTEXT = 0x0004         //include status area for callback
var BIF_RETURNFSANCESTORS = 0x0008  //only return file system ancestors
var BIF_EDITBOX = 0x0010           //add edit box 
var BIF_NEWDIALOGSTYLE = 0x0040    //use the new dialog layout
var BIF_UAHINT = 0x0100
var BIF_NONEWFOLDERBUTTON = 0x0200 //hide new folder button
var BIF_NOTRANSLATETARGETS = 0x0400 //return lnk file
var BIF_BROWSEFORCOMPUTER = 0x1000 //only return computers
var BIF_BROWSEFORPRINTER = 0x2000 //only return printers
var BIF_BROWSEINCLUDEFILES = 0x4000 //browse for everything
var BIF_SHAREABLE = 0x8000 //sharable resources, requires BIF_USENEWUI

var BIF_USENEWUI = BIF_NEWDIALOGSTYLE | BIF_EDITBOX


// StartFolder presets
// * = You should add BIF_BrowseIncludeFiles to the BrowseInfo input parameter
var BSF_Desktop = 0, // Desktop is the root
    BSF_InternetExplorer    = 1,   // Internet Explorer is the root
    BSF_Programs            = 2,   // Programs folder in the StartMmenu is the root
    BSF_ControlPanel        = 3,   // Control Panel is the root *
    BSF_Printers            = 4,   // Printers folder is the root *
    BSF_MyDocuments         = 5,   // My Documents folder is the root
    BSF_Favorites           = 6,   // Favorites is the root
    BSF_StartUp             = 7,   // StartUp folder in the Start Menu is the root *
    BSF_Recent              = 8,   // Recent folder is the root *
    BSF_SendTo              = 9,   // Send To folder is the root *
    BSF_RecycleBin          = 10,  // Recycle Bin is the root *
    BSF_StartMenu           = 11,  // Start Menu is the root
    BSF_DesktopDirectory    = 16,  // Desktop folder is the root
    BSF_MyComputer          = 17,  // My Computer is the root
    BSF_NetworkNeighborhood = 18,  // Network Neighborhood is the root
    BSF_Nethood             = 19,  // Nethood folder is the root
    BSF_Fonts               = 20,  // Fonts folder is the root
    BSF_Templates           = 21,  // Templates folder is the root

    BSF_CommonAppData       = 35,  // Common application data dir (~\All Users\Application Data\)
    BSF_Windows             = 36,  // Windows root
    BSF_WindowsSystem       = 37,  // Windows System32 
    BSF_ProgramFiles        = 38,  // Program Files Folder
    BSF_Profile             = 40,  // User profile directory
    BSF_UserSpecified       = "C:\\Temp\\";


var SelectedItem = BrowseForFolder("Please Select a Folder...", BIF_BROWSEINCLUDEFILES | BIF_USENEWUI| BIF_InputBox | BIF_StatusText, BSF_NetworkNeighborhood)

if (SelectedItem == null)
{
  WScript.Echo("Cancel was hit!");
}
else
{
  WScript.Echo(SelectedItem);
}


////////////////////
//
// BrowseForFolder
//

function BrowseForFolder(Prompt, BrowseInfo, StartFolder)
{

  var WSHShellApp = WScript.CreateObject("Shell.Application");

  try {
     var SelectedItem = WSHShellApp.BrowseForFolder(0, Prompt, BrowseInfo, StartFolder);
  }
  catch (e) { }

  try   // try to return the path of the selected folder or file
  {
    return (SelectedItem.ParentFolder.ParseName(SelectedItem.Title).Path);
  }
  catch (Error)   // error occurs when Cancel is pressed or a folder or file is not selected
  {
    if (SelectedItem == null)   // if Cancel was pressed
    {
      return(null);
    }

    var ColonPos = SelectedItem.Title.lastIndexOf(":");
    if (ColonPos > 0)   // if the root of a drive was selected (e.g. "Hard Drive (C:)")
    {
      return(SelectedItem.Title.substr((ColonPos-1),2) + "\\");
    }
    else   // else return the name of the selected item (e.g. "Printers")
    {
      return(SelectedItem.Title);
    }
  }

}
