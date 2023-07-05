
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const numBars = 100;
const barWidth = canvas.width / numBars;
const barHeightMax = canvas.height - 10;
const delay = 5;
let sortingInProgress = false;
let data = [];

//generate random number of arrays
function generateArray() {
  data = [];
  for (let i = 0; i < numBars; i++) {
    data.push(Math.floor(Math.random() * barHeightMax) + 1);
  }
  drawBars();
}

// Add event listener to button
const generateBtn = document.querySelector("button");
generateBtn.addEventListener("click", generateArray);

//diable buttons
function disableButtons(buttons, disabledBtn) {
  buttons.forEach(function (button) {
    if (button !== disabledBtn) {
      button.disabled = true;
    }
  });
}
//enable buttons
function enableButtons(buttons) {
  buttons.forEach(function (button) {
    button.disabled = false;
  });
}

// Draw bars
function drawBars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < data.length; i++) {
    const x = i * barWidth;
    const y = canvas.height - data[i];
    ctx.fillStyle = "#22224d";
    ctx.fillRect(x, y, barWidth, data[i]);
  }
}

//  bubbleSort() function
async function bubbleSort() {
  if (sortingInProgress) {
    return;
  }
  sortingInProgress = true;
  disableButtons(document.querySelectorAll(".buttons button"), this);

  for (let i = 0; i < data.length - 1; i++) {
    for (let j = 0; j < data.length - 1 - i; j++) {
      if (data[j] > data[j + 1]) {
        const temp = data[j];
        data[j] = data[j + 1];
        data[j + 1] = temp;
        drawBars();
        await sleep(delay);
      }
    }
  }

  enableButtons(document.querySelectorAll(".buttons button"));
  sortingInProgress = false;
}

// selectionsort() function
async function selectionSort() {
  if (sortingInProgress) {
    return;
  }
  sortingInProgress = true;
  disableButtons(document.querySelectorAll(".buttons button"), this);

  for (let i = 0; i < data.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < data.length; j++) {
      if (data[j] < data[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      const temp = data[i];
      data[i] = data[minIndex];
      data[minIndex] = temp;
      drawBars();
      await sleep(delay);
    }
  }

  enableButtons(document.querySelectorAll(".buttons button"));
  sortingInProgress = false;
}

//  insertionSort()

async function insertionSort() {
  if (sortingInProgress) {
    return;
  }
  sortingInProgress = true;
  disableButtons(document.querySelectorAll(".buttons button"), this);

  for (let i = 1; i < data.length; i++) {
    const key = data[i];
    let j = i - 1;
    while (j >= 0 && data[j] > key) {
      data[j + 1] = data[j];
      j--;
      drawBars();
      await sleep(delay);
    }
    data[j + 1] = key;
    drawBars();
    await sleep(delay);
  }

  enableButtons(document.querySelectorAll(".buttons button"));
  sortingInProgress = false;
}

// merge sort function
async function mergeSort(arr, left, right) {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    await mergeSort(arr, left, mid);
    await mergeSort(arr, mid + 1, right);
    await merge(arr, left, mid, right);
  }
}

async function merge(arr, left, mid, right) {
  const n1 = mid - left + 1;
  const n2 = right - mid;

  const L = new Array(n1);
  const R = new Array(n2);

  for (let i = 0; i < n1; i++) {
    L[i] = arr[left + i];
  }
  for (let j = 0; j < n2; j++) {
    R[j] = arr[mid + 1 + j];
  }

  let i = 0;
  let j = 0;
  let k = left;

  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
  }

  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }

  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }

  drawBars();
  await sleep(delay);
}

// quick sort function
async function quickSort(arr, left, right) {
  if (left < right) {
    const pivotIndex = await partition(arr, left, right);
    await quickSort(arr, left, pivotIndex - 1);
    await quickSort(arr, pivotIndex + 1, right);
  }
}

async function partition(arr, left, right) {
  const pivotValue = arr[right];
  let i = left - 1;

  for (let j = left; j < right; j++) {
    if (arr[j] < pivotValue) {
      i++;
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      drawBars();
      await sleep(delay);
    }
  }

  const temp = arr[i + 1];
  arr[i + 1] = arr[right];
  arr[right] = temp;
  drawBars();
  await sleep(delay);

  return i + 1;
}

// Attach mergeSort() function to Merge Sort button
const mergeSortBtn = document.querySelectorAll("button")[4];
mergeSortBtn.addEventListener("click", async function () {
  if (sortingInProgress) {
    return;
  }
  sortingInProgress = true;
  disableButtons(document.querySelectorAll(".buttons button"), mergeSortBtn);

  await mergeSort(data, 0, data.length - 1);
  drawBars();

  enableButtons(document.querySelectorAll(".buttons button"));
  sortingInProgress = false;
});


// Attach quickSort() function to Quick Sort button
const quickSortBtn = document.querySelectorAll("button")[5];
quickSortBtn.addEventListener("click", async function () {
  if (sortingInProgress) {
    return;
  }
  sortingInProgress = true;
  disableButtons(document.querySelectorAll(".buttons button"), quickSortBtn);

  await quickSort(data, 0, data.length - 1);
  drawBars();

  enableButtons(document.querySelectorAll(".buttons button"));
  sortingInProgress = false;
});

// Sleep function for animation delay
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
