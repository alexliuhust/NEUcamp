# The Notes
## Models
1. Building
	- name: String
	- image: String
	- description: String
	- location: String
2. Course
	- number: String
	- name: String
	- day: String scroll-down menu
	- time: String time
	- author: [refer to User]
	- classroom: 
		- building: [refer to Building]
		- room: String
3. User
	- username: String
	- password: String

## Routes
1. authentication routes
2. courses routes
3. buildings routes

## Views
1. authentication
	- register
	- login
2. courses
	- index/show (/courses)
	- new
		- buildings -> scroll-down menu
	- edit 
		- buildings -> scroll-down menu
3. buildings
	- show (/courses/:courseId/:buildingId)
	- new
	- edit













	


