## This is how to write the run build and dev script!

1. build script is only used in typescript projects as the build command convert the TS into JS.

2. we are not using nodemone for the p[roject as we are using turboi repo, to in the run command is npm run build to build it again and then npm run start

"scripts": {
"build": "tsc -b",
"start": "node ./dist/index.js",
"dev": "npm run build && npm run start "
},

In this we are basically using the tsconfig pressnt in the root package folder and not reapewating our selves in differnet app of ours and to achive that we are adding the pacahge in the p[ackage.json file for all necessary projects]

"dependencies": {
"@repo/typescript-config": "workspace:\*",
"@types/express": "^5.0.1",
"express": "^4.21.2"
},
