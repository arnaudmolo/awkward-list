/*
 *
 * Instagram
 *
 */

import { connect } from 'react-redux'
import selectInstagram from './selectors'

const mapStateToProps = selectInstagram()

export default connect(state => ({list: mapStateToProps(state)}))
