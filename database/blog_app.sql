CREATE DATABASE blog_app;
use blog_app;

create table users (
	id int auto_increment primary key,
    name varchar(200) NOT NULL,
    email varchar(200) not null unique,
    password varchar(200) not null,
    create_at TIMESTAMP default CURRENT_TIMESTAMP
);

create table posts(
	id int auto_increment primary key,
    titel varchar(200) not null,
    content text not null,
    author_id int not null,
    create_at TIMESTAMP default CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

create table comments(
	id int auto_increment primary key,
    text TEXT not null,
    post_id int not null,
    author_id int not null,
    create_at TIMESTAMP default CURRENT_TIMESTAMP,
    foreign key (post_id) references posts(id) on delete cascade,
    foreign key (author_id) references users(id) on delete cascade
);
