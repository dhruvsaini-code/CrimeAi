import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TimelineData } from '../types';

interface TimelineChartProps {
  timelineData: TimelineData;
}

export const TimelineChart: React.FC<TimelineChartProps> = ({ timelineData }) => {
  const clusterColors = ['#ff4d5e', '#2ee6d0', '#b57bff', '#5bb8ff', '#ffc400'];

  return (
    <div className="bg-dark-panel border border-dark-line rounded-lg p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-dark-line mb-4 gap-2">
        <div>
          <h3 className="font-display font-bold text-xl text-crime-text tracking-wide">
            Historical Active Periods & Temporal Trends
          </h3>
          <p className="text-xs text-crime-muted font-mono mt-0.5">
            Active documented cases per decade, stacked by unsupervised cluster modality.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-dark-card border border-dark-line px-3 py-1.5 rounded font-mono text-xs">
          <span className="text-crime-muted">Peak Era:</span>
          <span className="text-crime-tape font-bold">{timelineData.peak_decade}</span>
          <span className="text-crime-muted">({timelineData.peak_case_count} cases)</span>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={timelineData.timeline_series}
            margin={{ top: 10, right: 20, left: -15, bottom: 0 }}
          >
            <defs>
              {clusterColors.map((col, idx) => (
                <linearGradient key={idx} id={`colorCluster${idx}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={col} stopOpacity={0.75} />
                  <stop offset="95%" stopColor={col} stopOpacity={0.08} />
                </linearGradient>
              ))}
            </defs>
            <XAxis
              dataKey="decade"
              stroke="#5c6272"
              fontSize={12}
              tickLine={false}
              fontFamily="IBM Plex Mono"
            />
            <YAxis
              stroke="#5c6272"
              fontSize={12}
              tickLine={false}
              fontFamily="IBM Plex Mono"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#07080c',
                border: '1px solid #232837',
                borderRadius: '6px',
                fontFamily: 'IBM Plex Mono',
                fontSize: '12px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
              }}
              labelStyle={{ color: '#ffc400', fontWeight: 'bold' }}
            />
            <Area
              type="monotone"
              dataKey="cluster_0"
              name="Cluster Alpha"
              stackId="1"
              stroke="#ff4d5e"
              fill="url(#colorCluster0)"
              strokeWidth={1.5}
            />
            <Area
              type="monotone"
              dataKey="cluster_1"
              name="Cluster Beta"
              stackId="1"
              stroke="#2ee6d0"
              fill="url(#colorCluster1)"
              strokeWidth={1.5}
            />
            <Area
              type="monotone"
              dataKey="cluster_2"
              name="Cluster Gamma"
              stackId="1"
              stroke="#b57bff"
              fill="url(#colorCluster2)"
              strokeWidth={1.5}
            />
            <Area
              type="monotone"
              dataKey="cluster_3"
              name="Cluster Delta"
              stackId="1"
              stroke="#5bb8ff"
              fill="url(#colorCluster3)"
              strokeWidth={1.5}
            />
            <Area
              type="monotone"
              dataKey="cluster_4"
              name="Cluster Epsilon"
              stackId="1"
              stroke="#ffc400"
              fill="url(#colorCluster4)"
              strokeWidth={1.5}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 mt-4 pt-3 border-t border-dark-line text-xs font-mono text-crime-muted">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#ff4d5e]" /> Alpha</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#2ee6d0]" /> Beta</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#b57bff]" /> Gamma</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#5bb8ff]" /> Delta</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#ffc400]" /> Epsilon</span>
      </div>
    </div>
  );
};

