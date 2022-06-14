create table feed(
id int not null auto_increment primary key, 
user_id int not null, content varchar(2000), 
created_at timestamp not null default current_timestamp, 
updated_at timestamp not null default current_timestamp on update current_timestamp, 
foreign key(user_id) references user(id) on delete cascade
);
