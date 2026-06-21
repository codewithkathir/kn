pipeline {
agent any

```
environment {
    IMAGE_NAME = "kathiravan-portfolio"
    CONTAINER_NAME = "kathiravan-portfolio"
    PORT = "9000"
}

stages {

    stage('Checkout') {
        steps {
            git(
                branch: 'main',
                credentialsId: 'GIT',
                url: 'https://github.com/codewithkathir/kn.git'
            )
        }
    }

    stage('Build Docker Image') {
        steps {
            sh '''
            docker build -t ${IMAGE_NAME}:latest .
            '''
        }
    }

    stage('Remove Old Container') {
        steps {
            sh '''
            docker rm -f ${CONTAINER_NAME} || true
            '''
        }
    }

    stage('Run Container') {
        steps {
            sh '''
            docker run -d \
              --name ${CONTAINER_NAME} \
              --restart unless-stopped \
              -p ${PORT}:80 \
              ${IMAGE_NAME}:latest
            '''
        }
    }
}
```

}
