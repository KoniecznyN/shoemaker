import { locations } from "./data/locations.js";
import { items } from "./data/items.js";
import { displayItem } from "./data/items.js";

var marker = document.createElement("div");
marker.style.width = "16px";
marker.style.height = "16px";
marker.style.backgroundColor = "#72cc52";
marker.style.float = "left";

const game = {
  x: 6, //6
  y: 3, //3
  sheepParts: 0,
  dragonAlive: true,
  init() {
    const game = document.getElementById("game");
    const img = document.createElement("img");
    game.style.display = "none";

    document.body.append(img);
    img.id = "img";
    img.src = "./img/czołówka.jpg";

    const audio = document.createElement("audio");
    audio.src = "./hejnal_mariacki.mp3";
    audio.style.display = "none";
    document.body.append(audio);
    audio.play();

    window.onkeydown = () => {
      img.src = "./img/opis_A.jpg";
      window.onkeydown = () => {
        img.src = "./img/opis_B.jpg";
        window.onkeydown = () => {
          game.style.display = "block";
          img.style.display = "none";

          audio.pause();
          this.displayLocation();

          window.removeEventListener(onkeydown, () => {});
        };
      };
    };
  },
  itemCarried: { inputName: "nothing" }, //{ inputName: "nothing" }
  inputActions: {
    N: "NORTH",
    S: "SOUTH",
    W: "WEST",
    E: "EAST",
    T: "TAKE",
    D: "DROP",
    U: "USE",
    V: "VOCABULARY",
    G: "GOSSIP",
  },
  displayLocation() {
    let directions = locations[this.y][this.x].directions;
    let what = directions
      .map((element) => this.inputActions[element])
      .join(", ");

    let items = "";
    for (let i = 0; i < locations[this.y][this.x].item.length; i++) {
      items += locations[this.y][this.x].item[i].inputName;
      if (i < locations[this.y][this.x].item.length - 1) {
        items += ", ";
      }
    }

    const template = `
        <h2>${locations[this.y][this.x].description}</h2>
        <div id="images">
          <img id="location" src="./img/${
            locations[this.y][this.x].src
          }" style="background-color: ${
      locations[this.y][this.x].color
    }" alt="location">
          <img id="compas" src="./compas.png" alt="compas" />
          <div id="coverN"></div>
          <div id="coverS"></div>
          <div id="coverE"></div>
          <div id="coverW"></div>
        </div>
        <div id="textarea">
          <p>You can go ${what}</p>
          <p>You see ${items}</p>
          <p>You are carrying ${this.itemCarried.inputName}</p>
          <p id="eventText" style="float: left;">What now?</p>
          <p id="action" style="float: left;"></p>
        </div>
        `;

    document.getElementById("game").innerHTML = template;

    marker.style.display = "block";
    document.getElementById("action").style.marginRight = 0;
    marker.style.marginLeft = 0;
    document.getElementById("textarea").append(marker);

    const input = document.getElementById("action");
    let string = "";
    window.onkeydown = (event) => {
      if (event.key == "Backspace") {
        string = string.slice(0, -1);
      } else if (event.key == "Alt") {
      } else if (event.key == "Shift") {
      } else if (event.key == "Control") {
      } else if (event.key == "AltGraph") {
      } else if (event.key == "CapsLock") {
      } else if (event.key == "Tab") {
      } else if (event.key == "Meta") {
      } else if (event.key == "Enter") {
        this.action(input.innerHTML);
      } else if (event.key == "Backspace") {
        string += " ";
      } else {
        string += event.key;
      }
      input.innerHTML = string.toUpperCase();

      document.getElementById("action").style.marginRight = 0;
      marker.style.marginLeft = 0;
      document.getElementById("textarea").append(marker);
    };

    directions.forEach((element) => {
      if (element == "N") {
        document.getElementById("coverN").style.display = "none";
      }
      if (element == "S") {
        document.getElementById("coverS").style.display = "none";
      }
      if (element == "E") {
        document.getElementById("coverE").style.display = "none";
      }
      if (element == "W") {
        document.getElementById("coverW").style.display = "none";
      }
    });

    window.onclick = () => {};
  },
  async action(string) {
    window.onkeydown = (event) => {
      return false;
    };
    marker.style.display = "none";
    let direction = {};
    let action = "";
    let input = string.toUpperCase();
    input = input.split(" ");
    let possibleDirections = locations[this.y][this.x].directions;
    let canGo = false;

    Object.entries(this.inputActions).forEach((element) => {
      if (input[0] == element[0] || input[0] == element[1]) {
        input[0] = element[1];
      }
    });

    //wybranie akcji
    if (input[0] == "NORTH") {
      direction = { shortcut: "N", vector: { x: 0, y: -1 } };
    } else if (input[0] == "SOUTH") {
      direction = { shortcut: "S", vector: { x: 0, y: 1 } };
    } else if (input[0] == "EAST") {
      direction = { shortcut: "E", vector: { x: 1, y: 0 } };
    } else if (input[0] == "WEST") {
      direction = { shortcut: "W", vector: { x: -1, y: 0 } };
    }

    //take
    else if (input[0] == "TAKE") {
      let itemExist = false;
      let itemIndex = 0;
      for (let i = 0; i < locations[this.y][this.x].item.length; i++) {
        if (
          locations[this.y][this.x].item[i].name.toUpperCase() ==
          input[input.length - 1]
        ) {
          itemExist = true;
          itemIndex = i;
          break;
        }
      }
      if (itemExist) {
        if (this.itemCarried.inputName == "nothing") {
          if (locations[this.y][this.x].item[itemIndex].flag == 1) {
            document.getElementById("eventText").innerText = `You are taking ${
              locations[this.y][this.x].item[itemIndex].inputName
            }`;
            this.itemCarried = locations[this.y][this.x].item[itemIndex];
            locations[this.y][this.x].item.splice(itemIndex, 1);
            if (locations[this.y][this.x].item.length == 0) {
              locations[this.y][this.x].item.push({ inputName: "nothing" });
            }
          } else {
            document.getElementById(
              "eventText"
            ).innerText = `You can't carry it`;
          }
        } else {
          document.getElementById(
            "eventText"
          ).innerText = `You are carrying something`;
        }
      } else {
        document.getElementById(
          "eventText"
        ).innerText = `There isn't anything like that here`;
      }
    }

    //drop
    else if (input[0] == "DROP") {
      if (this.itemCarried.inputName != "nothing") {
        if (input[input.length - 1] == this.itemCarried.name) {
          document.getElementById(
            "eventText"
          ).innerText = `You are about to drop ${this.itemCarried.inputName}`;
          if (locations[this.y][this.x].item[0].inputName != "nothing") {
            locations[this.y][this.x].item.push(this.itemCarried);
          } else {
            locations[this.y][this.x].item[0] = this.itemCarried;
          }
          this.itemCarried = { inputName: "nothing" };
        } else {
          document.getElementById(
            "eventText"
          ).innerText = `You are not carrying it`;
        }
      } else {
        document.getElementById(
          "eventText"
        ).innerText = `You are not carrying anything`;
      }
    }

    //use
    else if (input[0] == "USE") {
      if (this.itemCarried.inputName != "nothing") {
        if (this.itemCarried.name == "KEY" && this.y == 4 && this.x == 5) {
          this.itemCarried = displayItem(items, "AXE");
          document.getElementById(
            "eventText"
          ).innerText = `You opened a tool shed and took an axe`;
        } else if (
          this.itemCarried.name == "AXE" &&
          this.y == 5 &&
          this.x == 6
        ) {
          this.itemCarried = displayItem(items, "STICKS");
          document.getElementById(
            "eventText"
          ).innerText = `You cut sticks for sheeplegs`;
        } else if (
          this.itemCarried.name == "STICKS" &&
          this.y == 3 &&
          this.x == 2
        ) {
          if (locations[this.y][this.x].item[0].inputName != "nothing") {
            locations[this.y][this.x].item.push(
              displayItem(items, "sheeplegs")
            );
          } else {
            locations[this.y][this.x].item[0] = displayItem(items, "sheeplegs");
          }
          document.getElementById(
            "eventText"
          ).innerText = `You prepared legs for your fake sheep`;
          this.sheepParts++;
          this.itemCarried = { inputName: "nothing" };
        } else if (
          this.itemCarried.name == "MUSHROOMS" &&
          this.y == 2 &&
          this.x == 3
        ) {
          this.itemCarried = displayItem(items, "MONEY");
          document.getElementById(
            "eventText"
          ).innerText = `The tavern owner paid you money`;
        } else if (
          this.itemCarried.name == "MONEY" &&
          this.y == 2 &&
          this.x == 6
        ) {
          this.itemCarried = displayItem(items, "BARREL");
          document.getElementById(
            "eventText"
          ).innerText = `The cooper sold you a new barrel`;
        } else if (
          this.itemCarried.name == "BARREL" &&
          this.y == 3 &&
          this.x == 2
        ) {
          if (locations[this.y][this.x].item[0].inputName != "nothing") {
            locations[this.y][this.x].item.push(
              displayItem(items, "sheeptrunk")
            );
          } else {
            locations[this.y][this.x].item[0] = displayItem(
              items,
              "sheeptrunk"
            );
          }
          document.getElementById(
            "eventText"
          ).innerText = `You made a nice sheeptrunk`;
          this.sheepParts++;
          this.itemCarried = { inputName: "nothing" };
        } else if (
          this.itemCarried.name == "BERRIES" &&
          this.y == 2 &&
          this.x == 5
        ) {
          this.itemCarried = displayItem(items, "WOOL");
          document.getElementById(
            "eventText"
          ).innerText = `The butcher gave you wool`;
        } else if (
          this.itemCarried.name == "WOOL" &&
          this.y == 3 &&
          this.x == 2
        ) {
          if (locations[this.y][this.x].item[0].inputName != "nothing") {
            locations[this.y][this.x].item.push(
              displayItem(items, "sheepskin")
            );
          } else {
            locations[this.y][this.x].item[0] = displayItem(items, "sheepskin");
          }
          document.getElementById(
            "eventText"
          ).innerText = `You prepared skin for your fake sheep`;
          this.sheepParts++;
          this.itemCarried = { inputName: "nothing" };
        } else if (
          this.itemCarried.name == "BAG" &&
          this.y == 4 &&
          this.x == 6
        ) {
          this.itemCarried = displayItem(items, "RAG");
          document.getElementById(
            "eventText"
          ).innerText = `You used your tools to make a rag`;
        } else if (
          this.itemCarried.name == "RAG" &&
          this.y == 3 &&
          this.x == 2
        ) {
          if (locations[this.y][this.x].item[0].inputName != "nothing") {
            locations[this.y][this.x].item.push(
              displayItem(items, "sheephead")
            );
          } else {
            locations[this.y][this.x].item[0] = displayItem(items, "sheephead");
          }
          document.getElementById(
            "eventText"
          ).innerText = `You made a fake sheephead`;
          this.sheepParts++;
          this.itemCarried = { inputName: "nothing" };
        } else if (
          this.itemCarried.name == "SPADE" &&
          this.y == 0 &&
          this.x == 0
        ) {
          this.itemCarried = displayItem(items, "SULPHUR");
          document.getElementById("action").style.display = "none";
          document.getElementById("eventText").innerText = `You are digging...`;

          await new Promise((resolve) => {
            setTimeout(() => {
              document.getElementById("eventText").innerText = `and digging...`;
              resolve();
            }, 1000);
          });

          await new Promise((resolve) => {
            setTimeout(() => {
              document.getElementById(
                "eventText"
              ).innerText = `That's enough sulphur for you`;
              resolve();
            }, 1000);
          });
        } else if (
          this.itemCarried.name == "SULPHUR" &&
          this.y == 3 &&
          this.x == 2
        ) {
          if (locations[this.y][this.x].item[0].inputName != "nothing") {
            locations[this.y][this.x].item.push(
              displayItem(items, "solid poison")
            );
          } else {
            locations[this.y][this.x].item[0] = displayItem(
              items,
              "solid poison"
            );
          }
          document.getElementById(
            "eventText"
          ).innerText = `You prepared a solid poison`;
          this.sheepParts++;
          this.itemCarried = { inputName: "nothing" };
        } else if (
          this.itemCarried.name == "BUCKET" &&
          this.y == 1 &&
          this.x == 0
        ) {
          this.itemCarried = displayItem(items, "TAR");
          document.getElementById(
            "eventText"
          ).innerText = `You got a bucket full of tar`;
        } else if (
          this.itemCarried.name == "TAR" &&
          this.y == 3 &&
          this.x == 2
        ) {
          if (locations[this.y][this.x].item[0].inputName != "nothing") {
            locations[this.y][this.x].item.push(
              displayItem(items, "liquid poison")
            );
          } else {
            locations[this.y][this.x].item[0] = displayItem(
              items,
              "liquid poison"
            );
          }
          document.getElementById(
            "eventText"
          ).innerText = `You prepared a liquid poison`;
          this.sheepParts++;
          this.itemCarried = { inputName: "nothing" };
        } else if (
          this.itemCarried.name == "SHEEP" &&
          this.y == 3 &&
          this.x == 2
        ) {
          this.dragonAlive = false;
          if (locations[this.y][this.x].item[0].inputName != "nothing") {
            locations[this.y][this.x].item.push(
              displayItem(items, "dead dragon")
            );
          } else {
            locations[this.y][this.x].item[0] = displayItem(
              items,
              "dead dragon"
            );
          }
          document.getElementById("action").style.display = "none";
          document.getElementById(
            "eventText"
          ).innerText = `The dragon noticed your gift...`;

          await new Promise((resolve) => {
            setTimeout(() => {
              document.getElementById(
                "eventText"
              ).innerText = `The dragon ate your sheep and died!`;
              locations[this.y][this.x].src = "smok.gif";
              resolve();
            }, 1000);
          });

          this.itemCarried = { inputName: "nothing" };
        } else if (
          this.itemCarried.name == "KNIFE" &&
          this.y == 3 &&
          this.x == 2 &&
          !this.dragonAlive
        ) {
          this.itemCarried = displayItem(items, "DRAGONSKIN");
          document.getElementById(
            "eventText"
          ).innerText = `You cut a piece of dragon's skin`;
        } else if (
          this.itemCarried.name == "DRAGONSKIN" &&
          this.y == 4 &&
          this.x == 6
        ) {
          this.itemCarried = displayItem(items, "SHOES");
          document.getElementById(
            "eventText"
          ).innerText = `You used your tools to make shoes`;
        } else if (
          this.itemCarried.name == "SHOES" &&
          this.y == 3 &&
          this.x == 0
        ) {
          this.itemCarried = displayItem(items, "PRIZE");
          document.getElementById(
            "eventText"
          ).innerText = `The King is impressed by your shoes`;
          await this.endGame();
          return;
        } else {
          document.getElementById(
            "eventText"
          ).innerText = `Nothing happened...`;
        }
      } else {
        document.getElementById("eventText").innerText = `Nothing happened...`;
      }
    }

    //reszta akcji
    else if (input[0] == "VOCABULARY") {
      action = "V";
    } else if (input[0] == "GOSSIP") {
      action = "G";
    } else {
      document.getElementById(
        "eventText"
      ).innerText = `Try another word or V for vocabulary`;
    }

    //owca
    if (this.sheepParts == 6) {
      document.getElementById("action").style.display = "none";
      await new Promise((resolve) => {
        setTimeout(() => {
          document.getElementById(
            "eventText"
          ).innerText = `Your fake sheep is full of poison and ready to be eaten by the dragon`;
          resolve();
        }, 1000);
      });
      this.itemCarried = displayItem(items, "SHEEP");
      locations[this.y][this.x].item = [{ inputName: "nothing" }];
      this.sheepParts = undefined;
    }

    //poruszanie sie
    if (direction.shortcut != undefined) {
      possibleDirections.forEach((element) => {
        if (element == direction.shortcut) {
          canGo = true;
        }
        if (
          this.dragonAlive &&
          this.y == 3 &&
          this.x == 1 &&
          input[0] == "WEST"
        ) {
          canGo = false;
        }
      });

      if (canGo) {
        this.x += direction.vector.x;
        this.y += direction.vector.y;
        document.getElementById(
          "eventText"
        ).innerText = `You are going ${input}`;
      } else {
        if (
          this.dragonAlive &&
          this.y == 3 &&
          this.x == 1 &&
          input[0] == "WEST"
        ) {
          document.getElementById("action").style.display = "none";
          document.getElementById(
            "eventText"
          ).innerText = `You can't go that way`;

          await new Promise((resolve) => {
            setTimeout(() => {
              document.getElementById(
                "eventText"
              ).innerText = `The Dragon sleeps in cave`;
              resolve();
            }, 1000);
          });
        } else {
          document.getElementById(
            "eventText"
          ).innerText = `You can't go that way`;
        }
      }
    }

    //gossip i vocabulary
    if (action.length != 0) {
      let template = "";
      if (action == "V") {
        template = `
          <p>NORTH or N, SOUTH or S</p>
          <p>WEST or W, EAST or E</p>
          <p>TAKE (object) or T (object)</p>
          <p>DROP (object) or D (object)</p>
          <p>USE (object) or U (object)</p>
          <p>GOSSIPS or G, VOCABULARY or V</p>
          </br>
          <p>Press any key...</p>
          `;
      } else if (action == "G") {
        template = `
          <p>The  woodcutter lost  his home key...</p>
          <p>The butcher likes fruit... The cooper</p>
          <p>is greedy... Dratewka plans to make a</p>
          <p>poisoned  bait for the dragon...  The</p>
          <p>tavern owner is buying food  from the</p>
          <p>pickers... Making a rag from a bag...</p>
          </br>
          <p>Press any key...</p>
          `;
      }

      document.getElementById("textarea").innerHTML = template;
      let keyDown;
      window.addEventListener(
        "keydown",
        (keyDown = () => {
          this.displayLocation();
          window.removeEventListener("keydown", keyDown);
        })
      );
      let keyUp;
      window.addEventListener(
        "keyup",
        (keyUp = () => {
          document.getElementById("action").value = "";
          window.removeEventListener("keyup", keyUp);
        })
      );
      return;
    }

    //end
    document.getElementById("action").style.display = "none";
    setTimeout(() => {
      this.displayLocation();
    }, 1000);
  },
  async endGame() {
    document.getElementById("action").style.display = "none";
    let promisse = new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          document.getElementById("game").style.display = "none";
          document.getElementById("img").style.display = "block";
          document.getElementById("img").src = "./img/win.jpg";
          resolve();
        }, 1000);
      } catch (error) {
        reject(error);
      }
    });
  },
};

game.init();
