import { View, Text } from 'react-native';
import { OrderStatus } from '@/types';

const STATUS_STYLE: Record<OrderStatus, { container: string; text: string }> = {
  pending:          { container: 'bg-amber-100',   text: 'text-amber-700' },
  confirmed:        { container: 'bg-blue-100',    text: 'text-blue-700'  },
  picked_up:        { container: 'bg-purple-100',  text: 'text-purple-700'},
  processing:       { container: 'bg-primary-50',  text: 'text-primary-600'},
  ready:            { container: 'bg-teal-100',    text: 'text-teal-700'  },
  out_for_delivery: { container: 'bg-orange-100',  text: 'text-orange-700'},
  completed:        { container: 'bg-green-100',   text: 'text-green-700' },
  cancelled:        { container: 'bg-gray-100',    text: 'text-gray-500'  },
};

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending:          'Pending',
  confirmed:        'Confirmed',
  picked_up:        'Picked Up',
  processing:       'Processing',
  ready:            'Ready',
  out_for_delivery: 'Out for Delivery',
  completed:        'Completed',
  cancelled:        'Cancelled',
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  const s = STATUS_STYLE[status];
  return (
    <View className={`self-start px-3 py-1 rounded-full ${s.container}`}>
      <Text className={`text-xs font-semibold ${s.text}`}>
        {STATUS_LABEL[status]}
      </Text>
    </View>
  );
}
