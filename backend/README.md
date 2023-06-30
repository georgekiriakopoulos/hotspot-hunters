### Setting up database
Install psql from your terminal.
On a terminal run:
1. `$ sudo -u postgres psql`
once you enter your credentials for sudo etch and you are inside the psql terminal run:
2. `$ CREATE DATABASE hotspot_db;`  (yes with a semi column in the end, also make sure you configure your database that you set here on your settings.py file)


### Setting up (virtualenv)

On the project folder run the following commands:

1. `$ virtualenv -p python3.10 env` to create a virtual environment
2. `$ source env/bin/activate` to activate the environment
3. `$ pip install -r requirements.txt` to install packages
<!-- No need for this step -->
<!-- 4. Create a `.env` file with your environmental variables. Thr project needs only a DATABASE_URL pointing to your postgres database (needs to be already created). --> 
5. `$ python manage.py migrate` to build your database


