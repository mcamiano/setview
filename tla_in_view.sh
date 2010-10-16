#!/bin/bash
# Shell script to define a function which uses tla within a view

function tla()
{
. ${SETVIEWINSTALLPATH:-$HOME/bin}/ENV.setview
   cmd=$1
   shift
   case "$cmd" in ("init-tree"| "set-tree-version"| "undo"| "changes"| "file-diffs"| "archive-setup"| "make-category"| "make-branch"| "make-version"| "import"| "commit"| "get"| "get-changeset"| "lock-revision"| "abrowse"| "rbrowse"| "categories"| "branches"| "versions"| "revisions"| "ancestry"| "ancestry-graph"| "cat-archive-log"| "cacherev"| "cachedrevs"| "uncacherev"| "archive-meta-info"| "archive-snapshot"| "archive-version"| "archive-fixup"| "make-log"| "add-log-version"| "remove-log-version"| "logs"| "cat-log"| "changelog"| "log-for-merge"| "merges"| "new-merges"| "tag"| "update"| "replay"| "star-merge"| "apply-delta"| "missing"| "join-branch"| "sync-tree"| "file-find"| "lock-pristine"| "add-pristine"| "find-pristine"| "library-find"| "library-add"| "library-remove"| "library-categories"| "library-branches"| "library-versions"| "library-revisions"| "library-log"| "library-file"| "parse-package-name")
   "$TLA" "$cmd" -A  "$TLAarchive" $*
   ;;
   (*):
   "$TLA" "$cmd" $*
   esac
}
export -f tla
