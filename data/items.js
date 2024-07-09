class Item {
  inputName;
  flag;
  name;

  constructor(inputName, flag, name) {
    this.inputName = inputName;
    this.flag = flag;
    this.name = name;
  }
}

export const items = [
  new Item("a KEY", 1, "KEY"),
  new Item("an AXE", 1, "AXE"),
  new Item("STICKS", 1, "STICKS"),
  new Item("sheeplegs", 0, "sheeplegs"),
  new Item("MUSHROOMS", 1, "MUSHROOMS"),
  new Item("MONEY", 1, "MONEY"),
  new Item("a BARREL", 1, "BARREL"),
  new Item("a sheeptrunk", 0, "sheeptrunk"),
  new Item("BERRIES", 1, "BERRIES"),
  new Item("WOOL", 1, "WOOL"),
  new Item("a sheepskin", 0, "sheepskin"),
  new Item("a BAG", 1, "BAG"),
  new Item("a RAG", 1, "RAG"),
  new Item("a sheephead", 0, "sheephead"),
  new Item("a SPADE", 1, "SPADE"),
  new Item("SULPHUR", 1, "SULPHUR"),
  new Item("a solid poison", 0, "solid poison"),
  new Item("a BUCKET", 1, "BUCKET"),
  new Item("TAR", 1, "TAR"),
  new Item("a liquid poison", 0, "liquid poison"),
  new Item("a dead dragon", 0, "dead dragon"),
  new Item("a STONE", 1, "STONE"),
  new Item("a FISH", 1, "FISH"),
  new Item("a KNIFE", 1, "KNIFE"),
  new Item("a DRAGONSKIN", 1, "DRAGONSKIN"),
  new Item("a dragonskin SHOES", 1, "SHOES"),
  new Item("a PRIZE", 1, "PRIZE"),
  new Item("a SHEEP", 1, "SHEEP"),
];

export function displayItem(array, name) {
  let item;
  array.forEach((element) => {
    if (element.name === name) {
      item = element;
    }
  });
  return item;
}
