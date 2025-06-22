const container = document.querySelector(".container");
const amountOfSquares = document.querySelector(".slider");



const createGrid = (amountOfSquares) => {
    container.innerHTML = " ";
    console.log(amountOfSquares)
    for(i=0;i<amountOfSquares;i++)
    {
        const line = document.createElement("div");
        line.classList.add("line");
        for(j=0;j<amountOfSquares;j++)
        {
            const square = document.createElement("div");
            square.style.width = square.style.height = `${700/amountOfSquares}px`; 
            square.addEventListener("mouseenter", () => colorSquare(square));
            square.classList.add("square");
            line.appendChild(square);
        }
        container.appendChild(line)
    }
}

const colorSquare = (square) => {
    square.classList.add("colored");
    setInterval(() => {square.classList.remove("colored");}, 750);
}



createGrid(amountOfSquares.value);

amountOfSquares.addEventListener("change", () => {createGrid(amountOfSquares.value)});