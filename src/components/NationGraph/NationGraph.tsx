import { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import TreeNodeData from "@/interfaces/TreeNodeData";
import { asyncify, StateTopics } from "@utils";
import { useStateReducer, useSubscription } from "@hooks";
import "./_styles.scss";
import { censusService } from "@services";

interface State {
  labels?: string[] | undefined;
  data?: number[] | undefined;
  loading?: boolean | undefined;
}

function NationOverview({ nation }: { nation: string }) {
  const [state, setState] = useStateReducer<State>({
    labels: [],
    data: [],
    loading: false,
  });
  const { labels, data, loading } = state;

  useEffect(() => {
    const loadData = async () => {
      setState({ loading: true });

      const results = await censusService.getNationData();
      const _data: number[] = [];
      const _labels: string[] = [];

      for (let i = results.length - 1; i >= 0; i--) {
        const r = results[i];
        _data.push(r.Population);
        _labels.push(r.Year);
      }

      await asyncify(
        () =>
          setState({
            data: _data,
            labels: _labels,
            loading: false,
          }),
        10
      );
    };

    loadData();
  }, [nation]);

  useEffect(() => {
    console.log(state);
  }, [state]);

  if (loading)
    return (
      <p className="loading">
        <i className="pi pi-spinner pi-spin" />
      </p>
    );

  return (
    <>
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
    </>
  );
}

function YearOverview({ year }: { year: string }) {
  const [state, setState] = useStateReducer<State>({
    labels: [],
    data: [],
    loading: false,
  });
  const { labels, data, loading } = state;

  useEffect(() => {
    const loadData = async () => {
      setState({ loading: true });

      const results = await censusService.getStateData(parseInt(year, 10));
      const _data: number[] = [];
      const _labels: string[] = [];

      for (let i = 0; i < results.length; i++) {
        const r = results[i];
        _data.push(r.Population);
        _labels.push(r.State);
      }

      await asyncify(
        () =>
          setState({
            data: _data,
            labels: _labels,
            loading: false,
          }),
        10
      );
    };

    loadData();
  }, [year]);

  if (loading)
    return (
      <p className="loading">
        <i className="pi pi-spinner pi-spin" />
      </p>
    );

  return (
    <>
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
    </>
  );
}

function StateOverview({ nationState }: { nationState: string }) {
  const [state, setState] = useStateReducer<State>({
    labels: [],
    data: [],
    loading: false,
  });
  const { labels, data, loading } = state;

  useEffect(() => {
    const loadData = async () => {
      setState({ loading: true });

      const results = await censusService.getAllData();
      const _data: number[] = [];
      const _labels: string[] = [];

      for (let i = results.length - 1; i >= 0; i--) {
        const r = results[i];

        if (r.State !== nationState) continue;

        _data.push(r.Population);
        _labels.push(r.Year);
      }

      await asyncify(
        () =>
          setState({
            data: _data,
            labels: _labels,
            loading: false,
          }),
        10
      );
    };

    loadData();
  }, [nationState]);

  if (loading)
    return (
      <p className="loading">
        <i className="pi pi-spinner pi-spin" />
      </p>
    );

  return (
    <>
      <h1>Population for {nationState}</h1>
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
    </>
  );
}

export default function NationGraph({}) {
  const [selectedNode, setSelectedNode] = useState<TreeNodeData | null>(null);

  useSubscription<TreeNodeData>(StateTopics.TreeNodeSelect, setSelectedNode);

  return (
    <div className="graph" key={`graph-${selectedNode?.text}`}>
      {selectedNode?.type === "nation" && (
        <NationOverview nation={selectedNode.text} />
      )}
      {selectedNode?.type === "year" && (
        <YearOverview year={selectedNode.text} />
      )}
      {selectedNode?.type === "state" && (
        <StateOverview nationState={selectedNode.text} />
      )}
    </div>
  );
}
