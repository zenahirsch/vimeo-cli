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

## Authenticating a new user

Only do this once you've run the `setup` command. This will walk you through authenticating a Vimeo account to use with the CLI.

`vimeo auth`
