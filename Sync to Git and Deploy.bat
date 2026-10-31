@echo off
setlocal enabledelayedexpansion

echo ====================================================================
echo   Jasvi Industries - UserView Showcase Sync ^& Deploy Pipeline
echo ====================================================================
echo.

set "SOURCE_DIR=D:\ERP USERSHOW"
set "STAGING_DIR=D:\GitHub\ReleaseSource UserView"
set "GIT_TARGET=D:\GitHub\DSE-UserView"

echo [1/3] Synchronizing to Staging Mirror: %STAGING_DIR% ...
robocopy "%SOURCE_DIR%" "%STAGING_DIR%" /MIR /R:1 /W:1 /XD .git .idea
if %ERRORLEVEL% GTR 7 (
    echo Error: Robocopy to staging failed with code %ERRORLEVEL%
    pause
    exit /b 1
)

echo.
echo [2/3] Synchronizing to Git Target Repository: %GIT_TARGET% ...
robocopy "%SOURCE_DIR%" "%GIT_TARGET%" /MIR /R:1 /W:1 /XD .git .idea .github
if %ERRORLEVEL% GTR 7 (
    echo Error: Robocopy to git target failed with code %ERRORLEVEL%
    pause
    exit /b 1
)

echo.
echo [3/3] Checking Git Status and Preparing Push ...
cd /d "%GIT_TARGET%"

git status --short
echo.
set /p COMMIT_MSG="Enter commit message (Press Enter for default 'Update UserView Showcase'): "
if "%COMMIT_MSG%"=="" set "COMMIT_MSG=Update UserView Showcase and Assets"

git add -A
git commit -m "%COMMIT_MSG%"
if %ERRORLEVEL% NEQ 0 (
    echo No changes to commit, or commit skipped.
) else (
    echo.
    echo Pushing changes to GitHub: ssdhameliya/DSE-UserView ...
    git push origin main
    if %ERRORLEVEL% NEQ 0 (
        echo Error: Git push failed!
        pause
        exit /b 1
    )
    echo.
    echo ====================================================================
    echo   Deployment Triggered Successfully via GitHub Actions!
    echo ====================================================================
    echo   GitHub Actions: https://github.com/ssdhameliya/DSE-UserView/actions
    echo   UAT Live:       https://web-uat.jasviindustries.in/
    echo   PROD Live:      https://jasviindustries.in/
    echo ====================================================================
)

echo.
pause
