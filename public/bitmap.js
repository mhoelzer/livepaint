let clientUpdates = []
function Bitmap(width, height) {
    this.grid = [];
    for(var row = 0; row < height; row++) {
        var row_arr = new Array(width);
        row_arr.fill("white");
        this.grid.push(row_arr);
    }
}

Bitmap.prototype.render = function(target_element) {
    this.cells = [];
    for(var row = 0; row < this.grid.length; row++) {
        var row_div = document.createElement("div");
        var cell_refs = [];
        row_div.className = "bmp_row";
        for(var col = 0; col < this.grid[row].length; col++) {
            var cell = document.createElement("div");
            cell.className = "bmp_cell";
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.style.background = this.grid[row][col];
            cell.addEventListener("click", this);
            row_div.appendChild(cell);
            cell_refs.push(cell);
        }
        target_element.appendChild(row_div);
        this.cells.push(cell_refs);
    }
};

Bitmap.prototype.setColor = function(row, col, color) { // only run locally when local client to add color or w/e; only local b/c pushing to client updates array to show what will be sent to serverin the next fetch request; could make a is local update then do if localupdate
    this.grid[row][col] = color;
    this.cells[row][col].style.background = color;
    let clientUpdate = [row, col, color]; 
    console.log(clientUpdate);
    clientUpdates.push(clientUpdate); // array of new stuff; global obj
    // console.log(clientUpdates);
}

Bitmap.prototype.applyUpdatesFromServer = function(row, col, color) { // only called on response from the server when the client needs to fastforward updates from other lcients 
    this.grid[row][col] = color;
    this.cells[row][col].style.background = color;
}

Bitmap.prototype.handleEvent = function(event) {
    if(event.type === "click") {
        var row = parseInt(event.currentTarget.dataset.row);
        var col = parseInt(event.currentTarget.dataset.col);
        if(tool === "draw") {
            this.setColor(row, col, paint_color); // with the set color, you do one pixel change, but you could make it so you can do a line
        } else if(tool == "fill") {
            this.fill(row, col, paint_color);
        }
    }
};