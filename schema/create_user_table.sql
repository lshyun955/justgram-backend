create table user(
id int not null auto_increment primary key, 
user_id varchar(100) not null unique, 
password varchar(100) not null,
name varchar(100) not null, 
nickname varchar(100) not null, 
email varchar(100) not null, 
phone_number varchar(100) not null, 
profile_image_url varchar(2000), 
created_at timestamp not null default current_timestamp,
updated_at timestamp not null default current_timestamp on update current_timestamp
);