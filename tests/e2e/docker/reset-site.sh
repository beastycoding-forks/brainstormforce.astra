#!/bin/bash

echo "Reset to snapshot"
wp reset snapshots restore --id=$(wp reset snapshots list | grep 'initial' | sed 's/\s.*$//') --yes

echo "Success! Your Environment has been reset to Initial Setup."
