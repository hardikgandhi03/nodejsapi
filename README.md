# nodejsapi
This repositary contains a simple node js api with its docker file.

The app.js contains an api with some basic user entities:
- name
- last name
- Account number
- email
- date of birth

The package.json file contains dependencies that are required.


for the docker file:
in some cases, user can get error of permission denied or something else

Try this command: sudo usermod -a -G docker [user]

If the error still exist, try all docker commands with sudo(root user).
This should solve the error.