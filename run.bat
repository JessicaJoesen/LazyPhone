@echo off
REM Change the current directory to your project folder
cd "C:\Users\YourUser\Documents\YourProjectName"

REM Run npm install to install dependencies
echo Running npm install...
call npm install

REM Check if npm install was successful before proceeding
if %ERRORLEVEL% NEQ 0 (
    echo npm install failed. Exiting.
    pause
    exit /b %ERRORLEVEL%
)

REM Run npm run dev to start the development server
echo Running npm run dev...
call npm run dev

pause