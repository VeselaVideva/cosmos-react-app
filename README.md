# cosmos-react-app 
![GitHub](https://img.shields.io/github/license/VeselaVideva/cosmos-react-app?color=blue&style=for-the-badge) ![GitHub repo size](https://img.shields.io/github/repo-size/VeselaVideva/cosmos-react-app?style=for-the-badge) ![GitHub commit activity](https://img.shields.io/github/commit-activity/m/VeselaVideva/cosmos-react-app?label=commits&style=for-the-badge) ![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/VeselaVideva/cosmos-react-app/master?style=for-the-badge)

ReactJS project for SoftUni's JS Web Developer learning path.

### Live Demo
[https://cosmos-react-app.web.app/](https://cosmos-react-app.web.app/)


### Tech Stack

- React 17.0.2
- React Router 5.3.0
- Firebase 9.4.1 - auth, database, hosting
- GitHub
- GitHub Desktop


### External libraries / tools
- **[react-tsparticles](https://www.npmjs.com/package/react-tsparticles)** - used for creating a custom background of night sky with moving stars. When you click anywhere with the mouse, you can add more stars in the sky.

- **[react-simple-typewriter](https://www.npmjs.com/package/react-simple-typewriter)** - used as a Hook for creating an animated text on the Home page.

- **[reCAPTCHA v3](https://developers.google.com/recaptcha/docs/v3)** - allows you to verify if an interaction is legitimate without any user interaction. It is a pure JavaScript API returning a score, giving you the ability to take action in the context of your site.


### Public (guests)

- page Home (click on logo, show animated text and video with autoplay)
- page Explore (shows all planets from database)
- page Explore/:planetName (shows details of the planet, interactive iframe and list of planet's inhabitants)
- page All species (shows all species from database)
- page Sign In (Login)
- page Sign Up (Register)


### Private (users)

- page Populate (add new species to database)
- Edit & Delete buttons (visible only for users which are creators of the species card)
- page All species (allows logged user to interact with the species card via Likes and Comments)
- Profile page (each user has a profile page which shows a list with his own added species, users also can update their profile information by adding a photo and name)
- AuthRouteGuard page (if logged-in users try to reach Login or Register page, they are redirected to a special page which shows them that they are already logged in)
- Sign Out button in Header is visible only to logged-in users


### Useful tools

- [Alien names generator](https://www.fantasynamegenerators.com/alien-names.php)


### Bonuses

- Implemented iframe from NASA [Solar System Exploration](https://solarsystem.nasa.gov/planets/overview/) website - it's visible on /explore/:planetName page, it's interactive and the user can see a lot of details about the planet.
- Implemented video of man walking on a planet, with autoplay, music and infinite repeat - it's visible on the Home page.
- Write media queries CSS for Mobile and Tablet devices.
- Write a couple of unit tests with Jest.


### Author
Vesela Videva - [https://videva.dev/](https://videva.dev/)