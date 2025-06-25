const sheet = document.styleSheets[0];
const colorGrid = document.querySelector(".color-grid");
const slider = document.querySelector(".slider");
const sliderTextElement = document.querySelector(".slider-text");
const opacity = document.querySelector("#brush-opacity");
const rainbowMode = document.querySelector("#rainbow-mode");
const eraser = document.querySelector("#eraser");
const gridLines = document.querySelector("#grid-lines");
const checkboxes = document.querySelectorAll(".canConflict")
const checkboxesTicked = [];
const clearButton = document.querySelector("#clear");
const downloadButton = document.querySelector("#download");

let isMousePressed = false;
let cursorURL = null;

const getRandomRGB = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r},${g}, ${b}, ${opacity.value})`;
}

const downloadImage = () => {
    html2canvas(colorGrid).then(canvas => {
        const link = document.createElement("a");
        link.download = "grid.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}

const createGrid = (amount) => {
    const sliderText = sliderTextElement.textContent;
    const sliderTextNew = `${sliderText.split(":")[0]}: ${amount}x${amount})`
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
            square.addEventListener("mousemove", () => colorSquare(square));
            line.appendChild(square);
        }
        colorGrid.appendChild(line)
    }
}


const colorSquare = (square) => {
    if(!isMousePressed) return;
    let color = square.style.backgroundColor

    if(eraser.checked)
        return square.style.backgroundColor = "";
    if(!color) 
    {
        if(rainbowMode.checked)
            square.style.backgroundColor = getRandomRGB();
        else
            square.style.backgroundColor = `rgba(0,0,0,${opacity.value})`;
    }
}


const handleCheckboxes = (checkboxClicked) => {
    if(checkboxClicked.checked)
    {
        checkboxesTicked.push(checkboxClicked);
    }
    else checkboxesTicked.pop(checkboxClicked);

    if(checkboxesTicked.length > 1) {
        checkboxesTicked[0].checked = false;
        checkboxesTicked.shift();
    }
}

const toggleGridLines = () => {
    colorGrid.childNodes.forEach(line => {
        line.childNodes.forEach(square => {
            {
                if(gridLines.checked)
                    square.style.border = "2px solid black";
                else
                    square.style.border = "";
                return;
            }
        });
    })
}

const startUpdatingMouseState = () => {
    document.body.addEventListener("mousedown",() => isMousePressed = true);
    document.body.addEventListener("mouseup", () => isMousePressed = false);
}

const start = () => {
    createGrid(slider.value);
    startUpdatingMouseState();
    slider.addEventListener("change", () => {createGrid(slider.value)});
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
        checkbox.addEventListener("click", () => handleCheckboxes(checkbox));
    })
    gridLines.checked = false;
    clearButton.addEventListener("click", () => createGrid(slider.value));
    downloadButton.addEventListener("click", downloadImage);
    gridLines.addEventListener("click", toggleGridLines);
}

start();