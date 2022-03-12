export interface Attribute {
  accessoriesType: string;
  clotheColor: string;
  clotheType: string;
  eyeBrowType: string;
  eyeType: string;
  facialHairColor: string;
  facialHairType: string;
  graphicType: string;
  hairColor: string;
  hatColor: string;
  mouthType: string;
  skinColor: string;
  topType: string;
}

export interface Punk {
  dna: string;
  image: string;
  name: string;
  owner: string;
  tokenId: number;
  tokenURI: string;
  attributes: Attribute;
}
