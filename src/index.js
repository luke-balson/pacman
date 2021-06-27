const readline = require('readline')
const Pacman = require('./Pacman')

// read user input and display output on terminal
const console = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Enter command for Pacman: '
})

// Pacman instance
const pacman = new Pacman()

// init call
console.prompt()

// prompt until program is terminated
console.on('line', (line) => {
    pacman.processCommand(line)
    console.prompt()
}).on('close', () => {
    console.log('\nGoodbye...')
    process.exit(0)
})
