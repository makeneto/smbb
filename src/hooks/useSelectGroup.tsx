"use client"

import useSWR from "swr"
import { useMemo, useState } from "react"
import type { Product } from "@/data/products"

const fetcher = async (url: string) => {
  const response = await fetch(url)
  const body = await response.json().catch(() => null)
  if (!response.ok) throw new Error(body?.error ?? "Não foi possível carregar os produtos")
  return body as Product[]
}

export default function useSelectGroup({ searchQuery }: { searchQuery: string }) {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
  const { data: products = [], error, isLoading } = useSWR<Product[]>("/api/products", fetcher)
  const normalizedSearchQuery = searchQuery.trim().toLocaleLowerCase()
  const visibleProducts = useMemo(() => products.filter((product) => {
    const matchesGroup = !selectedGroup || product.groupType === selectedGroup
    const searchableText = `${product.name} ${product.brand} ${product.groupType}`.toLocaleLowerCase()
    return matchesGroup && searchableText.includes(normalizedSearchQuery)
  }), [products, selectedGroup, normalizedSearchQuery])
  return { selectedGroup, setSelectedGroup, visibleProducts, isLoading, error }
}
