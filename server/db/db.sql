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
    user_id INT NOT NULL,
    team TEXT NOT NULL
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

