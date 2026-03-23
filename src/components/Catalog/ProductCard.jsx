import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingCart, Tag } from 'lucide-react'

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <article className="product-card h-100 animate__animated animate__fadeInUp">
      <div className="product-image-wrapper mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </div>

      <div className="flex items-center justify-between gap-2 mb-2">
        <p className="text-xs uppercase tracking-[0.25em] opacity-60 mb-0">
          {product.source}
        </p>

        <span className="category-pill">
          <Tag size={14} />
          {product.category}
        </span>
      </div>

      <h3 className="product-title mb-3">{product.name}</h3>

      <div className="product-price mb-3">
        ${Number(product.price).toFixed(2)}
      </div>

      <div className="product-meta mb-4">
        <span>ID #{product.id}</span>
        <span>{new Date(product.created_at).toLocaleDateString()}</span>
      </div>

      <div className="flex gap-2 mt-auto flex-wrap">
        <button
          type="button"
          className="primary-action flex-1"
          onClick={() => onAddToCart(product.id, 1)}
        >
          <ShoppingCart size={16} />
          Agregar
        </button>

        <Link
          to={`/products/${product.id}`}
          className="secondary-action flex-1 text-center no-underline"
        >
          <span className="inline-flex items-center justify-center gap-2">
            Ver detalle
            <ArrowRight size={16} />
          </span>
        </Link>
      </div>
    </article>
  )
}

export default ProductCard