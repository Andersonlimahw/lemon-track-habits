## Prisma

## Install prisma globally

```shell
  npm i -g prisma

```

## Run migrations

```shell  
  npx prisma migrate dev --name 20230201230453_creating_database

```

## Run seed to populate dabase with data

```shell  
  npm run seed

```

## Running prisma studio

```shell
  dotenv -e .env.local -- npx prisma studio

```

Expected:

Prisma Studio is up on <http://localhost:5555>

Terminal:

![Alt text](./demo/image.png)

Browser:
![Alt text](./demo/image-1.png)

In another terminal, run api

Start server:

```shell  
  npm run dev

```

Now you api is running and you can make requests!
![Alt text](./demo/image-2.png)

## Issues

IOS has problem to https, so follow this steps:

Generate your SSL certificate

```shell  
  openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365

```

copy generates files

cert.pem
key.pem

and past at ssl folder

![Alt text](./demo/image-3.png)

Install ngrok

```shell  
  npm i -g ngrok

```

Autenticate:

```shell  
  npx ngrok config add-authtoken <custom_value>

```

Run ngrok to expose your api

```shell  
  ngrok https https://localhost:443

```
