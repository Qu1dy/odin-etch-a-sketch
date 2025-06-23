const container = document.querySelector(".container");
const slider = document.querySelector(".slider");


const getRandomRGB = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r},${g}, ${b}, 0.1)`;
}

const createGrid = (amount) => {
    container.innerHTML = " ";
    for(let i=0;i<amount;i++)
    {
        const line = document.createElement("div");
        line.classList.add("line");
        for(let j=0;j<amount;j++)
        {
            const square = document.createElement("div");
            square.style.width = square.style.height = `${700/amount}px`; 
            square.addEventListener("mouseenter", () => colorSquare(square));
            square.classList.add("square");
            line.appendChild(square);
        }
        container.appendChild(line)
    }
}

const colorSquare = (square) => {
    square.style.backgroundColor = getRandomRGB();
    setTimeout(() => {square.classList.remove("colored");}, 750);
}


createGrid(slider.value);

slider.addEventListener("change", () => {createGrid(slider.value)});