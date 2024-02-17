import { computePosition, shift, autoPlacement, offset } from '@floating-ui/dom'

export default class FUIElement {
  private _referenceEl: HTMLElement
  private _floatingEl: HTMLElement
  private _options = {
    middleware: [shift(), autoPlacement(), offset(30)],
  }

  constructor(referenceEl: HTMLElement, floatingEl: HTMLElement) {
    this._referenceEl = referenceEl
    this._floatingEl = floatingEl

    this._floatingEl.setAttribute('role', 'tooltip')
    this._floatingEl.style.display = 'none'

    this._referenceEl.addEventListener('mouseenter', this.show.bind(this))
    this._referenceEl.addEventListener('mousemove', this.handleHover.bind(this))
    this._referenceEl.addEventListener('mouseleave', this.hide.bind(this))
  }

  private async handleHover({ clientX, clientY }: MouseEvent) {
    const virtualElement = {
      getBoundingClientRect() {
        return {
          width: 0,
          height: 0,
          x: clientX,
          y: clientY,
          top: clientY,
          left: clientX,
          right: clientX,
          bottom: clientY,
        }
      },
      contextElement: this._referenceEl,
    }

    const { x, y } = await computePosition(
      virtualElement,
      this._floatingEl,
      this._options
    )

    this._floatingEl.style.transform = `translate(${x}px, ${y}px)`
  }

  public show(e: MouseEvent) {
    console.log('show')
    this.handleHover(e)
    this._floatingEl.style.display = 'block'
  }

  public hide() {
    console.log('hide')
    this._floatingEl.style.display = 'none'
  }
}

// export default function tooltip(node: HTMLElement) {
//   const img = node.querySelector('img') as HTMLImageElement
//   const tooltip = node.querySelector('div[role="tooltip"]') as HTMLElement

//   const virtualElement = {
//     getBoundingClientRect() {
//       return {
//         width: 0,
//         height: 0,
//         x: clientX,
//         y: clientY,
//         top: clientY,
//         left: clientX,
//         right: clientX,
//         bottom: clientY,
//       }
//     },
//     contextElement: img,
//   }

//   computePosition(img, tooltip, {
//     placement: 'top',
//     middleware: [shift(), autoPlacement()],
//   }).then(({ x, y }) => {
//     Object.assign(tooltip.style, {
//       left: `${x}px`,
//       top: `${y}px`,
//     })
//   })
// }
