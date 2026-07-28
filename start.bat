@echo off
cd /d "%~dp0"
title REFA Season 2 - Local Hub Launcher
color 0A

echo.
echo ============================================================
echo  REFA Season 2 - Local Network Hub Launcher (Windows)
echo ============================================================
echo.
echo  Working directory: %cd%
echo.

echo  [1/3] Checking for Node.js...
where node >nul 2>&1
if %errorlevel%==0 goto NODE_FOUND

echo.
echo  [!] Node.js was NOT found on this computer.
echo  Node.js is required to run the Local Hub server.
echo.
set /p INSTALL_CHOICE="Install Node.js now? Type yes and press Enter: "

if /i "%INSTALL_CHOICE%"=="yes" goto DO_INSTALL
if /i "%INSTALL_CHOICE%"=="y" goto DO_INSTALL

echo.
echo  [X] Cannot start without Node.js.
goto ERROR_EXIT

:DO_INSTALL
echo.
echo  [*] Downloading Node.js installer...
powershell -Command "Invoke-WebRequest -Uri 'https://nodejs.org/dist/v20.17.0/node-v20.17.0-x64.msi' -OutFile '%TEMP%\node-installer.msi'"
if %errorlevel% neq 0 (
    echo  [X] Download failed. Check your internet connection.
    goto ERROR_EXIT
)
echo  [*] Running Node.js installer...
msiexec /i "%TEMP%\node-installer.msi" /passive /norestart
echo.
echo  [OK] Node.js installed!
echo  Please CLOSE this window and double-click start.bat again.
echo  (Windows needs to refresh environment variables)
goto DONE_EXIT

:NODE_FOUND
for /f "tokens=*" %%v in ('node -v') do echo  [OK] Node.js found: %%v

if not exist "server.js" (
    echo.
    echo  [X] ERROR: server.js not found.
    echo  Make sure start.bat is inside the REFA_CONTEST folder.
    goto ERROR_EXIT
)

echo.
echo  [2/3] Checking project dependencies...
if exist "node_modules" goto DEPS_OK

echo  [*] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo  [X] npm install failed.
    goto ERROR_EXIT
)

:DEPS_OK
echo  [OK] Dependencies ready.

echo.
echo  [3/3] Starting the REFA Local Hub Server...
echo.
echo ============================================================
echo  Hub is running! Share the IP address printed below
echo  with your team. They open it in any web browser.
echo ============================================================
echo.

node server.js

echo.
echo  Server has stopped.
goto DONE_EXIT

:ERROR_EXIT
echo.
echo ============================================================
echo  Could not start. See message above.
echo ============================================================

:DONE_EXIT
echo.
echo Press any key to exit...
pause >nul
