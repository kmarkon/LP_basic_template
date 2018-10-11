1. clone this repo
2. install gulp globaly: npm install -g gulp
3. npm init - create package.json
4. install gulp localy: npm install --save gulp
5. install all directories you need - as you have in your gulpfile.js:
    
    npm install --save --dev browser-sync 
    npm install --save gulp-uglify 
    // "gulp-autoprefixer"
    // "gulp-concat"
    // "gulp-notify"
    // "gulp-plumber"
    // "gulp-sass"
    // "gulp-sourcemaps"
    and 
    npm install bootstrap-sass *option
    npm install jquery

6. gulp build - build your build folder
7. gulp serve - serve your page on localhost

it should look like:
{
  "name": "......",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "scripts": {
    "start": "gulp dev",
    "build": "gulp build"
  },
  "author": "",
  "devDependencies": {
    "browser-sync": "^2.18.13",
    "gulp": "^3.9.1",
    "gulp-autoprefixer": "^4.0.0",
    "gulp-concat": "^2.6.1",
    "gulp-notify": "^3.0.0",
    "gulp-plumber": "^1.1.0",
    "gulp-sass": "^3.1.0",
    "gulp-sourcemaps": "^2.6.1"
  },
  "dependencies": {
    "bootstrap-sass": "^3.3.7",
    "jquery": "^3.2.1"
  }
}
