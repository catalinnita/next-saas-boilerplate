###### WIP
----

### Getting Started

#### 1. CREATE AN AUTH0 FREE ACCOUNT ... [https://www.auth0.com](https://www.auth0.com)

**In auth0 > applications > settings set:**

Application Login URI:
```
https://{yourIP}:3000/api/login 
```

Allowed Callback URLs:
```
https://{yourIP}:3000/api/callback,
https://{yourIP}:3000/dashboard,
https://{yourIP}:3000/api/logout
```

Allowed Logout URLs:
```
https://{yourIP}:3000/
```

#### 2. CREATE A STRIPE ACCOUNT ... [https://www.stripe.com](https://www.stripe.com)

Create a price in Products > Pricing > Add another price

#### 3. CLONE THE REPO

__Set .env variables:__
```
APP_DOMAIN=https://{yourIP}:3000 \
NEXT_PUBLIC_AUTH0_DOMAIN={auth0 > applications > settings > domain} \
AUTH0_CLIENT_ID={auth0 > applications > settings > clientId} \
AUTH0_CLIENT_SECRET={auth0 > applications > settings > clientSecret} \
AUTH0_COOKIE_SECRET={generate one} \
NEXT_PUBLIC_STRIPE_KEY={stripe > developers > API Keys} 
```
__Install the modules:__ \
`yarn`

__Update the app config:__ \
In `./config/appConfig.ts` add the __priceId__ for the price you've set above

__Run the server:__ \
`yarn dev`

---- 

Use vercel for serverless one click deployment ... It's all you need ;)
