# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation
## users table
|column|type|options|
|------|----|-------|
|name     |string  |null: false,unique: true |

### association
- has_many :groups, through: :members 
- has_many :messages
- has_many :members

## messages table
|column|type|options|
|------|----|-------|
|body    |text   |
|image   |string |
|group_id|integer|null: false,foreign_key: true |
|user_id |integer|null: false,foreign_key: true |

### association
- belongs_to :user
- belongs_to :group

## groups table
|column|type|options|
|------|----|-------|
|name     |string |null: false |

### association
- has_many :members
- has_many :messages
- has_many :users, through: :members

## membersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
