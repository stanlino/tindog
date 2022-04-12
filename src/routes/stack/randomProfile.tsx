import { createSharedElementStackNavigator } from 'react-navigation-shared-element'

import { Home } from '@screens/Home'
import { Matches } from '@screens/Matches'
import { RandomProfile } from '@screens/RandomProfile'

import { RandomRrofileRoutesParams } from '../../types/routes'

const { Navigator, Screen } = createSharedElementStackNavigator<RandomRrofileRoutesParams>()

export function RamdomProfileRoutes(props : any) {

  const route = props.route.params.route

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      { route === 'home' ? 
        <Screen component={Home} name='index'/> :
        <Screen component={Matches} name='index' /> 
      }
      <Screen 
        component={RandomProfile} 
        name='randomProfile' 
        sharedElements={(route, otherRoute, showing) => {
          if (!route.params.sharedElement) return []
          const item = route.params.pet
          return [item.id]
        }}
      />
    </Navigator>
  )
}