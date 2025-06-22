const container = document.querySelector(".container");

const createGrid = () => {
    for(i=0;i<16;i++)
    {
        const line = document.createElement("div");
        line.classList.add("line");
        for(j=0;j<16;j++)
        {
            const square = document.createElement("div");
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


createGrid();