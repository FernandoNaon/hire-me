
## Famly-frontend

Welcome to the Famly app. This application is designed to help nurseries manage the attendance of children each day. It provides functionality to list children, check them in, and check them out.


#### Getting Started

To get started with this application, you'll need to fork this repository and set up the frontend codebase. You will also need the access token provided to you via email to access the Famly API.

### Setup Instructions

1. Clone the repository

```bash
git clone https://github.com/FernandoNaon/famly-frontend.git
```

2. Install dependencies

```bash
cd famly-frontend
npm install
```

3. Set Up Environment Variables: Create a .env file in the root of the project and add your access token:

```bash
VITE_API_KEY=your-access-token
```

4. Start the Development Server

```bash
npm run dev
```


### Usage

Once the application is running, you can perform the following actions:

 - List Children: View a list of children with pagination.

- Checkin a Child: Check a child into the nursery by clicking the "Checkin" button.

- Checkout a Child: Check a child out of the nursery by clicking the "Checkout" button.

