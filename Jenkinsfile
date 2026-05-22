pipeline {
    agent any
    tools {
        nodejs 'NodeJS'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Backend') {
            steps {
                dir('todo-app/backend') {
                    bat 'npm install'
                }
            }
        }
        stage('Install Frontend') {
            steps {
                dir('todo-app/frontend') {
                    bat 'npm install'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('todo-app/frontend') {
                    bat 'npm run build'
                }
            }
        }
        stage('Test Backend') {
            steps {
                dir('todo-app/backend') {
                    bat 'npm test'
                }
            }
            post {
                always {
                    junit 'todo-app/backend/junit.xml'
                }
            }
        }
    }
}