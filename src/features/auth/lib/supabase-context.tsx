export interface Profile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  daily_goal: NutrientTargets
  created_at?: string
  updated_at?: string
}

export interface NutrientTargets {
  calories: number
  protein: number
  fat: number
  carbs: number
}