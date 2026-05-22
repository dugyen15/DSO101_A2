# DSO101 Assignment 2 - CI/CD Pipeline with Jenkins

## Student Information
- **Name**: Ugyen Dorji
- **Student ID**: 02250379
- **Course**: DSO101 - Continuous Integration and Continuous Deployment

## GitHub Repository
https://github.com/dugyen15/DSO101_A2

## Project Overview
This assignment configures a Jenkins pipeline to automate the build, 
test, and deployment of a fullstack Todo List application built with 
React (frontend) and Node.js/Express (backend).

## Pipeline Stages
1. **Checkout** - Pulls source code from GitHub
2. **Install Backend** - Runs `npm install` in the backend directory
3. **Install Frontend** - Runs `npm install` in the frontend directory
4. **Build Frontend** - Builds the React app using `npm run build`
5. **Test Backend** - Runs Jest unit tests and publishes JUnit reports

## How I Configured the Pipeline

### Jenkins Setup
- Installed Jenkins 2.555.2 on Windows using Java 21 (Temurin)
- Installed required plugins: Pipeline, Git, NodeJS, JUnit
- Configured NodeJS 20.18.0 as a global tool in Jenkins

### Repository Setup
- Created a new GitHub repository (DSO101_A2)
- Copied the Assignment 1 Todo app into the repository
- Added a `Jenkinsfile` in the root of the repository
- Added Jest unit tests in `todo-app/backend/__tests__/app.test.js`

### Jenkinsfile
- Used declarative pipeline syntax
- Used `bat` instead of `sh` for Windows compatibility
- Configured JUnit test result publishing

## Test Results
- **Test Suites**: 1 passed
- **Tests**: 2 passed
- **Time**: 9.435s

## Challenges Faced
1. **Java Version Conflict** - Jenkins required Java 21 but system had 
   Java 26 installed. Fixed by installing Java 21 (Temurin) and 
   updating Jenkins configuration.

2. **Plugin Dependencies** - Many plugins failed to install due to 
   missing dependencies. Fixed by manually downloading and installing 
   `.hpi` files for Git and NodeJS plugins.

3. **Windows Compatibility** - Jenkins pipeline used `sh` commands 
   which don't work on Windows. Fixed by replacing all `sh` with `bat` 
   in the Jenkinsfile.

4. **Wrong Remote URL** - Git was pushing to Assignment 1 repo instead 
   of Assignment 2. Fixed by updating the remote URL using 
   `git remote set-url`.