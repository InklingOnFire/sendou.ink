Primary keys are autoincrementing. TODO: Checks, defaults

PlusTier (enum)
ONE | TWO

Region (enum)
EU | NA

Mode (enum)
TW | SZ | TC | RM | CB

LeaderboardType (enum)
ONE | TWO

LinkType (enum)
DISCORD | GUIDE | MISC

TournamentType (enum)
PLUSDRAFT | GANBA

x User

| Column name          | Type   |          |
| -------------------- | ------ | -------- |
| id                   | serial | PK       |
| discordId            | text   | NOT NULL |
| discordName          | text   | NOT NULL |
| discordDiscriminator | text   | NOT NULL |
| discordAvatar        | text   |          |
| twitchName           | text   |          |
| twitterName          | text   |          |
| youtubeId            | text   |          |
| youtubeName          | text   |          |

TeamMember

| Column name | Type    |                    |
| ----------- | ------- | ------------------ |
| userId      | integer | FK UNIQUE NOT NULL |
| teamId      | integer | FK NOT NULL        |
| role        | text    |                    |

ExTeamMember

| Column name | Type    |             |
| ----------- | ------- | ----------- |
| userId      | integer | FK NOT NULL |
| teamId      | integer | FK NOT NULL |

Team

| Column name   | Type     |                    |
| ------------- | -------- | ------------------ |
| id            | serial   | PK                 |
| ownerId       | integer  | FK (user) NOT NULL |
| disbanded     | boolean  | NOT NULL           |
| foundedMonth  | smallint |                    |
| foundedYear   | smallint |                    |
| tag           | text     |                    |
| inviteCode    | text     | NOT NULL           |
| lfMembersPost | text     |                    |

x UserProfile

| Column name | Type     |                    |
| ----------- | -------- | ------------------ |
| userId      | integer  | FK UNIQUE NOT NULL |
| bio         | text     |                    |
| countryCode | text     |                    |
| stickSens   | smallint |                    |
| motionSens  | smallint |                    |
| customTag   | text     |                    |

x WeaponPool

| Column name | Type     |             |
| ----------- | -------- | ----------- |
| userId      | integer  | FK NOT NULL |
| weaponId    | integer  | FK NOT NULL |
| index       | smallint | NOT NULL    |

x Weapon

| Column name | Type    |                 |
| ----------- | ------- | --------------- |
| id          | integer | PK              |
| name        | text    | UNIQUE NOT NULL |

x PlusInfo

| Column name        | Type     |                    |
| ------------------ | -------- | ------------------ |
| userId             | integer  | FK UNIQUE NOT NULL |
| membershipStatus   | PlusTier |                    |
| vouchStatus        | PlusTier |                    |
| region             | Region   | NOT NULL           |
| canVouch           | boolean  |                    |
| canVouchAgainAfter | date     |                    |

x PlusState

| Column name | Type      |     |
| ----------- | --------- | --- |
| id          | integer   | PK  |
| votingEnds  | timestamp |

x PlusSuggested

| Column name | Type      |                  |
| ----------- | --------- | ---------------- |
| suggestedId | integer   | FK (user)        |
| suggesterId | integer   | FK (user) UNIQUE |
| plusTier    | PlusTier  | NOT NULL         |
| description | text      | NOT NULL         |
| createdAt   | timestamp | NOT NULL         |

x PlusVote

| Column name | Type     |                    |
| ----------- | -------- | ------------------ |
| voterId     | integer  | FK (user) NOT NULL |
| votedId     | integer  | FK (user) NOT NULL |
| score       | smallint | NOT NULL           |
| plusTier    | PlusTier | NOT NULL           |
| stale       | boolean  | NOT NULL           |

PlusVotingResult

| Column name     | Type     |           |
| --------------- | -------- | --------- |
| votedId         | integer  | FK (user) |
| plusTier        | PlusTier | NOT NULL  |
| month           | smallint | NOT NULL  |
| year            | smallint | NOT NULL  |
| wasVouched      | boolean  | NOT NULL  |
| wasSuggested    | boolean  | NOT NULL  |
| scoreTotal      | smallint | NOT NULL  |
| scoreEU         | smallint | NOT NULL  |
| scoreNA         | smallint | NOT NULL  |
| plusTwoCountEU  | smallint | NOT NULL  |
| plusOneCountEU  | smallint | NOT NULL  |
| minusOneCountEU | smallint | NOT NULL  |
| minusTwoCountEU | smallint | NOT NULL  |
| plusTwoCountNA  | smallint | NOT NULL  |
| plusOneCountNA  | smallint | NOT NULL  |
| minusOneCountNA | smallint | NOT NULL  |
| minusTwoCountNA | smallint | NOT NULL  |

Build

| Column name           | Type      |             |
| --------------------- | --------- | ----------- |
| id                    | serial    | PK          |
| userId                | integer   | FK          |
| weaponId              | integer   | FK NOT NULL |
| gamePlayerId          | integer   | FK          |
| title                 | text      |             |
| description           | text      |             |
| headId                | integer   | FK          |
| clothingId            | integer   | FK          |
| shoesId               | integer   | FK          |
| headMainAbilityId     | integer   | FK NOT NULL |
| headSubAbility1Id     | integer   | FK          |
| headSubAbility2Id     | integer   | FK          |
| headSubAbility3Id     | integer   | FK          |
| clothingMainAbilityId | integer   | FK NOT NULL |
| clothingSubAbility1Id | integer   | FK          |
| clothingSubAbility2Id | integer   | FK          |
| clothingSubAbility3Id | integer   | FK          |
| shoesMainAbilityId    | integer   | FK NOT NULL |
| shoesSubAbility1Id    | integer   | FK          |
| shoesSubAbility2Id    | integer   | FK          |
| shoesSubAbility3Id    | integer   | FK          |
| japanese              | boolean   | NOT NULL    |
| updatedAt             | timestamp | NOT NULL    |

Gear

| Column name | Type   |             |
| ----------- | ------ | ----------- |
| id          | serial | PK NOT NULL |
| name        | text   | NOT NULL    |

Ability

| Column name | Type   |          |
| ----------- | ------ | -------- |
| id          | serial | PK       |
| name        | text   | NOT NULL |

CompetitiveFeedEvent

| Column name      | Type      |                   |
| ---------------- | --------- | ----------------- |
| ownerId          | integer   | FK(user) NOT NULL |
| name             | text      | UNIQUE NOT NULL   |
| time             | timestamp | NOT NULL          |
| description      | text      |                   |
| discordInviteUrl | text      | NOT NULL          |
| pictureUrl       | text      |                   |

FAPost

| Column name | Type      |                    |
| ----------- | --------- | ------------------ |
| userId      | integer   | FK UNIQUE NOT NULL |
| canVC       | boolean   | NOT NULL           |
| frontline   | boolean   | NOT NULL           |
| midline     | boolean   | NOT NULL           |
| backline    | boolean   | NOT NULL           |
| activity    | text      |                    |
| experience  | text      |                    |
| lookingFor  | text      |                    |
| freeWord    | text      |                    |
| updatedAt   | timestamp | NOT NULL           |

FALike

| Column name | Type    |             |
| ----------- | ------- | ----------- |
| likerId     | integer | FK NOT NULL |
| likedId     | integer | FK NOT NULL |

TournamentLeaderboard

| Column name      | Type            |                    |
| ---------------- | --------------- | ------------------ |
| userId           | integer         | FK UNIQUE NOT NULL |
| firstPlaceCount  | smallint        | NOT NULL           |
| secondPlaceCount | smallint        | NOT NULL           |
| thirdPlaceCount  | smallint        | NOT NULL           |
| type             | LeaderboardType | NOT NULL           |

Link

| Column name | Type     |          |
| ----------- | -------- | -------- |
| url         | text     | PK       |
| title       | text     | NOT NULL |
| description | text     | NOT NULL |
| type        | LinkType | NOT NULL |

StageVote

| Column name | Type     |             |
| ----------- | -------- | ----------- |
| userId      | integer  | FK NOT NULL |
| stageId     | integer  | FK NOT NULL |
| szScore     | smallint | NOT NULL    |
| tcScore     | smallint | NOT NULL    |
| rmScore     | smallint | NOT NULL    |
| cbScore     | smallint | NOT NULL    |

Stage

| Column name | Type   |                 |
| ----------- | ------ | --------------- |
| id          | serial | PK              |
| name        | text   | UNIQUE NOT NULL |

StageList

| Column name | Type   |          |
| ----------- | ------ | -------- |
| id          | serial | PK       |
| name        | text   | NOT NULL |

StageListMember

| Column name | Type    |             |
| ----------- | ------- | ----------- |
| stageListId | integer | FK NOT NULL |
| mode        | Mode    | NOT NULL    |
| stageId     | integer | FK NOT NULL |

Top500Placement

| Column name | Type     |          |
| ----------- | -------- | -------- |
| playerName  | text     | NOT NULL |
| playerId    | integer  | NOT NULL |
| weaponId    | integer  | NOT NULL |
| rank        | smallint | NOT NULL |
| mode        | Mode     | NOT NULL |
| xPower      | integer  | NOT NULL |
| month       | smallint | NOT NULL |
| year        | smallint | NOT NULL |

UserPlacement

| Column name | Type    |                    |
| ----------- | ------- | ------------------ |
| userId      | integer | FK UNIQUE NOT NULL |
| playerId    | integer | FK UNIQUE NOT NULL |

Game

| Column name | Type     |             |
| ----------- | -------- | ----------- |
| id          | serial   | PK          |
| index       | smallint | NOT NULL    |
| stageId     | integer  | FK NOT NULL |
| mode        | Mode     | NOT NULL    |
| duration    | smallint |             |
| winnerName  | text     | NOT NULL    |
| loserName   | text     | NOT NULL    |
| winnerScore | smallint |             |
| loserScore  | smallint |             |

GamePlayer

| Column name | Type     |             |
| ----------- | -------- | ----------- |
| gameId      | integer  | FK NOT NULL |
| name        | text     |             |
| userId      | integer  | FK          |
| weaponId    | integer  | FK NOT NULL |
| buildId     | integer  | FK          |
| kills       | smallint |             |
| assists     | smallint |             |
| deaths      | smallint |             |
| specials    | smallint |             |
| paint       | smallint |             |

Set

| Column name | Type     |          |
| ----------- | -------- | -------- |
| id          | serial   | PK       |
| name        | text     | NOT NULL |
| index       | smallint | NOT NULL |

Tournament

| Column name | Type           |          |
| ----------- | -------------- | -------- |
| id          | serial         | PK       |
| name        | text           | NOT NULL |
| date        | date           | NOT NULL |
| bracketUrl  | text           |          |
| japanese    | boolean        |          |
| type        | TournamentType | NOT NULL |
