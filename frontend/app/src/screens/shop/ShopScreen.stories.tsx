import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import {
  shopProducts,
  storybookShopScore as mockScore,
  storybookShopMeasurements as mockMeasurements,
} from '../../data';

import type { EnvironmentScore, LatestMeasurements } from '../../measurement/measurementApi';
import { DeviceEnvironmentProvider } from '../../shared/device-environment/DeviceEnvironmentProvider';
import { ShopScreen } from './ShopScreen';



const meta = {
  title: 'screens/shop/ShopScreen',
  component: ShopScreen,
  args: {
    compact: false,
    fetchProducts: async () => shopProducts,
  },
  render: (args) => (
    <DeviceEnvironmentProvider
      potId={1}
      fetchMeasurements={async () => mockMeasurements}
      fetchScore={async () => mockScore}
    >
      <ShopScreen {...args} />
    </DeviceEnvironmentProvider>
  ),
} satisfies Meta<typeof ShopScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
