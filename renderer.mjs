export const renderer = {
  link(href, _title, text) {
    return `<a href="${href}" class="Link">${text}</a>`
  }
}