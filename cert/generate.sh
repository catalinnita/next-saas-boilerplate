openssl req -x509 -out cert/scrambleddata.crt -keyout cert/scrambleddata.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=scrambleddata.com' -extensions EXT -config <( \
   printf "[dn]\nCN=scrambleddata.com\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:scrambleddata.com\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
