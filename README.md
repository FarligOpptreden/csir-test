﻿# CSIR // {type}DEV Expression of Interest Test

This repository represents the test for the Expression of Interest for the CSIR project.

## Scope and features

The scope of the application is to integrate with the DataUSA API and present the output in a user-friendly manner. For the purposes of this test, we opted for the following:

- Display the primary API output (using the `Nation` drilldown) in a tree-grid, with the root node representing the nation(s) returned by the API and the first children representing the year(s) associated with the root node(s).
- When expanding each year node, a secondary call is performed to the API for the `State` drilldown for the selected year, to retrieve the data for that state only for the specific year.
- When selecting a row in the tree-grid, the right side of the page is updated to reflect a visual representation of the data:
  - When a `nation` is selected, it displays a line chart of the nation's population fluctuation over time.
  - When a `year` is selected, it displays a bar chart of the year's population spread across the different states.
  - When a `state` is selected, it displays a line chart of the state's population fluctuation over time.
- Data retrieved from the APIs is cached locally in memory to ensure subsequent calls to the DataUSA API isn't necessary.
- The ability exists to choose between a light a dark theme, and the setting is persisted in the browser's local storage for future visits.

## Running on a development environment

In order to run the project on a development machine, execute the following command:

    npm run dev

Follow the instructions in the output from the terminal to access the development server in a local browser.

## Building for deployment

In order to build the project for deployment, execute the following command:

    npm run build

The output from the above command will be written to the `/dist` folder.

In order to preview the built output, execute the following command:

    npm run preview

Follow the instructions in the output from the terminal to access the development server in a local browser.

## Hosting locally

In order to host the built output on a local machine, execute the following command:

    npm run serve

Follow the instructions in the output from the terminal to access the development server in a local browser.

## Containerization with Docker

A Dockerfile is provided to build the application into a container for easier distribution and hosting.

In order to build the Docker container, execute the following command:

    docker build -t csir-typedev-test .

In order to run the built container on a local machine, execute the following command:

    docker run -d --rm -p 3000:3000 --name csir csir-typedev-test

In order to pull the latest Docker image from the container registry, execute the following command:

    docker pull typedevwernervdv/csir-typedev-test

## CI/CD and hosting

The code in this repository is associated with a continuous integration & continuous deployment pipeline. GitHub Actions are used to build the Docker container and push it to DockerHub on each push to the `master` branch.

The application is hosted on Azure App Services on the following domains:

- [https://csir-typedev-test.azurewebsites.net/](https://csir-typedev-test.azurewebsites.net/)
- [https://csir-typedev.handlr.io/](https://csir-typedev.handlr.io/)

A webhook for the deployment is registered with DockerHub to update the deployment each time a new container image is pushed to the repository.

The Docker image is hosted on DuckerHub at the following registry location:

- [https://hub.docker.com/r/typedevwernervdv/csir-typedev-test](https://hub.docker.com/r/typedevwernervdv/csir-typedev-test)
