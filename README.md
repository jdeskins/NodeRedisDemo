# Node Redis Demo App

## Build the Docker image
```
docker build -t jdeskins/nodeapp .
```

## Run Redis and Node
```
docker run -d --name redis -p 6379:6379 redis
docker run -d --name web -p 8080:8080 --link redis:redis jdeskins/nodeapp
```

## Cleanup

```
docker stop redis web

docker rm -v $(docker ps -a -q -f status=exited) && docker rmi $(docker images -f "dangling=true" -q)
```
