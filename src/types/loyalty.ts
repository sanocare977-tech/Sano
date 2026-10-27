export interface PointsTransaction {
  id: string;
  date: string;
  points: number; // positive for earned, negative for redeemed
  reason: string;
  orderId?: string;
}

export interface LoyaltyProfile {
  passNumber: string;
  totalPoints: number;
  tier: 'Seedling' | 'Sprout' | 'Bloom';
  history: PointsTransaction[];
}

export const INITIAL_LOYALTY_PROFILE: LoyaltyProfile = {
  passNumber: 'SANO-PASS-8841',
  totalPoints: 50, // Welcome gift of 50 bonus points
  tier: 'Seedling',
  history: [
    {
      id: 'tx-welcome',
      date: new Date().toISOString(),
      points: 50,
      reason: 'Welcome bonus for shopping on sano.'
    }
  ]
};
