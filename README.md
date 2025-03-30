# Twitch Reels Bot

A web application that monitors Twitch chat for Instagram Reel links and manages them in a queue. Built with React and Material-UI.

## Features

- Real-time Twitch chat monitoring
- Automatic Instagram Reel link detection
- Queue management for Reels
- Play and remove functionality
- Dark theme UI
- Responsive design

## Tech Stack

- React.js
- Material-UI
- tmi.js (Twitch chat client)
- Vercel (Deployment)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/snehithvarma86/twitch-reels-bot.git
cd twitch-reels-bot
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

### Building for Production

To create a production build:

```bash
npm run build
```

## Usage

1. Enter a Twitch channel name in the input field
2. Click "Connect" to start monitoring the chat
3. The application will automatically detect Instagram Reel links in the chat
4. Use the queue to manage and play detected Reels
5. Click "Disconnect" to stop monitoring

## Security Features

- URL validation for Instagram Reel links
- Input sanitization for channel names and usernames
- Safe URL opening with security flags
- No sensitive data storage

## Contributing

This is a private repository. Please contact the owner for contribution guidelines.

## License

This project is private and proprietary.

## Author

Snehith Varma
