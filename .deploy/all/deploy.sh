#!/bin/sh

# Move widget build to proper remote directory
echo "Deploying ${WIDGET_PATH} to remote Dashboard."
scp -o StrictHostKeyChecking=no "${WIDGET_PATH}" "ubuntu@${DEPLOY_ENDPOINT}:${TARGET_DIRECTORY}"

# Update permissions
ssh -o StrictHostKeyChecking=no ubuntu@"${DEPLOY_ENDPOINT}" << EOF
  LARAVEL_OWNER=ubuntu
  LARAVEL_WS_GROUP=www-data

  sudo usermod -a -G "\${LARAVEL_WS_GROUP}" "\${LARAVEL_OWNER}"
  sudo chown -R "\${LARAVEL_OWNER}:\${LARAVEL_WS_GROUP}" "\${TARGET_DIRECTORY}"
EOF
