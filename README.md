# Lern Gruppen Tool

Git

Prepare Your Local Project

Navigate to your project's directory in your local machine using a terminal or command prompt.
Initialize the local directory as a Git repository if you haven't already: git init

link your local repository to the GitHub repository you created: git remote add origin https://github.com/FIA-GSO/Projektgruppe1-Lerngruppen-tool.git
check with git remote -v

Branches

Main
Dev
Frontend
Backend

Frontend and Backend Development: Developers should work on features in the respective frontend or backend branches (or feature branches that branch off from these).
Merging to Dev: Once features are ready for integration testing, they can be merged into the dev branch.

Main Branch for Production: The main (or master) branch is reserved for production-ready code. Once the code in dev is tested and deemed stable, it can be merged into main.

Best Practices:

Always test code thoroughly in the dev branch before merging it into main.
Use pull requests for merging, especially for merging into dev and main, as this allows for code review and additional testing.
Keep your branches up to date with the latest changes from main or dev to minimize merge conflicts


## How to install

1. Install XAMPP
2. Start XAMPP MySQL server (port should be 3306 of the mysql server)
3. If you can access php in the terminal you can skip the next steps
   1. Search and open in windows task bar "Edit the system environment variables
   2. Click on Environment Variables... down right
   3. In System variables click on Path
   4. Click on Edit
   5. Click on New
   6. Add this to the input field "C:\xampp\php" (if you have php somewhere different installed put the folder of the php.exe location into the input field)
4. Install composer: https://getcomposer.org/Composer-Setup.exe
5. Follow all steps
6. clone the repository with "git clone https://github.com/FIA-GSO/Projektgruppe1-Lerngruppen-tool.git"
7. Start backend:
   1. Go into Projektgruppe1-Lerngruppen-tool/backend/lerntool
   2. Open a new powershell
   3. run: "composer install"
   4. run: "php artisan migrate:fresh" this creates all tables
   5. run: php artisan serve
8. Start frontend:
   1. Install node.js https://nodejs.org/en/download/current
   2. check if you have node installed with "node -v"
   3. Open a new terminal
   4. Navigate to Projektgruppe1-Lerngruppen-tool/backend/lerntool
   5. run: "npm install"
   6. Go to the port that is shown in the console
   7. run: "npm run dev"
