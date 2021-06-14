Steps to make the mail of the contact section work:

- Install the latests version of node.js
- Execute the following commands on the terminal of your choosing, I do it on the visual studio code terminal.
	1: npm init
	2: npm install express nodemailer dotenv multiparty
	3: npm install cors
	4: node install -g nodemon
- Define the gmail(or the smtp you are using) credentials on the .env configuration file.
- If you are using gmail, as I am, you will need to activate the "Less secure apps" option on the Security tab on your google account. Otherwise no mail will be send.
- Finally run "npm start"