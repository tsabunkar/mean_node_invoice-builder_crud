npm init --yes -> Initialize the paxkage.json with default configuration/settings

--------------------------------------------------------------------------------------------------------
Node supports only ES5 fetaures.
So we cannot write ES6 features like  ->  import express from 'express';
Therefore we have to use ->  const express = require('express');

But we can converte ES6 to ES5 feature using BABEL :) to do convert our ES6 code to ES5 code
Goto > https://babeljs.io/setup#installation

->  npm install --save-dev babel-cli babel-preset-env


NOTE: Above dependencies have been installed as -D or --save-dev as -> DevDependencies (i.e- only use this
dependency in development envirnomnet but not in prod)

-> After that create .babelrc (file)
then add -> {
    "presets": ["env"]
}

-> Goto package.json -
    "start": "nodemon server/app.js --exec babel-node --presets env"

Now we can use ES6 fetaure in Nodejs using babel (dev dependency)
THe above code works for dev envirnomnent, for production env ->

Add below command in package.json-
"build": "babel server -d dist --source-maps",
"serve": "node dist/app.js"

run cmd -
npm run build (create a dist folder)
npm run serve (will run/execute files in dist folder, which for production env)

--------------------------------------------------------------------------------------------------------
EsLint -> For checking code quality in Nodejs (i.e- to be specific for .js file) we will use eslint

$ npm install -g eslint
$ eslint --init
$ eslint <folder_name (or) file_name>

To fix an eslint issue cmd-> $ eslint <folder_name (or) file_name> --fix