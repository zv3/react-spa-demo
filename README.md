**Purpose**

This application was part of a 3-days timed technical test I took when I applied for the Sr. FrontEnd Engineer position (remote) at CrossOver.com. It was built (following these [requirements](https://docs.google.com/file/d/0Bz8pV-tN2iDObHItZldCN3NDcEpDazNnVUdkZlFpWjJHaWln/edit)), as a Single-Page-Application using Facebook's React v15 and a few other React libraries, i.e. Redux (global state handler), react-router v4 (url routing) and chart.js (pie charts).

The UI is based on Zurb's Foundation v6 SASS framework, coupled with IcoMoon fonts for the icons used throughout the application (buttons, table row icons, etc).

On the Unit Testing side, Facebook's Jest and AirBnb's Enzyme libraries were used to test major React components in a browser environment.

Workflow tools such as Gulp, Webpack and Babel were also used in the development of this app for tasks such as ES6/7 code transpiling to ES5, optimization related tasks like stripping flowtype code, autoprefixing CSS rules with vendor-specific prefixes for multi browser support and performing minification on the resulting javascript/css files.

A live demo of this SPA can be viewed in this [link](http://dzv3.s3-website-us-east-1.amazonaws.com/sfe-crossover-test/).


**HOW TOs**
  
  - Run the application locally
    1. Run this command line in your OSX/Linux console: `npm i && npm run`
    2. Hit your browser to `http://localhost:3000/`

  - Run the tests
    1. Run this command line in your OSX/Linux console: `npm i && npm t`
