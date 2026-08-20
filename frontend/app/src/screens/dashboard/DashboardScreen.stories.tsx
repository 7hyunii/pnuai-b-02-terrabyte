import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { fn } from 'storybook/test';
import {
  storybookDashboardScore as mockScore,
  storybookDashboardMeasurements as mockMeasurements,
  storybookDashboardSeries as mockSeries,
} from '../../data';

import type { EnvironmentScore, LatestMeasurements, MeasurementSeries } from '../../measurement/measurementApi';
import { DeviceEnvironmentProvider } from '../../shared/device-environment/DeviceEnvironmentProvider';
import { DashboardScreen } from './DashboardScreen';




const meta = {
  title: 'screens/dashboard/DashboardScreen',
  component: DashboardScreen,
  args: {
    compact: false,
    onNavigate: fn(),
    selectedCrop: 0,
  },
  render: (args) => (
    <DeviceEnvironmentProvider
      potId={1}
      fetchMeasurements={async () => mockMeasurements}
      fetchScore={async () => mockScore}
      fetchSeries={async (_potId, _metric, range) => ({ ...mockSeries, range })}
    >
      <DashboardScreen {...args} />
    </DeviceEnvironmentProvider>
  ),
} satisfies Meta<typeof DashboardScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutSoilProbe: Story = {
  render: (args) => (
    <DeviceEnvironmentProvider
      potId={1}
      fetchMeasurements={async () => ({
        ...mockMeasurements,
        measurements: { ...mockMeasurements.measurements, soilTemperatureC: null },
      })}
      fetchScore={async () => mockScore}
      fetchSeries={async (_potId, _metric, range) => ({ ...mockSeries, range, points: [] })}
    >
      <DashboardScreen {...args} />
    </DeviceEnvironmentProvider>
  ),
};
