# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|
### Association
  has_many :messages
  has_many :groups_users
  has_many :groups, through: groups_users


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
  has_many :messages
  has_many :groups_users
  has_many :users, through: groups_users


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user|reference|null: false, foreign_key: true|
|group|reference|null: false, foreign_key: true|
### Association
  belongs_to :user
  belongs_to :group


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|null: false|
|user|reference|null: false, foreign_key: true|
|group|reference|null: false, foreign_key: true|
### Association
  belong_to :user
  belong_to :group