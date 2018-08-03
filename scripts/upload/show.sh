#!/bin/sh

API="http://localhost:4741"
URL_PATH="/uploads"
ID="5b64b6ba6ee3eb275cfc17bc"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  # --header "Authorization: Bearer ${TOKEN}"

echo
