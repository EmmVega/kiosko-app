import { create } from 'zustand';
import { OrderItem } from './types';
import { Product } from '@prisma/client';

interface Store {
 order: OrderItem[]
 addToCard: (product: Product) => void,
 increaseQuantity: (id: Product['id']) => void,
 decreaseQuantity: (id: Product['id']) => void,
 removeItem: (id: Product['id']) => void,
 clearOrder: () => void
}

export const useStore = create<Store>((set, get) => ({
    order: [],
    addToCard: (product: Product) => {
        console.log('Agregando', product);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {categoryId, image, ...data} = product;

        let order: OrderItem[] = [];

        const existingProduct = get().order.find(item => item.id === product.id);

        if(existingProduct) {
            order = get().order.map(item => item.id === product.id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item )
        } else {
            order = [...get().order, {
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]
        }

        set(() => ({
            order
        }))
    },
    increaseQuantity(id) {
        set((state) => ({
            order: state.order.map(item => item.id === id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item )
        }))
    },
    decreaseQuantity(id) {
        const existingProduct = get().order.find(item => item.id === id);
        let order = get().order;

        if(!existingProduct) return
        if (existingProduct.quantity === 1) order = order.filter(item => item.id !== id);
        else if (existingProduct.quantity > 1) {
            order = order.map(item => item.id === id ? {
                ...item,
                quantity: item.quantity - 1,
                subtotal: item.price * (item.quantity - 1)
                }
                : item 
            )
        }

        set(() => ({
            order
            })
        )
    },
    removeItem(id) {
        set({
            order: get().order.filter(item => item.id !== id)
        })
    },
    clearOrder () {
        set(() => ({
            order: []
        }))
    }
}))