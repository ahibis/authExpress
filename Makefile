run:
	docker run -d -p 3000:3000 --env-file .env --rm --name weblab weblab 
stop:
	docker stop weblab
build:
	docker build -t weblab .