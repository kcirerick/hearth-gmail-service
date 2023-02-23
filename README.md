# hearth-gmail-service
Creates a back-end service that interacts with the gmail API to retrieve contact information from email exchanges.


Follow the following steps to run this code on your local machine:

1) Clone the project to your github repo.

2) In the root directory of your project, create a '.env' file with the following lines:
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
REDIRECT_URI=http://localhost:3000/auth/google/callback

Replace 'your_client_id' and 'your_client_secret' with a client ID and client secret that you can obtain from the Google Cloud Console.
Then run 'export $(xargs < .env)' to export the variables. 

3) In the root directory of your folder, run 'npm install' to install dependencies.

4) Run 'npx tsc' to build the project and 'node dist/app.js' to launch the project.

5) Navigate to 'http://localhost:3000' to see the landing page and 'http://localhost:3000/auth/google' to log into google.
NOTE: You will likely need to reach out to enriquezerick18@gmail.com to get added to the group of test users with access to this project.

6) Once you are logged in, you will be redirected to 'http://localhost:3000/contacts', you should be able to see 100 unique contacts with whom you have exchanged emails.

A few notes about the project:
- Because the statement "return 100 contacts from emails exchanged" was ambiguous, I took this to mean "Return 100 unique contacts from whom you have received at least one email", but this is an assumption that should not be overlooked.
- Most of the relevant code is in src/ or views/ except for the depdendencies and configurations. 
- This submission represents ~5.5 hrs of work
- I feel confident in my ability to add a simple persistence layer with ~1hr of additional work
- I have not written tests in jest before and burnt up a bit of time trying to set them up.
- I have never actually used node.js or typescript before but didn't find that it was particularly difficult to pick it up.
