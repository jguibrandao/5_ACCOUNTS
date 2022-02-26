const chalk = require("chalk")
const inquirer = require("inquirer")
const checkAccount = require("./helpers/checkAccount")
const getAccount = require("./helpers/getAccount")
const fs = require("fs")

function deposit() {
    const operation = require("../index")

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

        inquirer.prompt([
            {
                name: "amount",
                message: "Quanto você deseja depositar?"
            }
        ]).then((anwser) => {
            const amount = anwser["amount"]

            //add an amount
            addAmount(accountName, amount)
            operation()
        }).catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

function addAmount(accountName, amount) {
    const operation = require("../index")
    
    const accountData = getAccount(accountName)

    if(!amount || amount <= 0) {
        console.log(chalk.bgRed.black("Não é possível depositar esse valor."))
    }

    accountData.balance = parseFloat(accountData.balance) + parseFloat(amount)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err) {
            console.log(err)
        }
    )

    console.log(
        chalk.green(`Foi depositado o valor de R$${amount} na conta do usuário ${accountName}`)
    )

    operation()
}

module.exports = deposit