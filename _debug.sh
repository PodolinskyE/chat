#! /bin/bash
# killall node; node --inspect --debug-brk ./bin/www
# killall node; node --inspect ./bin/www
#vkillall node; node --inspect --debug-brk myApp.js
#killall node; node --inspect app.js
# killall node; NODE_ENV=development; NODE_PATH=.; node --inspect --debug-brk app.js
# node --inspect app.js;
# killall node; NODE_ENV=development; node --inspect --debug-brk app.js
killall node; NODE_ENV=development NODE_PATH=. node --inspect app.js
