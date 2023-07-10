# WeBear (Webull Clone)

Link to live site [Webear](https://webull.onrender.com)

Check out the Wiki for more info [Wiki](https://github.com/Simpsonc86/Webull-Clone/wiki)

## Technologies used
Python 3.9,
Flask,
SQLAlchemy,
React JS 17,
Redux,
Victory JS,
Validator JS

## Getting Started

1. Clone the repository and from main branch on GitHub.

2. Install dependencies.

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment.

4. Make sure the SQLite3 database connection URL is in the **.env** file.

5. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.
