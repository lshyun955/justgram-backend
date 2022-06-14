create table feed_image( 
id int not null auto_increment primary key, 
feed_id int not null, url varchar(2000), 
foreign key(feed_id) references feed(id) on delete cascade
);