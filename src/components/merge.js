import * as THREE from 'three'

const MergeGeometry = (geo1, geo2) => {
  const attributes = ['normal', 'position', 'uv']
  const dataLengths = [3, 3, 4, 4]
  const geo = new THREE.BufferGeometry()
  for (let attIndex = 0; attIndex < attributes.length; attIndex++) {
    const currentAttribute = attributes[attIndex]

    const geo1Att = geo1.setAttribute(currentAttribute)
    const geo2Att = geo2.setAttribute(currentAttribute)
    let currentArray = null
    if (currentAttribute === 'skinIndex')
      currentArray = new Uint16Array(geo1Att.array.length + geo2Att.array.length)
    else currentArray = new Float32Array(geo1Att.array.length + geo2Att.array.length)
    let innerCount = 0
    geo1Att.array.map((item) => {
      currentArray[innerCount] = item
      innerCount++
      return innerCount
    })
    geo2Att.array.map((item) => {
      currentArray[innerCount] = item
      innerCount++
      return innerCount
    })
    debugger
    geo1Att.array = currentArray
    geo1Att.count = currentArray.length / dataLengths[attIndex]
    geo.setAttribute(currentAttribute, geo1Att)
  }
  return geo
}
export default MergeGeometry

