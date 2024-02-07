
# Authentication Backend Integration Guide

Hey there! If you're looking to hook up your frontend with our auth backend, you're in the right place. We'll walk you through the steps to get your drivers and users registered and logged in. Let's get started!

## 🚗 Driver Onboarding

Want to get your drivers on the road? Here's how you can sign them up.

**Hit this Endpoint with a POST:**
```
https://api-focnoae3da-uc.a.run.app/api/register/driver
```

**What to Send:**
```json
{
  "name": "John Doe",
  "email": "john@wheelygood.com",
  "password": "vroomvroom",
  "phoneNumber": "555-2368",
  "licenseNumber": "DR123456",
  "vehicle": "Fast Car 2000"
}
```

**All Good? You'll See:**
- **Status:** `201 Created`
- **Body:** `{"message": "Driver registered successfully", "driver": {...}}`

**Whoops! Something Wrong? Look for:**
- **Status:** `500 Internal Server Error`
- **Body:** `{"message": "Error registering driver", "error": "Details here"}`

## 🔑 Driver Login

Drivers need to log in? No problem. Here's how they can get access.

**Endpoint for Access:**
```
https://api-focnoae3da-uc.a.run.app/api/login/driver
```

**Pass in the Details:**
```json
{
  "email": "john@wheelygood.com",
  "password": "vroomvroom"
}
```

**Success Looks Like:**
- **Status:** `200 OK`
- **Body:** `{"token": "super_secret_token"}`

Remember to handle this token with care! It's the key to your kingdom.

## 👥 User Sign-Up

Got users? Great! Here's how they can create an account.

**Where to Send the Info:**
```
https://api-focnoae3da-uc.a.run.app/api/register/user
```

**Data Needed:**
```json
{
  "name": "Jane Rider",
  "email": "jane@rides.com",
  "password": "safetravels",
  "phoneNumber": "555-1234"
}
```

## 🗝️ User Login

For users to start using your service, they'll need to log in.

**Login Here:**
```
https://api-focnoae3da-uc.a.run.app/api/login/user
```

**Credentials Required:**
```json
{
  "email": "jane@rides.com",
  "password": "safetravels"
}
```

## 🛠️ Best Practices

A few tips to keep your app secure and user-friendly:
- Always use HTTPS—security first!
- Don't store JWTs in local storage for the production build. Cookies are a safer choice.
- Gracefully handle errors on the frontend. Keep your users informed.
- Validate inputs before making requests. It saves time and bandwidth.

If you need more info or run into any snags, reach out to us, or check the full API docs. Happy coding!
