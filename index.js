const container = document.querySelector(".container");

const createGrid = () => {
    for(i=0;i<16;i++)
    {
        console.log("got here")
        const line = document.createElement("div");
        line.classList.add("line");
        for(j=0;j<16;j++)
        {
            const square = document.createElement("div");
            square.classList.add("square");
            line.appendChild(square);
        }
        container.appendChild(line)
    }
}

createGrid();