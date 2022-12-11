import ApiData from "./ApiData";

export default interface NationData extends ApiData {
  "ID Nation": string;
  Nation: string;
  "ID Year": number;
  Year: string;
  Population: number;
  "Slug Nation": string;
}
