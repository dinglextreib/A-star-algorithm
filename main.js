
let grd_width = 11
let grd_height = 9
let grd_size = 50

let stp = {x:5, y:5}
let goal = {x:0, y:0}

let crtp = stp
let grd = []
let alwd_nds = [
    [0,1],
    [1,0],
    [0,-1],
    [-1,0]


]

window.onload = function() {
    let grid = document.getElementById("grid")

    for (let i = 0; i < grd_width; i++) {
        grid.style.gridTemplateColumns += ` ${grd_size}px`
        
    }
    
    for (let y = 0;y < grd_height; y++ ) {
        grd.push([])
        for (let x = 0;x < grd_width; x++ ) {
            grd[y][x] = undefined
            let nw = document.createElement("div")
            nw.id = x+(grd_width*y)+1
            // nw.textContent = y+(grd_width*x)+1
            nw.style.height = `${grd_size}px`
        
            grid.appendChild(nw)
        }
    }


    grd[1][1] = "blocked"
    grd[6][5] = "blocked"
    console.log(grd)
    getDiv(stp.x, stp.y).style.backgroundColor = "red"
    getDiv(goal.x, goal.y).style.backgroundColor = "blue"  
     
    mov()
    redraw()
    console.log(grd[6][5])
    

}

function mov() {
    let temp = [[],[]]
     for (let x of alwd_nds) {

        let np = [crtp.y + x[1], crtp.x + x[0]]
        if (true) {
            if (grd[np[0]][np[1]] != "blocked") {
                temp[0].push(calc_cost(np))
                temp[1].push(np)
                grd[np[1]][np[0]] = calc_cost(np)
                let nd = getDiv(np[1], np[0])
                nd.style.backgroundColor = "yellow"
                nd.textContent = Math.floor(calc_cost(np)*1000)/1000
            } else {console.log("BLOCKED"); console.log(np)}
            
        }        
     }
     console.log("ss")
     let mn = temp[1][temp[0].indexOf(Math.min(...temp[0]))]
     getDiv(mn[0], mn[1]).style.backgroundColor = "orange"
}

function grdp(x,y) {
    return grd[y][x]
}

function redraw() {
    for (let y in grd) {
        for (let x in grd[y]) {
            if (grd[y][x] == "blocked") {
                getDiv(parseInt(x),parseInt(y)).style.backgroundColor = "grey"
            }
        }
    }
}

function calc_cost(a) {
    return magnitude(goal, a)
}

function magnitude(a, b) {
    let unt = unit(a, b)
    return Math.sqrt(unt.x**2 + unt.y**2)
}

function unit(a, b) {
    let dx = a.x - b[0]
    let dy = a.y - b[1]
    return {x:dx, y:dy}    
}

function getDiv(x,y) {
    return document.getElementById(x+(grd_width*y)+1)
}

