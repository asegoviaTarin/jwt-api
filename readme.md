# Movies PI

This repository contains custom API with jwt auth.

## Project structure

``` bash
.
├── docker-compose.yaml
├── Dockerfile
├── package.json
├── src                            # sources
│   ├── api                        # api CRUD logic
│   ├── config                     # configuration file 
│   ├── helpers                    # utilities
│   ├── middewares                 # custom mw
└── README.md
```

## Getting started

``` bash
docker-compose up -d
```
Now you can use API in port 3000
## Api routes

| Method | url | auth | params | desciption | example 
| ------ | ------ | ------ | ------ | ------ | ------ |
| POST | /users/auth  | No | {username: string; password: string} | Get user Bearer token | /users/auth
| POST | /users  | No | {username: string; password: string} | Create user | /users
| POST | /movies  | Yes | { title: string; genre: string: description; string; poster: string} | Create movie  | /movies
| GET | /movies/search  | No | genre[], title | Search movies | GET /movies/search?genre[]=DRAMA&title=The Godfather
| DELETE | /movies/:id  | Yes | - | Remove movie | /movies/6030f1a0843f21156e8c4264


In order to call auth routes is necessary send a header with bearer token auth (Authorization: Bearer xxxx)