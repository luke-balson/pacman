const directions = ['NORTH', 'WEST', 'SOUTH', 'EAST']
const grid_min = 0
const grid_max = 5
const uninitializedError = 'Game not initialized, try (place 0,0,north)\n'

class Pacman {
    constructor() {
        this.placed = false 
        this.x = -1 
        this.y = -1 
        this.direction = null 
    }

    // handle place command
    place(command) {
        if (!this.validatePlaceCommand(command))
            return console.error('Invalid PLACE command. Please try again.\n')

        const [x, y, direction] = this.validatePlaceCommand(command)
        this.placed = true
        this.x = x
        this.y = y
        this.direction = direction
        console.log(`Pacman has been placed at [${x},${y}] and facing ${direction}\n`)
    }

    // helper function for place()
    validatePlaceCommand(command) {
        if (!command) return null
        const commandArgs = command.split(',')
        if (commandArgs.length !== 3) return null

        // check if valid values
        const x = Number.parseInt(commandArgs[0])
        const y = Number.parseInt(commandArgs[1])
        const direction = commandArgs[2].toUpperCase()

        const invalidX =
            Number.isNaN(x) ||
            !Number.isInteger(x) ||
            x > grid_max ||
            x < grid_min
        const invalidY =
            Number.isNaN(y) ||
            !Number.isInteger(y) ||
            y > grid_max ||
            y < grid_min
        const invalidF = !directions.includes(direction)

        if (invalidX || invalidY || invalidF) return null
        return [x, y, direction]
    }

    // handle move command
    move() {
        if (!this.placed) return console.error(uninitializedError)

        const direction = this.direction
        let hasMoved = true

        // change coordinates if possible
        if (direction === 'NORTH' && this.y < grid_max) this.y++
        else if (direction === 'WEST' && this.x > grid_min) this.x--
        else if (direction === 'SOUTH' && this.y > grid_min) this.y--
        else if (direction === 'EAST' && this.x < grid_max) this.x++
        else hasMoved = false

        if (hasMoved) console.log(`Pacman is now at [${this.x},${this.y}]\n`)
        else console.error('Pacman cannot move!\n')
    }

    // handle left and right commands
    turn(isLeft) {
        if (!this.placed) return console.error(uninitializedError)

        // find index of current direction in the array
        let fIndex = directions.indexOf(this.direction)
        // assign new index depending on turning side
        fIndex = isLeft ? fIndex + 1 : fIndex - 1
        // wrap around if out of bound
        if (fIndex > 3) fIndex = 0
        if (fIndex < 0) fIndex = 3

        // assign new direction based on new index
        const direction = directions[fIndex]
        this.direction = direction
        console.log(`Pacman is now facing ${direction}\n`)
    }

    // handle report command
    report() {
        if (!this.placed) return console.error(uninitializedError)

        const position = `${this.x},${this.y},${this.direction}`
        console.log(position + '\n')
        return position
    }

    processCommand(line) {
        const command = line.trim().split(' ')
        const commandName = command[0].toUpperCase()

        switch (commandName) {
            case 'PLACE':
                this.place(command[1])
                break
            case 'MOVE':
                this.move()
                break
            case 'LEFT':
                this.turn(true)
                break
            case 'RIGHT':
                this.turn(false)
                break
            case 'REPORT':
                return this.report() 
            default:
                console.log(`Invalid command. Please try again.\n`)
                break
        }
    }
}

module.exports = Pacman
