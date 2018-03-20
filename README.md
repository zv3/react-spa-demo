[![Build Status](https://travis-ci.org/zv3/react-spa-demo.svg?branch=master)](https://travis-ci.org/zv3/react-spa-demo) [![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Architecture

![image](http://dzv3.s3.amazonaws.com/sfe-crossover-test/screenshot.png)

This SPA type of app was built using Facebook's React v15 and a few other React libraries, i.e. Redux (state manager), react-router v4 (url routing) and chart.js (pie charts).

The UI is based on the Zurb's Foundation v6 SASS framework, coupled with IcoMoon fonts for the icons used throughout the app (buttons, table row icons, etc).

Facebook's Jest and AirBnb's Enzyme libraries were used to test major React components in a browser environment.

Workflow tools such as Gulp, Webpack and Babel were also part in the development of the app for tasks such as ES6/7 code transpiling to ES5, optimization related tasks like stripping flowtype code, autoprefixing CSS rules with vendor-specific prefixes for multi browser support and performing minification on the resulting javascript/css files.

A live demo of the app can be viewed [here](http://dzv3.s3-website-us-east-1.amazonaws.com/sfe-crossover-test/).


## HOW TOs

  - **Run the application locally**
    1. Run this command line in your OSX/Linux console: `npm i && npm start`
    2. Hit your browser to [http://localhost:3000/](http://localhost:3000/)

  - **Run the tests**
    1. Run this command line in your OSX/Linux console: `npm i && npm t`
