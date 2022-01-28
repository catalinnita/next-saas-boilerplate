###### WIP

---

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

**Set .env variables:**

```
AUTH0_BASE_URL=https://{yourIP}:3000
AUTH0_ISSUER_BASE_URL=https://{auth0 > applications > your app > settings > domain}
AUTH0_CLIENT_ID={auth0 > applications > your app > settings > clientId}
AUTH0_CLIENT_SECRET={auth0 > applications > your app > settings > clientSecret}
AUTH0_SECRET{generate one}
NEXT_PUBLIC_STRIPE_KEY={stripe > developers > api keys > secret key}
```

**Install the modules:** \
`yarn`

**Update the app config:** \
In `./config/appConfig.ts` add the **priceId** for the price you've set above

**Run the server:** \
`yarn dev`

---

Use vercel for serverless one click deployment ... It's all you need ;)
