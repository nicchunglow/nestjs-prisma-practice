up:
	docker-compose up

down:
	docker-compose down

kill:
	docker images prune -a
	docker container prune