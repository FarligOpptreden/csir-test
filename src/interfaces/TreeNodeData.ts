import ApiData from "./ApiData";

export default interface TreeNodeData {
  type: "nation" | "year" | "state";
  text: string;
  population: string;
  apiData: ApiData;
}
