export type QuantityType = 'unit' | 'weight' | 'liquid'

export interface GroceryItemDef {
  key: string
  name: string
  emoji: string
  category: string
  quantityType: QuantityType
}

export interface HomeTaskDef {
  key: string
  name: string
  emoji: string
  category: string
  frequency: 'daily' | 'weekly'
  order: number
}

export const GROCERY_CATEGORIES = [
  { key: 'verduras', name: 'Verduras', emoji: '🥦' },
  { key: 'frutas', name: 'Frutas', emoji: '🍎' },
  { key: 'carnes', name: 'Carnes', emoji: '🥩' },
  { key: 'lacteos', name: 'Lácteos', emoji: '🥛' },
  { key: 'fiambres', name: 'Fiambres', emoji: '🥓' },
  { key: 'almacen', name: 'Almacén', emoji: '🍝' },
  { key: 'bebidas', name: 'Bebidas', emoji: '🥤' },
  { key: 'limpieza', name: 'Limpieza', emoji: '🧴' },
  { key: 'mascotas', name: 'Mascotas', emoji: '🐾' },
]

export const GROCERY_ITEMS: GroceryItemDef[] = [
  // Verduras
  { key: 'zanahoria', name: 'Zanahoria', emoji: '🥕', category: 'verduras', quantityType: 'weight' },
  { key: 'tomate', name: 'Tomate', emoji: '🍅', category: 'verduras', quantityType: 'weight' },
  { key: 'cebolla', name: 'Cebolla', emoji: '🧅', category: 'verduras', quantityType: 'weight' },
  { key: 'ajo', name: 'Ajo', emoji: '🧄', category: 'verduras', quantityType: 'unit' },
  { key: 'lechuga', name: 'Lechuga', emoji: '🥬', category: 'verduras', quantityType: 'unit' },
  { key: 'brocoli', name: 'Brócoli', emoji: '🥦', category: 'verduras', quantityType: 'unit' },
  { key: 'pimiento', name: 'Morrón', emoji: '🫑', category: 'verduras', quantityType: 'unit' },
  { key: 'pepino', name: 'Pepino', emoji: '🥒', category: 'verduras', quantityType: 'unit' },
  { key: 'papa', name: 'Papa', emoji: '🥔', category: 'verduras', quantityType: 'weight' },
  { key: 'choclo', name: 'Choclo', emoji: '🌽', category: 'verduras', quantityType: 'unit' },
  { key: 'palta', name: 'Palta', emoji: '🥑', category: 'verduras', quantityType: 'unit' },
  { key: 'espinaca', name: 'Espinaca', emoji: '🌿', category: 'verduras', quantityType: 'weight' },
  // Frutas
  { key: 'limon', name: 'Limón', emoji: '🍋', category: 'frutas', quantityType: 'unit' },
  { key: 'naranja', name: 'Naranja', emoji: '🍊', category: 'frutas', quantityType: 'unit' },
  { key: 'banana', name: 'Banana', emoji: '🍌', category: 'frutas', quantityType: 'unit' },
  { key: 'manzana', name: 'Manzana', emoji: '🍎', category: 'frutas', quantityType: 'weight' },
  { key: 'uva', name: 'Uvas', emoji: '🍇', category: 'frutas', quantityType: 'weight' },
  { key: 'frutilla', name: 'Frutillas', emoji: '🍓', category: 'frutas', quantityType: 'weight' },
  { key: 'arandano', name: 'Arándanos', emoji: '🫐', category: 'frutas', quantityType: 'weight' },
  { key: 'pera', name: 'Pera', emoji: '🍐', category: 'frutas', quantityType: 'unit' },
  // Carnes
  { key: 'carne', name: 'Carne', emoji: '🥩', category: 'carnes', quantityType: 'weight' },
  { key: 'pollo', name: 'Pollo', emoji: '🍗', category: 'carnes', quantityType: 'weight' },
  { key: 'pescado', name: 'Pescado', emoji: '🐟', category: 'carnes', quantityType: 'weight' },
  { key: 'cerdo', name: 'Cerdo', emoji: '🐷', category: 'carnes', quantityType: 'weight' },
  { key: 'chorizo', name: 'Chorizo', emoji: '🌭', category: 'carnes', quantityType: 'unit' },
  { key: 'langostinos', name: 'Langostinos', emoji: '🦐', category: 'carnes', quantityType: 'weight' },
  // Lácteos
  { key: 'leche', name: 'Leche', emoji: '🥛', category: 'lacteos', quantityType: 'liquid' },
  { key: 'huevos', name: 'Huevos', emoji: '🥚', category: 'lacteos', quantityType: 'unit' },
  { key: 'queso', name: 'Queso', emoji: '🧀', category: 'lacteos', quantityType: 'weight' },
  { key: 'manteca', name: 'Manteca', emoji: '🧈', category: 'lacteos', quantityType: 'unit' },
  { key: 'yogur', name: 'Yogur', emoji: '🫙', category: 'lacteos', quantityType: 'unit' },
  { key: 'crema', name: 'Crema', emoji: '🍦', category: 'lacteos', quantityType: 'unit' },
  // Fiambres
  { key: 'jamon', name: 'Jamón', emoji: '🥓', category: 'fiambres', quantityType: 'weight' },
  { key: 'salame', name: 'Salame', emoji: '🍕', category: 'fiambres', quantityType: 'weight' },
  { key: 'mortadela', name: 'Mortadela', emoji: '🍖', category: 'fiambres', quantityType: 'weight' },
  { key: 'paleta', name: 'Paleta', emoji: '🫓', category: 'fiambres', quantityType: 'weight' },
  // Almacén
  { key: 'pan', name: 'Pan', emoji: '🍞', category: 'almacen', quantityType: 'unit' },
  { key: 'arroz', name: 'Arroz', emoji: '🍚', category: 'almacen', quantityType: 'weight' },
  { key: 'fideos', name: 'Fideos', emoji: '🍝', category: 'almacen', quantityType: 'weight' },
  { key: 'aceite', name: 'Aceite', emoji: '🫒', category: 'almacen', quantityType: 'liquid' },
  { key: 'sal', name: 'Sal', emoji: '🧂', category: 'almacen', quantityType: 'unit' },
  { key: 'cafe', name: 'Café', emoji: '☕', category: 'almacen', quantityType: 'unit' },
  { key: 'te', name: 'Té', emoji: '🍵', category: 'almacen', quantityType: 'unit' },
  { key: 'azucar', name: 'Azúcar', emoji: '🍬', category: 'almacen', quantityType: 'weight' },
  { key: 'harina', name: 'Harina', emoji: '🌾', category: 'almacen', quantityType: 'weight' },
  { key: 'galletitas', name: 'Galletitas', emoji: '🍪', category: 'almacen', quantityType: 'unit' },
  { key: 'mermelada', name: 'Mermelada', emoji: '🍯', category: 'almacen', quantityType: 'unit' },
  { key: 'pure', name: 'Puré', emoji: '🥣', category: 'almacen', quantityType: 'unit' },
  // Bebidas
  { key: 'agua', name: 'Agua', emoji: '💧', category: 'bebidas', quantityType: 'liquid' },
  { key: 'gaseosa', name: 'Gaseosa', emoji: '🥤', category: 'bebidas', quantityType: 'liquid' },
  { key: 'jugo', name: 'Jugo', emoji: '🧃', category: 'bebidas', quantityType: 'liquid' },
  { key: 'cerveza', name: 'Cerveza', emoji: '🍺', category: 'bebidas', quantityType: 'unit' },
  { key: 'vino', name: 'Vino', emoji: '🍷', category: 'bebidas', quantityType: 'unit' },
  // Limpieza
  { key: 'jabon_liquido', name: 'Jabón Líquido', emoji: '🧴', category: 'limpieza', quantityType: 'unit' },
  { key: 'papel', name: 'Papel Higiénico', emoji: '🧻', category: 'limpieza', quantityType: 'unit' },
  { key: 'esponja', name: 'Esponja', emoji: '🧽', category: 'limpieza', quantityType: 'unit' },
  { key: 'detergente', name: 'Detergente', emoji: '🫧', category: 'limpieza', quantityType: 'unit' },
  { key: 'lavandina', name: 'Lavandina', emoji: '🧪', category: 'limpieza', quantityType: 'liquid' },
  { key: 'shampoo', name: 'Shampoo', emoji: '💆', category: 'limpieza', quantityType: 'unit' },
  { key: 'suavizante', name: 'Suavizante', emoji: '🌸', category: 'limpieza', quantityType: 'liquid' },
  // Mascotas
  { key: 'comida_gatos', name: 'Comida Gatas', emoji: '🐱', category: 'mascotas', quantityType: 'weight' },
  { key: 'comida_perro', name: 'Comida Compota', emoji: '🐕', category: 'mascotas', quantityType: 'weight' },
  { key: 'arena_gatos', name: 'Arena Gatas', emoji: '📦', category: 'mascotas', quantityType: 'unit' },
]

export const QUANTITY_OPTIONS: Record<QuantityType, string[]> = {
  unit: ['1U', '2U', '3U', '4U', '6U', '8U', '12U', '24U'],
  weight: ['1/4K', '1/2K', '1K', '1.5K', '2K', '3K'],
  liquid: ['1/4L', '1/2L', '1L', '1.5L', '2L', '4L'],
}

export const HOME_TASK_CATEGORIES = [
  { key: 'mascotas', name: 'Mascotas', emoji: '🐾' },
  { key: 'limpieza', name: 'Limpieza', emoji: '🧹' },
  { key: 'general', name: 'General', emoji: '🏠' },
]

export const HOME_TASKS_DEF: HomeTaskDef[] = [
  { key: 'desayuno_gatas', name: 'Desayuno gatas', emoji: '🌅', category: 'mascotas', frequency: 'daily', order: 1 },
  { key: 'merienda_gatas', name: 'Merienda gatas', emoji: '☕', category: 'mascotas', frequency: 'daily', order: 2 },
  { key: 'cena_gatas', name: 'Cena gatas', emoji: '🌙', category: 'mascotas', frequency: 'daily', order: 3 },
  { key: 'desayuno_compota', name: 'Desayuno Compota', emoji: '🌅', category: 'mascotas', frequency: 'daily', order: 4 },
  { key: 'cena_compota', name: 'Cena Compota', emoji: '🌙', category: 'mascotas', frequency: 'daily', order: 5 },
  { key: 'limpiar_arenero', name: 'Limpiar arenero', emoji: '🪣', category: 'mascotas', frequency: 'daily', order: 6 },
  { key: 'barrer', name: 'Barrer', emoji: '🧹', category: 'limpieza', frequency: 'weekly', order: 7 },
  { key: 'lavar_pisos', name: 'Lavar pisos', emoji: '🪣', category: 'limpieza', frequency: 'weekly', order: 8 },
  { key: 'lavar_ropa', name: 'Lavar ropa', emoji: '👕', category: 'limpieza', frequency: 'weekly', order: 9 },
  { key: 'limpiar_bano', name: 'Limpiar baño', emoji: '🚿', category: 'limpieza', frequency: 'weekly', order: 10 },
  { key: 'limpiar_cocina', name: 'Limpiar cocina', emoji: '🍳', category: 'limpieza', frequency: 'weekly', order: 11 },
  { key: 'sacar_basura', name: 'Sacar basura', emoji: '🗑️', category: 'general', frequency: 'daily', order: 12 },
]

export const USER_COLORS = [
  { color: '#60a5fa', bg: 'bg-blue-400' },
  { color: '#f472b6', bg: 'bg-pink-400' },
]

export function getTodayString() {
  return new Date().toISOString().split('T')[0]
}

export function getWeekString() {
  const d = new Date()
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(d.setDate(diff))
  return monday.toISOString().split('T')[0]
}
