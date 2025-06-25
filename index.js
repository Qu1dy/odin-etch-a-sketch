const colorGrid = document.querySelector(".color-grid");
const slider = document.querySelector(".slider");
const sliderTextElement = document.querySelector(".slider-text");
const opacity = document.querySelector("#brush-opacity");
let isMousePressed = false;

const getRandomRGB = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r},${g}, ${b}, ${opacity.value})`;
}

const createGrid = (amount) => {
    const sliderText = sliderTextElement.textContent;
    const sliderTextNew = `${sliderText.split(":")[0]}: ${amount}x${amount}`
    sliderTextElement.textContent = sliderTextNew;
    colorGrid.innerHTML = " ";
    for(let i=0;i<amount;i++)
    {
        const line = document.createElement("div");
        line.classList.add("line");
        for(let j=0;j<amount;j++)
        {
            const square = document.createElement("div");
            square.style.width = square.style.height = `${700/amount}px`; 
            square.addEventListener("mouseover", () => colorSquare(square));
            square.classList.add("square");
            line.appendChild(square);
        }
        colorGrid.appendChild(line)
    }
}

const colorSquare = (square) => {
    if(!isMousePressed) return;
    let color = square.style.backgroundColor

    if(!color) 
        square.style.backgroundColor = getRandomRGB();
}

const startUpdatingMouseState = () => {
    document.body.addEventListener("mousedown",() => isMousePressed = true);
    document.body.addEventListener("mouseup", () => isMousePressed = false);
}

createGrid(slider.value);
startUpdatingMouseState();
slider.addEventListener("change", () => {createGrid(slider.value)});