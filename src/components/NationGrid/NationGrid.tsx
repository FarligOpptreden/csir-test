import { useEffect, useState } from "react";
import { TreeTable, TreeTableEventParams } from "primereact/treetable";
import { Column } from "primereact/column";
import TreeNode from "primereact/treenode";
import { censusService } from "@services";
import "./_styles.scss";
import { publish } from "@hooks";
import TreeNodeData from "@/interfaces/TreeNodeData";
import { StateTopics } from "@utils";
import ApiData from "@/interfaces/ApiData";

export default function NationGrid({}) {
  const [nodes, setNodes] = useState<TreeNode[]>([]);
  const [loadingGrid, setLoadingGrid] = useState(false);
  const [loadingNode, setLoadingNode] = useState(false);
  const [selectedNode, setSelectedNode] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoadingGrid(true);

      const data = await censusService.getNationData();
      const numberFormatter = new Intl.NumberFormat("en-US");
      const nationNodes: {
        [key: string]: {
          children: TreeNode[];
          nation: string;
          apiData: ApiData;
        };
      } = {};

      data.forEach((d) => {
        if (!nationNodes[d["Slug Nation"]])
          nationNodes[d["Slug Nation"]] = {
            nation: d.Nation,
            apiData: d,
            children: [],
          };

        nationNodes[d["Slug Nation"]].children.push({
          key: `nation-node-${d["Slug Nation"]}-${d["ID Year"]}`,
          data: {
            type: "year",
            text: d.Year,
            population: numberFormatter.format(d.Population),
            apiData: d,
          },
          leaf: false,
        });
      });

      setNodes(
        Object.keys(nationNodes).map((key) => {
          const nation = nationNodes[key];

          return {
            key: `nation-node-${key}`,
            data: {
              type: "nation",
              text: nation.nation,
              population: "",
              apiData: nation.apiData,
            },
            children: nation.children,
          };
        })
      );
      setLoadingGrid(false);
    };

    loadData();
  }, []);

  const handleExpand = async (e: TreeTableEventParams) => {
    if (e.node.children) return;

    const lazyNode = { ...e.node };

    setLoadingNode(true);

    const data = await censusService.getStateData(e.node.data.text);
    const numberFormatter = new Intl.NumberFormat("en-US");

    lazyNode.children = data.map((d) => ({
      key: `state-node-${d["Slug State"]}=${d["ID Year"]}`,
      data: {
        type: "state",
        text: d.State,
        population: numberFormatter.format(d.Population),
        apiData: d,
      },
    }));

    const recursiveMap = (node: TreeNode) => {
      node.children = node.children?.map((child) => {
        if (child.key === e.node.key) child = lazyNode;

        return recursiveMap(child);
      });

      return node;
    };

    setNodes(nodes.map((node) => recursiveMap(node)));
    setLoadingNode(false);
  };

  const handleSelect = (e: TreeTableEventParams) => {
    setSelectedNode(`${e.node.key}`);
    publish<TreeNodeData>(StateTopics.TreeNodeSelect, e.node.data);
  };

  return (
    <TreeTable
      value={nodes}
      onExpand={handleExpand}
      onSelect={handleSelect}
      loading={loadingNode}
      selectionMode="single"
      lazy
      className="nation-grid"
      rowClassName={(node) => ({ "p-highlight": node.key === selectedNode })}
    >
      <Column
        field="text"
        header=""
        headerClassName="region-col-header"
        bodyClassName="region-col-body"
        expander
      />
      <Column
        field="population"
        headerClassName="pop-col-header"
        bodyClassName="pop-col-body"
        header="Population"
      />
    </TreeTable>
  );
}
