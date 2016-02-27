# vimeo-cli

A command line interface for Vimeo.

## Install

`npm install -g vimeo-cli`

## Setup Instructions

You must follow these instructions to setup the utility before running any other commands.

1. Visit https://developer.vimeo.com/apps/new
2. Fill out the fields and click **Create app**
4. On the app page, click the **OAuth2** tab
5. make a note of the Client Identifier and the Client Secret
6. Back in your terminal, run `vimeo setup <client_identifier> <client_secret>`

You're all set! Run `vimeo --help` to see available commands.

## Commands

* [setup](#setup)
* [auth](#auth)
* [use](#use)
* [users](#users)
* [remove](#remove)
* [list](#list)
* [follow](#follow)
* [like](#like)
* [watchlater](#watchlater)
* [upload](#upload)

* * * 

#### setup
See [Setup Instructions](#setup-instructions).

#### auth

Usage: `vimeo auth`

This will walk you through authenticating a Vimeo account to use with the CLI. You can perform this multiple users and switch between them using `vimeo use <nickname>`.

*Note: You need to setup the CLI before you can do this. See [Setup](#setup).*

#### use

Usage: `vimeo use <nickname>`

Switch between authenticated users based on the nickname you assigned each one during the authentication step. The user you select will be the user that authenticates all subsequent requests.

#### users

Usage: `vimeo users`

List all authenticated users and their associated nicknames.

#### remove

Usage: `vimeo remove <nickname>`

Remove an authenticated user based on the nickname you assigned it during the authentication step.

#### list

Usage: `vimeo list <item>`

List all of the authenticated user's specified items. Supported items include: `videos`, `albums`, `appearances`, `channels`, `groups`, `followers`, `following`, `likes`, `portfolios`, `presets`, `watchlater`

#### add

Usage: `vimeo add [options] <item>`

Add the given item to the current authenticated user's account. 

Supported items: `album`, `channel`, `group`, `following`, `like`, `watchlater`

Available options:

Options | Use | Applies to Item | Required?
---------- | --- | ----------- | --------
-n | Set name | `album` `channel` `group` | yes
-d | Set description | `album` `channel` `group` | yes
-p | Set privacy level | `album` `channel` | no
-P | Set password | `album` | yes (if `privacy` = `password`)
-s | Set default sort order | `album` | no
-u | Specify user ID | `following` | yes
-v | Specify video ID | `like` `watchlater` | yes

#### follow

Usage: `vimeo follow <user_id>`

Follow the specified user. (Alias for `vimeo add following -u <user_id>`)

#### like

Usage: `vimeo like <video_id>`

Like the specified video. (Alias for `vimeo add like -v <video_id>`)

#### watchlater

Usage: `vimeo watchlater <video_id>`

Add the specified video to the watch later queue. (Alias for `vimeo add watchlater -v <video_id>`)

#### upload

Usage: `vimeo upload <path>`

Uploads the video at the given path. 

## Help

File an issue.

## Contribute

Pull requests welcome!