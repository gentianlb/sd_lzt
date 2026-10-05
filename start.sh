#!/usr/bin/env bash
cd "$(dirname "$0")"
echo "Therapieantrag Sucht: http://127.0.0.1:8080"
exec python3 -m http.server 8080
