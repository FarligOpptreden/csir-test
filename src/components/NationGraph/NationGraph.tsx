import { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import TreeNodeData from "@/interfaces/TreeNodeData";
import { StateTopics } from "@utils";
import { useSubscription } from "@hooks";
import "./_styles.scss";
import { censusService } from "@services";

function NationOverview({ nation }: { nation: string }) {
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const results = await censusService.getNationData();
      const _data: number[] = [];
      const _labels: string[] = [];

      for (let i = results.length - 1; i >= 0; i--) {
        const r = results[i];
        _data.push(r.Population);
        _labels.push(r.Year);
      }

      setData(_data);
      setLabels(_labels);
    };

    loadData();
  }, [nation]);

  return (
    <div className="graph">
      <h1>Population for {nation}</h1>
      <Chart
        type="line"
        data={{
          labels,
          datasets: [
            {
              data,
              fill: true,
              tension: 0.5,
            },
          ],
        }}
        options={{
          aspectRatio: 1,
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}

function YearOverview({ year }: { year: string }) {
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const results = await censusService.getStateData(parseInt(year, 10));
      const _data: number[] = [];
      const _labels: string[] = [];

      for (let i = 0; i < results.length; i++) {
        const r = results[i];
        _data.push(r.Population);
        _labels.push(r.State);
      }

      setData(_data);
      setLabels(_labels);
    };

    loadData();
  }, [year]);

  return (
    <div className="graph">
      <h1>Population for {year}</h1>
      <Chart
        type="bar"
        data={{
          labels,
          datasets: [
            {
              label: year,
              data,
            },
          ],
        }}
        options={{
          indexAxis: "y",
          aspectRatio: 0.3,
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}

function StateOverview({ state }: { state: string }) {
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const results = await censusService.getAllData();
      const _data: number[] = [];
      const _labels: string[] = [];

      for (let i = results.length - 1; i >= 0; i--) {
        const r = results[i];

        if (r.State !== state) continue;

        _data.push(r.Population);
        _labels.push(r.Year);
      }

      setData(_data);
      setLabels(_labels);
    };

    loadData();
  }, [state]);

  return (
    <div className="graph">
      <h1>Population for {state}</h1>
      <Chart
        type="line"
        data={{
          labels,
          datasets: [
            {
              data,
              fill: true,
              tension: 0.5,
            },
          ],
        }}
        options={{
          aspectRatio: 1,
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}

export default function NationGraph({}) {
  const [selectedNode, setSelectedNode] = useState<TreeNodeData | null>(null);

  useSubscription<TreeNodeData>(StateTopics.TreeNodeSelect, setSelectedNode);

  return (
    <>
      {selectedNode?.type === "nation" && (
        <NationOverview nation={selectedNode.text} />
      )}
      {selectedNode?.type === "year" && (
        <YearOverview year={selectedNode.text} />
      )}
      {selectedNode?.type === "state" && (
        <StateOverview state={selectedNode.text} />
      )}
    </>
  );
}
