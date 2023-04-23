export const gameData = {
  scale: 3,
  showHitBox: false,
  camera: {
    x: 0,
    y: 0,
  },
};

export const keys = {
  w: false,
  s: false,
  a: false,
  d: false,
  space: false,
  escape: false,
  mouse: {
    click: false,
    executeOnceFlag: false,
    x: 0,
    y: 0,
  },
};

export const variables = {
  characterGroups: {
    ally: "ally",
    enemy: "enemy",
  },
  tasks: {
    idle: "idle",
    chase: "chase",
    attack: "attack",
  },
};

export const spriteSheetData = {
  purpleKnight: {
    name: "Purple Knight",
    idle: {
      x: 0,
      y: 11,
      w: 16,
      h: 22,
      frames: 4,
    },
    run: {
      x: 64,
      y: 11,
      w: 16,
      h: 22,
      frames: 4,
    },
  },
  orcInMask: {
    name: "Orc in mask",
    idle: {
      x: 0,
      y: 1134,
      w: 16,
      h: 18,
      frames: 4,
    },
    run: {
      x: 64,
      y: 1134,
      w: 16,
      h: 18,
      frames: 4,
    },
  },
  skeleton: {
    name: "Skeleton",
    idle: {
      x: 0,
      y: 206,
      w: 16,
      h: 18,
      frames: 4,
    },
    run: {
      x: 64,
      y: 206,
      w: 16,
      h: 18,
      frames: 4,
    },
  },
  items: {
    weapons: {
      silverSword: {
        name: "Silver Sword",
        x: 195,
        y: 882,
        w: 10,
        h: 29,
      },
      heavyMace: {
        name: "Heavy Mace",
        x: 195,
        y: 823,
        w: 10,
        h: 24,
      },
      spear: {
        name: "Spear",
        x: 149,
        y: 945,
        w: 6,
        h: 30,
      },
    },
  },
};

export const weapons = {
  silverSword: {
    rotate180WhileHolding: false,
    sprite: spriteSheetData.items.weapons.silverSword,
    name: "Silver Sword",
    dmg: 10,
    attackSpeed: 5,
  },
  heavyMace: {
    rotate180WhileHolding: true,
    sprite: spriteSheetData.items.weapons.heavyMace,
    name: "Heavy Mace",
    dmg: 20,
    attackSpeed: 3,
  },
  spear: {
    rotate180WhileHolding: true,
    sprite: spriteSheetData.items.weapons.spear,
    name: "Spear",
    dmg: 20,
    attackSpeed: 3,
  },
};
