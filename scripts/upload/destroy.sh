#!/bin/bash

API="http://localhost:4741"
URL_PATH="/uploads"
ID="5b64b106c80776237db9a4e9"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  # --header "Authorization: Bearer ${TOKEN}"

echo
