#!/bin/sh

docker run -e POSTGRES_HOST_AUTH_METHOD=trust -p 5432:5432 --rm postgres -c fsync=false -c full_page_writes=false -c log_statement=none
