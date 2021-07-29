# Back-end doc

## API Endpoints

### POST `/api/topic`

Creates a topic

#### Body

``` json
"text": [string],
"textarea": [string]
```

### DELETE `/api/topic/[id]`

Deletes a topic (moderators only)

### GET `/api/topics`

Returns a list of all the topics

### GET `/api/topic/[id]`

Returns the data of the specified topic

### POST `/api/message`

Posts a message

#### Body

```json
"text": [string],
"textarea": [string],
"media": [base64],
"topic": [string],
"parent": [string]
```

### GET `/api/messages/[topic]`

Returns 10 messages from a specified topic

### GET `/api/message/[topic]/[id]`

Returns a message and its replies

### POST `/api/ticket`

Posts a ticket

#### Body

``` json
"email": [string],
"type": [string],
"content": [string]
```

### DELETE `/api/ticket/[id]`

Deletes a ticket

### GET `/api/tickets`

Returns all tickets

### POST `/api/instance`

Edits instance (moderators only)

### POST `/api/moderator`

Creates a moderator (moderators only)

#### Body

``` json
"text" : [string],
"email": [string],
"password": [string]
```


### GET `/api/moderators`

Returns list of all moderators (moderators only)

## Database

We use Elasticsearch indexes

### dawnpen-topics

``` json
"id": [string],
"name": [string],
"descr": [string],
"creation_date": [date]
```

### dawnpen-posts

``` json
"username": [string],
"content": [string],
"media": [string]
"topic": [string],
"parent": [string],
"creation_date": [date],
"last_update_date": [date]
```

### dawnpen-tickets

``` json
"email": [string],
"type": [string],
"content": [string],
"creation_date": [date],
```

### dawnpen-moderators

``` json
"name": [string],
"email": [string],
"password": [string],
"role": [string],
"creation_date": [date],
```

