// Example: Island Architecture Pattern
// This demonstrates how to create interactive islands within static content

import { useState, useEffect } from 'preact/hooks';
import { Signal, signal } from '@preact/signals';

/**
 * Interactive Counter Island
 * This component will be hydrated on the client for interactivity
 */
export function CounterIsland({ initialCount = 0 }: { initialCount?: number }) {
  const [count, setCount] = useState(initialCount);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show static version during SSR
  if (!mounted) {
    return (
      <div class="counter-static">
        <span>Count: {initialCount}</span>
        <button disabled>+</button>
        <button disabled>-</button>
      </div>
    );
  }

  // Interactive version on client
  return (
    <div class="counter-interactive">
      <span>Count: {count}</span>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <button onClick={() => setCount(c => c - 1)}>-</button>
    </div>
  );
}

/**
 * Shopping Cart Island
 * Complex interactive component that manages state
 */
const cartItems = signal<Array<{ id: string; name: string; price: number; quantity: number }>>([]);

export function ShoppingCartIsland() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load cart from localStorage on mount
    const saved = localStorage.getItem('cart');
    if (saved) {
      cartItems.value = JSON.parse(saved);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      // Save cart to localStorage on changes
      localStorage.setItem('cart', JSON.stringify(cartItems.value));
    }
  }, [cartItems.value, mounted]);

  const addItem = (item: { id: string; name: string; price: number }) => {
    const existing = cartItems.value.find(i => i.id === item.id);
    if (existing) {
      cartItems.value = cartItems.value.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      cartItems.value = [...cartItems.value, { ...item, quantity: 1 }];
    }
  };

  const removeItem = (id: string) => {
    cartItems.value = cartItems.value.filter(i => i.id !== id);
  };

  const total = cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!mounted) {
    return (
      <div class="cart-static">
        <h3>Shopping Cart</h3>
        <p>Loading cart...</p>
      </div>
    );
  }

  return (
    <div class="cart-interactive">
      <h3>Shopping Cart ({cartItems.value.length})</h3>
      {cartItems.value.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.value.map(item => (
            <div key={item.id} class="cart-item">
              <span>{item.name}</span>
              <span>${item.price} x {item.quantity}</span>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          ))}
          <div class="cart-total">
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Search Island
 * Interactive search with debounced API calls
 */
export function SearchIsland() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !query.trim()) {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data.results || []);
      } catch (error) {
        console.error('Search failed:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, mounted]);

  if (!mounted) {
    return (
      <div class="search-static">
        <input type="text" placeholder="Search..." disabled />
        <div>Search results will appear here</div>
      </div>
    );
  }

  return (
    <div class="search-interactive">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
      />
      {loading && <div>Searching...</div>}
      {results.length > 0 && (
        <div class="search-results">
          {results.map((result, index) => (
            <div key={index} class="search-result">
              <h4>{result.title}</h4>
              <p>{result.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Static Product Card with Interactive Islands
 * This shows how to embed islands within static content
 */
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <div class="product-card">
      {/* Static content - rendered once on server */}
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p class="description">{product.description}</p>
      <p class="price">${product.price}</p>

      {/* Interactive islands - hydrated on client */}
      <div class="product-actions">
        <AddToCartButton product={product} />
        <WishlistButton productId={product.id} />
        <ShareButton product={product} />
      </div>
    </div>
  );
}

/**
 * Individual interactive components (micro-islands)
 */
function AddToCartButton({ product }: { product: Product }) {
  const [adding, setAdding] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = async () => {
    if (!mounted) return;

    setAdding(true);
    try {
      // Add to cart logic
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));

      // Optional: trigger cart update event
      window.dispatchEvent(new CustomEvent('cart-updated'));
    } finally {
      setAdding(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={adding || !mounted}
      class="add-to-cart-btn"
    >
      {adding ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}

function WishlistButton({ productId }: { productId: string }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (mounted) {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setIsWishlisted(wishlist.includes(productId));
    }
  }, [productId, mounted]);

  const toggleWishlist = () => {
    if (!mounted) return;

    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (isWishlisted) {
      const updated = wishlist.filter((id: string) => id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(updated));
      setIsWishlisted(false);
    } else {
      wishlist.push(productId);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsWishlisted(true);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      disabled={!mounted}
      class={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
    >
      {isWishlisted ? '❤️' : '🤍'}
    </button>
  );
}

function ShareButton({ product }: { product: Product }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleShare = async () => {
    if (!mounted || !navigator.share) return;

    try {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } catch (error) {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!mounted || !navigator.share) {
    return null; // Don't show share button if not supported
  }

  return (
    <button onClick={handleShare} class="share-btn">
      Share
    </button>
  );
}

