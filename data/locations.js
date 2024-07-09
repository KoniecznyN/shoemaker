import { items } from "./items.js";
import { displayItem } from "./items.js";

console.log(items);

console.log(displayItem(items, "KEY"));

class Location {
  description;
  src;
  color;
  directions;
  item;
  constructor(description, src, color, directions, item) {
    this.description = description;
    this.src = src;
    this.color = color;
    this.directions = directions;
    this.item = item;
  }
}

export const locations = [
  [
    new Location(
      "You are inside a brimstone mine",
      "11.gif",
      "rgb(235,211,64)",
      ["E"],
      [{ inputName: "nothing" }]
    ),
    new Location(
      "You are at the entrance to the mine",
      "12.gif",
      "rgb(89,93,87)",
      ["E", "W"],
      [{ inputName: "nothing" }]
    ),
    new Location(
      "A hill",
      "13.gif",
      "rgb(117,237,243)",
      ["S", "E", "W"],
      [displayItem(items, "STONE")]
    ),
    new Location(
      "Some bushes",
      "14.gif",
      "rgb(202,230,51)",
      ["E", "W"],
      [
        {
          inputName: "nothing",
        },
      ]
    ),
    new Location(
      "An old deserted hut",
      "15.gif",
      "rgb(220,204,61)",
      ["E", "W"],
      [displayItem(items, "BUCKET")]
    ),
    new Location(
      "The edge of a forest",
      "16.gif",
      "rgb(167,245,63)",
      ["E", "W"],
      [{ inputName: "nothing" }]
    ),
    new Location(
      "A dark forest",
      "17.gif",
      "rgb(140,253,99)",
      ["S", "W"],
      [displayItem(items, "MUSHROOMS")]
    ),
  ],

  [
    new Location(
      "A man nearby making tar",
      "21.gif",
      "rgb(255,190,99)",
      ["S", "E"],
      [{ inputName: "nothing" }]
    ),
    new Location(
      "A timber yard",
      "22.gif",
      "rgb(255,190,99)",
      ["S", "E", "W"],
      [{ inputName: "nothing" }]
    ),
    new Location(
      "You are by a roadside shrine",
      "23.gif",
      "rgb(167,245,63)",
      ["N", "S", "E", "W"],
      [displayItem(items, "KEY")]
    ),
    new Location(
      "You are by a small chapel",
      "24.gif",
      "rgb(212,229,36)",
      ["E", "W"],
      [{ inputName: "nothing" }]
    ),
    new Location(
      "You are on a road leading to a wood",
      "25.gif",
      "rgb(167,245,63)",
      ["S", "E", "W"],
      [{ inputName: "nothing" }]
    ),
    new Location(
      "You are in a forest",
      "26 i 65.gif",
      "rgb(167,245,63)",
      ["E", "W"],
      [{ inputName: "nothing" }]
    ),
    new Location(
      "You are in a deep forest",
      "27 i 67.gif",
      "rgb(140,253,99)",
      ["N", "W"],
      [displayItem(items, "BERRIES")]
    ),
  ],

  [
    new Location(
      "You are by the Vistula River",
      "31.gif",
      "rgb(122,232,252)",
      ["N", "E"],
      [{ inputName: "nothing" }]
    ),
    new Location(
      "You are by the Vistula River",
      "32.gif",
      "rgb(140,214,255)",
      ["N", "W"],
      [displayItem(items, "FISH")]
    ),
    new Location(
      "You are on a bridge over river",
      "33.gif",
      "rgb(108,181,242)",
      ["N", "S"],
      [{ inputName: "nothing" }]
    ),
    new Location(
      "You are by the old tavern",
      "34.gif",
      "rgb(255,189,117)",
      ["E"],
      [{ inputName: "nothing" }]
    ),
    new Location(
      `You are at the town's end`,
      "35.gif",
      "rgb(255,190,99)",
      ["N", "S", "W"],
      [{ inputName: "nothing" }]
    ),
    new Location(
      `You are in a butcher's shop`,
      "36.gif",
      "rgb(255,188,102)",
      ["S"],
      [{ inputName: "nothing" }]
    ),
    new Location(
      `You are in a cooper's house`,
      "37.gif",
      "rgb(255,188,102)",
      ["S"],
      [{ inputName: "nothing" }]
    ),
  ],

  [
    new Location(
      "You are in the Wawel Castle",
      "41.gif",
      "rgb(255,176,141)",
      ["E"],
      [{ inputName: "nothing" }]
    ),
    new Location(
      `You are inside a dragon's cave`,
      "42.gif",
      "rgb(198,205,193)",
      ["E", "W"],
      [{ inputName: "nothing" }]
    ),
    new Location(
      "A perfect place to set a trap",
      "43.gif",
      "rgb(255,176,141)",
      ["N", "W"],
      [{ inputName: "nothing" }] // [{ inputName: "nothing" }]
    ),
    new Location(
      "You are by the water mill",
      "44.gif",
      "rgb(255,190,99)",
      ["E"],
      [displayItem(items, "BAG")]
    ),
    new Location(
      "You are at a main crossroad",
      "45.gif",
      "rgb(255,190,99)",
      ["N", "S", "E", "W"],
      [{ inputName: "nothing" }]
    ),
    new Location(
      "You are on a town street",
      "46.gif",
      "rgb(255,190,99)",
      ["N", "E", "W"],
      [{ inputName: "nothing" }]
    ),
    new Location(
      "You are in a frontyard of your house",
      "47.gif",
      "rgb(255,190,99)",
      ["N", "S", "W"],
      [{ inputName: "nothing" }]
    ),
  ],

  [
    new Location(),
    new Location(),
    new Location(),
    new Location(
      "You are by a swift stream",
      "54.gif",
      "rgb(108,181,242)",
      ["E"],
      [{ inputName: "nothing" }]
    ),
    new Location(
      "You are on a street leading forest",
      "55.gif",
      "rgb(255,190,99)",
      ["N", "S", "W"],
      [displayItem(items, "KNIFE")]
    ),
    new Location(
      `You are in a woodcutter's backyard`,
      "56.gif",
      "rgb(255,190,99)",
      ["S"],
      [{ inputName: "nothing" }]
    ),
    new Location(
      "You are in a shoemaker's house",
      "57.gif",
      "rgb(254,194,97)",
      ["N"],
      [{ inputName: "nothing" }]
    ),
  ],

  [
    new Location(),
    new Location(),
    new Location(),
    new Location(
      "You are in a bleak funeral house",
      "64.gif",
      "rgb(254,194,97)",
      ["E"],
      [displayItem(items, "SPADE")]
    ),
    new Location(
      "You are on a path leading to the wood",
      "26 i 65.gif",
      "rgb(167,245,63)",
      ["N", "E", "W"],
      [{ inputName: "nothing" }]
    ),
    new Location(
      "You are at the edge of a forest",
      "66.gif",
      "rgb(167,245,63)",
      ["N", "E", "W"],
      [{ inputName: "nothing" }]
    ),
    new Location(
      "You are in a deep forest",
      "27 i 67.gif",
      "rgb(140,253,99)",
      ["W"],
      [{ inputName: "nothing" }]
    ),
  ],
];
