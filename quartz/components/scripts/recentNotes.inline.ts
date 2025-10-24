function toggleRecentNotes(this: HTMLElement) {
  const nearestRecentNotes = this.closest(".recent-notes") as HTMLElement
  if (!nearestRecentNotes) return

  const recentNotesCollapsed = nearestRecentNotes.classList.toggle("collapsed")
  nearestRecentNotes.setAttribute(
    "aria-expanded",
    nearestRecentNotes.getAttribute("aria-expanded") === "true" ? "false" : "true",
  )

  // Check if we're on mobile by seeing if the mobile button is visible
  const mobileButton = nearestRecentNotes.querySelector(".mobile-recent-notes") as HTMLElement
  const isMobile = mobileButton?.checkVisibility()

  if (isMobile) {
    // Mobile: manage scroll locking
    if (!recentNotesCollapsed) {
      document.documentElement.classList.add("mobile-no-scroll")
    } else {
      document.documentElement.classList.remove("mobile-no-scroll")
    }
  } else {
    // Desktop: mutual exclusion with Explorer
    if (!recentNotesCollapsed) {
      // RecentNotes is expanding, collapse Explorer
      const explorer = document.querySelector(".explorer") as HTMLElement
      if (explorer && !explorer.classList.contains("collapsed")) {
        explorer.classList.add("collapsed")
        explorer.setAttribute("aria-expanded", "false")
      }
    }
  }
}

function setupRecentNotes() {
  const allRecentNotes = document.querySelectorAll(
    "div.recent-notes",
  ) as NodeListOf<HTMLElement>

  for (const recentNotes of allRecentNotes) {
    const toggleButtons = recentNotes.getElementsByClassName(
      "recent-notes-toggle",
    ) as HTMLCollectionOf<HTMLElement>

    for (const button of toggleButtons) {
      button.addEventListener("click", toggleRecentNotes)
      window.addCleanup(() => button.removeEventListener("click", toggleRecentNotes))
    }
  }
}

document.addEventListener("nav", async () => {
  await setupRecentNotes()

  // If mobile hamburger is visible, collapse by default
  // On desktop, preserve current state
  for (const recentNotes of document.getElementsByClassName("recent-notes")) {
    const mobileButton = recentNotes.querySelector(".mobile-recent-notes") as HTMLElement
    if (!mobileButton) continue

    if (mobileButton.checkVisibility()) {
      recentNotes.classList.add("collapsed")
      recentNotes.setAttribute("aria-expanded", "false")
      document.documentElement.classList.remove("mobile-no-scroll")
    }

    mobileButton.classList.remove("hide-until-loaded")
  }
})

window.addEventListener("resize", function () {
  // Apply `mobile-no-scroll` if RecentNotes is expanded on mobile
  const recentNotes = document.querySelector(".recent-notes")
  if (recentNotes && !recentNotes.classList.contains("collapsed")) {
    const mobileButton = recentNotes.querySelector(".mobile-recent-notes") as HTMLElement
    if (mobileButton?.checkVisibility()) {
      document.documentElement.classList.add("mobile-no-scroll")
    }
  }
})
