up:
	docker-compose up

down:
	docker-compose down

prune:
	docker container prune

kill:
	docker system prune -a