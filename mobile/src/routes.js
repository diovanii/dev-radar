import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Main from './pages/Main'
import Profile from './pages/Profile'

const Routes = createAppContainer(
  createStackNavigator({
    Main: {
      screen: Main,
      navigationOptions: {
        title: 'Dev Radar'
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'GitHub profile'
      }
    }
  }, {
    defaultNavigationOptions: {
      headerTintColor: '#FFF',
      headerBackTitleVisible: null,
      headerStyle: {
        backgroundColor: '#7D40E7'
      }
    }
  })
)

export default Routes
