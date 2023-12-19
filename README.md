Mobile Dex - Pokémon Encyclopedia
Mobile Dex is a mobile app built around the PokeApi (https://pokeapi.co/), serving as a digital Pokédex. This application allows users to browse and explore information about different Pokémona and view their different forms.

Getting Started
Follow these steps to set up and run the Mobile Dex app on your local machine:

Prerequisites
Install the newest version of Node.js: Node.js
Installation
Install Expo CLI globally:

bash
Copy code
npm install -g expo-cli
Install ngrok:

bash
Copy code
npm install @expo/ngrok@^4.1.0
Install required packages:

bash
Copy code
npm install axios axios-cache-interceptor pokenode-ts
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install react-native-navigation
Running the App
Start the Expo development server:

bash
Copy code
npx expo start --tunnel
Follow the instructions in the console to open the app on an emulator or physical device.

Features
Browse Pokémon: Explore detailed information about different Pokémon, including their types, abilities, and evolutions.

Sort and Filter: Sort Pokémon by types, regions, or generations. Easily filter through the vast Pokémon database.

Favorites: Mark your favorite Pokémon, making it convenient to revisit and review them later.

Build Teams: Create Pokémon teams by selecting up to 6 Pokémon to strategize for battles.

Explore Regions and Types: Learn about different Pokémon regions and types, discovering the variety of Pokémon that inhabit them.

Contributing
Feel free to contribute to the development of Mobile Dex! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

License
This project is licensed under the MIT License.