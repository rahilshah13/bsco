#!/bin/bash

#if ! [ -x "$(command -v docker)" ]; then
#  echo 'Error: docker is not installed.' >&2
#  exit 1
#fi

domains=(bsco.xyz www.bsco.xyz)
rsa_key_size=4096
data_path="./data/certbot"
email="quentinbishop69420@gmail.com" # Adding a valid address is strongly recommended
staging=0 # Set to 1 if you're testing your setup to avoid hitting request limits

if [ -d "$data_path" ]; then
  read -p "Existing data found for $domains. Continue and replace existing certificate? (y/N) " decision
  if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
    exit
  fi
fi


echo "### Creating dummy certificate for $domains ..."
path="/etc/letsencrypt/live/$domains"
mkdir -p "$data_path/conf/live/$domains"
docker exec $(docker ps -q -f name=proxy_certbot)
  openssl req -x509 -nodes -newkey rsa:$rsa_key_size -days 1\
    -keyout './data/certbot/conf/live/bsco.xyz/privkey.pem' \
    -out './data/certbot/conf/live/bsco.xyz/fullchain.pem'
echo


#echo "### Starting nginx ..."
#docker stack deploy -c docker-stack.yml bsco
#echo
#
#echo "### Deleting dummy certificate for $domains ..."
#docker-compose run --rm --entrypoint "\
#  rm -Rf /etc/letsencrypt/live/$domains && \
#  rm -Rf /etc/letsencrypt/archive/$domains && \
#  rm -Rf /etc/letsencrypt/renewal/$domains.conf" certbot
#echo
#
#
#echo "### Requesting Let's Encrypt certificate for $domains ..."
##Join $domains to -d args
#domain_args=""
#for domain in "${domains[@]}"; do
#  domain_args="$domain_args -d $domain"
#done
#
## Select appropriate email arg
#case "$email" in
#  "") email_arg="--register-unsafely-without-email" ;;
#  *) email_arg="--email $email" ;;
#esac
#
## Enable staging mode if needed
#if [ $staging != "0" ]; then staging_arg="--staging"; fi
#
#docker-compose run --rm --entrypoint "\
#  certbot certonly --webroot -w /var/www/certbot \
#    $staging_arg \
#    $email_arg \
#    $domain_args \
#    --rsa-key-size $rsa_key_size \
#    --agree-tos \
#    --force-renewal" certbot
#echo
#
#echo "### Reloading nginx ..."
#docker stack deploy -c docker-stack-proxy.yml proxy
#docker stack deploy -c docker-stack.yml bsco
