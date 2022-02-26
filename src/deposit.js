const inquirer = require("inquirer")
const chalk = require("chalk")
const checkAccount = require("./helpers/checkAccount")

function deposit() {
    inquirer.prompt([
        {
            name: "accountName",
            message: "Qual o nome da sua conta?"
        }
    ])
    .then((anwser) => {
        const accountName = anwser["accountName"]

        //verify if account exists
        if(!checkAccount(accountName)) {
            return deposit()
        }
    })
    .catch(err => console.log(err))
}   

module.exports = deposit