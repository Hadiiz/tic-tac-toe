// BOARD
const board = (() => {
  let arr = ["", "", "", "", "", "", "", "", ""];
  const game_div = document.getElementById("game");
  const set_item = (index, item) => {
    arr[index] = item;
    print_board();
  };

  // GET ARRAY
  const get_arr = () => {
    return arr;
  };

  // PRINT
  const print_board = () => {
    game_div.innerHTML = "";
    arr.forEach(function (item, index) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.innerHTML = arr[index];
      game_div.appendChild(cell);
    });
  };

  return { print_board, set_item, get_arr };
})();

// PLAYER
const Player = (sign) => {
  let _sign = sign;
  const get_sign = () => {
    return _sign;
  };
  return { get_sign };
};

// GAME
const game = (() => {
  const p1 = Player("X");
  const p2 = Player("O");
  const prompt = document.getElementById("prompt");
  let over = false;
  let turn = "P1";
  const write = (text = turn + "'s turn") => {
    prompt.innerHTML = text;
  };
  const next_turn = () => {
    turn = turn == "P1" ? "P2" : "P1";
  };
  const get_symbol = () => {
    return turn == "P1" ? p1.get_sign() : p2.get_sign();
  };

  const is_game_over = () => {
    arr = board.get_arr();
    if (
      arr[4] != "" &&
      ((arr[1] == arr[4] && arr[4] == arr[7]) ||
        (arr[3] == arr[4] && arr[4] == arr[5]) ||
        (arr[0] == arr[4] && arr[4] == arr[8]) ||
        (arr[2] == arr[4] && arr[4] == arr[6]))
    ) {
      write(`${arr[4]} WINS!`);
      over = true;
    } else if (
      arr[0] != "" &&
      ((arr[0] == arr[1] && arr[0] == arr[2]) ||
        (arr[0] == arr[3] && arr[0] == arr[6]))
    ) {
      write(`${arr[0]} WINS!`);
      over = true;
    } else if (arr[2] != "" && arr[2] == arr[5] && arr[2] == arr[8]) {
      write(`${arr[2]} WINS!`);
      over = true;
    } else if (arr[8] != "" && arr[8] == arr[7] && arr[8] == arr[6]) {
      write(`${arr[8]} WINS!`);
      over = true;
    }
  };

  const set_listeners = () => {
    const arr = board.get_arr();
    const cells = document.querySelectorAll(".cell");
    arr.forEach(function (item, index) {
      if (item == "") {
        cells[index].addEventListener("click", function (e) {
          if (!over) {
            board.set_item(index, get_symbol());
            set_listeners();
            next_turn();
            write();
            is_game_over();
          }
        });
      }
    });
  };
  write();
  board.print_board();
  set_listeners();
})();
