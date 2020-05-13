#!/bin/sh

# Updated project file permissions due to running in non-user directory
# source: https://github.com/marounmelhem/laravel-permissions-fix/blob/dev/perm_fix.sh
ssh -o StrictHostKeyChecking=no ubuntu@"${DEPLOY_ENDPOINT}" << EOF
  LARAVEL_OWNER=ubuntu
  LARAVEL_WS_GROUP=www-data
  LARAVEL_ROOT=${TARGET_DIRECTORY}

  sudo usermod -a -G "\${LARAVEL_WS_GROUP}" "\${LARAVEL_OWNER}"

  sudo chown -R "\${LARAVEL_OWNER}:\${LARAVEL_WS_GROUP}" "\${LARAVEL_ROOT}"
EOF
