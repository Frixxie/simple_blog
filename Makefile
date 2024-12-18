PROJECT_NAME=simple_blog

all: test

clean:
	cd blog_provider && cargo clean

blog_provider-lint:
	cd blog_provider && cargo clippy

build:
	cd blog_provider && cargo check --verbose
	cd blog_provider && cargo b --verbose

test: build
	cd blog_provider && cargo t

docker_login:
	docker login ghcr.io -u $(GITHUB_USER) -p $(GITHUB_TOKEN)

blog_provider_container:
	cd blog_provider && docker build -t ghcr.io/$(GITHUB_USER)/$(PROJECT_NAME)_provider:latest .

blog_container:
	cd blog && docker build -t ghcr.io/$(GITHUB_USER)/$(PROJECT_NAME):latest .

containers: test blog_provider_container blog_container

publish_containers: docker_login containers
	docker push ghcr.io/$(GITHUB_USER)/$(PROJECT_NAME)_provider:latest
	docker push ghcr.io/$(GITHUB_USER)/$(PROJECT_NAME):latest

blog_provider_container_tagged: docker_login
	cd blog_provider && docker build -t ghcr.io/$(GITHUB_USER)/$(PROJECT_NAME)_provider:$(DOCKERTAG) .

blog_container_tagged: docker_login
	cd blog && docker build -t ghcr.io/$(GITHUB_USER)/$(PROJECT_NAME):$(DOCKERTAG) .

publish_containers_tagged: test blog_container_tagged blog_provider_container_tagged
	docker push ghcr.io/$(GITHUB_USER)/$(PROJECT_NAME)_provider:$(DOCKERTAG)
	docker push ghcr.io/$(GITHUB_USER)/$(PROJECT_NAME):$(DOCKERTAG)
