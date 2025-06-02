export interface TCGDexCard {
  category: string;
  id: string;
  illustrator?: string;
  image: string;
  localId: string;
  name: string;
  rarity?: string;
  set: {
    cardCount: {
      official: number;
      total: number;
    };
    id: string;
    logo: string;
    name: string;
    symbol: string;
  };
  variants?: {
    firstEdition?: boolean;
    holo?: boolean;
    normal?: boolean;
    reverse?: boolean;
    wPromo?: boolean;
  };
  dexId?: number[];
  hp?: number;
  types?: string[];
  evolveFrom?: string;
  description?: string;
  stage?: string;
  attacks?: Array<{
    cost: string[];
    name: string;
    effect?: string;
    damage?: number | string;
  }>;
  weaknesses?: Array<{
    type: string;
    value: string;
  }>;
  retreat?: number;
  regulationMark?: string;
  legal?: {
    standard: boolean;
    expanded: boolean;
  };
  updated?: string;
}

export interface TCGDexSet {
  id: string;
  name: string;
  abbreviation?: {
    official?: string;
  };
  cardCount: {
    firstEd?: number;
    holo?: number;
    normal?: number;
    official: number;
    reverse?: number;
    total: number;
  };
  cards: Array<{
    id: string;
    localId: string;
    name: string;
    image: string;
  }>;
  legal: {
    expanded: boolean;
    standard: boolean;
  };
  logo: string;
  releaseDate: string;
  serie: {
    id: string;
    name: string;
  };
  symbol: string;
  tcgOnline?: string;
}