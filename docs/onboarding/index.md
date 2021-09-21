### Brainstorm Force

Welcome to **Astra**
====================

We’re so glad to have you join the team! This guide is meant to provide team specific information to help you get off to a great and productive start.

# Table of contents

   * [Product And Process](#product-and-process)
      * [Slack channels related to Astra that you should join](#-slack-channels-related-to-astra-that-you-should-join)
      * [Project Process](#-project-process)
      * [Important Meetings](#-important-meetings)
      * [Tools and Prerequisites](#-tools-and-prerequisites)
   * [Onboarding Tasklist](#onboarding-tasklist)
      * [1](#-1)
      * [2](#-2)
   * [Resources](#resources)
      * [Helpful Links](#-helpful-links)

## Product And Process

### # Project Process

We use Agile Methodology in our project to achieve our goals. We use JIRA software to achieve this.

### # Tools and Prerequisites

1. JIRA - As mentioned above, for agile methodology we use JIRA. Agile methodology has a concept of sprint for more information on what sprint is, please check this [link](https://www.atlassian.com/agile/scrum/sprints). In Astra, each sprint is of 3 weeks or 21 Days.
2. There are a certain number of points in a particular sprint. All the points are divided into each developer and the goal of each developer is to complete the sprint points so that we can meet the goal of the sprint.
3. For communication, we use slack. As mentioned above, you should join the above slack channels.
4. For calls/meetings we use Zoom. You are encouraged to install the Zoom app on your laptop/desktop and login using your BSF Account.
5. For coding, our team uses VS code editor. It is not compulsory to use VS code editor but it is preferred. Here is a list of recommended extensions that you should install in VS Code:
    1. [CSS Formatter](https://marketplace.visualstudio.com/items?itemName=aeschli.vscode-css-formatter)
    2. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
    3. [filesize](https://marketplace.visualstudio.com/items?itemName=mkxml.vscode-filesize)
    4. [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
    5. [Gremlins tracker for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=nhoizey.gremlins)
    6. [PHP IntelliSense](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-intellisense)
    7. [phpcs](https://marketplace.visualstudio.com/items?itemName=ikappas.phpcs)
    8. [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
    9. [Remote - WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)
    10. [scss-lint](https://marketplace.visualstudio.com/items?itemName=adamwalzer.scss-lint)
    11. [WordPress Snippets](https://marketplace.visualstudio.com/items?itemName=wordpresstoolbox.wordpress-toolbox)
6. Make sure to set up Node.js/npm, composer and WP CLI on your local machine.
7. We have E2E setup in the theme and addon. Please make sure to set up that. Follow this [P2](https://product-testing.sharkz.in/2021/07/21/introduction-e2e-tests/) for set up.

## Onboarding Tasklist

### # 1

* Clone Astra from the GitHub [repo](https://github.com/brainstormforce/astra). Install, activate and try the customizer options.
* Go through the files and folder structure.
* Overview of WordPress document about theme [development](https://codex.wordpress.org/Theme_Development)
* Setup above mentioned points.

### # 2

* Check all the options available from [Astra Pro](https://github.com/brainstormforce/astra-addon) plugin.
    * Explore customizer for Astra Pro options
    * Explore Astra [options](https://share.bsf.io/6quYJYxK) page.
* Explore functions.php file
* Explore the code base of Customizer options and how it is [registered](https://github.com/brainstormforce/astra/blob/next-release/inc/customizer/class-astra-customizer.php).
* Check the [dynamic-css.php](https://github.com/brainstormforce/astra/blob/next-release/inc/class-astra-dynamic-css.php) file for frontend CSS rendering.
