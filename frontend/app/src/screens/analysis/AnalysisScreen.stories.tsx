import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { fn } from 'storybook/test';
import {
  storybookAnalysisScore as mockScore,
  storybookAnalysisMeasurements as mockMeasurements,
} from '../../data';

import type { EnvironmentScore, LatestMeasurements } from '../../measurement/measurementApi';
import { DeviceEnvironmentProvider } from '../../shared/device-environment/DeviceEnvironmentProvider';
import { AnalysisScreen } from './AnalysisScreen';



const meta = {
  title: 'screens/analysis/AnalysisScreen',
  component: AnalysisScreen,
  args: {
    compact: false,
    onNavigate: fn(),
    onSelectCrop: fn(async () => {}),
    selectedCrop: 0,
  },
  render: (args) => (
    <DeviceEnvironmentProvider
      potId={1}
      fetchMeasurements={async () => mockMeasurements}
      fetchScore={async () => mockScore}
    >
      <AnalysisScreen {...args} />
    </DeviceEnvironmentProvider>
  ),
} satisfies Meta<typeof AnalysisScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
