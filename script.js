let gridSize = 16;
let bgColor = "#ffffff";
let ink = "#000000";
let cells;
let ereaserActive = false;

const container = document.querySelector(".gridContainer");
const colorPicker = document.querySelector("#colorSelect");
const bgColorPicker = document.querySelector("#bgColorSelect");
const ereaser = document.querySelector(".ereaser");
const gridSizeSelector = document.querySelector("#gridSize");
const displayedGridSize = document.querySelectorAll(".rangeValue");
const gridState = document.querySelector(".gridState");
const clearGrid = document.querySelector(".clearGrid");

function createGrid() {
  let WIDTH = container.offsetWidth / gridSize;

  container.style.gridTemplateColumns = `repeat(${
    gridSize - 3
  }, ${WIDTH}px) 1fr 1fr 1fr`;
  container.style.gridTemplateRows = `repeat(${
    gridSize - 3
  }, ${WIDTH}px) 1fr 1fr 1fr`;

  for (let i = 0; i < gridSize ** 2; i++) {
    const square = document.createElement("div");
    square.classList.add("cell");
    square.draggable = false;

    container.appendChild(square);
  }
}

colorPicker.addEventListener("input", function (e) {
  ink = e.target.value;
  console.log(ink);
});

bgColorPicker.addEventListener("input", function (e) {
  container.style.backgroundColor = e.target.value;
});

ereaser.addEventListener("click", function () {
  if (ereaserActive == false) {
    ereaserActive = true;
  } else {
    ereaserActive = false;
  }
  console.log(ereaserActive);
});

function drawClick(e) {
  console.log("Hello");
  if (ereaserActive) {
    e.target.style.backgroundColor = "transparent";
    return;
  }
  e.target.style.backgroundColor = ink;
  return;
}

function drawHover(e) {
  if (e.buttons > 0) {
    if (ereaserActive) {
      e.target.style.backgroundColor = "transparent";
      return;
    }
    e.target.style.backgroundColor = ink;
    return;
  }
}

function toggleBorders() {
  if (cells[0].classList.contains("hideBorders")) {
    for (let i = 0; i < cells.length; i++) {
      cells[i].classList.remove("hideBorders");
    }
  } else {
    for (let i = 0; i < cells.length; i++) {
      cells[i].classList.add("hideBorders");
    }
  }
}

function deleteGrid() {
  while (container.firstChild) {
    container.removeEventListener("mousedown", drawClick);
    container.removeEventListener("mouseenter", drawHover);
    container.lastChild = null;
    container.removeChild(container.lastChild);
  }
}

function redrawGrid() {
  deleteGrid();
  createGrid();
  listen();
}

function resize(e) {
  gridSize = e.target.value;
  redrawGrid();
  for (const i of displayedGridSize) {
    i.textContent = gridSize;
  }
}

function listen() {
  cells = document.querySelectorAll(".cell");

  // drawing
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("mousedown", drawClick);
    cells[i].addEventListener("mouseenter", drawHover);
  }

  // hide/show borders
  gridState.addEventListener("click", toggleBorders);

  // resize grid
  gridSizeSelector.addEventListener("input", resize);

  // clear button
  clearGrid.addEventListener("click", redrawGrid);
}

createGrid();

listen();
