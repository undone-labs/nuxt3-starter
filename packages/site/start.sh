#!/bin/bash
export NITRO_SSL_CERT="`cat ../../localhost_cert.pem`"
export NITRO_SSL_KEY="`cat ../../localhost_key.pem`"
exec node .output/server/index.mjs
