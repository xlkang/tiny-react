import diff from './diff'
/**
 * 转换virtualDom为真实Dom
 */
export default function render(
  virtualDom, 
  container, 
  /**
   * jsx唯一父级！！！！
   * <div id="root">
   *    <div app>(firstChild)
   *    </div>
   * </div>
   */
  oldDom = container.firstChild
) {
  diff(virtualDom, container, oldDom)
}