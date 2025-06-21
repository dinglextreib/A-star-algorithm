
let grd_width = 15
let grd_height = 15
let grd_size = 50

let start = [13,12]
let goal = [2,1]
let blocked = [
    //[1,2],
    [9,9],
    [9,8],
    [9,7],
    [9,6],
    [10,9],
    //[11,9],
    //[12,9],
    [13,9],
    [14,9],
    //[10,7],

    [7,3],
    [6,3],
    [5,3],
    [4,3],
    [3,3],
    [3,2],
    [3,1],
    [3,0],
]




let mainLoop
let debug_vision = true
let grd = []
let prg = []
let alwd_nds = [
    [0,1],
    [1,0],
    [0,-1],
    [-1,0],
    [1,1],
    [1,-1],
    [-1,1],
    [-1,-1],
    //[1,-1],
]

window.addEventListener("keydown", function(input) {
    if (input.key == "w") {
        loop()
    }
})

window.onload = function() {
    let grid = document.getElementById("grid")

    for (let i = 0; i < grd_width; i++) {
        grid.style.gridTemplateColumns += ` ${grd_size}px`      
    }
    
    for (let x = 0;x < grd_width; x++ ) {
        grd[x] = []
        for (let y = 0;y < grd_height; y++ ) {
            grd[x][y] = "emt"           
        }
    }

    for (let x = 0;x < grd_width*grd_height; x++ ) {       
        let nw = document.createElement("div")
        //nw.textContent = x
        nw.id = x
        nw.style.height = `${grd_size}px`   
        grid.appendChild(nw)
    }

    for (let x of blocked) {
        grd[x[0]][x[1]] = "blocked"
    }


    prg.push(start)
    loop()
    mainLoop = setInterval(loop, 100)
    

}

function loop() {
    let lp = prg[prg.length-1]
    if (lp[0] == goal[0] && lp[1] == goal[1]) {
        clearInterval(mainLoop)
        console.log("goal reached!")
        return
    }

    
    calc_next()
    draw()
}

function draw() {
    getDiv(start).style.backgroundColor = "red"
    getDiv(start).textContent = "str"
    getDiv(start).style.color = "darkred"
    getDiv(goal).textContent = "goal"
    getDiv(goal).style.backgroundColor = "blue"
    getDiv(goal).style.color = "lightblue"
    

    grd[start[0]][start[1]] = "start"
    grd[goal[0]][goal[1]] = "goal"
    for (let x in grd) {
        for (let y in grd[x]) {
            let i = grd[x][y]
            let prs = [parseInt(x),parseInt(y)]
            if (i == "blocked") {
                getDiv(prs).style.backgroundColor = "rgb(126, 126, 126)"
            }

            if (typeof i != "string") {
                if (debug_vision) {
                    getDiv(prs).style.backgroundColor = "yellow"
                    getDiv(prs).style.color = "brown"
                    getDiv(prs).textContent = Math.floor(i*1000)/1000
                    getDiv(prs).style.fontSize = ` ${grd_size/5}px`
                }
                for (let pt of prg) {
                    //console.log(prs, pt)
                    if (prs[0] == pt[0] && prs[1] == pt[1]) {
                        getDiv(prs).style.backgroundColor = "orange"
                        if (!debug_vision) {getDiv(prs).style.backgroundColor = "green"}
                    }
            }
            }
        }
    }
}

function magnitude(a, b) {
    let unt = unit(a, b)
    return Math.sqrt(unt.x**2 + unt.y**2)
}

function calc_next() {
    last_pt = prg[prg.length-1]
    let dat = []
    for (let x of alwd_nds) {
        let ndp = [last_pt[0] + x[0], last_pt[1] + x[1]]
        if (grd[ndp[0]][ndp[1]] != "blocked") {
            grd[ndp[0]][ndp[1]] = magnitude(goal, ndp) + magnitude(ndp, last_pt)
            dat.push([ndp, magnitude(goal, ndp) + magnitude(ndp, last_pt), magnitude(goal, ndp)])
        }    
    }


    dat.sort(function(a, b) {
    return a[1] - b[1];
    })
    let grp = []
    for (let x in dat) {
        if (dat[x][3] == undefined) {
            let ox = dat[x]
            grp.push([])
            for (let y in dat) {
                let oy = dat[y]         
                if (oy[1] == ox[1]) {
                    grp[grp.length-1].push(oy)
                    dat[y][3] = true
                }
            
            }
          dat[x][3] = true  
        }
        
    }

    //console.log(grp[0][0][1])
    prg.push(grp[0][0][0])
    
}

function unit(a, b) {
    let dx = a[0] - b[0]
    let dy = a[1] - b[1]
    return {x:dx, y:dy}    
}

function getDiv(crt) {   
    if (grd[crt[0]].includes(grd[crt[0]][crt[1]])) {
        //console.log(crt)
        return document.getElementById(crt[0]+(grd_width*crt[1]))
    }
}

