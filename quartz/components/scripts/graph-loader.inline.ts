/**
 * Graph Loader - Lazy loads graph bundle only on desktop viewports
 *
 * This script checks the viewport width and only loads the heavy graph dependencies
 * (D3, Pixi.js, Tween.js) on desktop devices (>800px). This saves ~1.2MB for mobile users.
 */

// Mobile breakpoint matches quartz/styles/variables.scss
const MOBILE_BREAKPOINT = 800

// Track if graph bundle has been loaded
let graphBundleLoaded = false
let graphBundleLoading = false

// Queue for pending nav events that occur before bundle loads
const pendingNavEvents: CustomEventMap["nav"][] = []

/**
 * Check if current viewport is desktop size
 * This is checked dynamically on each nav event to handle window resizing
 */
function isDesktopViewport(): boolean {
  return window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT + 1}px)`).matches
}

/**
 * Load the graph bundle dynamically
 */
function loadGraphBundle(): Promise<void> {
  return new Promise((resolve, reject) => {
    // If already loaded or loading, wait for it
    if (graphBundleLoaded) {
      resolve()
      return
    }

    if (graphBundleLoading) {
      // Wait for existing load to complete
      const checkInterval = setInterval(() => {
        if (graphBundleLoaded) {
          clearInterval(checkInterval)
          resolve()
        }
      }, 50)
      return
    }

    graphBundleLoading = true

    const script = document.createElement("script")
    // Use absolute path from site root to avoid relative path issues on subpages
    script.src = new URL("/static/graph.bundle.js", window.location.origin).href
    script.type = "application/javascript"

    script.onload = () => {
      console.log("[GRAPH LOADER] Script loaded, window.QuartzGraph:", typeof window.QuartzGraph)
      graphBundleLoaded = true
      graphBundleLoading = false

      // Process any pending nav events
      console.log("[GRAPH LOADER] Processing", pendingNavEvents.length, "pending nav events")
      while (pendingNavEvents.length > 0) {
        const event = pendingNavEvents.shift()!
        // @ts-ignore - QuartzGraph is loaded from graph.bundle.js
        if (window.QuartzGraph?.handleNav) {
          console.log("[GRAPH LOADER] Calling handleNav for pending event")
          // @ts-ignore
          window.QuartzGraph.handleNav(event)
        } else {
          console.error("[GRAPH LOADER] window.QuartzGraph.handleNav not available after load!")
        }
      }

      resolve()
    }

    script.onerror = () => {
      graphBundleLoading = false
      console.error("Failed to load graph bundle")
      reject(new Error("Failed to load graph bundle"))
    }

    document.head.appendChild(script)
  })
}

/**
 * Handle navigation events
 */
async function handleNavEvent(e: CustomEventMap["nav"]) {
  const isDesktop = isDesktopViewport()
  const viewportWidth = window.innerWidth
  console.log("[GRAPH LOADER] handleNavEvent called, isDesktop:", isDesktop, "viewport width:", viewportWidth)

  if (!isDesktop) {
    // On mobile, do nothing
    console.log("[GRAPH LOADER] Skipping graph load on mobile (viewport < 801px)")
    return
  }

  console.log("[GRAPH LOADER] Desktop detected, graphBundleLoaded:", graphBundleLoaded, "graphBundleLoading:", graphBundleLoading)

  if (!graphBundleLoaded) {
    // Queue the event and load the bundle
    pendingNavEvents.push(e)
    console.log("[GRAPH LOADER] Queued nav event, pending count:", pendingNavEvents.length)

    if (!graphBundleLoading) {
      console.log("[GRAPH LOADER] Starting to load graph bundle...")
      try {
        await loadGraphBundle()
        console.log("[GRAPH LOADER] Graph bundle loaded successfully")
      } catch (err) {
        console.error("[GRAPH LOADER] Graph bundle failed to load:", err)
      }
    }
  } else {
    // Bundle is ready, forward the event
    console.log("[GRAPH LOADER] Bundle already loaded, forwarding event")
    // @ts-ignore - QuartzGraph is loaded from graph.bundle.js
    if (window.QuartzGraph?.handleNav) {
      console.log("[GRAPH LOADER] Calling window.QuartzGraph.handleNav")
      // @ts-ignore
      window.QuartzGraph.handleNav(e)
    } else {
      console.error("[GRAPH LOADER] window.QuartzGraph.handleNav not found!")
    }
  }
}

// Register the nav event listener
document.addEventListener("nav", handleNavEvent)

// Clean up on page unload
window.addCleanup(() => {
  document.removeEventListener("nav", handleNavEvent)
  pendingNavEvents.length = 0
})
