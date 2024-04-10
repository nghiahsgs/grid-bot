export interface OrderItem {
  id: number;
  coin_name: string;
  current_price: number;
  amount: number;
  entry_price: number;
  entry_volume: number;
  is_run_entry: number;
  dca_price_1: number;
  dca_volume_1: number;
  is_run_dca_1: number;
  dca_price_2: number;
  dca_volume_2: number;
  is_run_dca_2: number;
  dca_price_3: number;
  dca_volume_3: number;
  is_run_dca_3: number;
  take_profit: number;
  is_run_take_profit: number;
  stop_loss: number;
  is_run_stop_loss: number;
  pnl: number;
  created_at: string;
  updated_at: string;
}

export interface CreateOrder {
  coin_name: string;
  candle_stick: string;
  entry_dropout_min_percent: number;
  dca_min_percent: number;
  dca_volume: number;
  numbers_of_orders: number;
  auto_create_next_order: boolean;
}
