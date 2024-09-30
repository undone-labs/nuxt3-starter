export const formatSidebarItems = sidebar => {
  const formatItemFooterText = section => {
    const items = section.items
    if (items) {
      const len = items.length
      for (let i = 0; i < len; i++) {
        const item = items[i]
        if (item.hasOwnProperty('items')) {
          formatItemFooterText(item)
          continue
        } else {
          item.docFooterText = `<span class='doc-footer-section-text'>${section.text}</span><span class='doc-footer-divider'> | </span><span class='doc-footer-page-text'>${item.text}</span>`
        }
      }
    }
  }
  for (const key in sidebar) {
    const pack = sidebar[key]
    for (let i = 0; i < pack.length; i++) {
      const section = pack[i]
      formatItemFooterText(section)
    }
  }
  return sidebar
}
