#!/bin/ksh

mysql -h localhost -u ${1:-viewtime} -p${2:admin} viewtime
