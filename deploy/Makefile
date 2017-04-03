UI=ui_service_
API=dh_service_

help:
	@echo "Usage: # make deploy|deploy-single|logs|inspect|down|clean\n\n"
	@echo "Author: Shota Megrelishvili (shota@luckstock.com) 03/28/2017 v0.1\n\n\
	  make help             - Shows help (this message)\
	  make deploy           - Deploys app in 2 threads for zero down-time\n\
	  make deploy-single    - Deploys app in single thread for testing\n\
	  make logs w=ui|api    - Shows logs of docker container\n\
	  make inspect w=ui|api - Inspects the docker container\n\
	  make down             - Shuts down the app completely (not removed containers and images)\n\
	  make clean            - Prunes all containers and images that are currently not running\n\n\
	Info: based on Makefile from: https://github.com/yamalight/building-products-with-js/tree/master/deploy\n"

usage:
	@echo "!!! For hints, type: # make help\n"

deploy: proxy ssl-companion build-api run-api clean usage

deploy-single: proxy ssl-companion build-api run-api-single clean usage

proxy:
	@echo "\n--> Launching NGINX Proxy\n\n"
	sudo docker-compose up -d proxy

ssl-companion:
	@echo "\n--> Launching LetsEncrypt Companion\n\n"
	sudo docker-compose up -d letsencrypt

build-api:
	@echo "\n--> Building API\n\n"
	sudo docker-compose build api $(API)a $(API)b

run-api-single:
	@echo "\n--> Restarting API Service worker (Single)\n\n"
	sudo docker-compose stop $(API)a $(API)b
	sudo docker-compose up -d --force-recreate --remove-orphans $(API)a

run-api:
	@echo "\n--> Restarting API Service worker (A)\n\n"
	sudo docker-compose stop $(API)a
	sudo docker-compose up -d --force-recreate --remove-orphans $(API)a
	sleep 2
	@echo "\n--> Restarting API Service worker (B)\n\n"
	sudo docker-compose stop $(API)b
	sudo docker-compose up -d --force-recreate --remove-orphans $(API)b

clean:
	@echo "\n--> Removing excessive images & containers to save space\n\n"
	sudo docker system prune -a -f

logs:
	@if [ $(w) ]; then\
		echo "--> Showing Logs for $(w)_service_a\n";\
		sudo docker logs $(w)_service_a;\
		echo "--> Showing Logs for $(w)_service_b\n";\
		sudo docker logs $(w)_service_b;\
	else\
		echo "Usage: # make logs w=ui|w=api\n\n";\
	fi

inspect:
	@if [ $(w) ]; then\
		echo "--> Running inspect for $(w)_service_a\n";\
		sudo docker inspect $(w)_service_a;\
		echo "--> Running inspect for $(w)_service_b\n";\
		sudo docker inspect $(w)_service_b;\
	else\
		echo "Usage: # make logs w=ui|w=api\n\n";\
	fi

down:
	@echo "--> Shutting down everything...\n"
	sudo docker-compose down

shutdown:
	@echo "--> Shutting down everything...\n"
	sudo docker-compose down