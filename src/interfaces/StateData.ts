import ApiData from "./ApiData";

export default interface StateData extends ApiData {
  "ID State": string;
  State: string;
  "ID Year": number;
  Year: string;
  Population: number;
  "Slug State": string;
}
