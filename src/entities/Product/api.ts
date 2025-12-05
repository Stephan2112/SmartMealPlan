import { supabase } from '@/shared/api/supabase'
import { Product } from './types'

export async function fetchProducts(): Promise<Product[]> {
  if (!supabase) return getMockProducts()
  try {
    const { data, error } = await supabase.from('products').select('*')
    if (error) {
      console.warn('Supabase error, falling back to mock data', error.message)
      return getMockProducts()
    }
    return (data as Product[]) ?? getMockProducts()
  } catch (error) {
    console.warn('Supabase request failed, using mock data instead', error)
    return getMockProducts()
  }
}

export function getMockProducts(): Product[] {
  return [
    {
      id: '1',
      name: 'Овсяная каша с ягодами',
      description: 'Сытный завтрак с клетчаткой и витаминами',
      image_url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
      price: 190,
      nutrients: { calories: 420, protein: 18, fat: 12, carbs: 62 },
      meal_type: 'breakfast',
      source: 'samokat',
      external_url: 'https://www.samokat.ru',
    },
    {
      id: '2',
      name: 'Куриная грудка с киноа',
      description: 'Ланч с высоким содержанием белка',
      image_url: 'https://images.unsplash.com/photo-1604908177421-42f9c93de862',
      price: 340,
      nutrients: { calories: 520, protein: 45, fat: 14, carbs: 50 },
      meal_type: 'lunch',
      source: 'yandex_lavka',
      external_url: 'https://www.lavka.yandex.ru',
    },
    {
      id: '3',
      name: 'Лосось с овощами',
      description: 'Ужин с полезными омега-3',
      image_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
      price: 410,
      nutrients: { calories: 560, protein: 42, fat: 28, carbs: 30 },
      meal_type: 'dinner',
      source: 'internal',
      external_url: 'https://smartmeal.plan/order',
    },
    {
      id: '4',
      name: 'Греческий йогурт с орехами',
      description: 'Быстрый перекус',
      image_url: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187',
      price: 130,
      nutrients: { calories: 210, protein: 16, fat: 9, carbs: 18 },
      meal_type: 'snack',
      source: 'internal',
      external_url: 'https://smartmeal.plan/order',
    },
  ]
}