import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import {
  storybookLiveScore as mockScore,
  storybookLiveMeasurements as mockMeasurements,
  storybookLiveSeries as mockSeries,
} from '../../data';

import type { EnvironmentScore, LatestMeasurements, MeasurementSeries } from '../../measurement/measurementApi';
import { DeviceEnvironmentProvider } from '../../shared/device-environment/DeviceEnvironmentProvider';
import { LiveScreen } from './LiveScreen';




const meta = {
  title: 'screens/live/LiveScreen',
  component: LiveScreen,
  args: {
    compact: false,
  },
  render: (args) => (
    <DeviceEnvironmentProvider
      potId={1}
      fetchMeasurements={async () => mockMeasurements}
      fetchScore={async () => mockScore}
      fetchSeries={async (_potId, _metric, range) => ({ ...mockSeries, range })}
    >
      <LiveScreen {...args} />
    </DeviceEnvironmentProvider>
  ),
} satisfies Meta<typeof LiveScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
