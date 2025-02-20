import BaseComponent from './base'

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */
class Region extends BaseComponent {
  constructor({ map, code, path, style, label, labelStyle, labelsGroup }) {
    super()

    this._map = map
    this.shape = this._createRegion(path, code, style)

    let bbox = this.shape.getBBox()
    let text = this.getLabelText(code, label)

    // If label is passed and render function returns something 
    if (label && text) {
      let offsets = this.getLabelOffsets(code)
      this.labelX = bbox.x + bbox.width / 2 + offsets[0]
      this.labelY = bbox.y + bbox.height / 2 + offsets[1]

      this.label = this._map.canvas.createText({
        text,
        textAnchor: 'middle',
        alignmentBaseline: 'central',
        dataCode: code,
        x: this.labelX,
        y: this.labelY,
      }, labelStyle, labelsGroup)

      this.label.addClass('jvm-region jvm-element')
    }
  }

  _createRegion(path, code, style) {
    path = this._map.canvas.createPath({ d: path, dataCode: code }, style)
    path.addClass('jvm-region jvm-element')
    return path
  }

  updateLabelPosition() {
    if (this.label) {
      this.label.set({
        x: this.labelX * this._map.scale + this._map.transX * this._map.scale,
        y: this.labelY * this._map.scale + this._map.transY * this._map.scale
      })
    }
  }
}

export default Region