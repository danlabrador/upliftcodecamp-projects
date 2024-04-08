# AuroraBeats Playlist Manager

AuroraBeats Playlist Manager is a dynamic web application developed to enhance the user's music experience through seamless integration with Spotify's API. Created during a weekend as part of Uplift Code Camp's Full Stack Web Development boot camp, this project illustrates the practical application of interfacing with external APIs, specifically Spotify and OpenAI, to manage and generate playlists based on user preferences, all built with vanilla JavaScript and styled using Tailwind CSS.

## Project Description

AuroraBeats allows users to log in with their Spotify account to fetch, create, update, and manage their playlists directly within the app. The integration of the OpenAI API enables personalized track recommendations, pushing the boundaries of traditional playlist curation. The project highlights the implementation of OAuth for secure API communication and the creative use of APIs to enrich user interaction without the need for heavy frameworks.

### Key Features

- **OAuth Authentication**: Ensures secure access to Spotify accounts for managing playlists.
- **Integration with Spotify API**: Facilitates direct manipulation of user playlists within the application.
- **OpenAI Recommendations**: Leverages OpenAI's powerful GPT model to generate music recommendations.
- **Vanilla JavaScript Implementation**: Demonstrates pure JavaScript functionality for all operations, emphasizing the core language's power.
- **Tailwind CSS Styling**: Utilizes Tailwind CSS for an elegant design.

## Getting Started

To explore AuroraBeats, follow these setup instructions.

### Prerequisites

- Spotify Developer account for your Client ID and Secret.
- An OpenAI API key for accessing GPT-based recommendations.
- Node.js installed on your system.

### Installation

1. Clone the repo:

   ```sh
   git clone https://github.com/danlabrador/upliftcodecamp-projects.git
   ```

2. Navigate to the `js-api-app` directory:

   ```sh
   cd upliftcodecamp-projects/js-api-app
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

4. Start the application:

   ```sh
   npm run dev-2
   ```

This command runs the app in development mode, accessible at `http://localhost:1234`.

### Setting Up Environment Variables

In the `upliftcodecamp-projects` directory, create a `.env` file with your Spotify and OpenAI credentials:

```env
AURORA_BEATS_OPENAI_KEY=your_openai_api_key
AURORA_BEATS_SPOTIFY_CLIENT_ID=your_spotify_client_id
```

## Technologies Used

- **Vanilla JavaScript**: For logic and API integration.
- **Tailwind CSS**: For styling and design.
- **Parcel**: As the application bundler and development server.

## Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [OpenAI API](https://platform.openai.com/docs/)
- [Uplift Code Camp](https://upliftcodecamp.com/)