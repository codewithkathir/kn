pipeline {
    agent any

    environment {
        IMAGE_NAME = "kathiravan-portfolio"
        CONTAINER_NAME = "kathiravan-portfolio"
    }

    stages {

        stage('Clone') {
            steps {
                git branch: 'main',
                url: 'https://github.com/codewithkathir/kn.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t $IMAGE_NAME .
                '''
            }
        }

        stage('Stop Old Container') {
            steps {
                sh '''
                docker rm -f $CONTAINER_NAME || true
                '''
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                docker run -d \
                  --name $CONTAINER_NAME \
                  -p 9000:80 \
                  --restart unless-stopped \
                  $IMAGE_NAME
                '''
            }
        }
    }
}