#!/bin/sh

# Move widget build to proper remote directory
echo "Deploying ${WIDGET_PATH} to remote Dashboard."
scp -o StrictHostKeyChecking=no "${WIDGET_PATH}" "ubuntu@${DEPLOY_ENDPOINT}:${TARGET_DIRECTORY}"
