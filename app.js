const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer")
const teamMember = [];
const idArray = [];

function appMenu() {

  function createManager() {
    console.log("Please build your team");
    inquirer.prompt([
      {
      type: "input",
      name: "managerName",
      message: "What is your name?",

      },
      {
        type: "input",
        name: "managerId",
        message: "What is your employee ID?",
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What is your email address?",
      },
      {
        type: "input",
        name: "phoneNumber",
        message: "What is your office phone number?",
      }
    ]).then(function(answers) {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.phoneNumber);
      teamMember.push(manager);
      idArray.push(answers.managerId);
      createTeam();
    });
  }

  function createTeam() {

    inquirer.prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "Would you like to add a team member?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members."
        ]
      }
    ]).then(function(userChoice) {
      switch(userChoice.memberChoice) {
      case "Engineer":
        addEngineer();
        break;
      case "Intern":
        addIntern();
        break;
      default:
        buildTeam();
      }
    });
  }

  function addEngineer() {
    inquirer.prompt([
      {
        type: "input",
        name: "engineerName",
        message: "What is their name?",
      },
      {
        type: "input",
        name: "engineerId",
        message: "What is their employee ID?",
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "What is their email address?",
      },
      {
        type: "input",
        name: "engineerUsername",
        message: "What is their GitHub username?",
      },
    ]).then(function(answers) {
      const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerUsername);

      teamMember.push(engineer);

      idArray.push(answers.engineerId);

      createTeam();
    });
  }

  function addIntern() {
    inquirer.prompt([
      {
        type: "input",
        name: "internName",
        message: "What is their name?",
      },
      {
        type: "input",
        name: "internEmail",
        message: "What is their email address?",
      },
      {
        type: "input",
        name: "internId",
        message: "What is their employee ID?",
      },
      {
        type: "input",
        name: "internSchool",
        message: "What school did they attend?",

      },
    ]).then(function(answers) {
      const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);

      teamMember.push(intern);

      idArray.push(answers.internId);
      
      createTeam();
    });
  }

  function buildTeam() {
    // Create the output directory if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMember), "utf-8");
  }

  createManager();

}


appMenu();