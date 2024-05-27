# Ddos, Rate Limiting, and Captcha

### This repository demonstrates the implementation of various security measures to protect a web application from common attacks such as DDoS, brute-force, and unauthorized access. The project consists of three main components:

#### Backend (Express.js) : This backend serves as the main application and implements security measures to protect against attacks. 

#### Attacking Server (Express.js) : This backend simulates an attacker attempting to breach the server backend through brute-force attacks.

#### Frontend (React.js) : The frontend interacts with the server backend and utilizes Cloudflare's Captcha to verify user authenticity.


## Features

- DDoS Protection: The server backend uses rate limiting to mitigate DDoS attacks, ensuring that the        application remains available and responsive even under high traffic conditions.
- Brute-Force Protection: The attacking backend attempts to brute-force the server backend's OTP (One-Time Password) system. The server backend, however, is equipped with rate limiting and Captcha validation to prevent such attacks.
- Captcha Integration: The frontend integrates Cloudflare's Captcha to verify user authenticity before allowing access to the server backend. This helps prevent automated attacks and ensure that only legitimate users can interact with the application.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository to your local machine : `git clone https://github.com/swataswayam-14/Rate-limitting-DDoS-and-Captcha.git`
2. Install the necessary dependencies by running `cd backend && npm install`, `cd attackingserver && npm install` , `cd client && npm install`
3. Start the Node.js application by running `node dist/index.js`.
4. Start the React.js application by running `npm run dev`

## Usage

- Access the frontend application in your web browser.
- Interact with the application, which will trigger the Captcha validation.
- Observe the server backend's response to the brute-force attacks from the attacking backend.
- Analyze the server backend's logs and observe the rate limiting and Captcha validation in action.

## Contributing

Contributions to this project are welcome. If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.
