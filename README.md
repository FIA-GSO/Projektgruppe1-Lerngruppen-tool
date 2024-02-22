[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/4nMEyho3)


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
Keep your branches up to date with the latest changes from main or dev to minimize merge conflicts.

