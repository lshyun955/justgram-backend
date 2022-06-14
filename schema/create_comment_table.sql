create table comment(
id int not null auto_increment primary key, 
user_id int not null, 
feed_id int not null, 
content varchar(1000) not null, 
parent_id int, 
created_at timestamp not null default current_timestamp, 
updated_at timestamp not null default current_timestamp on update current_timestamp, 
foreign key(user_id) references user(id) on delete cascade, 
foreign key(feed_id) references feed(id) on delete cascade, 
foreign key(parent_id) references comment(id) on delete cascade
);