export const validTargetTypes = ['ALL', 'FEMALE', 'MALE', 'TEEN'] as const;
export const validRankTypes = ['MANY_WISH', 'MANY_RECEIVE', 'MANY_WISH_RECEIVE'] as const;

export type TargetType = (typeof validTargetTypes)[number];
export type RankTypes = (typeof validRankTypes)[number];

function createTypeValidation<T extends readonly string[]>(validValues: T) {
  return function (value: string): value is T[number] {
    return (validValues as readonly string[]).includes(value);
  };
}

export const isValidTargetType = createTypeValidation(validTargetTypes);
export const isValidRankType = createTypeValidation(validRankTypes);

export type RankingFilterOption = {
  targetType: TargetType;
  rankType: RankTypes;
};

export type GoodsData = {
  id: number;
  name: string;
  imageURL: string;
  wish: {
    wishCount: number;
    isWished: boolean;
  };
  price: {
    basicPrice: number;
    discountRate: number;
    sellingPrice: number;
  };
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
};