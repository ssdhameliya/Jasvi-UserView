@echo off
setlocal enabledelayedexpansion

echo ====================================================================
echo   Jasvi Industries - UserView Showcase Sync ^& Deploy Pipeline
echo ====================================================================
echo.

set "SOURCE_DIR=D:\Antigravity-Dev\Jasvi-UserView"
set "STAGING_DIR=D:\GitHub\ReleaseSource-UserView"
set "GIT_TARGET=D:\GitHub\Jasvi-UserView"
set "USER_COPY=D:\JavaProject\Jasvi-UserView"

echo [1/4] Synchronizing to Staging Mirror: %STAGING_DIR% ...
robocopy "%SOURCE_DIR%" "%STAGING_DIR%" /MIR /R:1 /W:1 /XD .git .idea
if %ERRORLEVEL% GTR 7 (
    echo Error: Robocopy to staging failed with code %ERRORLEVEL%
    pause
    exit /b 1
)

echo.
echo [2/4] Synchronizing to User IntelliJ Testing Copy: %USER_COPY% ...
robocopy "%STAGING_DIR%" "%USER_COPY%" /MIR /R:1 /W:1 /XD .git .idea
if %ERRORLEVEL% GTR 7 (
    echo Error: Robocopy to user copy failed with code %ERRORLEVEL%
    pause
    exit /b 1
)

echo.
echo [3/4] Synchronizing to Git Target Repository: %GIT_TARGET% ...
robocopy "%STAGING_DIR%" "%GIT_TARGET%" /MIR /R:1 /W:1 /XD .git .idea .github
if %ERRORLEVEL% GTR 7 (
    echo Error: Robocopy to git target failed with code %ERRORLEVEL%
    pause
    exit /b 1
)

echo.
echo [4/4] Checking Git Status and Preparing Push ...
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
    echo Pushing changes to GitHub: ssdhameliya/Jasvi-UserView ...
    git push origin main
    if %ERRORLEVEL% NEQ 0 (
        echo Error: Git push failed!
        pause
        exit /b 1
    )
    echo.
    echo ====================================================================
    echo   UAT Deployment Triggered Successfully via GitHub Actions!
    echo ====================================================================
    echo   GitHub Actions: https://github.com/ssdhameliya/Jasvi-UserView/actions
    echo   UAT Live:       https://web-uat.jasviindustries.in/
    echo   PROD Notice:    PROD deployment is MANUAL only via GitHub Actions!
    echo                   (Select 'prod-upcoming-only' or 'prod-full-showcase')
    echo ====================================================================
)

echo.
pause
