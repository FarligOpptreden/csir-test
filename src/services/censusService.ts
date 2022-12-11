import ApiData from "@/interfaces/ApiData";
import NationData from "@/interfaces/NationData";
import StateData from "@/interfaces/StateData";
import { goFetch as F } from "@utils";
import endpoints from "./endpoints";

interface Cache {
  [key: string]: ApiData;
}

const _Cache: Cache = {};

export default {
  getNationData: async () => {
    if (_Cache["nation"]) return _Cache["nation"] as NationData[];

    const result = await F.goFetch(endpoints.dataUsaApi)
      .withQueryParameters({
        drilldowns: "Nation",
        measures: "Population",
      })
      .get();

    _Cache["nation"] = result.data as NationData[];

    return _Cache["nation"] as NationData[];
  },

  getStateData: async (year: number) => {
    const key = `nation-${year}`;

    if (_Cache[key]) return _Cache[key] as StateData[];

    const result = await F.goFetch(endpoints.dataUsaApi)
      .withQueryParameters({
        drilldowns: "State",
        measures: "Population",
        year,
      })
      .get();

    _Cache[key] = result.data as StateData[];

    return _Cache[key] as StateData[];
  },

  getAllData: async () => {
    if (_Cache["all"]) return _Cache["all"] as StateData[];

    const result = await F.goFetch(endpoints.dataUsaApi)
      .withQueryParameters({
        drilldowns: "State",
        measures: "Population",
      })
      .get();

    _Cache["all"] = result.data as StateData[];

    return _Cache["all"] as StateData[];
  },
};
