# vimeo-cli

A command line interface for Vimeo.

## Install

`npm install -g vimeo-cli`

## Setup

1. Visit https://developer.vimeo.com/apps/new
2. Fill out the forms to create a new app
   * App Name: **vimeo-cli**
   * App Description: **An installation of vimeo-cli**
   * App URL: (Your personal site, or https://vimeo.com)
3. Click Create App
4. On the app page, make a note of the Client Identifier and the Client Secret
5. Back in your terminal, run `vimeo setup <client_identifier> <client_secret>`

You're all set! Run `vimeo --help` to see available commands.

## Commands

#### [`auth`](#auth)

Usage: `vimeo auth`

This will walk you through authenticating a Vimeo account to use with the CLI. You can perform this multiple users and switch between them using `vimeo use <nickname>`.

*Note: You need to setup the CLI before you can do this. See [Setup](#setup).*

#### [`use`](#use)

Usage: `vimeo use <nickname>`

Switch between authenticated users based on the nickname you assigned each one during the authentication step. The user you select will be the user that authenticates all subsequent requests.

#### [`users`](#users)

Usage: `vimeo users`

List all authenticated users and their associated nicknames.

#### [`remove`](#remove)

Usage: `vimeo remove <nickname>`

Remove an authenticated user based on the nickname you assigned it during the authentication step.

#### [`list`](#list)

Usage: `vimeo list <item>`

List all of the authenticated user's specified items. Supported items include: `videos`, `albums`, `appearances`, `channels`, `groups`, `followers`, `following`, `likes`, `portfolios`, `presets`, `watchlater`

#### [`upload`](#upload)

Usage: `vimeo upload <path>`

Uploads the video at the given path. 