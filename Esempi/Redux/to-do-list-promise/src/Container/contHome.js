import {connect} from 'react-redux'

import Home from '../Views/home'

import {getTask} from '../Action/mainAction'


 const laMiaHome = connect(null, {getTask})(Home);

 export default laMiaHome;