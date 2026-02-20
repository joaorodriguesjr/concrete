const CONCRETE_MIXES = {
  high_strength: {
    id: 'high_strength',
    name: 'Slab / Pillar / Beam',
    proportions: { cement: 1, sand: 2, gravel: 3 },
    waterPerBag: 30
  },
  medium_strength: {
    id: 'medium_strength',
    name: 'Subfloor / Sidewalk',
    proportions: { cement: 1, sand: 3, gravel: 4 },
    waterPerBag: 35
  },
  foundation: {
    id: 'foundation',
    name: 'Foundation / Footing',
    proportions: { cement: 1, sand: 2.5, gravel: 4 },
    waterPerBag: 32
  }
};

const CONSTANTS = {
  CEMENT_BAG_WEIGHT_KG: 50,
  CAN_VOLUME_LITERS: 18,
  SHRINKAGE_FACTOR: 1.3
};
