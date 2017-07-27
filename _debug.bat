rem taskkill /F /im node.exe & set NODE_ENV=production& node --inspect --debug-brk ./app.js
rem taskkill /F /im node.exe & set NODE_ENV=development& node --inspect --debug-brk ./app.js


rem taskkill /F /im node.exe & set "NODE_ENV=development" && node --inspect ./bin/www "./app.js"

taskkill /F /im node.exe &
set "NODE_ENV=development" &
set "NODE_PATH=." &
node --inspect ./app.js