CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
);

INSERT INTO users (username, password_hash)
VALUES ('guest', 'password');

CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    video_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    thumbnail TEXT NOT NULL,
    publish_date TEXT NOT NULL
);

CREATE TABLE user_teams (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) NOT NULL,
    team_id INT REFERENCES teams(id) NOT NULL,
    CONSTRAINT unique_user_team UNIQUE(user_id, team_id)
);

CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    conference TEXT NOT NULL,
    division TEXT NOT NULL,
    city TEXT NOT NULL,
    name TEXT NOT NULL,
    full_name TEXT NOT NULL,
    abbreviation TEXT NOT NULL
);

