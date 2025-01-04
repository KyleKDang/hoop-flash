CREATE TABLE videos (
    id BIGSERIAL PRIMARY KEY,
    video_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    thumbnail TEXT NOT NULL,
    publish_date TEXT NOT NULL
);