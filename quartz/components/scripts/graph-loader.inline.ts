/**
 * Graph Loader - Lazy loads graph bundle only on desktop viewports
 *
 * This script checks the viewport width and only loads the heavy graph dependencies
 * (D3, Pixi.js, Tween.js) on desktop devices (>800px). This saves ~1.2MB for mobile users.
 */

// Mobile breakpoint matches quartz/styles/variables.scss
const MOBILE_BREAKPOINT = 800

// Check if we're on a desktop viewport
const isDesktop = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT + 1}px)`).matches

// Track if graph bundle has been loaded
let graphBundleLoaded = false
let graphBundleLoading = false

// Queue for pending nav events that occur before bundle loads
const pendingNavEvents: CustomEventMap["nav"][] = []

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
    script.src = new URL("static/graph.bundle.js", document.baseURI).href
    script.type = "application/javascript"

    script.onload = () => {
      graphBundleLoaded = true
      graphBundleLoading = false

      // Process any pending nav events
      while (pendingNavEvents.length > 0) {
        const event = pendingNavEvents.shift()!
        // @ts-ignore - QuartzGraph is loaded from graph.bundle.js
        if (window.QuartzGraph?.handleNav) {
          // @ts-ignore
          window.QuartzGraph.handleNav(event)
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
  if (!isDesktop) {
    // On mobile, do nothing
    return
  }

  if (!graphBundleLoaded) {
    // Queue the event and load the bundle
    pendingNavEvents.push(e)

    if (!graphBundleLoading) {
      try {
        await loadGraphBundle()
      } catch (err) {
        console.error("Graph bundle failed to load:", err)
      }
    }
  } else {
    // Bundle is ready, forward the event
    // @ts-ignore - QuartzGraph is loaded from graph.bundle.js
    if (window.QuartzGraph?.handleNav) {
      // @ts-ignore
      window.QuartzGraph.handleNav(e)
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
